# 📖 BÀI GIẢNG CHI TIẾT DAY 04 — DE: INGESTION PIPELINE & TWO-LEVEL RLS FENCING

> **Vị trí phụ trách**: Data Engineer (DE — Nguyễn Đông Anh)  
> **Chủ đề chính**: Đưa KB Pipeline vào hoạt động thực tế, PostgreSQL RLS Fencing 2 lớp (`tenant_id` + `section_role`), và Trace Sink Logger  
> **Mục tiêu**: Nạp thành công 5 tài liệu Callisto vào Database, đảm bảo truy vấn `kb.search` trả về dữ liệu chuẩn xác và tuyệt đối bảo mật giữa các tenant.

---

## 🏗️ 1. THIẾT KẾ BẢNG `KB.CHUNKS` VÀ POLICY BẢO MẬT 2 LỚP

Ở Day 02, DE đã phát hiện ra lỗ hổng RLS nếu chỉ lọc theo `tenant_id`. Tại Day 04, DE triển khai thiết kế DB PostgreSQL hoàn chỉnh với RLS 2 lớp:

### Schema Bảng `kb.chunks`:
```sql
CREATE TABLE IF NOT EXISTS kb.chunks (
    chunk_id VARCHAR(255) PRIMARY KEY,
    doc_id VARCHAR(255) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL,
    section_role VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bật RLS bắt buộc
ALTER TABLE kb.chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb.chunks FORCE ROW LEVEL SECURITY;
```

### RLS Policy 2 Lớp (`tenant_id` và `section_role` List):
```sql
CREATE POLICY multi_tenant_role_fence ON kb.chunks
    FOR SELECT
    USING (
        tenant_id = current_setting('app.tenant_id', true)
        AND (
            section_role = 'public' 
            OR section_role = ANY (string_to_array(current_setting('app.user_roles', true), ','))
        )
    );
```

- **Lớp 1 (`tenant_id`)**: Bắt buộc `tenant_id` phải trùng khớp tuyệt đối với session variable `app.tenant_id`.
- **Lớp 2 (`section_role`)**: Cho phép đọc nếu chunk là `public` HOẶC nhãn `section_role` nằm trong danh sách quyền của người dùng (`app.user_roles`).

---

## 🔄 2. QUY TRÌNH CHUNKING VÀ RE-INDEX IDEMPOTENCY

Khi chạy lại pipeline nạp dữ liệu (Re-indexing), hệ thống không được phép nhân đôi dữ liệu (duplicate chunks).

### Thuật toán Idempotent Ingest:
1. Đọc nội dung Markdown từ `doc_factory`.
2. Tạo hash nội dung document (`doc_hash = md5(content)`).
3. Thực hiện Deterministic Chunking ➔ Tạo `chunk_id = f"{doc_id}#c{index}"` (ví dụ: `ankor-hr-policy-v1#c0`).
4. Sử dụng câu lệnh PostgreSQL `ON CONFLICT`:
   ```sql
   INSERT INTO kb.chunks (chunk_id, doc_id, tenant_id, section_role, content, metadata)
   VALUES (%s, %s, %s, %s, %s, %s)
   ON CONFLICT (chunk_id) DO UPDATE 
   SET content = EXCLUDED.content, metadata = EXCLUDED.metadata;
   ```

---

## 📈 3. TÍCH HỢP TRACE EVENT SINK RECORDER

Bảng Trace Event Sink dùng để ghi lại mọi hành động của Agent:

```sql
CREATE TABLE IF NOT EXISTS trace_events (
    id SERIAL PRIMARY KEY,
    trace_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    tenant_id VARCHAR(100) NOT NULL,
    node_id VARCHAR(100) NOT NULL,
    node_type VARCHAR(100) NOT NULL,
    ts DOUBLE PRECISION NOT NULL,
    latency_ms DOUBLE PRECISION NOT NULL,
    prompt_tokens INT DEFAULT 0,
    completion_tokens INT DEFAULT 0,
    cost_usd DOUBLE PRECISION DEFAULT 0.0,
    status VARCHAR(50) NOT NULL,
    error_msg TEXT
);
```

Hàm `record_event(event: TraceEvent)` nhận đối tượng Pydantic `TraceEvent` từ Engine và lưu trực tiếp vào Postgres.
