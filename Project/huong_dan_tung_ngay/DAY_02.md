# HƯỚNG DẪN CẦM TAY CHỈ VIỆC — NGÀY 2 (DAY 02)
**Ngày thực hiện:** Thứ Ba 21/07  
**Vai trò:** SWE (Thiệu Quang Minh)  
**Mục tiêu chính:** Đọc spec, phác thảo Recipe Schema (v0) và thống nhất Hợp đồng với team.

---

### BƯỚC 1: ĐỌC VÀ KIỂM TRA FILE DATABASE SCHEMA

1. Mở file DDL Database của gói Workbench:
   📂 [packages/workbench/src/studio_workbench/schema.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/schema.py)

2. Quan sát bảng `wb.recipes` và `wb.recipe_versions`:
   - Bảng này dùng để lưu trữ các Recipe dạng cột `JSONB` trong PostgreSQL.
   - Đảm bảo hàm `ddl()` trả về đúng câu lệnh SQL `CREATE TABLE IF NOT EXISTS`.

---

### BƯỚC 2: PHÁC THẢO CẤU TRÚC RECIPE SCHEMA BẢN V0

Mục tiêu của bạn là chuẩn hóa cấu trúc dữ liệu JSON để giao diện Web xuất ra cho AIE-1 và DE tiêu thụ.

1. Đảm bảo bản JSON chứa đủ 3 phần chính trong `agent_config`:
   ```json
   {
     "agent_id": "agent-1",
     "tenant": "ankor",
     "agent_config": {
       "instructions": "Trả lời từ tài liệu nội bộ.",
       "model": "gpt-4o-mini",
       "tool_whitelist": ["kb_search"]
     }
   }
   ```

2. Trao đổi nhanh với bạn **AIE-1 (Trần Bá Đạt)** và **DE (Nguyễn Đông Anh)** để xác nhận cấu trúc này đã đủ cho họ đọc chưa.

---

### BƯỚC 3: VIẾT VÀ NỘP BÁO CÁO NGÀY 2 (DAILY NOTE D2)

1. Vào thư mục: 📂 [agentcore-studio-kit/docs/reports/](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-kit/docs/reports/)
2. Tạo file `D02-report-SWE-ThieuQuangMinh.md`.
3. Dán nội dung:
   ```markdown
   # Daily Report Day 2 — SWE (Thiệu Quang Minh)
   - Ngày: 21/07/2026
   - Việc đã làm: Đã rà soát file schema.py và phác thảo xong Recipe Schema v0.
   - Kết nối team: Đã thống nhất các trường instructions, model, tool_whitelist với AIE-1.
   - Kế hoạch Ngày 3: Bắt tay vào viết Form UI tạo Agent trên Web Frontend.
   ```
4. Lưu file lại.
