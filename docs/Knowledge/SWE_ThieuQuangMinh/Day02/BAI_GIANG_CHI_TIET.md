# 📖 BÀI GIẢNG CHI TIẾT DAY 02 — SWE: RECIPE CONTRACT V0 & WORKBENCH SCAFFOLDING

> **Vị trí phụ trách**: Software Engineer (SWE — Thiệu Quang Minh)  
> **Chủ đề chính**: Hợp đồng Schema Contract #1 (`recipe`), Scaffold Workbench, Form UI Wireframing, và `DESCOPE.md`  
> **Mục tiêu**: Giữ bút dự thảo Hợp đồng Recipe Contract #1 v0 quy định cấu hình AgentConfig và cấu trúc đồ thị Canvas DAG.

---

## 📜 1. ĐẦU VIỆC GIỮ BÚT (PEN OWNER) CONTRACT #1 RECIPE V0

SWE đóng vai trò **Giữ Bút (Pen Owner)** cho Hợp đồng Contract #1 (`recipe`), định nghĩa chuẩn giao tiếp cấu hình Agent giữa Workbench UI và Engine.

### Dự thảo `recipe.v0.md` (`packages/workbench/docs/contracts/recipe.v0.md`):

```python
class AgentConfig(BaseModel):
    agent_id: str             # Mã định danh duy nhất của Agent
    name: str                 # Tên hiển thị Agent
    description: str          # Mô tả nhiệm vụ
    instructions: str         # Prompt chỉ dẫn hệ thống (System Prompt)
    model: str                # Tên model LLM (vd: gpt-4o, claude-3-5-sonnet)
    tenant_id: str            # Mã định danh tenant sở hữu
    kb_scope: list[str]       # Danh sách KB Scope được phép truy xuất
    tool_whitelist: list[str] # Danh sách các Tool được cấp quyền

class RecipeNode(BaseModel):
    id: str                   # Node ID duy nhất (vd: node_1)
    type: str                 # 1 trong 6 loại node (kb-retrieve, llm-step,...)
    params: dict              # Tham số riêng của từng node
    next_node: str | None     # Node kế tiếp trong luồng thực thi

class RecipeDAG(BaseModel):
    version: str = "1.0"
    agent_config: AgentConfig
    nodes: list[RecipeNode]
    start_node_id: str
```

---

## 🏗️ 2. SCAFFOLDING PACKAGE `PACKAGES/WORKBENCH`

Scaffold cấu trúc Monorepo tiêu chuẩn cho mảng Workbench:

```
packages/workbench/
├── src/
│   └── studio_workbench/
│       ├── __init__.py
│       ├── recipe.py          # Class & Validator của Recipe
│       └── graph_validator.py # Thuật toán Graph Lint
├── tests/
│   └── test_recipe_lint.py
├── pyproject.toml
└── README.md
```

---

## 📉 3. THANG HẠ CẤP TÍNH NĂNG (DESCOPE LADDER) SWE

Thang hạ cấp 4 bậc dự phòng cho mảng Workbench & Web UI:

```
[Bậc 0: Full Canvas] Kéo thả React Flow Canvas linh hoạt + Form cấu hình node full
       │
       ▼ (Descope 1)
[Bậc 1: Dynamic Form] Điền Form chọn loại Node và nối Node ID
       │
       ▼ (Descope 2)
[Bậc 2: Mermaid Text Editor] Nhập sơ đồ Mermaid.js text biên dịch ra Recipe JSON
       │
       ▼ (Descope 3)
[Bậc 3: Hardcoded Recipe Generator] Sinh file recipe 3-node cố định sẵn
```
