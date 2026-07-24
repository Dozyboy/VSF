# 🎯 MÔ TẢ NHIỆM VỤ DAY 04 — AIE-1 (TRẦN BÁ ĐẠT)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#17`
* **Tiêu đề**: `Day 4 — AIE-1 (Trần Bá Đạt) — Cài đặt đủ 6 node executors, gọi KB thật & phát trace events`
* **Vị trí**: AI Engineer 1 (AIE-1)
* **Status**: Target Day 4

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Hợp đồng Contract #3 `trace-event` frozen từ DE.
- Hàm `kb.search` đọc DB thật từ DE.

### 🔹 Deliverables / Output phải bàn giao:
1. Module `studio_engine/executors/` chứa 6 Node Executors.
2. Hàm `emit_trace_event()` kết nối đẩy sự kiện sang bảng `trace_events` của DE.
3. Unit test suite `tests/test_executors.py` kiểm tra đủ 6 loại node handlers.
4. File Daily Note D4 (`agentcore-report/daily-notes/2026-07-23-TranBaDat2607.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Khai báo 6 Node Executors trong `packages/engine/src/studio_engine/executors/`
Tạo các file executor chuyên biệt:
- `kb_executor.py` (`kb-retrieve`)
- `llm_executor.py` (`llm-step`)
- `condition_executor.py` (`condition`)
- `tool_executor.py` (`tool-call`)
- `hitl_executor.py` (`hitl-pause`)
- `end_executor.py` (`end`)

---

### 📌 Bước 2: Tích hợp Emitting Trace Event
Viết module `studio_engine/trace_emitter.py` để khởi tạo và phát đối tượng `TraceEvent` cho mọi node execution.

---

### 📌 Bước 3: Viết Unit Test Kiểm Tra Đủ 6 Node Executors (`test_executors.py`)
Tạo test kiểm thử từng Node Executor:

```python
async def test_condition_node_execution():
    node = RecipeNode(id="n1", type="condition", params={"expression": "x > 5", "true_node": "n2", "false_node": "n3"})
    ctx = ExecutionContext(variables={"x": 10})
    
    executor = ConditionExecutor()
    updated_ctx = await executor.execute(node, ctx)
    assert node.next_node == "n2"
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Cài đặt thành công 6 Node Executors trong package `engine`.
- [ ] Tích hợp gọi `kb.search` thật của DE từ `kb-retrieve` node.
- [ ] Phát ra đúng 100% các sự kiện `TraceEvent` cho bảng Trace Sink.
- [ ] Test suite `test_executors.py` PASS xanh 100%.
- [ ] Push file Daily Note D4 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #17 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 04 (AIE-1 — Trần Bá Đạt)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#17**:

#### 🟢 Các mục đã bàn giao:
- [x] **6 Node Executors**: Cài đặt hoàn chỉnh bộ xử lý cho 6 node types (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`).
- [x] **Live KB Integration**: Đấu nối node `kb-retrieve` tới hàm `kb.search` dữ liệu thật của DE.
- [x] **Trace Emission**: Tự động phát ra đối tượng `TraceEvent` Pydantic model cho mọi bước thực thi.
- [x] **Unit Tests**: Test suite `test_executors.py` PASS 100%.

CC: @hieubui2409 (Mentor) / @group
```
