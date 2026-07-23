# NHIỆM VỤ & KIẾN THỨC DAY 1 — SWE (THIỆU QUANG MINH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 1)
- [x] **100% thành viên** clone repository thành công với lệnh `git clone --recursive` (đủ 7 submodules).
- [x] Khởi tạo thành công venv Python 3.14 thông qua lệnh `make setup` (`uv sync`).
- [x] Ký cam kết bảo mật NDA pledge và cấu hình hook `pre-commit` scan secret.
- [x] Tạo file `.env` từ `.env.example` với đầy đủ tham số DSN và secret keys.
- [x] **100% thành viên** hoàn thành bài Teach-back mảng mình sở hữu và vượt qua bài QA của Mentor.

---

## 🎯 VIỆC CỦA BẠN (SWE - THIỆU QUANG MINH - DAY 1)
1. **Nghiên cứu kiến trúc**: Đọc và phân tích R-SPEC A1 (4 Core Contracts) và R-SPEC A2.
2. **Phân định ranh giới**: Làm rõ sự khác biệt giữa **Engine** (backend lõi chạy DAG ngầm, xây 1 lần) và **Recipe** (cấu hình agent dạng khai báo từ Form UI).
3. **Thực hiện Teach-back**: Trình bày Teach-back mảng Workbench / Recipe (Form ➔ Recipe zero code lõi).
4. **Chuẩn bị giữ bút**: Chuẩn bị nhận quyền giữ bút cho **Contract #1 (Recipe Schema)** ở Day 2.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Recipe vs Engine Architecture**: Engine là hệ thống thực thi stateless không chứa thông tin nghiệp vụ cụ thể. Recipe là "bản thiết kế" (blueprint) chứa toàn bộ cấu hình agent do người dùng nhập từ Form (instructions, tools, KB binding, node connections).
- **Dependency Inversion Principle (DIP)**: Tầng `studio_workbench` chỉ import đối tượng hợp đồng `studio_contracts`, tuyệt đối không import trực tiếp các quadrant khác (`studio_kb`, `studio_engine`, `studio_evalhub`).
- **UV Workspace & Monorepo Submodules**: Cách quản lý 1 lockfile chung `uv.lock` ở repo cha nhưng tách quyền push trên từng git submodule độc lập.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/workbench/` (Thư mục root mảng Workbench)
- `agentcore-report/daily-notes/2026-07-20-Dozyboy.md` (Báo cáo daily note Day 1)
- `plans/260717-1516-studio-kit-template/plan.md` (Tài liệu quyết định kiến trúc)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. Người dùng thao tác trên Form UI tầng Web.
2. SWE thu thập dữ liệu Form và chuẩn bị đóng gói thành đối tượng `Recipe` Pydantic model.
3. Recipe được truyền vào Engine qua duy nhất 1 entry point `interpreter.run(recipe)`.
