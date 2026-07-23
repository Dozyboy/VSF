# NHIỆM VỤ & KIẾN THỨC DAY 1 — AIE-1 (TRẦN BÁ ĐẠT)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 1)
- [x] **100% thành viên** clone repository thành công với `git clone --recursive`.
- [x] Khởi tạo thành công venv Python 3.14 thông qua `make setup`.
- [x] Ký cam kết NDA pledge và cấu hình hook `pre-commit`.
- [x] Tạo file `.env` từ `.env.example`.
- [x] **100% thành viên** hoàn thành bài Teach-back mảng mình sở hữu.

---

## 🎯 VIỆC CỦA BẠN (AIE-1 - TRẦN BÁ ĐẠT - DAY 1)
1. **Nghiên cứu kiến trúc Engine**: Đọc tài liệu thiết kế vòng lặp duyệt đồ thị `interpreter.py` và 6 loại node.
2. **Hiểu rõ tính chất Stateless**: Đảm bảo Engine không lưu trữ trạng thái lâu dài mà nhận toàn bộ cấu hình từ `Recipe` và dữ liệu từ `Collaborators`.
3. **Thực hiện Teach-back**: Trình bày Teach-back mảng Engine & Interpreter Architecture cho team.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Stateless Execution Loop**: Interpreter duyệt DAG theo thứ tự topological sort, duy trì một dictionary `state` tạm thời lưu output của từng node trong 1 lần chạy.
- **6 Core Node Types**:
  1. `kb-retrieve`: Truy vấn tri thức qua KB.
  2. `llm-step`: Trích xuất phản hồi từ LLM.
  3. `tool-call`: Gọi các công cụ ngoại vi.
  4. `hitl-pause`: Tạm dừng chờ con người duyệt.
  5. `router`: Rẽ nhánh logic.
  6. `end`: Kết thúc luồng chạy.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/engine/` (Thư mục root mảng Engine)
- `agentcore-report/daily-notes/2026-07-20-TranBaDat2607.md` (Báo cáo daily note Day 1)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. Interpreter nhận `Recipe` từ Workbench.
2. Lần lượt gọi Executor của từng Node theo thứ tự đồ thị.
3. Emit các `TraceEvent` để ghi nhận nhật ký chạy.
