# NHIỆM VỤ & KIẾN THỨC DAY 5 — AIE-2 (LƯU TIẾN DUY)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 5)
- [ ] **Tích hợp toàn diện qua Composition Root**: Nối 4 mảng qua `apps/studio`.
- [ ] **Bật PostgreSQL RLS thật**: `kb.chunks` kích hoạt `FORCE ROW LEVEL SECURITY`.
- [ ] **Hoàn thiện 8-Step Lifecycle Demo**: Chạy mượt mà từ Form -> Canvas -> Trace timeline -> Eval gate -> Publish/Rollback.
- [ ] **Zero Leakage**: `make leak-test` xanh tuyệt đối.

---

## 🎯 VIỆC CỦA BẠN (AIE-2 - LƯU TIẾN DUY - DAY 5)
1. **Nối `EngineAgentRunner` Adapter Thật**: Thay thế `_DemoRunner` bằng `EngineAgentRunner` adapter do Mentor tiêm từ `apps/studio` vào.
2. **Triển khai Full Scorecard 30-Case Golden Set**: Chạy đánh giá toàn bộ 30 test cases thực tế thay vì 5 case mẫu thô.
3. **Render Scorecard & Verdict**: Xuất Scorecard chi tiết (gồm độ chính xác, tỷ lệ bảo mật, tổng token cost, và kết luận Verdict `PASS` hoặc `FAIL`) làm đầu vào cho nút Publish của SWE.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Full Golden Set Execution**: Mở rộng quy mô đánh giá lên tập dữ liệu 30 trường hợp thử nghiệm bao phủ đầy đủ các tình huống nghiệp vụ, câu hỏi phức tạp và tấn công bảo mật.
- **Scorecard Driven Publishing Gate**: Đóng vai trò là "Trọng tài tối cao" đưa ra tín hiệu Verdict quyết định xem một Agent có đủ điều kiện để phát hành ra môi trường thật hay không.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/evalhub/src/studio_evalhub/harness.py` (Lớp `EvalHarness` tích hợp adapter thật)
- `packages/evalhub/src/studio_evalhub/compute.py` (Tính toán chỉ số Scorecard chi tiết)
- `packages/evalhub/src/studio_evalhub/judge.py` (LLM-Judge đánh giá nghĩa nâng cao)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[apps/studio] ──(Inject Adapter)──> [EvalHarness.run(30_cases)]
                                             │
                                             ▼
[Publish Gate (SWE)] <── (Verdict PASS/FAIL) <── [compute_scorecard()]
```
