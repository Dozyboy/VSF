# 📑 CHI TIẾT NHIỆM VỤ NGÀY 1 (`day-01.md`) & NGÀY 2 (`day-02.md`)
*(Bóc tách chuyên sâu nội dung file `week-1/days/day-01.md` và `week-1/days/day-02.md`)*

---

## 📌 I. NGÀY 1 — KICKOFF: ĐỨNG ĐƯỢC TRONG XƯỞNG (`day-01.md`)

### 1. Mục tiêu ngày:
- Cài đặt xong môi trường chuẩn **Python 3.12**, chạy `pytest` **màu xanh 100%**.
- Ký cam kết bảo mật NDA pledge & Bật `secret-scan pre-commit`.
- Thực hiện bài **Teach-back 10 phút/người** về mảng chuyên môn (Quadrant) mình sở hữu và làm rõ ranh giới **Engine | Recipe**.

### 2. Phân công bài Teach-back Ngày 1:
- **SWE (Thiệu Quang Minh):** Trình bày về **Workbench / Recipe** (Cách tạo Agent bằng Form/Recipe khai báo, zero code lõi) + Phân biệt ranh giới Engine (xây 1 lần) vs Recipe (công thức riêng).
- **DE (Nguyễn Đông Anh):** Trình bày về **KB Pipeline** & **Trace Event**.
- **AIE-1 (Trần Bá Đạt):** Trình bày về **Interpreter & 6 Node-types đóng**.
- **AIE-2 (Lưu Tiến Duy):** Trình bày về **Eval-Gate & Scorecard**.

### 3. Tiêu chuẩn hoàn thành (DoD Day 1):
- [x] Chạy `pytest` xanh 100% trên Python 3.12 (có ảnh chụp màn hình).
- [x] Ký NDA + bật Secret-scan.
- [x] Hoàn thành bài thuyết trình Teach-back.
- [x] Trả lời được lý do vì sao phải **lọc quyền Fence ngay tại tầng truy xuất (Retrieval)**.
- [x] Nộp nhật ký làm việc `daily-note D1`.

---

## 📌 II. NGÀY 2 — ĐỌC ĐỀ, SCAFFOLD REPO & HỎI RÕ (`day-02.md`)

### 1. Mục tiêu ngày:
- Đọc hiểu đề bài vòng đời Agent, dựng cấu trúc thư mục 4 Quadrants (**Scaffold Repo**).
- Viết file danh sách cắt giảm **`DESCOPE.md`** gồm 4 nấc.
- Gửi bộ **`question-batch` (≥ 3 câu hỏi)** để làm rõ đề bài với Mentor trước khi viết code.
- Khai báo 4 Hợp đồng Schema ở phiên bản dự thảo **v0**.

### 2. Nhiệm vụ cụ thể ngày 2 theo vai:
- **SWE (Thiệu Quang Minh):** Giữ bút bản **v0 Recipe Interface** (khai báo `agent_config` tối thiểu gồm `instructions`, `model`, `tool_whitelist`) + Dựng khung thư mục `packages/workbench/`.
- **DE (Nguyễn Đông Anh):** Giữ bút bản **v0 Trace-Event Interface** & **v0 `kb.search` API**.
- **AIE-1 (Trần Bá Đạt):** Phác thảo khung lặp `interpreter` & chọn định dạng VCR-style cho `llm-step`.
- **AIE-2 (Lưu Tiến Duy):** Giữ bút bản **v0 Scorecard Interface** + Ngồi cùng DE chốt dạng 5 câu test mẫu.

### 3. Tiêu chuẩn hoàn thành (DoD Day 2):
- [x] Push cấu trúc thư mục Scaffold 4 Quadrants lên Git (phân chia đúng owner).
- [x] Viết xong file `DESCOPE.md` chứa 4 nấc hạ cấp tính năng.
- [x] 4 Hợp đồng v0 có tên hàm/trường dữ liệu khớp với file `umbrella-contract.md §3`.
- [x] Gửi bộ `question-batch ≥3 câu` cho Mentor **TRƯỚC KHI** bắt đầu gõ code.
- [x] Nộp nhật ký làm việc `daily-note D2`.
