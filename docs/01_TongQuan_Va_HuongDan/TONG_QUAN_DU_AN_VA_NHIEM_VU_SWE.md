# 🌐 TỔNG QUAN DỰ ÁN AGENTCORE STUDIO & VAI TRÒ DÀNH CHO SWE (THIỆU QUANG MINH)

---

## I. TỔNG QUAN DỰ ÁN (`agentcore-studio-kit`)

**AgentCore Studio** là một nền tảng **Mini-Studio (Low-Code/No-Code AI Agent Authoring Tool)** giúp người dùng xây dựng, kiểm định, đánh giá và quản lý vòng đời AI Agents từ A đến Z mà không cần viết code lõi.

Quy trình hoạt động của một Agent qua hệ thống gồm **8 bước**:
1. **Form tạo agent**: Nhập tên, mô hình AI, câu lệnh hướng dẫn (instructions).
2. **Gắn Tool & Kho tài liệu (KB)**: Gán quyền gọi công cụ (whitelist) và truy vấn tri thức nội bộ.
3. **Canvas DAG 6-node**: Vẽ quy trình xử lý của AI bằng thao tác kéo-thả node.
4. **Test & Trace**: Chạy thử và xem timeline diễn biến (token, chi phí, latency).
5. **Kiểm chứng Hàng rào Bảo mật (Tenant-Fence Proof)**: Đảm bảo Tenant A không bao giờ đọc trộm được tài liệu của Tenant B (Leakage = 0).
6. **Chấm điểm & Khóa phát hành (Eval-Gate & Publish)**: Chạy bộ 30 bài test tự động. Nếu điểm đạt (`PASS`) thì mới cho phép bấm **Publish**.
7. **Tự động Rollback**: Nếu sửa hướng dẫn làm tụt điểm (`BLOCK`), hệ thống tự động chặn Publish và khôi phục phiên bản cũ (`Rollback`).
8. **Tạm dừng & Duyệt (HITL - Human In The Loop)**: Node `hitl-pause` cho phép tạm dừng tiến trình để con người bấm duyệt trước khi chạy tiếp.

---

## II. KIẾN TRÚC WORKSPACE & BẢN ĐỒ THÀNH PHẦN

Dự án được tổ chức theo mô hình **`uv` workspace (Monorepo gồm 1 repo cha + 7 submodules con)**:

| Path Submodule | Tên Package | Chủ sở hữu (Owner) | Vai trò & Nhiệm vụ chính |
|---|---|---|---|
| **(Thư mục gốc)** | `agentcore-studio-kit` | **Mentor** | Workspace root: Chứa `pyproject.toml`, `uv.lock`, Docker Compose, `Makefile`, CI/CD, ghim 7 submodules. |
| 📂 `packages/workbench` | `studio_workbench` | 👑 **SWE — Thiệu Quang Minh** | **Backend Workbench**: Kiểm định sơ đồ DAG (`validator.py`), Bảo mật Tenant Wall (`tenant_wall.py`), Luồng Publish/Rollback (`publish.py`), DB schema `wb.*`. |
| 📂 `apps/web` | *(React/Vite)* | 👑 **SWE — Thiệu Quang Minh** | **Frontend UI**: Giao diện React Flow kéo thả 6-node canvas, Form tạo Agent, màn hình Trace Timeline. *(Là dự án JS độc lập)*. |
| 📂 `packages/contracts` | `studio_contracts` | Mentor / Shared | **Tầng ĐÁY (Contracts)**: Định nghĩa dữ liệu chung (`Recipe`, `TraceEvent`, `KbSearchResultItem`, `Scorecard`, `NodeType`). |
| 📂 `packages/engine` | `studio_engine` | AIE-1 — Trần Bá Đạt | **Động cơ chạy (Interpreter)**: Trình thông dịch duyệt DAG và thực thi 6 loại node. |
| 📂 `packages/kb` | `studio_kb` | DE — Nguyễn Đông Anh | **Kho tri thức (KB Pipeline)**: Chunking, Embedding, Vector Search, Hàng rào PostgreSQL RLS. |
| 📂 `packages/evalhub` | `studio_evalhub` | AIE-2 — Lưu Tiến Duy | **Trọng tài chấm điểm (EvalHub)**: Chấm 30 bài test golden-case, LLM Judge, tính điểm `Scorecard`. |
| 📂 `apps/studio` | `studio_app` | Mentor | **Composition Root**: Server FastAPI gom 4 xưởng lại thành hệ thống hoàn chỉnh. |

---

## III. NGUYÊN TẮC KIẾN TRÚC CỐT LÕI (CẦN TUÂN THỦ)

1. **Đồ thị phụ thuộc 1 chiều (Dependency Inversion Principle - DIP):**
   * Các package `workbench`, `kb`, `engine`, `evalhub` **CHỈ ĐƯỢC import `studio_contracts`**.
   * **NGHIÊM CẤM import chéo nhau** (ví dụ: `workbench` không được import `kb` hay `engine`). Luật này được kiểm tra tự động bởi công cụ `.importlinter`.
   
2. **Hàng rào bảo mật Multi-Tenant (PostgreSQL RLS):**
   * Bảng dữ liệu `kb.chunks` sử dụng tính năng **Row Level Security (RLS)** của PostgreSQL.
   * Mọi câu truy vấn nếu không có `tenant_id` hợp lệ sẽ trả về **0 dòng dữ liệu** (Fail-closed) để chống rò rỉ dữ liệu giữa các công ty/khách hàng.

---

## IV. VAI TRÒ & NHIỆM VỤ CỤ THỂ CỦA BẠN (SWE — THIỆU QUANG MINH)

Bạn là **Software Engineer (SWE)**, làm chủ 2 repository/submodule chính: **`packages/workbench`** (Backend) và **`apps/web`** (Frontend).

### 1. Nhiệm vụ lập trình Backend (`packages/workbench`)
Bạn cần hiện thực các file đang để khung (`NotImplementedError`):

* 🔹 **`validator.py` (`graph_lint`)**: Lập trình bộ kiểm định sơ đồ workflow với **4 quy tắc bắt buộc**:
  1. **Luật 1 (6 node đóng)**: Mọi node trong sơ đồ chỉ thuộc 6 loại: `kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`.
  2. **Luật 2 (Chống lặp)**: Sơ đồ DAG không được chứa chu trình khép kín (No cycles/vòng lặp vô tận).
  3. **Luật 3 (Đường nối hợp lệ)**: Mọi mũi tên (Edge) phải trỏ đến một Node ID có thật (không có dangling edge).
  4. **Luật 4 (Danh sách trắng Tool)**: Tool được gọi trong node `tool-call` phải nằm trong `agent_config.tool_whitelist`.

* 🔹 **`tenant_wall.py` (`resolve_tenant`)**:
  * Tự giải mã `tenant_id` từ Session/Token ở **phía Server-side**.
  * **Chống lỗ hổng T1 IDOR**: Tuyệt đối KHÔNG tin `tenant_id` do phía Client/Browser gửi lên qua URL hoặc Body.

* 🔹 **`publish.py` (`publish` & `rollback`)**:
  * `publish`: Chạy `graph_lint` ➔ Đọc kết quả chấm điểm từ AIE-2 (`scorecard.gate.verdict`). Nếu `verdict == "FAIL"`, **chặn bấm Publish** và gọi `rollback()`. Ngược lại, lưu phiên bản mới vào DB `wb.recipes`.
  * `rollback`: Khôi phục phiên bản recipe cũ từ lịch sử `wb.recipe_versions`.

---

### 2. Nhiệm vụ lập trình Frontend (`apps/web`)
Dựng ứng dụng Web (React 19 + TypeScript + Vite + React Flow):
* **Form tạo Agent**: Cho phép nhập tên, instructions, chọn model, tích chọn tool whitelist, chọn kho tài liệu KB.
* **Canvas 6-Node Palette**: Kéo-thả 6 loại khối hình, nối các mũi tên tạo luồng xử lý.
* **Playground & Trace Timeline**: Xem kết quả chạy thử, kiểm tra số lượng token tiêu tốn, chi phí và thời gian phản hồi.

---

### 3. Quy tắc phân quyền & Gitflow dành cho bạn
* **Quyền hạn (Write)**: Bạn có quyền `git push` trực tiếp vào repo `agentcore-studio-workbench` và `agentcore-studio-web`.
* **Ranh giới (Must NOT touch)**: Bạn không chỉnh sửa code trong `packages/kb`, `packages/engine`, `packages/evalhub`.
* **Thay đổi Contract chung (`packages/contracts`)**: Nếu cần sửa/thêm trường trong `Recipe` schema, bạn phải mở PR tại repo `agentcore-studio-contracts` và cần **Mentor** duyệt.

---

### 🛠️ Lệnh khởi động nhanh hàng ngày tại `agentcore-studio-kit`:
```powershell
make setup       # uv sync — Dựng môi trường Python chung cho toàn workspace
make dev         # docker compose up -d — Bật Postgres Database ngầm
make test        # uv run pytest — Chạy bài test kiểm tra toàn bộ workspace
cd apps/web      # Chuyển sang frontend
npm run dev      # Bật trang web local tại http://localhost:5173
```
