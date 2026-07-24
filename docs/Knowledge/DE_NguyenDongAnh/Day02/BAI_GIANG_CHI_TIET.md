# 📖 BÀI GIẢNG CHI TIẾT DAY 02 — DE: SCHEMAS, CONTRACTS V0 & DESCOPE LADDER

> **Vị trí phụ trách**: Data Engineer (DE — Nguyễn Đông Anh)  
> **Chủ đề chính**: Hợp đồng Schema Contract #2 (`kb.search`), Contract #3 (`trace-event`), Callisto Doc Schema, Lỗ hổng RLS DB, và Thang hạ cấp tính năng `DESCOPE.md`  
> **Mục tiêu**: Đóng vai trò Giữ Bút (Pen Owner) soạn thảo cấu trúc Hợp đồng giao tiếp dữ liệu giữa mảng KB và các mảng khác (Engine, Workbench, EvalHub).

---

## 📜 1. ĐẦU VIỆC GIỮ BÚT (PEN OWNER) CONTRACT #2 VÀ CONTRACT #3

Trong dự án AgentCore Studio, **Hợp đồng Schema (Contracts)** là Hiến pháp giao tiếp giữa 4 vị trí. Ngày 2 quy định 4 Interface phải ở dạng dự thảo **v0** để chuẩn bị đàm phán frozen ở Day 4.

### 🔹 Contract #2: Signature `kb.search` v0 (`docs/contracts/kb-search.v0.md`)
Hàm `kb.search` do DE cung cấp cho AIE-1 (Engine) gọi từ node `kb-retrieve`.

```python
# Chữ ký hàm kb.search chuẩn v0
async def search(
    query: str,
    tenant: str,
    section_roles: list[str] | None = None,
    top_k: int = 3
) -> list[dict]:
    """
    Input:
      - query: Câu hỏi truy vấn ngữ nghĩa
      - tenant: Mã định danh tenant (ankor / borea)
      - section_roles: Danh sách vai trò truy cập (public, hr, finance, engineering)
      - top_k: Số lượng đoạn chunk trả về
      
    Output (List of Chunks):
      [
        {
          "chunk_id": "ankor-hr-policy-v1#c0",
          "doc_id": "ankor-hr-policy-v1",
          "content": "...",
          "score": 0.89,
          "metadata": {"tenant": "ankor", "section_role": "hr"}
        }
      ]
    """
```

---

### 🔹 Contract #3: Interface `TraceEvent` 12 Cột (`docs/contracts/trace-event.v0.md`)
Bảng ghi vết sự kiện cho mọi bước chạy của Agent (dùng cho Observability & Cost Tracking):

```python
class TraceEvent(BaseModel):
    trace_id: str             # Mã phiên chạy trace
    session_id: str           # Mã phiên làm việc người dùng
    tenant_id: str            # Mã định danh tenant
    node_id: str              # Mã node trong Recipe DAG
    node_type: str            # 1 trong 6 loại node (kb-retrieve, llm-step,...)
    ts: float                 # Timestamp UNIX
    latency_ms: float         # Thời gian thực thi (ms)
    prompt_tokens: int        # Số token đầu vào
    completion_tokens: int    # Số token đầu ra
    cost_usd: float           # Chi phí quy đổi USD
    status: str               # SUCCESS | ERROR | PAUSED
    error_msg: str | None     # Thông báo lỗi nếu có
```

---

## 📑 2. DESIGN SCHEMAS: CALLISTO DOC SCHEMA

Tài liệu tri thức Callisto (dùng cho 2 tenant `ankor` và `borea`) bắt buộc tuân theo định dạng Markdown đính kèm **YAML Frontmatter**:

```markdown
---
doc_id: ankor-hr-policy-v1
tenant: ankor
section_role: hr
title: Chính sách nhân sự Ankor 2026
version: 1.0
---

# CHÍNH SÁCH NHÂN SỰ ANKOR

Nội dung chi tiết ở đây...
```

### Quy tắc cắt đoạn (Chunking Rules):
1. **Không cắt ngang Header**: Mỗi chunk phải trọn vẹn trong một mục nội dung.
2. **Strict Single Role**: Một chunk chỉ được chứa duy nhất 1 nhãn `section_role`. Cắt nhầm nội dung HR sang đoạn Public sẽ gây rò rỉ dữ liệu khi lọc theo vai trò.

---

## 🕵️ 3. PHÁT HIỆN LỖ HỔNG BẢO MẬT RLS TẦNG DB

Trong Ngày 2, DE cần phát hiện ra một **lỗ hổng thiết kế RLS quan trọng**:
- Policy mặc định ban đầu mới chỉ lọc theo `tenant_id` (`USING (tenant_id = current_setting('app.tenant_id', true))`).
- **Thiếu kiểm tra `section_role`**: Nếu một user thuộc phòng Marketing (`section_role = 'marketing'`) gọi `kb.search`, DB Postgres vẫn trả về các chunk thuộc phòng Finance (`section_role = 'finance'`) miễn là cùng `tenant_id`.

👉 **Giải pháp**: Đề xuất nâng cấp RLS Policy ở Day 4 để kiểm tra cả `section_role` bằng Postgres Array / JSONB matching.

---

## 📉 4. THANG HẠ CẤP TÍNH NĂNG (DESCOPE LADDER) DE

Mục đích của file `DESCOPE.md` là lập sẵn phương án dự phòng 4 bậc để nếu thiếu thời gian, hệ thống vẫn giữ được luồng **Walking-Skeleton** hoạt động:

```
[Bậc 0: Full Pipeline] Postgres Vector pgvector + RLS Row-level + Trace Event DB
       │
       ▼ (Descope 1)
[Bậc 1: In-Memory Search] Dict Search in-memory + App-level Tenant Filter
       │
       ▼ (Descope 2)
[Bậc 2: Static JSON Stub] Đọc kết quả từ file fixtures JSON cố định theo tenant
       │
       ▼ (Descope 3)
[Bậc 3: Hardcoded Return] Trả về 1 đoạn string cứng "Mock Callisto Chunk"
```
