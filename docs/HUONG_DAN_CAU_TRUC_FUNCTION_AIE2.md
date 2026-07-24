# 📂 HƯỚNG DẪN CẤU TRÚC MÃ NGUỒN VÀ VỊ TRÍ HÀM CHO VAI TRÒ AIE-2 (AI EVAL ENGINEER)

> **Tác giả mảng:** AIE-2 (AI Eval Engineer — Lưu Tiến Duy)  
> **Phạm vi quản lý:** Package `studio_evalhub`, Bộ chấm điểm Eval Harness, Golden Set, Scorecard Verdict Engine.

---

## 🎯 1. VAI TRÒ VÀ TRÁCH NHIỆM CHÍNH CỦA AIE-2
* Xây dựng khung đánh giá chất lượng Agent (**Eval Harness**).
* Quản lý bộ dữ liệu mẫu chuẩn 30 câu hỏi (**Golden Set** Callisto).
* Tính toán các chỉ số chất lượng: `success_rate`, `citation_accuracy`.
* Xuất ra báo cáo đánh giá **Scorecard** mang kết quả quyết định `gate.verdict` (`PASS` hoặc `FAIL`).

---

## 📂 2. BẢNG PHÂN LOẠI VÀ VỊ TRÍ LƯU TRỮ CÁC METHOD CHO AIE-2

| Nhóm chức năng của AIE-2 | Tên File / Đường dẫn chứa Method | Các hàm / method nhỏ tiêu biểu |
| :--- | :--- | :--- |
| **1. Động cơ Chạy Kiểm thử (Eval Harness)** | `packages/evalhub/src/studio_evalhub/harness.py` | • `EvalHarness.run_smoke()` — Chạy bộ 5 Smoke cases <br>• `evaluate_case()` — Chấm từng test case |
| **2. Cổng Đánh giá & Chấm điểm (Eval Gate)** | `packages/evalhub/src/studio_evalhub/eval_gate.py` | • `evaluate_scorecard()` — Tính tổng điểm <br>• `compute_verdict()` — Ra quyết định `PASS` / `FAIL` |
| **3. Trình diễn & Render Báo cáo (CLI Render)** | `packages/evalhub/src/studio_evalhub/cli.py` | • `_render()` — In bảng kết quả đẹp ra Terminal CLI <br>• `_demo_golden_set()` — Nạp bộ dữ liệu Golden Set |
| **4. Bộ So sánh Kết quả (Scorers)** | `packages/evalhub/src/studio_evalhub/scorers.py` | • `exact_match_score()` — So sánh chính xác <br>• `citation_accuracy_score()` — Kiểm tra trích dẫn |

---

## 🛠️ 3. MÓC NỐI GIAO THƯƠNG VỚI CÁC MẢNG KHÁC (SEAM CONTRACTS)
* **Nhận từ DE**: Bộ 30 câu hỏi Golden Set từ Doc Factory.
* **Nhận từ AIE-1**: Chạy Agent qua `interpreter.run()` để thu thập câu trả lời thực tế.
* **Cung cấp cho SWE**: Đối tượng `Scorecard` chứa `gate.verdict` (`PASS` / `FAIL`) để SWE tại `publish_manager.py` quyết định **Publish** hay **Rollback**.
