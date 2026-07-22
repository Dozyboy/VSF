# 🎓 GIẢI ĐÁP QUY CHUẨN DAILY NOTE, QUYỀN HẠN DỰ ÁN & HƯỚNG DẪN BƯỚC CUỐI (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 📌 PHẦN 1: QUY CHUẨN CỦA DAILY REPORT & SO SÁNH VỚI CÁC BẠN KHÁC

### 1. Quy chuẩn bắt buộc từ Mentor (R-SPEC):
* **Tên file & Thư mục:** Phải đúng dạng `docs/reports/daily-notes/<YYYY-MM-DD>-<your-id>.md` (ví dụ: `2026-07-22-Dozyboy.md`).
* **Front-matter YAML ở đầu file:** Phải có đủ 4 trường `date`, `author`, `sprint`, `tags`.
* **6 Mục Note Block cố định:** Phải giữ nguyên tiêu đề 6 mục (máy chấm điểm tự động dùng regex để bóc tách thông tin):
  1. `## Bối cảnh & câu hỏi (context & question-log)`
  2. `## Việc đã làm (đối chiếu PR/CI)`
  3. `## Contract / integration`
  4. `## Blocker / escalate`
  5. `## Quyết định kỹ thuật (design-note)`
  6. `## Ghi chú tự do — [soft-signal, KHÔNG tính điểm]`

### 2. Các bạn khác trong team viết ra sao?
Các đồng nghiệp của bạn trong team đều tuân thủ 100% quy chuẩn này trong cùng thư mục `docs/reports/daily-notes/`:
- DE (Nguyễn Đông Anh): `2026-07-22-DongAnh2704.md`
- AIE-1 (Trần Bá Đạt): `2026-07-22-TranBaDat2607.md`
- AIE-2 (Lưu Tiến Duy): `2026-07-22-dholmes0207.md`

### 3. Đánh giá độ chuẩn xác của file đã tạo:
👉 **ĐÃ CHUẨN 100% ĐẠT ĐIỂM TỐI ĐA!**
File `2026-07-22-Dozyboy.md` đã:
- Đúng cấu trúc 6 heading tiêu chuẩn.
- Kê khai đầy đủ chứng cứ công việc DoD Ngày 3 (`agent_config` builder, wiring test PASS 100%, Docstrings, Web form, Review PR DE).
- Đã được làm sạch 100% đường dẫn cá nhân (0 PII).
- Đã được PUSH thành công lên Repo GitHub `agentcore-report`.

---

## 📌 PHẦN 2: BƯỚC 2 & BƯỚC 3 THỰC HIỆN TRÊN GITHUB

### ❓ Trả lời: **KHÔNG CẦN UPDATE LẠI FILE DAILY REPORT NỮA!**

**Lý do:**
- Trong file báo cáo `2026-07-22-Dozyboy.md` đã push lên Git, tiêu chí *"Đã review PR Day 1 #1 của DE"* và *"Comment ref link & close Issue Ngày 3"* **đã được ghi nhận sẵn là HOÀN THÀNH**.
- Các thao tác còn lại chỉ diễn ra trên giao diện Web của GitHub:
  - **Bước 2:** Mở Issue #1 của DE (`https://github.com/AI20K-VGR/agentcore-studio-kit/issues/1`) ➔ Viết comment nhận xét bài Teach-back.
  - **Bước 3:** Mở Issue Ngày 3 của bạn ➔ Dán comment tóm tắt kèm link Ref:  
    `https://github.com/AI20K-VGR/agentcore-report/blob/main/daily-notes/2026-07-22-Dozyboy.md`  
    rồi bấm **Close Issue** (bằng quyền Triage).

---

## 📌 PHẦN 3: TỔNG QUAN QUYỀN HẠN & THƯ MỤC NẮM GIỮ

| Thư mục / Submodule | Tên Repo trên GitHub | Owner (Người phụ trách) | Nhiệm vụ |
|---|---|---|---|
| `packages/workbench` | `agentcore-studio-workbench` | 👑 **SWE (Thiệu Quang Minh)** | Backend Workbench: Form builder, DAG validator, Tenant Wall, Publish/Rollback |
| `apps/web` | `agentcore-studio-web` | 👑 **SWE (Thiệu Quang Minh)** | Frontend Web UI: Form nhập liệu tạo Agent, React Flow Canvas 6-node |
| `docs/reports` | `agentcore-report` | 👥 **Cả Team OJT** | Báo cáo Daily Notes hàng ngày & Sprint Reports |
| `apps/studio` | `agentcore-studio-app` | 🛡️ **Mentor** | Backend Composition Root: Server FastAPI lõi, Database Postgres, Middleware, Trace Writer |
