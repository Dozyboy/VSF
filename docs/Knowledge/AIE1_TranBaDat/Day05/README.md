# NHIỆM VỤ & KIẾN THỨC DAY 5 — AIE-1 (TRẦN BÁ ĐẠT)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 5)
- [ ] **Tích hợp toàn diện qua Composition Root**: Nối 4 mảng qua `apps/studio`.
- [ ] **Bật PostgreSQL RLS thật**: `kb.chunks` kích hoạt `FORCE ROW LEVEL SECURITY`.
- [ ] **Hoàn thiện 8-Step Lifecycle Demo**: Chạy mượt mà từ Form -> Canvas -> Trace timeline -> Eval gate -> Publish/Rollback.
- [ ] **Zero Leakage**: `make leak-test` xanh tuyệt đối.

---

## 🎯 VIỆC CỦA BẠN (AIE-1 - TRẦN BÁ ĐẠT - DAY 5)
1. **Triển khai Node Executor `hitl-pause`**:
   - Viết executor cho node `hitl-pause` có khả năng tạm dừng (suspend) phiên thực thi và lưu lại checkpoint.
   - Hỗ trợ khôi phục (resume) khi nhận được tín hiệu phê duyệt từ con người qua API/UI.
2. **Nối Gemini LLM Provider Thật**: Thay thế VCR Fixture bằng `GeminiProvider` thật trong `apps/studio/providers`.
3. **Phát ra các Trace Event Đầy Đủ**: Đảm bảo mỗi bước chạy của Executor phát ra đối tượng `TraceEvent` có đầy đủ 12 cột thông tin gửi cho `PgTraceWriter`.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Human-In-The-Loop (HITL) Execution State**: Mẫu thiết kế cho phép tạm dừng luồng chạy của AI Agent tại một node chỉ định, chờ duyệt từ người dùng rồi mới tiếp tục nhánh thực thi.
- **Real LLM Provider Integration**: Quản lý API Key, rate limit và xử lý ngoại lệ khi giao tiếp với Gemini API.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/engine/src/studio_engine/executors.py` (Thêm `HitlPauseExecutor`)
- `apps/studio/providers/gemini.py` (Lớp `GeminiProvider` giao tiếp API thật)
- `packages/engine/tests/test_hitl_pause.py` (Test suite kiểm tra suspend/resume)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Interpreter] ──> [hitl-pause Node] ──> [Suspend Run & Return Checkpoint]
                                                      │
                                           (Human Approves via UI)
                                                      ▼
[Resume Run] <── [Call interpreter.resume()] <────────┘
```
