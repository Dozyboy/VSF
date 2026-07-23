# NHIỆM VỤ & KIẾN THỨC DAY 2 — AIE-1 (TRẦN BÁ ĐẠT)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 2)
- [x] **Clarification First**: Đặt tối thiểu 3 câu hỏi chất lượng gửi Mentor.
- [x] Khai báo xong bộ khung (scaffold) và các hàm Stub của 4 package.
- [x] Xuất bản file `docs/DESCOPE.md` cá nhân.
- [x] Lệnh `make lint` xanh 100%.

---

## 🎯 VIỆC CỦA BẠN (AIE-1 - TRẦN BÁ ĐẠT - DAY 2)
1. **Scaffold Package `studio_engine`**: Khởi tạo cấu trúc dự án `packages/engine`.
2. **Thiết kế VCR-Style Fixture Format**: Quy định định dạng file fixture mô phỏng câu trả lời LLM cho node `llm-step` (giúp chạy test không tốn API key).
3. **Khai báo Stubs**:
   - `interpreter.py` -> `run(recipe, *, trace_writer)`
   - `executors.py` -> Khai báo 6 executor classes tương ứng 6 NodeType.
   - `registry.py` -> Registry khóa đúng 6 `NodeType` hợp lệ.
4. **Xây dựng `docs/DESCOPE-AIE-1.md`**: Đề xuất kế hoạch cắt giảm mảng Engine.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **VCR-Style Mocking Pattern**: Ghi lại câu trả lời mẫu của LLM vào file JSON/YAML fixture và phát lại khi chạy test tự động, giúp test nhanh, tất định và không mất chi phí LLM.
- **Node Executor Registry**: Pattern đăng ký và ánh xạ từ tên loại Node (`NodeType`) sang lớp Executor tương ứng.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/engine/src/studio_engine/interpreter.py` (Stub `run`)
- `packages/engine/src/studio_engine/executors.py` (Stubs cho 6 node executors)
- `packages/engine/src/studio_engine/registry.py` (Registry map 6 node types)
- `packages/engine/docs/DESCOPE-AIE-1.md` (Kế hoạch descope)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Node Name] ──> [registry.get_executor(node_type)] ──> [Executor Instance] ──> [execute(node, state)]
```
