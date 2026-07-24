# 🎯 MÔ TẢ NHIỆM VỤ DAY 03 — SWE (THIỆU QUANG MINH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#12` (Parent Issue)
* **Tiêu đề**: `Day 3 — cả nhóm · Form tạo agent + interpreter 3-node hardcode, PR đầu tiên`
* **Vị trí**: Software Engineer (SWE — Lead tác giả Workflow)
* **Status**: Closed / Complete

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Dự thảo Contract #1 v0 (`recipe.v0.md`).
- Package `packages/workbench` đã được scaffold ở Day 2.

### 🔹 Deliverables / Output phải bàn giao:
1. Module `studio_workbench/recipe.py` sinh đối tượng Recipe JSON từ Form input.
2. Script `examples/generate_3node_recipe.py` tạo file `recipe.json` mẫu cho 3-node DAG.
3. Review và duyệt PR bài Teach-back Day 1 cho DE, AIE-1, AIE-2.
4. File Daily Note D3 (`agentcore-report/daily-notes/2026-07-22-Dozyboy.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Viết Code Sinh Recipe 3-Node Hardcode
Tạo file `packages/workbench/src/studio_workbench/recipe_builder.py`:

```python
"""
Module: studio_workbench.recipe_builder
Mục đích: Đóng gói AgentConfig và 3-Node DAG thành Recipe JSON.
"""
from studio_workbench.recipe import AgentConfig, RecipeDAG, RecipeNode

def build_3node_recipe(agent_name: str, tenant_id: str) -> RecipeDAG:
    config = AgentConfig(
        agent_id=f"agent-{tenant_id}-001",
        name=agent_name,
        description="Agent hỗ trợ tri thức Callisto",
        instructions="Hãy trả lời dựa trên thông tin tri thức được truy xuất.",
        model="gpt-4o",
        tenant_id=tenant_id,
        kb_scope=["public", "hr"],
        tool_whitelist=["kb_search"]
    )
    
    nodes = [
        RecipeNode(id="node_1", type="kb-retrieve", params={"top_k": 3}, next_node="node_2"),
        RecipeNode(id="node_2", type="llm-step", params={"temperature": 0.7}, next_node="node_3"),
        RecipeNode(id="node_3", type="end", params={}, next_node=None)
    ]
    
    return RecipeDAG(agent_config=config, nodes=nodes, start_node_id="node_1")
```

---

### 📌 Bước 2: Tích hợp Graph Validator (`graph_validator.py`)
Viết thuật toán kiểm tra chu trình:

```python
def validate_dag(recipe: RecipeDAG) -> bool:
    """Kiểm tra đồ thị DAG không chứa vòng lặp vô hạn."""
    visited = set()
    node_map = {n.id: n for n in recipe.nodes}
    
    curr = recipe.start_node_id
    while curr:
        if curr in visited:
            raise ValueError(f"Graph cycle detected at node: {curr}")
        visited.add(curr)
        curr = node_map[curr].next_node if curr in node_map else None
        
    return True
```

---

### 📌 Bước 3: Review PR & Push Daily Note D3
- Duyệt PR bài Teach-back của 3 bạn trong nhóm trên GitHub.
- Push Daily Note D3:
```bash
git add packages/workbench/
git commit -m "feat(workbench): implement 3-node recipe builder and graph validator"
git push origin feature/day-03-swe
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Sinh thành công file `recipe.json` 3-node DAG từ builder.
- [ ] Graph Validator kiểm tra thành công chu trình đồ thị.
- [ ] Duyệt xong PR bài Teach-back cho các thành viên.
- [ ] Push file Daily Note D3 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #12 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 03 (SWE — Thiệu Quang Minh)

Chào Mentor và cả nhóm, mình đã hoàn thành phần công việc trên Issue **#12**:

#### 🟢 Các mục đã hoàn thành:
- [x] **Recipe Builder**: Viết xong `recipe_builder.py` đóng gói Form input thành 3-node DAG JSON.
- [x] **Graph Lint**: Cài đặt `graph_validator.py` kiểm tra chu trình và node cô lập.
- [x] **PR Review**: Đã review và merge PR bài Teach-back cho DE, AIE-1, AIE-2.
- [x] **Daily Note**: Push file Daily Note D3 `2026-07-22-Dozyboy.md`.

CC: @hieubui2409 (Mentor) / @group
```
