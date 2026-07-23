# NHIỆM VỤ & KIẾN THỨC DAY 2 — AIE-2 (LƯU TIẾN DUY)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 2)
- [x] **Clarification First**: Đặt tối thiểu 3 câu hỏi chất lượng gửi Mentor.
- [x] Khai báo xong bộ khung (scaffold) và các hàm Stub của 4 package.
- [x] Xuất bản file `docs/DESCOPE.md` cá nhân.
- [x] Lệnh `make lint` xanh 100%.

---

## 🎯 VIỆC CỦA BẠN (AIE-2 - LƯU TIẾN DUY - DAY 2)
1. **Giữ bút Contract #4 v0**: Thiết kế cấu trúc `Scorecard` format v0 trong `docs/scorecard-v0.md`.
2. **Khai báo Stubs**:
   - `harness.py` -> `EvalHarness.run(recipe)`
   - `judge.py` -> `LLMJudge.evaluate(actual, expected)`
   - `compute.py` -> `compute_scorecard(results)`
3. **Xây dựng `docs/DESCOPE-AIE-2.md`**: Đề xuất kế hoạch cắt giảm mảng Evalhub.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Scorecard Contract Format**: Định dạng cấu hình bảng điểm thống nhất bao gồm các chỉ số: `accuracy`, `citation_precision`, `refusal_correctness`, `token_cost`, và kết quả tổng thể `verdict` (`PASS` / `FAIL`).
- **Pass/Fail Threshold Gate**: Quy định mức điểm tối thiểu (ví dụ: precision >= 90%, 0 leakage) để một Agent được phép vượt qua cổng phát hành.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/evalhub/docs/scorecard-v0.md` (Contract #4 v0)
- `packages/evalhub/src/studio_evalhub/harness.py` (Stub `EvalHarness`)
- `packages/evalhub/src/studio_evalhub/judge.py` (Stub `LLMJudge`)
- `packages/evalhub/src/studio_evalhub/compute.py` (Stub `compute_scorecard`)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Agent Output] ──> [LLMJudge.evaluate()] ──> [CaseResult] ──> [compute_scorecard()] ──> [Scorecard Verdict]
```
