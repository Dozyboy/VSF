# 📘 BÀI GIẢNG TOÀN TẬP: KIẾN THỨC NỀN TẢNG & KIẾN TRÚC HỆ THỐNG NGÀY 01 (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 🏛️ CHƯƠNG 1: TỔNG QUAN HỆ THỐNG AGENTCORE STUDIO & VAI TRÒ SWE

### 1.1 AgentCore Studio là gì?
**AgentCore Studio** là một nền tảng (Platform) cấp Doanh nghiệp giúp xây dựng, thử nghiệm, đánh giá và vận hành các **AI Agent** tự động dựa trên kiến trúc Đa người dùng (Multi-tenant) và Bảo mật đa lớp (Defense-in-Depth).

Hệ thống được chia làm 4 mảng chính (**4 Quadrants**), tương ứng với 4 Kỹ sư phụ trách:
1. 📂 `packages/kb` (DE — Nguyễn Đông Anh): Quản lý Pipeline dữ liệu tri thức (`ingest` ➔ `chunk` ➔ `embed` ➔ `index`) và tìm kiếm Vector (`kb.search`).
2. 📂 `packages/engine` (AIE-1 — Trần Bá Đạt): Bộ máy thực thi Động cơ (`studio_engine.interpreter`), vòng lặp xử lý các Node và gọi LLM.
3. 📂 `packages/evalhub` (AIE-2 — Lưu Tiến Duy): Bộ kiểm định chất lượng (`EvalHarness`), LLM Judge và xuất Bảng điểm chất lượng (`Scorecard`).
4. 👑 📂 `packages/workbench` + `apps/web` (SWE — Thiệu Quang Minh): **Bộ công cụ Workbench & Web UI** — nơi thiết kế Form tạo Agent, kiểm định sơ đồ DAG (`graph_lint`), bảo vệ Tenant Wall, điều khiển luồng Publish/Rollback.

---

### 1.2 Tư duy cốt lõi: Engine (Động cơ) vs. Recipe (Công thức)

Là một SWE, tư duy kiến trúc quan trọng nhất bạn cần khắc sâu là sự phân định tuyệt đối giữa **Engine** và **Recipe**:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TẦNG WORKBENCH (SWE)                            │
│  Người dùng nhập Form / Kéo thả UI  ──► Biến thành File RECIPE (JSON)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Nối dây / Wiring)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         TẦNG ENGINE (AIE-1)                            │
│  Nhận RECIPE ──► Interpreter thực thi 6 loại Node ──► Trả kết quả      │
└────────────────────────────────────────────────────────────────────────┘
```

* **Engine (Động cơ backend):** Xây dựng 1 lần cố định ở tầng backend. Engine không quan tâm nghiệp vụ cụ thể của từng khách hàng, nó chỉ biết đọc file `Recipe` và chạy các node.
* **Recipe (Công thức khai báo):** Là đối tượng cấu hình (JSON/Pydantic Model) do người dùng tạo ra từ giao diện Form/Canvas của SWE. Khi thay đổi prompt, thay đổi mô hình LLM, hay thêm bớt công cụ, người dùng chỉ cần tạo 1 Recipe mới mà **không được phép sửa 1 dòng code backend nào**.

---

## 📜 CHƯƠNG 2: HIẾN PHÁP CONTRACT #1 — RECIPE SCHEMA (DO SWE GIỮ BÚT)

### 2.1 Cấu trúc chuẩn của một `Recipe` v0
Cấu trúc một `Recipe` được định nghĩa chuẩn tại `studio_contracts.recipe`:

```python
class Recipe(BaseModel):
    agent_id: str                   # Định danh duy nhất của Agent
    tenant: str                     # Tên doanh nghiệp/khách hàng sở hữu (ví dụ: 'ankor')
    agent_config: AgentConfig       # Cấu hình tham số Prompt/Model/Tools
    dag: Dag                        # Đồ thị sơ đồ các bước thực thi
    kb_binding: KbBinding           # Liên kết với Kho tri thức KB
    golden_set_ref: str             # Mã tham chiếu bộ dữ liệu kiểm định mẫu
    scorecard_threshold: ScorecardThreshold  # Ngưỡng điểm số tối thiểu để được Publish
```

---

### 2.2 Chi tiết cấu hình `AgentConfig` v0 (Giao diện Form nhập liệu)
Do SWE giữ bút khai báo tối thiểu gồm 3 trường:
```python
class AgentConfig(BaseModel):
    instructions: str               # Prompt dặn dò AI (System Prompt)
    model: str                      # Tên mô hình AI (ví dụ: 'gemini-2.5-flash', 'gpt-4o-mini')
    tool_whitelist: list[str]       # Danh sách tên các công cụ được phép gọi
```

---

### 2.3 Khóa cứng 6 NodeType trong Sơ đồ DAG (`Dag`)
Sơ đồ tiến trình (`Dag`) bao gồm danh sách các **`Node`** và các mũi tên nối **`Edge`**. 

Kiến trúc AgentCore Studio quy định **Khóa cứng đúng 6 loại Node (NodeType)**. Tuyệt đối không được thêm NodeType thứ 7 để tránh biến hệ thống thành một ngôn ngữ Turing-complete mất kiểm soát bảo mật:

| NodeType | Tên Node | Phụ trách chính | Chức năng |
| :--- | :--- | :--- | :--- |
| `kb-retrieve` | Truy vấn tri thức | DE / AIE-1 | Tìm kiếm thông tin liên quan từ kho Vector DB. |
| `llm-step` | Gọi LLM | AIE-1 | Ném Prompt + Context vào LLM để sinh câu trả lời. |
| `condition` | Rẽ nhánh điều kiện | AIE-1 / SWE | Đánh giá điều kiện để rẽ nhánh mũi tên tiếp theo. |
| `tool-call` | Thực thi Tool | AIE-1 / SWE | Gọi các hàm/tool trong danh sách `tool_whitelist`. |
| `hitl-pause` | Tạm dừng Human-in-the-loop | SWE / AIE-1 | Tạm dừng tiến trình chờ con người phê duyệt bấm nút. |
| `end` | Kết thúc | AIE-1 | Đánh dấu điểm dừng cuối cùng của tiến trình. |

---

## 🛡️ CHƯƠNG 3: CAM NĂNG 6 LỚP BẢO MẬT (DEFENSE-IN-DEPTH)

Hệ thống AgentCore Studio được bảo vệ bởi 6 lớp rào chắn an ninh. Trong đó SWE chịu trách nhiệm chính ở **Lớp 1, Lớp 2 và Lớp 5**:

```
[Khách hàng API/Web]
        │
        ▼
 🛡️ LỚP 1: Tenant Wall Middleware (SWE) ➔ Chặn người dùng khác Tenant (401/403)
        │
        ▼
 🛡️ LỚP 2: Graph Lint & Palette Cap (SWE) ➔ Khóa 6 Node, chặn vòng lặp kín DoS
        │
        ▼
 🛡️ LỚP 3: Tool Execution Whitelist (AIE-1) ➔ Bắt buộc Tool phải thuộc Whitelist
        │
        ▼
 🛡️ LỚP 4: Postgres RLS Fence (DE) ➔ Phân quyền dòng dữ liệu DB (Row Level Security)
        │
        ▼
 🛡️ LỚP 5: HITL Safety Pause (SWE) ➔ Tạm dừng chờ con người bấm duyệt hành động nguy hiểm
        │
        ▼
 🛡️ LỚP 6: Eval-Gate & Rollback (AIE-2 & SWE) ➔ Chấm điểm Scorecard trước khi Publish
```

### 🧠 Tóm tắt cơ chế 6 Lớp dành cho SWE:
1. **Tenant Wall (`tenant_wall.py`):** Kiểm tra Session Token / Header. Nếu Request từ Tenant A cố tình đọc Recipe của Tenant B ➔ Ném lỗi `403 Forbidden` ngay ở cổng vào Gateway.
2. **Graph Linting (`validator.py`):** Trước khi Recipe được cho chạy, SWE chạy hàm `graph_lint(recipe)`. Hàm này kiểm tra:
   - Tất cả Node có thuộc 6 NodeType hợp lệ không?
   - Đồ thị có bị vòng lặp vô tận (Cycle DoS) không?
   - Các Tool có nằm trong `tool_whitelist` không?
3. **HITL Pause:** Khi Agent chuẩn bị thực hiện hành động nhạy cảm (như chuyển tiền, xóa DB), Node `hitl-pause` sẽ đổi trạng thái state thành `PAUSED` và đợi SWE render nút bấm trên UI để con người Phê duyệt (Approve) mới chạy tiếp.

---

## 📐 CHƯƠNG 4: NGUYÊN TẮC SDLC, PAVED-PATH & WALKING SKELETON

### 4.1 Triết lý Walking-Skeleton (Luồng sống 8 bước A-Z)
Trong phát triển phần mềm Agile/Scrum, **Walking Skeleton** là một bản triển khai tối thiểu từ đầu đến cuối nhưng **chạy thông suốt 100%**.
- Dù tính năng chưa đẹp, chưa hoàn thiện full 100%, nhưng luồng dữ liệu từ **Form UI (SWE) ➔ Recipe ➔ Engine (AIE-1) ➔ DB (DE) ➔ Eval (AIE-2)** phải luôn thông suốt.

### 4.2 Thang cắt giảm tính năng 4 nấc (`DESCOPE.md`)
Khi gặp sự cố kỹ thuật hoặc trễ tiến độ, SWE tuân thủ thang cắt giảm tính năng để bảo vệ luồng Walking-Skeleton không bị gãy:

| Nấc | Thành phần | Trạng thái gốc (Target) | Trạng thái hạ cấp (Fallback) |
| :--- | :--- | :--- | :--- |
| **Nấc 1** | KB Pipeline | Vector Search thực tế | Stub Tĩnh trả về 5 tài liệu fixtures |
| **Nấc 2** | Workbench UI | Canvas Kéo-Thả React Flow | Form Nhập Liệu + Mermaid Diagram Preview |
| **Nấc 3** | Eval Scorer | LLM Judge tự động | Exact-match String Scorer |
| **Nấc 4** | Dashboard | Dashboard Web UI | Bảng in ra Terminal CLI |

---

## 🎯 TÓM TẮT THÔNG SỐ CẦN GHI NHỚ DÀNH CHO SWE

1. **Submodules thuộc quyền WRITE của bạn:** `packages/workbench` (Backend Python) và `apps/web` (Frontend React UI).
2. **File báo cáo Daily Note duy nhất:** `docs/reports/daily-notes/<YYYY-MM-DD>-Dozyboy.md`.
3. **Mục tiêu Ngày 3:** Viết `build_agent_config()`, tạo `create_sample_recipe_d3()` (3 node: `kb-retrieve -> llm-step -> tool-call -> end`) và wiring thành công sang `studio_engine.interpreter.run()`.
