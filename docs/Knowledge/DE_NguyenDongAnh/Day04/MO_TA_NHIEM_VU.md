# 🎯 MÔ TẢ NHIỆM VỤ DAY 04 — DE (NGUYỄN ĐÔNG ANH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#16`
* **Tiêu đề**: `Day 4 — DE (Nguyễn Đông Anh) — Đóng băng Contract #2 & #3, nạp 5 doc Callisto vào DB & test RLS query`
* **Vị trí**: Data Engineer (DE)
* **Status**: In Progress / Target Day 4

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Dữ liệu 5 tài liệu Callisto seed từ `doc_factory`.
- Script khởi tạo bảng `schema.sql` của Postgres RLS.

### 🔹 Deliverables / Output phải bàn giao:
1. Đóng băng Hợp đồng `kb-search.v1.py` & `trace-event.v1.py` (Frozen Pydantic Models).
2. Pipeline nạp dữ liệu `studio_kb/ingest.py` nạp 5 doc Callisto vào Postgres.
3. Hàm `kb.search` đọc dữ liệu thật từ Postgres có đính kèm RLS session variable.
4. File kiểm thử `tests/test_rls_fence.py` chứng minh dữ liệu tenant `borea` không thể bị đọc bởi tenant `ankor`.
5. File Daily Note D4 (`agentcore-report/daily-notes/2026-07-23-DongAnh2704.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Đóng băng Contract #2 và Contract #3 (Pydantic Models)
Cập nhật file trong `packages/contracts/`:

```python
# packages/contracts/src/studio_contracts/kb.py
from pydantic import BaseModel, Field

class KbSearchRequest(BaseModel):
    query: str
    tenant: str
    section_roles: list[str] = Field(default_factory=lambda: ["public"])
    top_k: int = 3

class KbSearchResult(BaseModel):
    chunk_id: str
    doc_id: str
    content: str
    score: float
    tenant: str
    section_role: str
```

---

### 📌 Bước 2: Viết Ingestion Script Nạp 5 Doc Callisto vào DB
Viết file `packages/kb/src/studio_kb/ingest.py`:

```python
async def ingest_callisto_docs(db_conn):
    """Nạp 5 tài liệu Callisto seed vào Postgres kb.chunks."""
    factory = DocFactory()
    docs = factory.get_seed_documents()
    for doc in docs:
        chunks = chunk_document(doc)
        await save_chunks_to_db(db_conn, chunks)
```

---

### 📌 Bước 3: Viết Unit Test Kiểm Tra Hàng Rào Bảo Mật RLS (`test_rls_fence.py`)
Tạo file test kiểm minh RLS fence:

```python
async def test_tenant_isolation(db_conn):
    # Set session app.tenant_id = 'ankor'
    await db_conn.execute("SET LOCAL app.tenant_id = 'ankor';")
    results = await search(query="chính sách", tenant="ankor")
    
    # Đảm bảo 100% kết quả có tenant = 'ankor'
    for r in results:
        assert r['metadata']['tenant'] == 'ankor'
        assert r['metadata']['tenant'] != 'borea'
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Đóng băng xong Hợp đồng Pydantic Contract #2 và #3 trong `packages/contracts`.
- [ ] Nạp thành công 5 doc Callisto vào Postgres bảng `kb.chunks`.
- [ ] Hàm `kb.search` thực thi truy vấn thật qua RLS.
- [ ] Unit test `test_rls_fence.py` PASS 100%.
- [ ] Push file Daily Note D4 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #16 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 04 (DE — Nguyễn Đông Anh)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#16**:

#### 🟢 Các mục đã bàn giao:
- [x] **Frozen Contracts**: Đóng băng Contract #2 (`kb.search`) & Contract #3 (`trace-event`) v1 trong `packages/contracts`.
- [x] **Ingest Pipeline**: Nạp thành công 5 tài liệu Callisto seed cho 2 tenant `ankor` & `borea`.
- [x] **RLS 2-Level Fence**: Cấu hình bảng `kb.chunks` với RLS policy lọc theo `tenant_id` + `section_role`.
- [x] **Fence Unit Test**: Viết unit test `test_rls_fence.py` xanh 100%.

CC: @hieubui2409 (Mentor) / @group
```
