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
   - Đọc hiểu chi tiết Recipe Schema §3.1 (Contract số 1) và Luật Fence bảo mật §1 (Phân quyền Tenant Wall & kiểm định đồ thị DAG).
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
- Đọc hiểu 4 Core Contracts (R-SPEC A1), chuẩn bị giữ bút Contract số 1 Recipe Schema.

## Blocker / escalate
- Đã giải quyết các thắc mắc về phân quyền repository và khởi tạo submodule.

## Quyết định kỹ thuật (design-note)
- Thống nhất ranh giới Workbench UI zero code lõi: Mọi thay đổi cấu hình Agent đều thông qua khai báo Recipe.

## Ghi chú tự do — [soft-signal, KHÔNG tính điểm]
- Hoàn thành onboarding Ngày 1 thành công.
```

---

---

## 💬 PHẦN 3: MẪU COMMENT CHI TIẾT CHO ISSUE NGÀY 1 (NẾU CẦN DÁN LÊN GITHUB)

Nếu bạn cần dán comment tóm tắt chi tiết lên **Issue Ngày 1 (20/07)** trên GitHub:

```markdown
### 📊 BÁO CÁO HOÀN THÀNH NHIỆM VỤ NGÀY 1 (SWE — DOZYBOY / THIỆU QUANG MINH)

---

#### 1. 🛡️ Bảo mật & Thiết lập Môi trường (NDA & Security Setup)
- [x] **NDA Pledge**: Đã ký cam kết bảo mật NDA pledge, tuân thủ tuyệt đối nguyên tắc 100% dữ liệu thử nghiệm là Synthetic Data (0 PII / không dữ liệu cá nhân thật).
- [x] **Pre-commit Secret Scan**: Đã cài đặt và kích hoạt hook `pre-commit` quét bí mật tự động trước khi commit để chặn rò rỉ API key, password lên GitHub.
- [x] **Môi trường kỹ thuật**: Khởi tạo môi trường Python workspace với `uv`, sẵn sàng phụ trách 2 submodules `packages/workbench` và `apps/web`.
- [x] **Kiểm thử tự động (Pytest)**: Chạy thành công bộ test khung của Mentor với kết quả **PASS 100%**.

---

#### 2. 🎤 Trình bày Teach-back Kiến trúc (Workbench vs. Engine)
- [x] **Vùng trách nhiệm SWE**: Xác định ranh giới làm việc tại Backend Workbench (`packages/workbench`) và Frontend Web UI (`apps/web`).
- [x] **Nguyên lý Zero Code lõi**: Trình bày cho team (DE, AIE-1, AIE-2) hiểu cách người dùng tạo Agent bằng Form UI / Canvas kéo-thả để sinh file `Recipe` khai báo mà **không cần sửa dòng code backend nào**.
- [x] **Ranh giới Engine vs. Recipe**:
  - **Engine (AIE-1)**: Bộ máy thực thi lõi backend, xây 1 lần dùng chung cho tất cả Agent.
  - **Recipe (SWE)**: File công thức cấu hình riêng của từng Agent chứa prompt `instructions`, `model`, `tool_whitelist`, và đồ thị `dag`.

---

#### 3. 📖 Nghiên cứu Specs & Kiến trúc Bảo mật
- [x] **Recipe Schema (§3.1)**: Làm chủ cấu hình Contract số 1 (SWE giữ bút), nắm rõ 6 NodeType cố định (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`).
- [x] **Luật Fence & Phân quyền (§1)**: Hiểu rõ cơ chế Tenant Wall (403 Forbidden) và nguyên tắc **Fence-tại-retrieval** (lọc quyền trực tiếp từ Vector DB / RLS thay vì nhờ AI "đừng nói" để chống Prompt Injection).

---

#### 4. 📝 Báo cáo Daily Note D1 & Tài liệu Tự nghiên cứu
- [x] **File Báo cáo**: Đã tạo và push file báo cáo chuẩn template 6 block tại đường dẫn:
  - 📁 `docs/reports/daily-notes/2026-07-20-Dozyboy.md`
- [x] **Tự nghiên cứu & Kiến thức VSF**: Đã hệ thống hóa toàn bộ tài liệu tự tổng hợp & hướng dẫn setup tại Repository cá nhân:
  - 📚 `https://github.com/Dozyboy/VSF`

🔗 **Ref Báo cáo chi tiết:** https://github.com/AI20K-VGR/agentcore-report/blob/main/daily-notes/2026-07-20-Dozyboy.md  
📌 **Ref Personal Knowledge Vault:** https://github.com/Dozyboy/VSF
```

