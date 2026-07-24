# 📖 BÀI GIẢNG CHI TIẾT DAY 04 — SWE: FROZEN CONTRACT #1, KB BINDING & TENANT-WALL

> **Vị trí phụ trách**: Software Engineer (SWE — Thiệu Quang Minh)  
> **Chủ đề chính**: Đóng băng Contract #1 Pydantic, Gắn KB Scope Binding, Bảo mật Tenant-Wall (`INV-1`), và Dynamic Graph Validation  
> **Mục tiêu**: Hoàn thiện toàn bộ logic quản lý Recipe và xác thực bảo mật ở tầng Workbench trước khi Agent bước vào cổng đánh giá Eval-Gate.

---

## 🔒 1. QUY TẮC BẢO MẬT INV-1 TENANT-WALL (BỨC TƯỜNG NEUTRAL)

Lỗi bảo mật nghiêm trọng nhất ở tầng Workbench là tin tưởng trực tiếp tham số `tenant_id` truyền từ giao diện Client (React Web).

### Nguyên lý INV-1 Tenant-Wall:
```
[ Client / Web Browser ] ─── (Chỉ gửi Session Token) ───> [ Server / Workbench ]
                                                                   │
                                                                   ▼
                                                     Giải mã token ra tenant_id
                                                     Ép buộc gán tenant_id vào Recipe
```

- **Cấm**: `GET /api/recipe?tenant=borea` (Client tự chọn tenant).
- **Chuẩn (INV-1)**: Client gửi Header `Authorization: Bearer <session_token>`. Server giải mã token $\rightarrow$ Lấy `tenant_id = 'ankor'` $\rightarrow$ Bắt buộc gán `tenant_id = 'ankor'` vào `AgentConfig`.

---

## 📚 2. TÍCH HỢP KB SCOPE BINDING VÀ PROMPT TEMPLATING

Trong Ngày 4, Workbench hỗ trợ người dùng gắn các tập tri thức (KB Scopes) vào Agent:

### Cấu hình KB Scope trong Recipe:
```python
class KbScopeBinding(BaseModel):
    kb_id: str                   # Mã bộ tri thức Callisto
    tenant_id: str               # Tenant sở hữu
    allowed_sections: list[str]  # Danh sách section roles (hr, public,...)
    top_k_default: int = 3
```

Khi node `kb-retrieve` thực thi, Engine sẽ lấy đúng `allowed_sections` cấu hình trong Recipe để truyền sang hàm `kb.search` của DE.

---

## ❄️ 3. ĐÓNG BẰNG CONTRACT #1 (FROZEN PYDANTIC CONTRACTS)

SWE cập nhật mã nguồn Pydantic frozen trong `packages/contracts/src/studio_contracts/recipe.py`:

```python
from pydantic import BaseModel, Field

class AgentConfig(BaseModel):
    agent_id: str
    name: str
    description: str
    instructions: str
    model: str
    tenant_id: str
    kb_scope: list[str] = Field(default_factory=list)
    tool_whitelist: list[str] = Field(default_factory=list)

class RecipeNode(BaseModel):
    id: str
    type: str
    params: dict = Field(default_factory=dict)
    next_node: str | None = None

class RecipeDAG(BaseModel):
    version: str = "1.0"
    agent_config: AgentConfig
    nodes: list[RecipeNode]
    start_node_id: str
```
