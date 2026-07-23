# NHIỆM VỤ & KIẾN THỨC DAY 3 — DE (NGUYỄN ĐÔNG ANH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 3)
- [x] **Walking Skeleton 3-Node**: Chạy thông suốt từ Form UI ➔ Recipe ➔ Interpreter entry.
- [x] **Đảm bảo ranh giới DIP**: 100% thành viên chỉ import `studio_contracts`. `.importlinter` xanh 100%.
- [x] **Dữ liệu mẫu & CLI Demo**: Có sẵn dữ liệu Callisto thật và chạy được CLI demo.

---

## 🎯 VIỆC CỦA BẠN (DE - NGUYỄN ĐÔNG ANH - DAY 3)
1. **Chuẩn hóa chữ ký `kb.search` v0.1**: Chốt 4 tham số (`query, tenant, section_roles, top_k`) để khớp hoàn toàn với Protocol của `studio_contracts` (giúp AIE-1 wiring không bị lệch signature).
2. **Xây dựng 5 tài liệu Callisto mẫu**: Soạn thảo 5 bộ tài liệu Callisto (25 chunks) thuộc 4 nhóm vai trò tại `packages/kb/docs/callisto/`:
   - `ankor-leave-001.md` (`public`)
   - `borea-leave-001.md` (`public`)
   - `ankor-expense-001.md` (`finance`)
   - `ankor-salary-001.md` (`hr`)
   - `borea-expense-001.md` (`finance`)
3. **Cập nhật Callisto Schema Doc**: Cập nhật `docs/callisto-doc-schema.md` chốt trạng thái 5/5 docs (25 chunks).

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Signature Alignment Across Boundaries**: Việc giữ đồng bộ chữ ký hàm giữa hợp đồng tài liệu (`v0.md`) và mã nguồn thật (`Protocol`) giúp tránh lỗi `TypeError` khi gọi hàm giữa các quadrants.
- **Test Data Seeding (Callisto Set)**: Tạo bộ dữ liệu mẫu có sẵn các bẫy chéo tenant (Ankor vs Borea) và bẫy chéo vai (Public vs HR vs Finance) để làm mồi cho Eval Hub kiểm thử bảo mật.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/kb/docs/contracts/kb-search.v0.md` (Cập nhật bản v0.1 signature 4 tham số)
- `packages/kb/docs/callisto/ankor-leave-001.md` (Tài liệu nghỉ phép Ankor)
- `packages/kb/docs/callisto/ankor-salary-001.md` (Tài liệu lương Ankor - mồi SC-05)
- `packages/kb/docs/callisto/borea-expense-001.md` (Tài liệu chi phí Borea - mồi SC-04)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. Bộ tài liệu Callisto được lưu trữ dạng Markdown kèm Front-matter metadata.
2. AIE-1 nhận chữ ký 4 tham số của `kb.search` và nối vào `kb-retrieve` node executor.
