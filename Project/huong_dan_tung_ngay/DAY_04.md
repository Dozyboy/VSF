# HƯỚNG DẪN CẦM TAY CHỈ VIỆC — NGÀY 4 (DAY 04)
**Ngày thực hiện:** Thứ Năm 23/07  
**Vai trò:** SWE (Thiệu Quang Minh)  
**Mục tiêu chính:** Gắn cấu hình Kho tài liệu (KB Binding) vào Form UI & Rà soát Hợp đồng.

---

### BƯỚC 1: BỔ SUNG Ô CHỌN KHO TÀI LIỆU TRÊN GIAO DIỆN WEB

1. Mở file Frontend React:
   📂 [apps/web/src/App.tsx](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-web/src/App.tsx)

2. Thêm một ô chọn Dropdown hoặc Radio cho phép người dùng chọn **Phạm vi Kho tài liệu (KB Scope)**:
   - Tùy chọn 1: `ankor/public` (Kho tài liệu Tenant Ankor).
   - Tùy chọn 2: `borea` (Kho tài liệu Tenant Borea).

---

### BƯỚC 2: KẾT NỐI KB BINDING VÀO BẢN THIẾT KẾ RECIPE JSON

1. Cập nhật hàm xuất dữ liệu JSON trên Web để bổ sung phần `kb_binding`:
   ```javascript
   const fullRecipe = {
     agent_id: "agent-demo",
     tenant: "ankor",
     agent_config: agentConfig,
     kb_binding: {
       kb_id: "kb-callisto",
       scope: selectedKbScope
     }
   };
   ```

2. Kiểm tra xem cấu trúc JSON này có bị lỗi khác kiểu dữ liệu so với Pydantic contract trong package `contracts` hay không.

---

### BƯỚC 3: VIẾT VÀ NỘP BÁO CÁO NGÀY 4 (DAILY NOTE D4)

1. Tạo file `D04-report-SWE-ThieuQuangMinh.md` trong thư mục 📂 `agentcore-studio-kit/docs/reports/`.
2. Dán nội dung:
   ```markdown
   # Daily Report Day 4 — SWE (Thiệu Quang Minh)
   - Ngày: 23/07/2026
   - Việc đã làm: Đã bổ sung thành công cấu hình KB Binding vào Form UI.
   - Kiểm thử: Dữ liệu xuất ra đã đầy đủ cả agent_config và kb_binding.
   - Kế hoạch Ngày 5: Viết khung bảo mật Tenant-Wall server-side và chuẩn bị Weekly Demo #1.
   ```
