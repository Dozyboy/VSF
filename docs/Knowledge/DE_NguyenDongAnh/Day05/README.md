# NHIỆM VỤ & KIẾN THỨC DAY 5 — DE (NGUYỄN ĐÔNG ANH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 5)
- [ ] **Tích hợp toàn diện qua Composition Root**: Nối 4 mảng qua `apps/studio`.
- [ ] **Bật PostgreSQL RLS thật**: `kb.chunks` kích hoạt `FORCE ROW LEVEL SECURITY`.
- [ ] **Hoàn thiện 8-Step Lifecycle Demo**: Chạy mượt mà từ Form -> Canvas -> Trace timeline -> Eval gate -> Publish/Rollback.
- [ ] **Zero Leakage**: `make leak-test` xanh tuyệt đối (`leakage = 0`).

---

## 🎯 VIỆC CỦA BẠN (DE - NGUYỄN ĐÔNG ANH - DAY 5)
1. **Hoàn thiện `KbSearchService` PostgreSQL RLS thật**:
   - Viết hàm `search()` thật trong `packages/kb/src/studio_kb/search.py`.
   - Kết nối DB qua `psycopg` pool, tự động thiết lập `SET LOCAL app.tenant_id = 'X'` trong transaction.
2. **Kích hoạt Trace Sink (`PgTraceWriter`)**:
   - Ghi nhận 12 thuộc tính `TraceEvent` từ Engine trực tiếp vào bảng `obs.trace_events`.
   - Đảm bảo tính nhất quán chi phí token (`obs.costs`).
3. **Triển khai Consent Purge**: Viết hàm xoá sạch dữ liệu tenant theo yêu cầu (GDPR/Consent Purge).

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Transaction-Scoped RLS (`SET LOCAL`)**: Việc sử dụng `SET LOCAL` đảm bảo tham số `app.tenant_id` tự động reset ngay khi transaction kết thúc, không bị rò rỉ sang kết nối khác trong connection pool.
- **Fail-Closed Postgres Policies**: Thiết lập policy Postgres đảm bảo bất kỳ truy vấn nào thiếu `tenant_id` sẽ nhận về 0 kết quả thay vì trả về toàn bộ DB.
- **OTel Trace Sink Integration**: Cơ chế ghi nhận log sự kiện không đồng bộ giúp đo lường latency, token cost và node execution timeline.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/kb/src/studio_kb/search.py` (Hàm `KbSearchService.search` thật)
- `packages/kb/src/studio_kb/pipeline.py` (Pipeline nạp và cắt chunk tài liệu)
- `packages/kb/src/studio_kb/schema.py` (DDL tạo bảng `kb.chunks` & RLS policy)
- `apps/studio/obs/trace_writer.py` (Lớp `PgTraceWriter` ghi trace event)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Engine Node Execution] ──> [PgTraceWriter.write(event)] ──> [INSERT INTO obs.trace_events]
                                                                        │
[KbRetrieve Node] ──> [KbSearchService.search()] ──> [SET LOCAL app.tenant_id] ──> [Query Postgres RLS]
```
