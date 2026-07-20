# BÁO CÁO PHÂN TÍCH DỰ ÁN AGENTCORE STUDIO & HƯỚNG DẪN DÀNH CHO SWE (THIỆU QUANG MINH)

---

## I. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

**AgentCore Studio** ("Xưởng Create → Test → Trust") là một nền tảng **xây dựng, kiểm định và quản lý vòng đời AI Agents** không cần viết code lõi.

### Kiến trúc Monorepo (`agentcore-studio-kit`)
Dự án bao gồm **1 Repo cha (`agentcore-studio-kit`)** quản lý **8 submodules / thư mục thành phần** qua `uv` workspace & `git submodules`:

| Thư mục / Submodule | Vai trò / Chức năng | Chủ sở hữu (Owner) |
|---|---|---|
| 📂 [agentcore-studio-kit](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-kit) | **Monorepo Root**: Quản lý venv (`uv.lock`), Docker Compose, DB migrations, CI/CD chung. | Mentor |
| 📂 [agentcore-studio-contracts](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-contracts) | **Layer ĐÁY (Contracts)**: Định nghĩa các Pydantic schema chung (`Recipe`, `TraceEvent`, `KbSearch`, `Scorecard`). | Shared / Mentor (SWE giữ bút `recipe`) |
| 📂 [agentcore-studio-workbench](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench) | **Backend Workbench**: Chứa DDL schema `wb`, `validator.py` (graph-lint), `tenant_wall.py` (INV-1), `publish.py`. | 👑 **SWE — Thiệu Quang Minh** |
| 📂 [agentcore-studio-web](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-web) | **Frontend UI**: React + Vite + TypeScript + React Flow (Canvas kéo-thả agent & form tạo agent). | 👑 **SWE — Thiệu Quang Minh** |
| 📂 [agentcore-studio-engine](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-engine) | **Execution Engine**: Trình thông dịch (Interpreter) chạy 6 node types của Recipe. | AIE-1 — Trần Bá Đạt |
| 📂 [agentcore-studio-kb](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-kb) | **Knowledge Base**: Ingestion, Chunking, Embedding, Vector DB Search, Hàng rào PostgreSQL RLS. | DE — Nguyễn Đông Anh |
| 📂 [agentcore-studio-evalhub](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-evalhub) | **Evaluation Hub**: Harness chấm điểm (Scorecard), LLM Judge, Golden-sets. | AIE-2 — Lưu Tiến Duy |
| 📂 [agentcore-studio-app](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-app) | **API Composition Root**: FastAPI web server tổng hợp kết nối 4 quadrant thành app hoàn chỉnh. | Mentor |
| 📂 [ai20k-batch2-requirements](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/ai20k-batch2-requirements) | **Tài liệu & Đề bài**: Chứa Charter, Roadmap 3 Sprints (30 ngày), Umbrella Contract và spec theo ngày. | Mentor (Read-only) |

---

## II. DỰ ÁN ĐÃ CÀI ĐẶT NHỮNG GÌ? (TECH STACK & TOOLING)

1. **Backend & Runtime**:
   - **Python 3.14** sử dụng **`uv`** (Package Manager cho workspace). Một file `uv.lock` ở root giải quyết dependency cho toàn bộ workspace.
   - **FastAPI**: Chạy server HTTP backend.
   - **Pydantic v2**: Định nghĩa schema data contract.
   - **Pytest**: Bộ unit/integration test, có các test guard như `importlinter` cưỡng chế đồ thị phụ thuộc 1 chiều (DIP).

2. **Frontend Stack**:
   - **React 19** + **TypeScript** + **Vite 8**.
   - **React Flow (`reactflow`)**: Thư viện dựng Canvas kéo-thả đồ thị DAG 6-node workflow.

3. **Cơ sở dữ liệu & Infra**:
   - **PostgreSQL** có tích hợp **`pgvector`** (chạy qua Docker Compose: `make dev`).
   - Tách biệt 2 DB roles: `studio_owner` (DDL/Admin) và `studio_app` (DML/Runtime áp dụng PostgreSQL **RLS - Row Level Security**).

---

## III. VỚI VAI TRÒ LÀ SWE (SOFTWARE ENGINEER), BẠN PHẢI LÀM GÌ?

Trong dự án này, bạn (**Thiệu Quang Minh**) làm chủ **2 repository chính**: `agentcore-studio-workbench` và `agentcore-studio-web`.

### 1. Nhiệm vụ lập trình cụ thể (Python & TypeScript)

#### A. Backend Workbench (`packages/workbench`)
Hiện thực các file đang để dạng khung (`NotImplementedError`):

1. **`validator.py`** — Lập trình hàm `graph_lint(recipe: Recipe)` thực hiện **4 quy tắc kiểm định DAG**:
   - **Rule 1**: Mọi Node type phải thuộc **6 loại node đóng**: `kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end` (nghiêm cấm thêm node mới).
   - **Rule 2**: Không chứa **chu trình (No cycles)** — DAG không được lặp vô tận.
   - **Rule 3**: Mọi Edge đều có đích đến tồn tại (không có dangling edge).
   - **Rule 4**: Mọi Tool được gọi trong node `tool-call` phải nằm trong `agent_config.tool_whitelist`.
   *(Nguồn test: [test_graph_lint.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/tests/test_graph_lint.py))*

2. **`tenant_wall.py`** — Lập trình hàm `resolve_tenant(session)` (Tầng bảo mật **INV-1 Tenant-Wall**):
   - Tự giải mã `tenant_id` từ Session/Token ở phía server-side. **Tuyệt đối KHÔNG tin** `tenant_id` do Client truyền qua URL/Request Body (chống lỗ hổng bảo mật T1 IDOR).

3. **`publish.py`** — Lập trình luồng `publish` & `rollback`:
   - `publish(recipe, scorecard)`: Kiểm tra `graph_lint(recipe)` -> Đọc `scorecard.gate.verdict` từ AIE-2. Nếu `verdict == "FAIL"`, **nghiêm cấm Publish** và tự động gọi `rollback()`. Ngược lại, lưu recipe vào DB `wb.recipes` & `wb.recipe_versions`.
   - `rollback(agent_id, tenant, to_version)`: Khôi phục phiên bản recipe cũ từ lịch sử `wb.recipe_versions`.

4. **`schema.py`** — Đảm bảo DDL bảng `wb.recipes` và `wb.recipe_versions` khởi tạo đúng cấu trúc database.

#### B. Frontend Workbench (`apps/web`)
- Xây dựng **Form tạo Agent**: Cho phép nhập instructions, chọn model, chọn tool whitelist, gán KB binding.
- Xây dựng **Canvas React Flow 6-node**: Cho phép kéo thả node, nối edge dựng workflow.
- Dựng màn hình **Playground & Trace timeline**: Xem kết quả chạy agent, kiểm tra token / cost.

#### C. Quản lý Contract #1 (`recipe schema`)
- Bạn là **người giữ bút (Owner)** định nghĩa `Recipe` schema trong `agentcore-studio-contracts`. Mọi thành viên khác (DE, AIE-1, AIE-2) đều tiêu thụ `Recipe` schema này.

---

### 2. Lộ trình công việc qua 3 Sprints (6 Tuần / 30 Ngày)

```
Sprint 1 (Follow - Tuần 1-2 / D1-D10)   ── Form cơ bản → Hợp đồng recipe → Gate Day 10 (Walking-Skeleton)
        │
        ▼
Sprint 2 (Assist - Tuần 3-4 / D11-D20) ── Canvas React Flow + 4-rule graph-lint + Eval-gate Publish/Rollback
        │
        ▼
Sprint 3 (Apply - Tuần 5-6 / D21-D30)  ── Polish Canvas/Trace UX + Demo 8 bước end-to-end (Gate Day 30)
```

- **Mốc Gate Day 10 (Walking-Skeleton)**: Đảm bảo luồng *mỏng-mà-thông* kết nối từ UI Workbench (SWE) → Interpreter (AIE-1) → KB Stub (DE) → Scorecard Smoke (AIE-2).

---

### 3. Các quy tắc quan trọng cần tuân thủ

1. **Ranh giới Hàng rào (Fence-lane)**:
   - Bạn chỉ sửa code trong `packages/workbench` và `apps/web`.
   - **Không sửa chéo** sang `packages/kb`, `packages/engine`, `packages/evalhub`.
   - Đổi Contract chung tại `packages/contracts` cần có sự đồng thuận/duyệt của Mentor.

2. **Luật 2-4-8 (Khi bị kẹt)**:
   - Kẹt **2h**: Tự ghi lại giả thuyết.
   - Kẹt **4h**: Đặt câu hỏi xin hint từ Mentor/Team.
   - Kẹt **8h**: Mentor sẽ ngồi cùng bạn 30 phút để tháo gỡ. *(Đừng kẹt một mình quá 2h)*.

3. **Chỉ dẫn lệnh chạy thử nghiệm (Dev Commands)**:
   - Cài đặt workspace: `make setup`
   - Bật Docker Postgres/pgvector: `make dev`
   - Chạy toàn bộ Pytest suite: `make test`
   - Chạy linter & mypy checking: `make lint`
   - Khởi chạy Web UI: `cd apps/web && pnpm dev` (hoặc `npm run dev`)

---
*Tài liệu tham khảo chính trong dự án:*
- Đề bài chi tiết & Hiến pháp: [charter.md](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/ai20k-batch2-requirements/00-orientation/charter.md) & [roadmap-3-sprint.md](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/ai20k-batch2-requirements/00-orientation/roadmap-3-sprint.md)
- Umbrella Contract: [umbrella-contract.md](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/ai20k-batch2-requirements/00-orientation/umbrella-contract.md)
