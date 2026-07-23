# NHIỆM VỤ & KIẾN THỨC DAY 1 — AIE-2 (LƯU TIẾN DUY)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 1)
- [x] **100% thành viên** clone repository thành công với `git clone --recursive`.
- [x] Khởi tạo thành công venv Python 3.14 thông qua `make setup`.
- [x] Ký cam kết NDA pledge và cấu hình hook `pre-commit`.
- [x] Tạo file `.env` từ `.env.example`.
- [x] **100% thành viên** hoàn thành bài Teach-back mảng mình sở hữu.

---

## 🎯 VIỆC CỦA BẠN (AIE-2 - LƯU TIẾN DUY - DAY 1)
1. **Nghiên cứu kiến trúc Eval Hub**: Đọc tài liệu Eval Harness, quy trình đánh giá 30 golden cases và cấu trúc Scorecard.
2. **Nghiên cứu LLM-As-A-Judge**: Tìm hiểu cơ chế sử dụng LLM làm giám khảo tự động đánh giá độ chính xác và an toàn của câu trả lời.
3. **Thực hiện Teach-back**: Trình bày Teach-back mảng Eval Hub & Scoring Architecture cho team.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Eval Harness Pattern**: Hệ thống kiểm thử chuyên biệt dành cho AI Agent, tự động nạp các kịch bản kiểm thử (Golden Sets), thực thi Agent và so sánh kết quả trả về với đáp án kỳ vọng.
- **LLM-Judge Agreement Check**: Kỹ thuật dùng một model LLM độc lập để chấm điểm chất lượng câu trả lời và đo lường độ tin cậy.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/evalhub/` (Thư mục root mảng Evalhub)
- `agentcore-report/daily-notes/2026-07-20-dholmes0207.md` (Báo cáo daily note Day 1)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. Eval Harness đọc dữ liệu 30 Golden Cases.
2. Chạy Agent cho từng Case thu được Output và Citations.
3. LLM-Judge và bộ tính toán Compute ra kết quả Scorecard (PASS/FAIL Verdict).
