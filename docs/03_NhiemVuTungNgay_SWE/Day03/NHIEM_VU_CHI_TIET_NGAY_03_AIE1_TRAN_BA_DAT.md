# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ DAY 03 — AIE-1 (TRẦN BÁ ĐẠT)

---

## 🚘 THÔNG TIN CHUNG VỀ ISSUE DAY 03 (AIE-1)
* **Issue ID**: Issue Day 3 (AIE-1)
* **Tiêu đề**: `Day 3 — AIE-1 (Trần Bá Đạt) — Bút interpreter 3-node hardcode + executor`
* **Parent Issue**: `Day 3 — cả nhóm · Form tạo agent + interpreter 3-node hardcode, PR đầu tiên`
* **Assignee**: Trần Bá Đạt (`TranBaDat2607`)
* **Role**: AIE-1 (AI Engineer 1 — Phụ trách Engine Interpreter & Node Executors)

---

## 🎯 PHẦN I: TÓM TẮT MỤC TIÊU CỦA AIE-1 TRONG NGÀY 03

Trong Ngày 03, **AIE-1 (Trần Bá Đạt)** chịu trách nhiệm dựng Cổng nổ máy và bộ điều hành chính của Engine:

1. **Bút `interpreter` 3-node hardcode**: Tạo hàm `run(recipe: Recipe, trace_writer: TraceWriter)` trong `packages/engine/src/studio_engine/interpreter.py` tiếp nhận `Recipe` từ **SWE (Thiệu Quang Minh)**.
2. **Dựng 3 Node Executor cơ bản**:
   - Node **`kb-retrieve`**: Gọi `kb.search` stub tạm trả rỗng từ DE (Nguyễn Đông Anh).
   - Node **`llm-step`**: Qua LLM stub fixture trả kết quả `{answer, tokens}`.
   - Node **`tool-call`**: Dispatch tool theo whitelist (`tool_whitelist`).

---

## 🔗 PHẦN II: SỰ PHỐI HỢP GIỮA AIE-1 VỚI SWE, DE VÀ AIE-2

```
                       ┌──────────────────────────────┐
                       │    SWE (THIỆU QUANG MINH)    │
                       │ Tạo Recipe 3-Node truyền     │
                       │ vào interpreter.run()        │
                       └──────────────┬───────────────┘
                                      │ Wiring Recipe
                                      ▼
                       ┌──────────────────────────────┐
                       │     AIE-1 (TRẦN BÁ ĐẠT)      │
                       │ Chạy tuần tự 3 node DAG:     │
                       │ kb-retrieve -> llm -> tool   │
                       └──────────────┬───────────────┘
                                      │
       ┌──────────────────────────────┴──────────────────────────────┐
       │ Gọi kb.search stub                                          │ Trả RunResult & Trace Events
       ▼                                                             ▼
┌──────────────────────────────┐                             ┌──────────────────────────────┐
│     DE (NGUYỄN ĐÔNG ANH)     │                             │     AIE-2 (LƯU TIẾN DUY)    │
│  Cấp kb.search signature     │                             │  Nhận RunResult để so sánh   │
└──────────────────────────────┘                             └──────────────────────────────┘
```

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN DÀNH CHO AIE-1

---

### 📌 BƯỚC 1: DỰNG HÀM `INTERPRETER.RUN` TIẾP NHẬN RECIPE

#### 🎯 Thao tác thực hiện trong `packages/engine/src/studio_engine/interpreter.py`:
```python
"""
Module: studio_engine.interpreter
Tác giả: AIE-1 (Trần Bá Đạt)
Mục đích: Dựng Cổng nổ máy Interpreter chạy chuỗi 3 Node DAG cho Ngày 3.
"""

from studio_contracts import Recipe
from studio_engine.types import RunResult


async def run(recipe: Recipe, *, trace_writer=None) -> RunResult:
    """Hàm chạy thực thi Recipe qua chuỗi 3 Node DAG.

    P7 Stub (Day 3): Ném lỗi NotImplementedError để SWE test bắt exception trong test_wiring_d3.py.
    """
    raise NotImplementedError("spec AIE-1: interpreter run() body")
```

---

### 📌 BƯỚC 2: VIẾT BỘ EXECUTORS CHO 3 NODE (`KB-RETRIEVE`, `LLM-STEP`, `TOOL-CALL`)

1. **`kb-retrieve` Executor**:
   - Gọi `kb.search(query)` từ package `studio_kb` của DE.
   - Ở Day 3, hàm này trả về kết quả stub rỗng `[]`.
2. **`llm-step` Executor**:
   - Nhận prompt và trả về dict giả lập `{ "answer": "Mẫu trả lời Callisto", "tokens": 150 }`.
3. **`tool-call` Executor**:
   - Kiểm tra xem tool được gọi có nằm trong `recipe.agent_config.tool_whitelist` hay không.

---

## 📋 PHẦN IV: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) CỦA AIE-1

- [ ] **DoD 1**: Dựng cấu trúc Interpreter 3-node hardcode tiếp nhận `Recipe` từ SWE.
- [ ] **DoD 2**: Viết 3 Node Executor (`kb-retrieve`, `llm-step`, `tool-call`) có Docstring Input/Output đầy đủ.
- [ ] **DoD 3**: Nối thành công với stub `kb.search` của DE.
- [ ] **DoD 4**: Nộp báo cáo Daily Note D3 (`2026-07-22-TranBaDat.md`).

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE DAY 03 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 03 (AIE-1 — Trần Bá Đạt)

Chào Mentor và cả nhóm, mình đã hoàn thành xong nhiệm vụ Day 03:

#### 🟢 Các mục đã hoàn thành:
- [x] **Interpreter 3-Node**: Dựng hàm entry `run(recipe)` tiếp nhận `Recipe` từ SWE (@Thiệu Quang Minh).
- [x] **3 Node Executors**: Viết xong 3 executor (`kb-retrieve`, `llm-step`, `tool-call`) có Docstring mô tả rõ Input/Output.
- [x] **Wiring với DE**: Nối thành công node `kb-retrieve` với `kb.search` signature của DE (@Nguyễn Đông Anh).
- [x] **Daily Note**: Push file Daily Note D3 `2026-07-22-TranBaDat.md`.

CC: @hieubui2049 (Mentor) / @group
```
