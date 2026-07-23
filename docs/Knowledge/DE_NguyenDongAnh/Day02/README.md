# NHIỆM VỤ & KIẾN THỨC DAY 2 — DE (NGUYỄN ĐÔNG ANH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 2)
- [x] **Clarification First**: Đặt tối thiểu 3 câu hỏi chất lượng gửi Mentor trước khi code.
- [x] Khai báo xong bộ khung (scaffold) và các hàm Stub của 4 package quadrant.
- [x] Xuất bản file `docs/DESCOPE.md` cá nhân đề xuất thang cắt giảm 4 nấc.
- [x] Lệnh `make lint` xanh 100%.

---

## 🎯 VIỆC CỦA BẠN (DE - NGUYỄN ĐÔNG ANH - DAY 2)
1. **Giữ bút Contract #2 & #3 v0**:
   - Soạn thảo `docs/contracts/kb-search.v0.md` (chữ ký `kb.search` v0).
   - Soạn thảo `docs/contracts/trace-event.v0.md` (interface `TraceEvent` 12 cột).
2. **Thiết kế Callisto Doc Schema**: Viết `docs/callisto-doc-schema.md` quy định định dạng front-matter, bảng chunk/index và quy tắc cắt đoạn.
3. **Phát hiện lỗ hổng RLS**: Phát hiện policy RLS trong `schema.py` mới chỉ khoá `tenant_id`, chưa khoá `section_role` ở tầng DB (nguy cơ rò rỉ chéo vai T6).
4. **Viết DESCOPE.md**: Xây dựng kế hoạch cắt giảm 4 nấc bảo vệ mảng KB.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Deterministic Chunk ID**: Đặt `chunk_id = {doc_id}#c{n}` thay vì UUID ngẫu nhiên để khi re-index không làm hỏng nhãn kiểm thử trong Golden Set.
- **Role-Based Chunking Rule**: Quy tắc 1 chunk chỉ thuộc đúng 1 `section_role` (`public`, `hr`, `finance`, `engineering`), cắt sai từ đầu sẽ làm hỏng hàng rào phân quyền.
- **Cost-Lineage & Event Ordering Invariants**: Đảm bảo `cost` và thứ tự thời gian (`ts`) của trace event phải nhất quán tuyệt đối trên toàn hệ thống.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/kb/docs/contracts/kb-search.v0.md` (Contract #2 v0)
- `packages/kb/docs/contracts/trace-event.v0.md` (Contract #3 v0)
- `packages/kb/docs/callisto-doc-schema.md` (Chuẩn thiết kế Callisto docs)
- `packages/kb/docs/DESCOPE.md` (Kế hoạch descope)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. `kb.search` nhận `tenant` + `section_roles`.
2. Kiểm tra câu lệnh `WHERE` ở tầng ứng dụng kết hợp với hàng rào Postgres RLS.
3. Kết quả truy vấn trả về kèm theo `chunk_id` chính xác.
