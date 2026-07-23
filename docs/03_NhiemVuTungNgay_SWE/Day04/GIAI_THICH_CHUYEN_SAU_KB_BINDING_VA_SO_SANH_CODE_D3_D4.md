# 📘 GIẢI THÍCH CHUYÊN SÂU VỀ KB BINDING, QUYỀN HẠN ROLE VÀ SO SÁNH CODE BÀI 3 VS BÀI 4

---

## ❓ PHẦN I: GIẢI THÍCH BẢN CHẤT CỦA `KB_BINDING` VÀ CƠ CHẾ TRUYỀN DỮ LIỆU TỪ GIAO DIỆN

Bạn thắc mắc một câu rất hay và thực tế:  
> *"Tôi tưởng cái `kb_binding` này phải biết Role là ai thì mới biết `kb_id` và `scope` là gì chứ? Thông số đầu vào này truyền kiểu gì, giao diện có truyền được không?"*

Dưới đây là lời giải thích chi tiết hai tầng xử lý của hệ thống:

---

### 1.1 Giao diện (Form UI Workbench) CÓ TRUYỀN ĐƯỢC KHÔNG?

👉 **GIAO DIỆN TRUYỀN ĐƯỢC 100%!**

Khi Admin hoặc Developer mở giao diện **Workbench Web UI** để tạo ra một con AI Agent (ví dụ: *"Agent Hỗ trợ Nội bộ Công ty Ankor"*):
1. **Dropdown 1 - Chọn Kho tri thức (`kb_id`)**: Người dùng bấm chọn từ danh sách kho tài liệu đã được tải lên (ví dụ: `kb-callisto-v1`, `kb-hr-policies`).
2. **Dropdown 2 hoặc Radio Button - Chọn Phạm vi (`scope`)**: Người dùng chọn phạm vi truy cập dữ liệu (ví dụ: `tenant-ankor`, `tenant-ankor/public`, `public`).

Khi bấm nút **Save / Create Agent**, Form UI sẽ thu thập các giá trị này và truyền vào hàm Workbench Builder:

```python
# Dữ liệu từ các ô nhập trên Form UI truyền vào:
recipe = create_recipe_d4(
    agent_id="agent-callisto-01",
    tenant="ankor",
    instructions="Hỗ trợ tra cứu quy định Callisto",
    model="gemini-2.5-flash",
    kb_id="kb-callisto-v1",        # Chọn từ Dropdown Kho tri thức
    scope="tenant-ankor",          # Chọn từ Dropdown Phạm vi Tenant
    tool_whitelist=["kb_search"]
)
```

---

### 1.2 Mối quan hệ giữa `kb_binding` (Trong Recipe) và `Role / Tenant` (Của Người dùng thật)

Để hệ thống an toàn tuyệt đối, dự án chia làm **2 Hạn mức kiểm soát (2-Tier Security Barrier)**:

```
┌───────────────────────────────────────────────────────────┐
│ HẠN MỨC 1: Cấu hình Agent (KbBinding trong Recipe)       │
│ • Do Admin/Developer gán cố định khi tạo Agent trên UI.   │
│ • Quy định: "Con Agent này TỐI ĐA chỉ được đọc kho X      │
│   thuộc Scope Y".                                         │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│ HẠN MỨC 2: Quyền hạn Người dùng thật (User Session Role) │
│ • Do hệ thống Auth xác thực khi người dùng đặt câu hỏi.  │
│ • Quy định: "User A thuộc Tenant Z, có Role R".           │
└─────────────────────────────┬─────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│ LỚP BẢO VỆ 1: TENANT WALL GUARD (Fail-Closed)            │
│  Kiểm tra:                                                │
│  FinalScope = Agent_KbBinding.scope ∩ User_Session.tenant │
│                                                           │
│  • Nếu Hợp lệ ➔ Cho phép gọi `kb.search`                  │
│  • Nếu Khác Tenant ➔ Chặn đứng & Trả về `[]` rỗng!       │
└───────────────────────────────────────────────────────────┘
```

* **Ví dụ thực tế**:
  - Admin tạo Agent trên UI và gán `kb_binding = {kb_id: "kb-callisto-v1", scope: "tenant-ankor"}`.
  - Khi **User A** (thuộc `tenant-ankor`) gửi câu hỏi ➔ Hợp lệ! Agent tra cứu tài liệu `kb-callisto-v1` và trả lời.
  - Khi **User B** (thuộc `tenant-borea`) cố tình gửi câu hỏi tới Agent này ➔ **Lớp 1 Tenant Wall** phát hiện `scope` của Agent (`tenant-ankor`) không khớp với Tenant của User B (`tenant-borea`). Hệ thống lập tức chặn lại và trả về kết quả rỗng `[]`, không để rò rỉ dữ liệu chéo!

---

## 📊 PHẦN II: SO SÁNH CHI TIẾT CODE BÀI 03 VS BÀI 04 (SUBMODULE WORKBENCH)

Sau khi tái cấu trúc submodule `studio_workbench`, code được phân chia rõ ràng thành `builder_d3.py` và `builder_d4.py`:

---

### 2.1 Bảng Đối Chiếu Sự Khác Biệt Giữa Code Bài 3 và Bài 4

| Tiêu chí | Bài 03 (`builder_d3.py`) | Bài 04 (`builder_d4.py` — Issue #18) |
| :--- | :--- | :--- |
| **Mục tiêu chính** | Dựng luồng **Walking Skeleton 3-Node** cơ bản chạy thông qua Cổng Engine. | Nâng cấp Agent thành **KB-Grounded Agent** phân quyền theo **Tenant Scope**. |
| **Hàm tạo Recipe** | `create_sample_recipe_d3()` | `create_recipe_d4(kb_id=..., scope=...)` |
| **Thuộc tính `kb_binding`** | Gán cứng dữ liệu mẫu thử nghiệm: `KbBinding(kb_id="kb_callisto", scope="public")`. | Tiếp nhận tham số động từ Form UI: `KbBinding(kb_id=kb_id, scope=scope)`. |
| **Ngưỡng Scorecard** | `ScorecardThreshold(success=0.9, citation_accuracy=0.95)` thử nghiệm. | Tích hợp phục vụ AIE-2 chấm điểm **Citation Accuracy** trên 5 dòng CLI. |
| **Mục đích Wiring** | Chứng minh Recipe vượt qua được lớp validate và chạm tới cổng `interpreter.run()`. | Truyền `kb_binding` sang `interpreter` để AIE-1 trích `kb_id` và `scope` gọi API `kb.search` của DE. |

---

### 2.2 So sánh Chi tiết Snippet Code giữa 2 Bài

#### 🔹 Code Bài 03 ([`src/studio_workbench/builder_d3.py`](file:///c:/Users/thuym/Desktop/Today/agentcore-studio-kit/packages/workbench/src/studio_workbench/builder_d3.py)):
```python
def create_sample_recipe_d3() -> Recipe:
    config = build_agent_config(
        instructions="Hãy tra cứu tài liệu Callisto và trả lời thắc mắc của người dùng.",
        model="gemini-2.5-flash",
        tool_whitelist=["kb_search"],
    )

    nodes = [
        Node(id="node_1", type=NodeType.KB_RETRIEVE, params={"query": "Callisto policy"}),
        Node(id="node_2", type=NodeType.LLM_STEP, params={"temperature": 0.0}),
        Node(id="node_3", type=NodeType.TOOL_CALL, params={"tool": "kb_search"}),
        Node(id="node_4", type=NodeType.END, params={}),
    ]

    edges = [
        Edge(from_="node_1", to="node_2"),
        Edge(from_="node_2", to="node_3"),
        Edge(from_="node_3", to="node_4"),
    ]

    return Recipe(
        agent_id="agent_demo_d3",
        tenant="ankor",
        agent_config=config,
        dag=Dag(nodes=nodes, edges=edges),
        kb_binding=KbBinding(kb_id="kb_callisto", scope="public"), # Hardcode tĩnh
        golden_set_ref="golden_set_1",
        scorecard_threshold=ScorecardThreshold(success=0.9, citation_accuracy=0.95),
    )
```

#### 🔹 Code Bài 04 ([`src/studio_workbench/builder_d4.py`](file:///c:/Users/thuym/Desktop/Today/agentcore-studio-kit/packages/workbench/src/studio_workbench/builder_d4.py)):
```python
def create_recipe_d4(
    agent_id: str = "agent-callisto-d4",
    tenant: str = "ankor",
    instructions: str = "Tra cứu quy trình và bảo mật Callisto.",
    model: str = "gemini-2.5-flash",
    kb_id: str = "kb-callisto-v1",        # <--- Tham số động từ Form UI
    scope: str = "ankor/public",          # <--- Tham số động từ Form UI
    tool_whitelist: list[str] | None = None,
) -> Recipe:
    if tool_whitelist is None:
        tool_whitelist = ["kb_search"]

    config = build_agent_config(
        instructions=instructions,
        model=model,
        tool_whitelist=tool_whitelist,
    )

    # Đóng gói KbBinding linh hoạt theo Tenant Scope
    kb_bind = KbBinding(
        kb_id=kb_id,
        scope=scope,
    )

    nodes = [
        Node(id="n1", type=NodeType.KB_RETRIEVE, params={"query": "Callisto security policy"}),
        Node(id="n2", type=NodeType.LLM_STEP, params={"temperature": 0.0}),
        Node(id="n3", type=NodeType.TOOL_CALL, params={"tool": "kb_search"}),
        Node(id="n4", type=NodeType.END, params={}),
    ]

    edges = [
        Edge(from_="n1", to="n2"),
        Edge(from_="n2", to="n3"),
        Edge(from_="n3", to="n4"),
    ]

    return Recipe(
        agent_id=agent_id,
        tenant=tenant,
        agent_config=config,
        dag=Dag(nodes=nodes, edges=edges),
        kb_binding=kb_bind,                # <--- Gán KbBinding động
        golden_set_ref="golden-set-d4-callisto",
        scorecard_threshold=ScorecardThreshold(success=0.9, citation_accuracy=0.95),
    )
```

---

## 🎯 TỔNG KẾT
1. **Giao diện Workbench** có nhiệm vụ thu thập `kb_id` và `scope` do Admin chọn để đóng gói vào `Recipe.kb_binding`.
2. **Engine Backend** khi thực thi sẽ lấy `kb_binding` này đối chiếu với **User Session Tenant** để đảm bảo không vi phạm **Lớp 1 Tenant Wall**.
3. Bài 4 đã giúp SWE hoàn thiện mảnh ghép đóng gói `kb_binding` động, đưa Agent lên nấc tri thức thực tế an toàn!
