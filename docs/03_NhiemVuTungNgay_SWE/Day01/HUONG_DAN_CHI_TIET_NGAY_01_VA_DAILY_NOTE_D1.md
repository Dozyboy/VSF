# 🎓 GIẢI THÍCH CHI TIẾT NHIỆM VỤ NGÀY 1 & BÁO CÁO DAILY NOTE D1 (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 📌 PHẦN 1: BỐI CẢNH & NHIỆM VỤ ONBOARDING NGÀY 1 (THỨ HAI 20/07)

### 1.1 Vai trò & Ranh giới của SWE trong Ngày 1
* **Vị trí của bạn:** Kỹ sư phần mềm (Software Engineer — SWE).
* **Vùng phụ trách độc quyền:** 
  1. Backend Workbench: `packages/workbench` (`studio_workbench`)
  2. Frontend Web UI: `apps/web` (React/Vite)
* **Tư duy kiến trúc cốt lõi ngày 1 (Phân biệt Engine vs Recipe):**
  - **Engine (Động cơ backend lõi):** Do AIE-1, DE, AIE-2 viết — được xây dựng 1 lần và chạy cố định ở hạ tầng backend.
  - **Recipe (Công thức khai báo):** Do SWE quản lý giao diện — người dùng tạo ra file công thức `Recipe` (chứa prompt `instructions`, `model`, `tool_whitelist`, sơ đồ `dag`) từ giao diện Form UI của SWE để điều khiển Động cơ mà **không cần phải sửa 1 dòng code lõi nào**.

---

### 1.2 Chi tiết 4 tiêu chí DoD Ngày 1 của SWE
1. **Ký cam kết NDA pledge & Cấu hình môi trường:**
   - Ký cam kết bảo mật NDA và bật công cụ `pre-commit` secret scan để tự động ngăn chặn việc lỡ commit API key hoặc thông tin nhạy cảm.
2. **Trình bày bài Teach-back (Mảng Workbench / Recipe):**
   - Trình bày cho team hiểu cách người dùng tạo Agent bằng Form UI khai báo (zero code lõi) và cách Recipe đóng vai trò là "bản hợp đồng" giao tiếp giữa Form UI và Động cơ Engine.
3. **Nghiên cứu tài liệu kiến trúc:**
   - Đọc hiểu chi tiết Recipe Schema §3.1 (Contract #1) và Luật Fence bảo mật §1 (Phân quyền Tenant Wall & kiểm định đồ thị DAG).
4. **Báo cáo Daily Note D1 (`2026-07-20-Dozyboy.md`):**
   - Tạo và nộp file báo cáo chuẩn template `daily-note.md` lên repository `agentcore-report`.

---

## 📌 PHẦN 2: NỘI DUNG FILE BÁO CÁO DAILY NOTE D1 ĐÃ PUSH LÊN GITHUB

File báo cáo Daily Note D1 đã được đẩy lên repository `agentcore-report` tại đường dẫn:
📁 `docs/reports/daily-notes/2026-07-20-Dozyboy.md`

Nội dung chuẩn 100% template 6 block của Mentor:

```markdown
---
date: 2026-07-20
author: Dozyboy
sprint: s1
tags: [workbench, recipe, onboarding, day1]
---

## Bối cảnh & câu hỏi (context & question-log)
- Tìm hiểu ranh giới nhiệm vụ SWE (Software Engineer): Phụ trách mảng Workbench / Recipe interface (`packages/workbench` và `apps/web`).
- Xác định nguyên tắc thiết kế Engine (chạy ngầm backend, xây 1 lần) vs Recipe (file cấu hình công thức do người dùng tạo từ Form UI).

## Việc đã làm (đối chiếu PR/CI)
- ✅ Ký cam kết NDA pledge & cấu hình bật `pre-commit` secret scan.
- ✅ Đọc & phân tích tài liệu kiến trúc Recipe Schema §3.1 và Luật Fence bảo mật §1.
- ✅ Trình bày Teach-back mảng Workbench / Recipe (Form ➔ Recipe khai báo, zero code lõi).
- ✅ Thiết lập môi trường Python 3.14 + uv workspace cho dự án.

## Contract / integration
- Đọc hiểu 4 Core Contracts (R-SPEC A1), chuẩn bị giữ bút Contract #1 Recipe Schema.

## Blocker / escalate
- Đã giải quyết các thắc mắc về phân quyền repository và khởi tạo submodule.

## Quyết định kỹ thuật (design-note)
- Thống nhất ranh giới Workbench UI zero code lõi: Mọi thay đổi cấu hình Agent đều thông qua khai báo Recipe.

## Ghi chú tự do — [soft-signal, KHÔNG tính điểm]
- Hoàn thành onboarding Ngày 1 thành công.
```

---

## 💬 PHẦN 3: MẪU COMMENT CHO ISSUE NGÀY 1 (NẾU CẦN DÁN LÊN GITHUB)

Nếu bạn cần dán comment tóm tắt lên **Issue Ngày 1 (20/07)** trên GitHub:

```markdown
### 📊 Báo cáo hoàn thành Nhiệm vụ Ngày 1 (SWE — Dozyboy)

- ✅ **NDA & Security**: Đã ký cam kết NDA pledge và bật `pre-commit` secret scan.
- ✅ **Teach-back Workbench/Recipe**: Trình bày thành công nguyên lý Workbench Form ➔ Recipe khai báo (zero code lõi) và phân định ranh giới Engine vs Recipe.
- ✅ **Nghiên cứu Spec**: Đã nghiên cứu chi tiết Recipe Schema §3.1 và Luật Fence bảo mật §1.
- ✅ **Daily-note D1**: Đã khởi tạo và push file báo cáo `2026-07-20-Dozyboy.md`.

🔗 **Ref Báo cáo chi tiết:** https://github.com/AI20K-VGR/agentcore-report/blob/main/daily-notes/2026-07-20-Dozyboy.md
```
