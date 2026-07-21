# 🛠️ HƯỚNG DẪN LẬP TRÌNH CHI TIẾT NGÀY 3 TRONG 2 SUBMODULE `workbench` & `apps/web` (SWE)

---

## 🎯 I. XÁC NHẬN RANH GIỚI VÀ QUYỀN HẠN CỦA SWE (THIỆU QUANG MINH)

1. **2 Submodules thuộc quyền sở hữu của bạn (SWE):**
   - 📂 **`packages/workbench/`** *(Repo `agentcore-studio-workbench`)*: Code Backend Workbench (Python).
   - 📂 **`apps/web/`** *(Repo `agentcore-studio-web`)*: Code Frontend Web (React/TypeScript).

2. **Quy tắc Commit & Push:**
   - Mọi dòng code bạn viết hay chỉnh sửa sẽ **commit và push trực tiếp tại 2 submodule này**.
   - **Ranh giới an toàn:** Bạn **tuyệt đối không sửa code** trong `packages/kb` (DE), `packages/engine` (AIE-1), hay `packages/evalhub` (AIE-2).

---

## 🚀 II. HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN NGÀY 3

---

### 📍 BƯỚC 1: VIẾT LOGIC FORM XUẤT `agent_config` TRONG `packages/workbench/`

Mở submodule `packages/workbench/`. Tại thư mục `packages/workbench/src/studio_workbench/`:

1. Tạo file mới `packages/workbench/src/studio_workbench/builder.py`.
2. Viết hàm chuyển đổi dữ liệu nhập từ Form thành đối tượng `AgentConfig` đúng chuẩn contract v0:

```python
# Vị trí file: packages/workbench/src/studio_workbench/builder.py

from studio_contracts import AgentConfig, Recipe, Dag, Node, Edge, NodeType, KbBinding, ScorecardThreshold

def build_agent_config(instructions: str, model: str, tool_whitelist: list[str]) -> AgentConfig:
    """Đóng gói các trường từ Form thành đối tượng AgentConfig chuẩn Pydantic.

    Args:
        instructions (str): Prompt dặn dò AI.
        model (str): Tên mô hình AI (ví dụ: 'gemini-2.5-flash').
        tool_whitelist (list[str]): Danh sách tên các tool được cấp phép.

    Returns:
        AgentConfig: Đối tượng AgentConfig đã được validate.
    """
    return AgentConfig(
        instructions=instructions,
        model=model,
        tool_whitelist=tool_whitelist
    )
```

---

### 📍 BƯỚC 2: TẠO HÀM DỰNG RECIPE MẪU CÓ 3 NODES (`kb-retrieve ➔ llm-step ➔ tool-call`)

Vẫn trong file `packages/workbench/src/studio_workbench/builder.py`, viết hàm tạo ra 1 bản `Recipe` thử nghiệm chứa đúng 3 node chạy theo chuỗi:

```python
def create_sample_recipe_d3() -> Recipe:
    """Tạo bản Recipe thử nghiệm Ngày 3 chứa 3 node: kb-retrieve -> llm-step -> tool-call.

    Returns:
        Recipe: Bản Recipe hoàn chỉnh đúng chuẩn v0.
    """
    # 1. Khởi tạo agent_config từ Bước 1
    config = build_agent_config(
        instructions="Tra cứu tri thức Callisto và trả lời người dùng.",
        model="gemini-2.5-flash",
        tool_whitelist=["kb_search"]
    )

    # 2. Tạo 3 Nodes đúng thứ tự + Node Kết thúc (END)
    nodes = [
        Node(id="node_1", type=NodeType.KB_RETRIEVE, params={"query": "Callisto policy"}),
        Node(id="node_2", type=NodeType.LLM_STEP, params={"temperature": 0.0}),
        Node(id="node_3", type=NodeType.TOOL_CALL, params={"tool": "kb_search"}),
        Node(id="node_4", type=NodeType.END, params={})
    ]

    # 3. Nối các Edges từ node_1 -> node_2 -> node_3 -> node_4
    edges = [
        Edge(from_="node_1", to="node_2"),
        Edge(from_="node_2", to="node_3"),
        Edge(from_="node_3", to="node_4")
    ]

    # 4. Gom thành đối tượng Recipe
    return Recipe(
        agent_id="agent_demo_d3",
        tenant="ankor",
        agent_config=config,
        dag=Dag(nodes=nodes, edges=edges),
        kb_binding=KbBinding(kb_id="kb_callisto", scope="public"),
        golden_set_ref="golden_set_1",
        scorecard_threshold=ScorecardThreshold(success=0.9, citation_accuracy=0.95)
    )
```

---

### 📍 BƯỚC 3: WIRING (NỐI DÂY) TRONG WORKBENCH SANG INTERPRETER (ENGINE)

Để nghiệm thu luồng "Xâu Kim" Ngày 3, bạn viết 1 script thử nghiệm tại `packages/workbench/tests/test_wiring_d3.py`:

1. Gọi hàm `create_sample_recipe_d3()` ở Bước 2 để lấy `Recipe`.
2. Import hàm `run` từ `studio_engine.interpreter` (chú ý: **chỉ import và gọi hàm `run`**, tuyệt đối không sửa code bên trong `studio_engine`).
3. Chạy thử nghiệm để kiểm tra dữ liệu chảy từ `Recipe` của bạn sang `Interpreter`:

```python
# Vị trí file: packages/workbench/tests/test_wiring_d3.py

import asyncio
import pytest
from studio_workbench.builder import create_sample_recipe_d3
from studio_engine.interpreter import run

@pytest.mark.asyncio
async def test_wiring_recipe_to_interpreter():
    """Kiểm tra xâu kim: Nối Recipe từ Workbench sang Interpreter entry."""
    # a. Lấy Recipe từ Workbench
    recipe = create_sample_recipe_d3()
    
    # b. Kiểm tra shape agent_config xuất ra từ Form
    assert recipe.agent_config.instructions == "Tra cứu tri thức Callisto và trả lời người dùng."
    assert recipe.agent_config.model == "gemini-2.5-flash"
    assert "kb_search" in recipe.agent_config.tool_whitelist

    # c. Nối Recipe truyền vào Interpreter entry point
    with pytest.raises(NotImplementedError):
        await run(recipe, trace_writer=None)
```

---

### 📍 BƯỚC 4: DỰNG FORM TRÊN FRONTEND WEB (`apps/web/`)

Chuyển sang submodule **`apps/web/`**, mở file `apps/web/src/App.tsx`:

1. Thiết kế các ô nhập liệu cho Form:
   - Input nhập `instructions` (Prompt dặn AI).
   - Dropdown chọn `model` (ví dụ: `gemini-2.5-flash`, `gpt-4o-mini`).
   - Checklist chọn `tool_whitelist`.
2. Khi bấm nút **"Generate Recipe"** trên UI React, Form sẽ gom các state lại thành đúng JSON shape của `AgentConfig`.

---

### 📍 BƯỚC 5: KIỂM TRA VÀ PUSH CODE LÊN GIT

1. Chạy bài test trong submodule Workbench:
   ```powershell
   cd packages/workbench
   uv run pytest
   ```
2. Commit và Push code tại **2 repo submodule của bạn**:
   ```powershell
   # 1. Commit & Push Workbench Backend
   cd packages/workbench
   git add .
   git commit -m "feat(workbench): add agent_config builder and wire recipe to interpreter for D3"
   git push origin main

   # 2. Commit & Push Web Frontend
   cd ../../apps/web
   git add .
   git commit -m "feat(web): add agent_config form fields for D3"
   git push origin main
   ```
