# 📑 HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC 1 NGÀY 3 & SỰ LIÊN KẾT D1 - D2 - D3 (SWE — THIỆU QUANG MINH)

---

## 🔗 PHẦN I: SỰ LIÊN KẾT LIỀN MẠCH TỪ NGÀY 1 ➔ NGÀY 2 ➔ NGÀY 3

Nếu chưa hình dung được sự kết nối giữa các ngày, bạn hãy nhìn vào bức tranh tổng thể như việc **xây dựng một chiếc Ô tô AI**:

```
[ NGÀY 1: Học & Phân công ] ──► [ NGÀY 2: Vẽ thiết kế & Dựng khung ] ──► [ NGÀY 3: Lắp mạch & Cho xe chạy thử ]
  • Bạn giữ mảng Vỏ xe & Bàn điều khiển (Workbench/Form).          • Bạn vẽ bản thiết kế v0 (Recipe Contract).                    • Người dùng bấm nút trên Form (Bàn điều khiển).
  • AIE-1 giữ Động cơ (Interpreter).                              • AIE-1 dựng vỏ Động cơ rỗng.                                  • Form sinh ra Recipe ➔ Nắm dây ném vào Động cơ (Wiring).
  • DE giữ Bình xăng/Bộ lọc (KB/Data).                            • DE dựng cấu trúc kho dữ liệu.                                • Chạy thử 3 nấc: Lấy xăng ➔ Nổ máy ➔ Bật đèn (3 Nodes)!
```

### 📍 1. Ngày 1 (D1) — Nhận vị trí & Thấu hiểu Ranh giới
- **Bạn làm gì?**: Nhận mảng **Workbench / Recipe** và nắm chắc nguyên lý:
  - **Engine (Động cơ):** Là phần code lõi chạy ngầm dưới backend (do AIE-1, DE, AIE-2 viết) — xây 1 lần không đổi.
  - **Recipe (Công thức):** Là file cấu hình do người dùng tạo ra từ giao diện của bạn (SWE) — thay đổi tùy thích mà không cần sửa 1 dòng code lõi nào.
- **Mối liên kết**: Ngày 1 giúp định hình: *"Tôi là SWE, tôi là người làm ra giao diện để người dùng tạo ra bản Recipe"*.

### 📍 2. Ngày 2 (D2) — Vẽ Hiến pháp Contract v0 & Dựng Bộ khung (Scaffold)
- **Bạn làm gì?**: 
  - Khai báo bản mẫu **Contract #1 (`recipe.py`)** v0 — định nghĩa một `Recipe` gồm những trường gì (`agent_id`, `instructions`, `model`, `tool_whitelist`, `dag`).
  - Dựng 4 file rỗng ở backend: `validator.py`, `publish.py`, `tenant_wall.py`, `schema.py`.
- **Mối liên kết**: Ngày 2 tạo ra **"Khuôn mẫu"** và **"Đường ống rỗng"**. Lúc này chưa có dữ liệu nào chạy qua, mọi hàm đều ném lỗi `NotImplementedError`.

### 📍 3. Ngày 3 (D3) — XÂU KIM LẦN ĐẦU (WIRING & CHẠY THÔNG LUỒNG) 🌟
- **Mối liên kết bùng nổ ở Ngày 3**:
  - D2 bạn đã tạo khuôn `Recipe`.
  - **Hôm nay (D3)**: Bạn nối dây (**Wiring**)! 
  - Bạn tạo **Form nhập liệu** ➔ Điền dữ liệu ➔ Xuất ra đúng object `recipe.agent_config` ➔ **Ném object này vào Cổng vào (`entry`) của Động cơ Interpreter (do AIE-1 viết)**.
  - Lần đầu tiên, dữ liệu chảy thông qua 3 mảng: **Form (SWE) ➔ Recipe ➔ Interpreter (AIE-1)**!

---

## 🎯 PHẦN II: TỔNG QUAN NHIỆM VỤ NGÀY 3 CỦA SWE

> **Đề bài của bạn:**
> * **Bút form tạo agent** ➔ xuất `recipe.agent_config`
> * **Wiring** `recipe` ➔ `interpreter` entry

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC 1 LÀM NGÀY 3

---

### 📌 BƯỚC 1: XÂY DỰNG HÀM XUẤT `agent_config` ĐÚNG SHAPE V0 TỪ FORM

#### 🎯 Mục tiêu:
Viết logic (hoặc helper function) ở tầng Workbench để nhận thông tin thô do người dùng nhập từ giao diện (Prompt, Model, Tool Whitelist) và đóng gói lại thành đối tượng **`AgentConfig`** theo đúng chuẩn Contract v0.

#### 🛠️ Các thao tác thực hiện:
1. Mở file Contract `packages/contracts/src/studio_contracts/recipe.py` lên xem lại lớp `AgentConfig`:
   ```python
   class AgentConfig(BaseModel):
       instructions: str
       model: str
       tool_whitelist: list[str]
   ```
2. Tại gói `packages/workbench/src/studio_workbench/`, tạo/viết hàm chuyển đổi dữ liệu Form:
   ```python
   from studio_contracts import AgentConfig

   def build_agent_config(instructions: str, model: str, tool_whitelist: list[str]) -> AgentConfig:
       """Tạo đối tượng AgentConfig chuẩn từ dữ liệu Form nhập vào."""
       return AgentConfig(
           instructions=instructions,
           model=model,
           tool_whitelist=tool_whitelist
       )
   ```
3. **Kiểm tra (Self-check)**: Thử truyền thiếu 1 trường (ví dụ quên truyền `instructions`) xem Pydantic có ném lỗi validation báo thiếu trường hay không. Nếu Pydantic báo lỗi là code của bạn đã kiểm soát kiểu dữ liệu chuẩn!

---

### 📌 BƯỚC 2: ĐÓNG GÓI SLOW-WALK RECIPE VỚI 3 NODES (`kb-retrieve ➔ llm-step ➔ tool-call`)

#### 🎯 Mục tiêu:
Đóng gói một đối tượng `Recipe` mẫu hoàn chỉnh chứa đúng 3 node chạy tuần tự để làm dữ liệu thử nghiệm cho luồng "xâu kim".

#### 🛠️ Các thao tác thực hiện:
Tạo một file test hoặc helper tạo Recipe với cấu hình 3 Node:
```python
from studio_contracts import (
    Recipe, AgentConfig, Dag, Node, Edge, NodeType, KbBinding, ScorecardThreshold
)

def create_d3_sample_recipe() -> Recipe:
    # 1. Khởi tạo agent_config từ Bước 1
    config = build_agent_config(
        instructions="Hãy trả lời thắc mắc từ tài liệu Callisto.",
        model="gemini-2.5-flash",
        tool_whitelist=["kb_search"]
    )

    # 2. Định nghĩa 3 Node chạy tuần tự + Node Kết thúc (END)
    nodes = [
        Node(id="n1", type=NodeType.KB_RETRIEVE, params={"query": "Callisto policy"}),
        Node(id="n2", type=NodeType.LLM_STEP, params={"temperature": 0.0}),
        Node(id="n3", type=NodeType.TOOL_CALL, params={"tool": "kb_search"}),
        Node(id="n4", type=NodeType.END, params={})
    ]

    # 3. Nối các mũi tên (Edges) theo thứ tự: n1 -> n2 -> n3 -> n4
    edges = [
        Edge(from_="n1", to="n2"),
        Edge(from_="n2", to="n3"),
        Edge(from_="n3", to="n4")
    ]

    # 4. Đóng gói thành đối tượng Recipe v0 hoàn chỉnh
    return Recipe(
        agent_id="agent-d3-demo",
        tenant="ankor",
        agent_config=config,
        dag=Dag(nodes=nodes, edges=edges),
        kb_binding=KbBinding(kb_id="kb-callisto", scope="public"),
        golden_set_ref="golden-set-1",
        scorecard_threshold=ScorecardThreshold(success=0.9, citation_accuracy=0.95)
    )
```

---

### 📌 BƯỚC 3: WIRING (NỐI DÂY) RECIPE SANG DÒNG CHẠY CỦA INTERPRETER

#### 🎯 Mục tiêu:
Lấy đối tượng `Recipe` từ Bước 2 chuyền tay (Wire) vào hàm `run()` của `studio_engine.interpreter` (do AIE-1 phụ trách) để cho chạy thử nghiệm luồng từ Form ➔ Engine.

#### 🛠️ Các thao tác thực hiện:
1. Mở file `packages/engine/src/studio_engine/interpreter.py` để soi signature hàm `run`:
   ```python
   async def run(recipe: Recipe, *, trace_writer: TraceWriter) -> RunResult:
   ```
2. Trong script chạy thử xâu kim Ngày 3, bạn viết đoạn code nối 2 mảng lại với nhau:
   ```python
   import asyncio
   from studio_engine.interpreter import run

   async def test_wiring_d3():
       # a. Lấy Recipe từ Workbench (Form)
       recipe = create_d3_sample_recipe()

       # b. Nối (Wire) Recipe này sang Interpreter của Engine
       result = await run(recipe, trace_writer=mock_trace_writer)

       # c. In ra biến state / result cuối cùng để nghiệm thu
       print("=== KẾT QUẢ XÂU KIM NGÀY 3 ===")
       print("Run ID:", result.run_id)
       print("Events:", result.events)

   # asyncio.run(test_wiring_d3())
   ```

---

### 📌 BƯỚC 4: VIẾT DOCSTRING MÔ TẢ INPUT / OUTPUT CHO CÁC HÀM EXECUTOR

#### 🎯 Mục tiêu:
Mọi hàm xử lý/executor do bạn viết trong Ngày 3 phải có Docstring chuẩn Python giải thích rõ ràng tham số nhận vào (`Input`) và kết quả trả về (`Output`).

#### 🛠️ Các thao tác thực hiện:
Bổ sung comment Docstring theo chuẩn Google Style:
```python
def process_form_to_recipe(form_payload: dict) -> Recipe:
    """Chuyển đổi payload dữ liệu từ Form UI thành đối tượng Recipe chuẩn.

    Args:
        form_payload (dict): Dictionary chứa các ô nhập từ Form UI 
            (gồm instructions, model, tool_whitelist, nodes, edges).

    Returns:
        Recipe: Đối tượng Recipe đã được kiểm tra tính hợp lệ qua Pydantic schema v0.

    Raises:
        ValueError: Nếu thông tin Form không đúng định dạng hoặc thiếu dữ liệu bắt buộc.
    """
    # Code xử lý bên trong...
```

---

### 📌 BƯỚC 5: REVIEW PULL REQUEST CỦA DE & TẠO DAILY NOTE D3

#### 🎯 Mục tiêu:
Hoàn tất 2 tiêu chí làm việc nhóm cuối cùng trong ngày.

#### 🛠️ Các thao tác thực hiện:
1. **Duyệt PR của DE**: 
   - Mở giao diện Git (GitHub/GitLab).
   - Vào mục Pull Requests, mở PR: `Day 1 — DE (Nguyễn Đông Anh) — Teach-back KB pipeline`.
   - Xem qua nội dung thay đổi và bấm nút **Approve (Duyệt)**.
2. **Tạo Daily-Note D3**:
   - Mở thư mục `docs/03_NhiemVuTungNgay_SWE/`.
   - Tạo file mới tên là `D03-report-SWE-ThieuQuangMinh.md` với nội dung tóm tắt:
     - ✅ *Đã hoàn thành*: Viết hàm xuất `agent_config` đúng shape v0, wiring thành công `Recipe` sang `Interpreter` qua 3 node (`kb-retrieve -> llm-step -> tool-call`), viết đầy đủ Docstring.
     - 🤝 *Đã review PR*: Duyệt PR Day 1 cho Nguyễn Đông Anh (DE).
     - 🚀 *Kế hoạch Ngày 4*: Tiếp tục hoàn thiện bộ kiểm định `validator.py`.

---

## 📋 PHẦN IV: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) NGÀY 3

- [ ] **Bước 1**: Viết xong hàm xuất `agent_config` đúng shape `Recipe v0`.
- [ ] **Bước 2**: Đóng gói thành công `Recipe` mẫu chứa 3 node (`kb-retrieve -> llm-step -> tool-call`).
- [ ] **Bước 3**: Gọi hàm `run(recipe)` nối từ Workbench sang Interpreter, in ra `state` cuối.
- [ ] **Bước 4**: Thêm Docstring chú thích Input/Output cho các hàm helper.
- [ ] **Bước 5**: Duyệt PR Day 1 của DE + Push file `D03-report-SWE-ThieuQuangMinh.md`.
