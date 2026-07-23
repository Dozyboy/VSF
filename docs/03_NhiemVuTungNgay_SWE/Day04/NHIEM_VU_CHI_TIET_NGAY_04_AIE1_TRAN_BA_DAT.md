# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ DAY 04 — AIE-1 (TRẦN BÁ ĐẠT)

---

## 🚘 THÔNG TIN CHUNG VỀ ISSUE DAY 04 (AIE-1)
* **Issue ID**: `#17`
* **Tiêu đề**: `Day 4 — AIE-1 (Trần Bá Đạt) — kb-retrieve executor nối kb.search thật của DE (bỏ stub rỗng)`
* **Parent Issue**: `Day 4 — cả nhóm · KB stub 5 doc + kb.search thô + smoke-eval bảng điểm`
* **Assignee**: Trần Bá Đạt (`TranBaDat2607`)
* **Role**: AIE-1 (AI Engineer 1 — Phụ trách Engine Interpreter & Node Executors)
* **Labels**: `day-04`, `role:aie-1`
* **Milestone**: `Sprint 1 — Gate Day 10`

---

## 🎯 PHẦN I: TÓM TẮT MỤC TIÊU CỦA AIE-1 TRONG NGÀY 04

Trong 3 ngày đầu, Node `kb-retrieve` trong Engine `studio_engine.interpreter` mới chỉ là **Stub rỗng** (trả về lỗi `NotImplementedError` hoặc dữ liệu giả lập).

Nhiệm vụ cốt tử của **AIE-1 (Trần Bá Đạt)** trong Ngày 4 gồm 2 công việc chính:
1. **Viết `kb-retrieve` Executor thật**: Loại bỏ hoàn toàn Stub rỗng, nối trực tiếp node `kb-retrieve` với hàm `kb.search` do DE (Nguyễn Đông Anh) phát triển, đồng thời đọc đúng `kb_binding.{kb_id, scope}` do SWE (Thiệu Quang Minh) đóng gói từ Recipe.
2. **Node `llm-step` trích xuất `chunk_id` vào Citation**: Đưa các trích dẫn trả về từ `kb.search` vào Prompt cho LLM và trích xuất danh sách `chunk_id` lưu vào thuộc tính trích dẫn (`citation`) để AIE-2 chấm điểm.

---

## 🔗 PHẦN II: SỰ PHỐI HỢP GIỮA AIE-1 VỚI SWE, DE VÀ AIE-2

```
┌───────────────────────────────────────────────────────────┐
│                    SWE (THIỆU QUANG MINH)                 │
│  • Đóng gói Recipe chứa kb_binding.{kb_id, scope}        │
└─────────────────────────────┬─────────────────────────────┘
                              │ Ném Recipe vào run()
                              ▼
┌───────────────────────────────────────────────────────────┐
│                    AIE-1 (TRẦN BÁ ĐẠT)                     │
│  1. Đọc recipe.kb_binding.{kb_id, scope}                 │
│  2. Chạy `kb-retrieve` Executor ➔ Gọi kb.search thật     │
│  3. Chạy `llm-step` Executor ➔ Trích chunk_id citation    │
└──────────────┬─────────────────────────────┬──────────────┘
               │ Gọi API kb.search           │ Trả kết quả Citation
               ▼                             ▼
┌──────────────────────────────┐ ┌──────────────────────────┐
│      DE (NGUYỄN ĐÔNG ANH)    │ │    AIE-2 (LƯU TIẾN DUY)  │
│  Trả về danh sách trích dẫn  │ │  Chấm điểm Citation      │
│  có chứa `chunk_id`          │ │  in Bảng điểm 5 dòng CLI │
└──────────────────────────────┘ └──────────────────────────┘
```

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN DÀNH CHO AIE-1

---

### 📌 BƯỚC 1: ĐỌC `kb_binding` TỪ RECIPE VÀ VIẾT `KB_RETRIEVE` EXECUTOR THẬT

#### 🎯 Mục tiêu:
Mở file `packages/engine/src/studio_engine/executors/kb_retrieve.py` (hoặc trong `interpreter.py`) và viết logic gọi `kb.search` thật từ gói `studio_kb` của DE.

#### 🛠️ Code minh họa Executor cho AIE-1:
```python
"""
Module: studio_engine.executors.kb_retrieve
Tác giả: AIE-1 (Trần Bá Đạt)
Mục đích: Thực thi Node KB_RETRIEVE bằng cách kết nối với hàm kb.search thật của DE.
"""

from studio_contracts import Recipe, Node
from studio_kb import search as kb_search  # Hàm do DE (Nguyễn Đông Anh) phát triển


async def execute_kb_retrieve_node(node: Node, recipe: Recipe, state: dict) -> dict:
    """Thực thi Node KB_RETRIEVE.

    Args:
        node (Node): Node hiện tại đang chạy.
        recipe (Recipe): Đối tượng Recipe chứa thông tin kb_binding.
        state (dict): Trạng thái bộ nhớ của lần chạy (Run Context).

    Returns:
        dict: Trạng thái cập nhật chứa danh sách retrieved_chunks có chunk_id.
    """
    # 1. Trích xuất câu truy vấn query từ node params hoặc state
    query = node.params.get("query") or state.get("user_query", "")

    # 2. Lấy thông tin kb_id và scope từ recipe.kb_binding (SWE khai báo)
    if not recipe.kb_binding:
        raise ValueError("Lỗi Security Lớp 1: Recipe thiếu khai báo kb_binding!")

    kb_id = recipe.kb_binding.kb_id
    scope = recipe.kb_binding.scope

    # 3. Gọi hàm search thật của DE (Nguyễn Đông Anh)
    search_results = await kb_search(
        query=query,
        kb_id=kb_id,
        scope=scope,
        top_k=node.params.get("top_k", 3)
    )

    # 4. Lưu kết quả trích dẫn (bao gồm chunk_id) vào state để Node llm-step tiêu thụ
    state["retrieved_chunks"] = search_results
    return state
```

---

### 📌 BƯỚC 2: CẬP NHẬT NODE `LLM-STEP` TRÍCH XUẤT `CHUNK_ID` VÀO CITATION

#### 🎯 Mục tiêu:
Trong `packages/engine/src/studio_engine/executors/llm_step.py`, lấy danh sách `retrieved_chunks` từ Bước 1, đưa vào Prompt cho LLM và trích xuất thuộc tính `citations` chứa các `chunk_id` thực sự được tham chiếu.

#### 🛠️ Code minh họa cho Node `llm-step`:
```python
"""
Module: studio_engine.executors.llm_step
Tác giả: AIE-1 (Trần Bá Đạt)
Mục đích: Đưa tri thức tra cứu vào LLM Prompt và ghi nhận trích dẫn chunk_id.
"""

async def execute_llm_step_node(node: Node, recipe: Recipe, state: dict) -> dict:
    retrieved_chunks = state.get("retrieved_chunks", [])
    
    # 1. Xây dựng context từ các chunks thu thập được
    context_text = "\n".join([
        f"[{chunk['chunk_id']}] {chunk['content']}" 
        for chunk in retrieved_chunks
    ])

    # 2. Trích xuất danh sách các chunk_id đã được trích dẫn
    cited_chunk_ids = [chunk["chunk_id"] for chunk in retrieved_chunks]

    # 3. Giả lập/Gọi LLM sinh ra câu trả lời đi kèm citation
    response_text = f"Dựa trên tài liệu Callisto, câu trả lời là... (Nguồn trích dẫn: {', '.join(cited_chunk_ids)})"

    # 4. Ghi nhận thông tin citation vào kết quả state
    state["final_output"] = response_text
    state["citations"] = cited_chunk_ids  # AIE-2 sẽ đọc thuộc tính này để chấm điểm!
    
    return state
```

---

### 📌 BƯỚC 3: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) CỦA AIE-1

- [ ] **DoD 1**: Bỏ Stub rỗng, hoàn thiện `kb-retrieve` executor gọi hàm `kb.search` thật của DE.
- [ ] **DoD 2**: Trích xuất đúng `kb_id` và `scope` từ `recipe.kb_binding` của SWE.
- [ ] **DoD 3**: Cập nhật `llm-step` trích xuất `chunk_id` đầy đủ vào biến `citations`.
- [ ] **DoD 4**: Phối hợp cùng SWE, DE, AIE-2 chạy 5 test cases Callisto synthetic NDA clean.
- [ ] **DoD 5**: Đảm bảo bài test Smoke-Eval in ra Bảng điểm 5 dòng trên CLI đạt 100% PASS.
- [ ] **DoD 6**: Đẩy file Daily Note D4 của AIE-1 (`2026-07-23-TranBaDat.md`).

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #17 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 04 (AIE-1 — Trần Bá Đạt)

Chào Mentor và cả nhóm, mình đã hoàn thành xong nhiệm vụ trên Issue **#17**:

#### 🟢 Các mục đã hoàn thành:
- [x] **KB Retrieve Executor**: Xóa bỏ Stub rỗng, nối thành công node `kb-retrieve` với API `kb.search` thật của DE (@Nguyễn Đông Anh).
- [x] **Wiring đọc KB Binding**: Đọc chính xác `kb_id` và `scope` từ `recipe.kb_binding` do SWE (@Thiệu Quang Minh) truyền vào.
- [x] **Citation Extraction**: Node `llm-step` đã trích xuất danh sách `chunk_id` vào thuộc tính `citations` thành công.
- [x] **Smoke Evaluation**: Phối hợp cùng AIE-2 (@Lưu Tiến Duy) chạy 5 test case Callisto synthetic và in Bảng điểm CLI 5 dòng đạt 5/5 PASSED.
- [x] **Daily Note**: Đã tạo và push file Daily Note `2026-07-23-TranBaDat.md`.

CC: @hieubui2049 (Mentor) / @group
```
