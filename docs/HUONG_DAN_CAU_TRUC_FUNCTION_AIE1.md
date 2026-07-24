# 📂 HƯỚNG DẪN CẤU TRÚC MÃ NGUỒN VÀ VỊ TRÍ HÀM CHO VAI TRÒ AIE-1 (AI ENGINE ENGINEER)

> **Tác giả mảng:** AIE-1 (AI Engine Engineer — Trần Bá Đạt)  
> **Phạm vi quản lý:** Package `studio_engine`, Vòng lặp Interpreter, Các Node Executors, Cổng nối LLM & Embedding.

---

## 🎯 1. VAI TRÒ VÀ TRÁCH NHIỆM CHÍNH CỦA AIE-1
* Xây dựng động cơ duyệt đồ thị DAG (**Interpreter Engine**).
* Hiện thực hóa 6 loại node đóng (**Closed Node Types**): `kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`.
* Móc nối thuật toán trích dẫn trích đoạn **Citation Grounding** `[chunk_id]` trong câu trả lời LLM.
* Phát hiện và bắn sự kiện **Trace Emission Hook** (`TraceEvent`) cho từng node.

---

## 📂 2. BẢNG PHÂN LOẠI VÀ VỊ TRÍ LƯU TRỮ CÁC METHOD CHO AIE-1

| Nhóm chức năng của AIE-1 | Tên File / Đường dẫn chứa Method | Các hàm / method nhỏ tiêu biểu |
| :--- | :--- | :--- |
| **1. Động cơ Duyệt Đồ thị (Interpreter Loop)** | `packages/engine/src/studio_engine/interpreter.py` | • `run()` — Vòng lặp duyệt DAG 4 node và bắn `TraceEvent` qua `trace_writer` <br>• `RunResult` — Đóng gói kết quả chạy |
| **2. Thực thi Node Executor (Node Executions)** | `packages/engine/src/studio_engine/executors.py` | • `KbRetrieveExecutor.execute()` <br>• `LlmStepExecutor.execute()` — Chạy LLM & lọc Citation <br>• `ToolCallExecutor.execute()` <br>• `EndExecutor.execute()` |
| **3. Dispatcher Công cụ (Tool Dispatcher)** | `packages/engine/src/studio_engine/executors.py` | • `WhitelistToolDispatch.dispatch()` — Kiểm tra `tool_whitelist` |
| **4. Các Stubs Kiểm thử & LLM Mock** | `packages/engine/src/studio_engine/demo_stubs.py` | • `FixtureLLM` — LLM giả lập đọc fixture <br>• `EmptyEmbedding` — Mock embedding <br>• `EmptyKbSearch` |

---

## 🛠️ 3. MÓC NỐI GIAO THƯƠNG VỚI CÁC MẢNG KHÁC (SEAM CONTRACTS)
* **Nhận từ SWE**: Đối tượng `Recipe` (chứa `dag`, `agent_config`, `kb_binding`).
* **Nhận từ DE**: Dịch vụ `kb_search` và `trace_writer`.
* **Cung cấp cho AIE-2**: `RunResult` (gồm `final_state`, `events`) để AIE-2 đưa vào bộ kiểm định Smoke Runner.
