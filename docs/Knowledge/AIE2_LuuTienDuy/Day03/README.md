# NHIỆM VỤ & KIẾN THỨC DAY 3 — AIE-2 (LƯU TIẾN DUY)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 3)
- [x] **Walking Skeleton 3-Node**: Chạy thông suốt từ Form UI ➔ Recipe ➔ Interpreter entry.
- [x] **Đảm bảo ranh giới DIP**: 100% thành viên chỉ import `studio_contracts`.
- [x] **Dữ liệu mẫu & CLI Demo**: Có sẵn dữ liệu Callisto thật và chạy được CLI demo.

---

## 🎯 VIỆC CỦA BẠN (AIE-2 - LƯU TIẾN DUY - DAY 3)
1. **Dựng Bộ Chấm Điểm Thô (Smoke Eval Harness)**: Triển khai lớp `_DemoRunner` và runner 5 cases tại `packages/evalhub/src/studio_evalhub/cli.py`.
2. **So Khớp Kết Quả Cơ Bản**: So sánh câu trả lời `actual` và `expected` bằng giải thuật khớp chuỗi cơ bản.
3. **Hiển Thị Bảng Điểm CLI**: In bảng kết quả 5 dòng trực quan ra màn hình terminal.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Early Verification via CLI**: Tạo công cụ CLI nhỏ giúp kiểm tra nhanh kết quả đánh giá ở tầng thấp trước khi tích hợp vào giao diện Web UI hoặc pipeline tự động.
- **Test Case Ground Truth**: Cách xây dựng tập mẫu cặp `(query, expected_answer, expected_citation)` để làm thước đo kiểm tra.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/evalhub/src/studio_evalhub/cli.py` (CLI Smoke Eval runner)
- `packages/evalhub/src/studio_evalhub/harness.py` (Cập nhật logic harness thô)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. CLI `python -m studio_evalhub.cli` đọc 5 case mẫu.
2. `_DemoRunner` chạy qua từng case.
3. In bảng kết quả 5 dòng (Success / Citation status) ra console.
