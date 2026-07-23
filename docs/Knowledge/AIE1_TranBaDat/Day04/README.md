# NHIỆM VỤ & KIẾN THỨC DAY 4 — AIE-1 (TRẦN BÁ ĐẠT)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 4)
- [x] **Data-Threading xuyên suốt**: Dữ liệu truyền liên tục qua các node trong Interpreter.
- [x] **Verification 5/5 PASS**: `StaticKbSearch` và Golden-set 5 cases chạy khớp 100%.
- [x] Chạy `python -m studio_evalhub.cli` ra kết quả **5/5 PASS**.
- [x] `make test` và `make lint` xanh 100%.

---

## 🎯 VIỆC CỦA BẠN (AIE-1 - TRẦN BÁ ĐẠT - DAY 4)
1. **Triển khai Data-Threading giữa các Nodes**:
   - Trong `interpreter.run()`, trích xuất kết quả `retrieved_chunks` từ `state[kb_node_id]`.
   - Cập nhật node `llm-step` thông qua `node.model_copy(update={"params": {**node.params, "retrieved_chunks": retrieved_chunks}})` (vì `Node` là `frozen=True`).
2. **Cập nhật `LlmStepExecutor`**:
   - Khi `retrieved_chunks` có dữ liệu: Trích xuất danh sách `citations` từ đúng các `chunk_id` thật thu được.
   - Trả về cờ cấu trúc `refused = not retrieved_chunks` để báo cho Eval Hub phân loại câu từ chối.
3. **Viết Unit Tests TDD**: Tạo file `packages/engine/tests/test_kb_retrieve_llm_step_threading.py` chứng minh citation được trích từ chunk thật thay vì regex cứng.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Immutable Model Modification (`model_copy`)**: Pydantic v2 không cho phép mutate attribute trực tiếp trên đối tượng `frozen=True`, phải dùng `model_copy(update=...)` để sinh ra instance mới.
- **Structural Refusal Signal (`refused` flag)**: Báo hiệu trạng thái từ chối (refusal) dựa trên việc không có dữ liệu truy vấn tri thức (`retrieved_chunks` rỗng) thay vì phân tích chuỗi văn bản LLM tự do.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/engine/src/studio_engine/interpreter.py` (Logic threading truyền `retrieved_chunks`)
- `packages/engine/src/studio_engine/executors.py` (Trích xuất citation từ chunk_id thật)
- `packages/engine/tests/test_kb_retrieve_llm_step_threading.py` (Test suite kiểm tra threading)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[kb-retrieve Node Execution] ──> [Save state[kb_id] = retrieved_chunks]
                                                 │
                                                 ▼
[llm-step Node Execution] <── [node.model_copy(update={"retrieved_chunks": ...})]
          │
          ├─► [Extract Citations from chunk_ids]
          └─► [Set refused = (len(chunks) == 0)]
```
