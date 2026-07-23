# NHIỆM VỤ & KIẾN THỨC DAY 2 — SWE (THIỆU QUANG MINH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 2)
- [x] **Clarification First**: Đặt tối thiểu 3 câu hỏi chất lượng gửi Mentor trước khi code (tránh đoán mò spec).
- [x] Khai báo xong bộ khung (scaffold) và các hàm Stub của 4 package quadrant tên khớp 100% với Umbrella Spec §3.
- [x] Mỗi thành viên xuất bản 1 file `docs/DESCOPE.md` cá nhân đề xuất thang cắt giảm 4 nấc (Walking Skeleton) để luôn bảo đảm có bản demo chạy được.
- [x] Lệnh `make lint` (`ruff` + `mypy strict` + `lint-imports`) vượt qua 100% xanh.

---

## 🎯 VIỆC CỦA BẠN (SWE - THIỆU QUANG MINH - DAY 2)
1. **Khởi tạo Scaffold**: Khởi tạo và dựng khung package `packages/workbench` (`studio_workbench`).
2. **Giữ bút Contract #1 v0**: Thiết kế Pydantic model `AgentConfig` v0 (`frozen=True`) tối thiểu: `instructions`, `model`, `tool_whitelist`.
3. **Khai báo Stubs**: Khai báo 4 stubs interface v0 tên khớp Umbrella §3:
   - `validator.py` -> `graph_lint(recipe)`
   - `publish.py` -> `publish(recipe_id)`, `rollback(agent_id)`
   - `tenant_wall.py` -> `resolve_tenant(request_headers)`
   - `schema.py` -> `ddl`
4. **Xây dựng DESCOPE.md**: Cắt giảm 4 nấc bảo vệ cho bản Walking Skeleton.
5. **Chuẩn bị Question Batch**: Soạn sẵn 3 câu hỏi trong `packages/workbench/docs/QUESTIONS_FOR_MENTOR.md`.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Immutable Data Structures (`frozen=True`)**: Đảm bảo `Recipe` và `AgentConfig` là đối tượng không thể bị sửa đổi (read-only) sau khi khởi tạo, tránh side-effects khi truyền qua các tầng.
- **Walking Skeleton Strategy**: Triển khai một phiên bản cực nhỏ nhưng hoạt động liên thông từ đầu đến cuối (UI -> Config -> Engine), sau đó mới đắp thêm tính năng chi tiết.
- **Defense-in-Depth (6 Lớp Bảo Vệ)**: Hiểu các lớp kiểm soát từ Tenant-Wall ở Workbench đến Row Level Security (RLS) ở Database.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/workbench/src/studio_workbench/schema.py` (Khai báo `AgentConfig` & DDL)
- `packages/workbench/src/studio_workbench/validator.py` (Stub `graph_lint`)
- `packages/workbench/src/studio_workbench/publish.py` (Stub `publish`, `rollback`)
- `packages/workbench/src/studio_workbench/tenant_wall.py` (Stub `resolve_tenant`)
- `packages/workbench/docs/DESCOPE.md` (Kế hoạch cắt giảm 4 nấc)
- `packages/workbench/docs/QUESTIONS_FOR_MENTOR.md` (Bộ câu hỏi làm rõ)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. Form UI nhập liệu cấu hình.
2. `builder.py` gọi `AgentConfig` để đóng gói dữ liệu.
3. `validator.graph_lint` đứng ở cổng Workbench kiểm tra hợp lệ trước khi cho phép gọi Engine.
