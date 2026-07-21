# 🎓 BẢN GIẢNG DẠY & HƯỚNG DẪN CHI TIẾT DÀNH CHO SWE (THIỆU QUANG MINH)

---

## 🏛️ I. TỔNG QUAN DỰ ÁN & VỊ TRÍ CỦA BẠN TRONG NHÓM

### 1. Dự án AgentCore Studio là gì?
**AgentCore Studio** là một nền tảng **Mini-Studio (Low-Code/No-Code AI Agent Authoring Tool)** giúp người dùng thiết kế, thử nghiệm, đánh giá và quản lý vòng đời của các AI Agent mà **không cần viết code lõi**.

### 2. Mô hình Monorepo & Phân công nhiệm vụ
Dự án tổ chức theo dạng `uv` workspace với **1 repository cha và 7 submodules**. Nhóm 4 người được chia quyền sở hữu rất rõ ràng (theo nguyên tắc không phụ thuộc chéo):

| Thư mục | Submodule / Package | Người sở hữu (Owner) | Nhiệm vụ chính |
| :--- | :--- | :--- | :--- |
| 📂 `packages/workbench` | `studio_workbench` | 👑 **SWE — Thiệu Quang Minh (Bạn)** | **Backend Workbench**: Kiểm định sơ đồ DAG, bảo mật Tenant Wall, luồng Publish/Rollback, DB schema `wb.*`. |
| 📂 `apps/web` | *(React 19 / Vite)* | 👑 **SWE — Thiệu Quang Minh (Bạn)** | **Frontend UI**: Form tạo Agent, Canvas kéo-thả 6 node (React Flow), Playground & Trace Timeline. |
| 📂 `packages/contracts` | `studio_contracts` | Mentor / Shared | Tầng Hợp đồng chung (`Recipe`, `TraceEvent`, `Scorecard`, `NodeType`). **Bạn giữ bút Contract #1 (`Recipe`)**. |
| 📂 `packages/engine` | `studio_engine` | AIE-1 (Trần Bá Đạt) | Động cơ chạy (Interpreter) đọc và thực thi 6 loại Node. |
| 📂 `packages/kb` | `studio_kb` | DE (Nguyễn Đông Anh) | Kho tri thức KB, Chunking, Embedding, PostgreSQL RLS. |
| 📂 `packages/evalhub` | `studio_evalhub` | AIE-2 (Lưu Tiến Duy) | Trọng tài chấm điểm EvalHub, LLM Judge, tính `Scorecard`. |
| 📂 `apps/studio` | `studio_app` | Mentor | Composition Root: Server FastAPI kết nối 4 xưởng lại với nhau. |

---

## 📜 II. HỢP ĐỒNG BẠN GIỮ BÚT: CONTRACT #1 (`Recipe Schema`)

Bạn là người **"Giữ Bút"** cho **Contract #1: Recipe Schema** tại file [recipe.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/contracts/src/studio_contracts/recipe.py).

`Recipe` là cấu hình khai báo duy nhất biểu diễn một AI Agent, gồm các thành phần cốt lõi:
1. `agent_id: str`: Tên / Định danh Agent.
2. `tenant: str`: Mã công ty/khách hàng sở hữu Agent.
3. `agent_config`:
   - `instructions: str`: Câu lệnh Prompt dặn dò gốc.
   - `model: str`: Mô hình AI (ví dụ: `gemini-2.5-flash` hoặc `gpt-4o-mini`).
   - `tool_whitelist: list[str]`: Danh sách các Tool mà Agent này được phép gọi.
4. `dag`: Cấu trúc đồ thị gồm danh sách `nodes` và `edges`.
5. `kb_binding`: Liên kết tới kho tài liệu tri thức (`kb_id`, `scope`).
6. `golden_set_ref` & `scorecard_threshold`: Bộ test mẫu và ngưỡng điểm phát hành.

> ⚠️ **Quy tắc đóng băng hợp đồng (Contract Freeze & Mini-RFC):** 
> Sau khi hợp đồng bị đóng băng (Freeze), bạn **không được tự ý sửa file `recipe.py` một mình**. Nếu cần thêm/bớt trường, bạn phải viết 1 bản **Mini-RFC**, xin đủ **4/4 chữ ký của thành viên nhóm + 1 chữ ký Mentor** mới được merge code.

---

## 💻 III. CHI TIẾT CỤ THỂ 4 FILE BACKEND BẠN PHẢI CODE (`packages/workbench`)

Tại thư mục [packages/workbench/src/studio_workbench](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/src/studio_workbench), bạn cần hiện thực 4 file sau:

```
packages/workbench/src/studio_workbench/
├── validator.py     <-- 🚨 Lớp bảo vệ Lớp 2: Kiểm định 4 luật Graph Linting
├── tenant_wall.py   <-- 🛡️ Lớp bảo vệ Lớp 1: Giải mã Tenant ID từ Session (Chống IDOR)
├── publish.py       <-- 🔄 Lớp bảo vệ Lớp 6: Luồng Publish có Eval-Gate & Auto Rollback
└── schema.py        <-- 🗄️ DDL Database bảng wb.recipes & wb.recipe_versions
```

---

### 📄 File 1: [validator.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/src/studio_workbench/validator.py)
* **Hàm cần viết:** `graph_lint(recipe: Recipe) -> None`
* **Nhiệm vụ:** Đảm bảo sơ đồ workflow của người dùng thiết kế phải hợp lệ trước khi cho phép chạy hoặc phát hành.
* **4 Luật BẮT BUỘC phải cài đặt (Nếu vi phạm thì `raise ValueError`):**

| Luật | Tên Luật | Logic Kiểm Tra | Thông báo lỗi bắt buộc (`match`) |
| :---: | :--- | :--- | :--- |
| **1** | **6 Node Đóng (Palette Cap)** | Duyệt qua `recipe.dag.nodes`, đảm bảo mọi `node.type` chỉ nằm trong 6 loại: `kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`. | `raise ValueError("Invalid NodeType ...")` |
| **2** | **Chống Lặp Vô Tận (No Cycle)** | Dùng thuật toán duyệt đồ thị (DFS hoặc Kahn's Algorithm / Topological Sort) kiểm tra xem DAG (`nodes` + `edges`) có bị lặp vòng tròn (Node A ➔ Node B ➔ Node A) hay không. | `raise ValueError("Forbidden cycle detected ...")` |
| **3** | **Đường Nối Hợp Lệ (No Dangling Edge)** | Duyệt qua `recipe.dag.edges`, kiểm tra `edge.to` phải trỏ tới một `node.id` thực sự có trong danh sách `nodes`. | `raise ValueError("Edge has unresolvable destination ...")` |
| **4** | **Danh Sách Trắng Tool (Tool Whitelist)** | Với các node có `type == NodeType.TOOL_CALL`, kiểm tra tên tool trong `node.params["tool"]` phải nằm trong `recipe.agent_config.tool_whitelist`. | `raise ValueError("Tool not in tool_whitelist ...")` |

* 🧪 **Bài test tương ứng để kiểm tra:** [test_graph_lint.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/tests/test_graph_lint.py). Khi bạn code đúng 4 luật này, bài test sẽ từ màu đỏ (`xfail`) chuyển sang xanh lá (`PASS`).

---

### 📄 File 2: [tenant_wall.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/src/studio_workbench/tenant_wall.py)
* **Hàm cần viết:** `resolve_tenant(session: object) -> str`
* **Nhiệm vụ:** Lớp bảo mật Lớp 1 (Tenant Wall). Giải mã danh tính công ty (`tenant_id`) từ Session/JWT Token ở phái Server-side.
* **Quy tắc An ninh tối thượng:** 
  - **TUYỆT ĐỐI KHÔNG TIN** `tenant_id` do Client/Browser truyền lên qua URL Param, Query, hay Body.
  - Hacker có thể sửa URL từ `/api/tenantA/agent` thành `/api/tenantB/agent` (Lỗ hổng **T1 IDOR - Insecure Direct Object Reference**).
  - Bạn phải tự giải mã `JWT Token` thông qua chìa khóa bí mật `STUDIO_SECRET_KEY` lấy từ `apps/studio/.env` để tìm ra `tenant_id` thực sự của người dùng đang đăng nhập.

---

### 📄 File 3: [publish.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/src/studio_workbench/publish.py)
* **Hàm cần viết:** 
  1. `publish(recipe: Recipe, scorecard: Scorecard) -> None`
  2. `rollback(agent_id: str, tenant: str, *, to_version: int) -> None`

* **Luồng chạy chi tiết của `publish()`:**
  ```
  [Bấm Publish] ──► 1. Chạy graph_lint(recipe) (Lỗi ➔ Dừng ngay)
                           │
                    2. Đọc scorecard.gate.verdict từ AIE-2
                           │
            ┌──────────────┴──────────────┐
            ▼                             ▼
     verdict == "PASS"             verdict == "FAIL"
            │                             │
  - Ghi Recipe vào wb.recipes    - KHÓA NÚT PUBLISH!
  - Thêm bản ghi vào             - Tự động gọi rollback()
    wb.recipe_versions             khôi phục bản cũ.
  - Báo thành công UI.           - Trả lỗi báo đỏ về UI.
  ```

* **Luồng chạy chi tiết của `rollback()`:**
  Executing câu lệnh SQL đè bản cũ từ bảng lịch sử `wb.recipe_versions` lại bảng hiện hành `wb.recipes`:
  ```sql
  UPDATE wb.recipes
  SET recipe = v1.recipe, version = v1.version, status = 'rolled_back'
  FROM wb.recipe_versions v1
  WHERE wb.recipes.agent_id = :agent_id 
    AND wb.recipes.tenant = :tenant 
    AND v1.version = :to_version;
  ```

---

### 📄 File 4: [schema.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/src/studio_workbench/schema.py)
* **Nhiệm vụ:** Định nghĩa DDL Database cho quadrant `wb.*`.
* **Đã có sẵn cấu trúc DDL:**
  - Bảng `wb.recipes`: Chứa thông tin Agent hiện hành (`agent_id`, `tenant`, `recipe JSONB`, `version`, `status`).
  - Bảng `wb.recipe_versions`: Chứa lịch sử tất cả các phiên bản đã từng Publish (phục vụ cho việc Rollback).
* **Nhiệm vụ của bạn:** Hiểu cấu trúc này để phục vụ viết SQL truy vấn trong file `publish.py`.

---

## 🎨 IV. CHI TIẾT CỤ THỂ NHỮNG GÌ BẠN PHẢI CODE Ở FRONTEND (`apps/web`)

Thư mục Web đặt tại [apps/web](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/apps/web). Công nghệ sử dụng: **React 19 + TypeScript + Vite + React Flow**.

Bạn có nhiệm vụ phát triển giao diện người dùng từ file khung [App.tsx](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/apps/web/src/App.tsx) thành 3 màn hình/chức năng chính:

### 1. Form Tạo Agent (Form Field & Recipe Builder)
Cung cấp Form nhập liệu cho người dùng:
- Ô gõ tên Agent (`agent_id`).
- Dropdown/Input chọn Tenant (`tenant`).
- Ô nhập Prompt dặn dò (`instructions`).
- Dropdown chọn AI Model (`model`).
- Checklist tích chọn Tool được cấp phép (`tool_whitelist`).
- Dropdown chọn Kho tài liệu KB (`kb_binding`).
👉 *Khi điền xong Form ➔ Hệ thống tự động đóng gói sinh ra file `Recipe JSON`.*

### 2. Canvas Kéo-Thả 6 Node Palette (React Flow)
- Cho phép kéo 6 loại khối từ danh sách bên trái thả vào màn hình:
  1. `kb-retrieve` (Truy vấn tài liệu)
  2. `llm-step` (Bước xử lý AI)
  3. `condition` (Rẽ nhánh điều kiện)
  4. `tool-call` (Gọi công cụ)
  5. `hitl-pause` (Tạm dừng chờ người duyệt)
  6. `end` (Kết thúc)
- Cho phép nối các mũi tên (Edges) giữa các Node.
- Khi người dùng nối sai (ví dụ: tạo vòng lặp), UI hiển thị thông báo lỗi từ `graph_lint`.

### 3. Playground & Trace Timeline (Màn hình Chạy thử & Xem Chi phí)
- Nút **Run / Playground** để chạy thử Agent.
- **Trace Timeline**: Hiển thị dòng thời gian chạy qua từng node, đo chính xác:
  - Token tiêu tốn (Prompt token / Completion token).
  - Chi phí tài chính ($).
  - Thời gian phản hồi (Latency ms).
- **Giao diện Duyệt HITL**: Khi tiến trình gặp node `hitl-pause`, Canvas hiển thị trạng thái `PAUSED` cùng 2 nút bấm cho con người: **[Approve / Duyệt]** hoặc **[Reject / Từ chối]**.

---

## 🛡️ V. 6 LỚP BẢO MẬT VSF — CÁC LỚP THUỘC TRÁCH NHIỆM CỦA BẠN

Trong tổng số 6 Lớp Bảo vệ (Defense-in-Depth) của dự án, bạn chịu trách nhiệm chính ở **4 lớp**:

```
[ Hacker / User Request ]
         │
         ▼
 🛡️ LỚP 1: Tenant Wall Middleware (👑 SWE) ──► Chặn kẻ gian không token (401/403)
         │
         ▼
 🛡️ LỚP 2: Palette Cap & Graph Lint (👑 SWE) ──► Chặn sơ đồ độc / lặp vô tận (ValidationError)
         │
         ▼
 🛡️ LỚP 3: Tool Whitelist (👑 SWE & AIE-1) ────► Chặn gọi Tool nguy hiểm ngoài danh sách
         │
         ▼
 🛡️ LỚP 4: Postgres RLS Fence (DE) ─────────────► Chặn rò rỉ dữ liệu DB (leakage = 0)
         │
         ▼
 🛡️ LỚP 5: HITL Safety Pause (👑 SWE) ────────► Tạm dừng chờ người duyệt (PAUSED)
         │
         ▼
 🛡️ LỚP 6: Eval-Gate & Rollback (👑 SWE & AIE-2) ➔ Chặn bản kém chất lượng, auto Rollback
```

---

## 🛠️ VI. QUY TRÌNH LÀM VIỆC HÀNG NGÀY & LỆNH CHẠY LỰC LƯỢNG (GITFLOW & COMMANDS)

### 1. 3 Nguyên tắc làm việc nằm lòng
1. *"Mỏng-mà-thông > Dày-mà-đứt"*: Làm tính năng nào chắc tính năng đó, chạy thông luồng từ Frontend ➔ Backend ➔ DB trước khi làm giao diện cầu kỳ.
2. *"Code của bạn là hợp đồng người khác dùng"*: Giữ chuẩn signature các hàm trong `workbench` để AIE-1 và FastAPI `studio_app` gọi tới.
3. *"Chứng minh bằng test, không bằng lời"*: Tất cả code bạn viết phải được chứng minh bằng kết quả xanh lá (`PASS 100%`) trên pytest.

### 2. Bộ lệnh khởi động nhanh hàng ngày tại thư mục gốc `agentcore-studio-kit`

Mở Terminal/PowerShell tại thư mục `agentcore-studio-kit` và chạy:

```powershell
# 1. Cài đặt và đồng bộ môi trường Python cho toàn bộ monorepo
make setup       # tương đương: uv sync

# 2. Bật Database Postgres ngầm qua Docker
make dev         # tương đương: docker compose up -d

# 3. Chạy bài test kiểm định toàn bộ Workspace (Đặc biệt các bài test của Workbench)
make test        # tương đương: uv run pytest

# 4. Khởi động Frontend Web React
cd apps/web
npm run dev      # Mở trình duyệt tại http://localhost:5173
```

### 3. Nhật ký công việc (Daily Note)
Vào cuối mỗi ngày làm việc, bạn cần tạo file báo cáo tiến độ cá nhân (ví dụ: `D01-report-SWE-ThieuQuangMinh.md`, `D02-report-SWE-ThieuQuangMinh.md`) và commit push lên Git.

---

### 💡 Tóm tắt hành động tiếp theo cho Thiệu Quang Minh:
1. Mở file [validator.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/src/studio_workbench/validator.py) và cài đặt 4 luật của hàm `graph_lint()`.
2. Mở file [test_graph_lint.py](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/packages/workbench/tests/test_graph_lint.py) và chạy `uv run pytest` để xác nhận test chuyển sang màu xanh (`PASS`).
3. Tiếp tục hoàn thiện `tenant_wall.py` và `publish.py`.
4. Dựng Form và Canvas React Flow trên [apps/web/src/App.tsx](file:///c:/Users/thieu/Desktop/VinAI/Project/VSF/agentcore-studio-kit/apps/web/src/App.tsx).
