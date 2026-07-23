# NHIỆM VỤ & KIẾN THỨC DAY 1 — DE (NGUYỄN ĐÔNG ANH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 1)
- [x] **100% thành viên** clone repository thành công với `git clone --recursive` (đủ 7 submodules).
- [x] Khởi tạo thành công venv Python 3.14 thông qua `make setup` (`uv sync`).
- [x] Ký cam kết bảo mật NDA pledge và cấu hình hook `pre-commit` scan secret.
- [x] Tạo file `.env` từ `.env.example` với đầy đủ DSN và secret keys.
- [x] **100% thành viên** hoàn thành bài Teach-back mảng mình sở hữu và vượt qua bài QA của Mentor.

---

## 🎯 VIỆC CỦA BẠN (DE - NGUYỄN ĐÔNG ANH - DAY 1)
1. **Nghiên cứu kiến trúc KB**: Đọc tài liệu KB Pipeline, quy trình Chunking, Embedding và Indexing.
2. **Phân tích RLS Isolation**: Đọc hiểu cấu trúc bảng `kb.chunks` với chính sách `FORCE ROW LEVEL SECURITY`.
3. **Thực hiện Teach-back**: Trình bày bài Teach-back mảng KB & Security Data Fence cho toàn team.
4. **Chuẩn bị giữ bút**: Chuẩn bị nhận quyền giữ bút cho **Contract #2 (`kb.search`)** và **Contract #3 (`trace-event`)** ở Day 2.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **PostgreSQL Row Level Security (RLS)**: Cơ chế phân quyền dữ liệu mức dòng trên Postgres (`USING (tenant_id = current_setting('app.tenant_id', true))`). Nếu không set variable -> NULL -> Trả về 0 dòng (Fail-closed security).
- **Data Chunking & Embedding Lineage**: Quy trình chia cắt văn bản thành các đoạn nhỏ (chunks), sinh vector nhúng và lưu trữ kèm metadata phân quyền (`tenant_id`, `section_role`).
- **Trace Event Sink**: Hệ thống ghi log vết thực thi chi tiết của Agent để tính toán lượng token tiêu thụ và chi phí tài nguyên.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/kb/` (Thư mục root mảng KB)
- `agentcore-report/daily-notes/2026-07-20-DongAnh2704.md` (Báo cáo daily note Day 1)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. Tài liệu thô được đưa vào KB Pipeline.
2. Pipeline thực hiện cắt chunk và gắn nhãn `tenant_id` + `section_role`.
3. Lưu vào Postgres bảng `kb.chunks` có bật RLS.
