# HƯỚNG DẪN CẦM TAY CHỈ VIỆC — NGÀY 3 (DAY 03)
**Ngày thực hiện:** Thứ Tư 22/07  
**Vai trò:** SWE (Thiệu Quang Minh)  
**Mục tiêu chính:** Lập trình Form Tạo Agent cơ bản trên Web Frontend & Nộp PR #1.

---

### BƯỚC 1: DỰNG GIAO DIỆN FORM TẠO AGENT TRÊN FRONTEND

1. Mở file Frontend React:
   📂 [apps/web/src/App.tsx](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-web/src/App.tsx)

2. Bổ sung giao diện Form gồm các ô nhập liệu cơ bản:
   - **Khung nhập Hướng dẫn (Instructions)**: Cấp một thẻ `<textarea>` để người dùng nhập câu lệnh chỉ dẫn cho AI.
   - **Ô chọn Mô hình (Model)**: Cấp thẻ `<select>` cho chọn `gpt-4o-mini` hoặc `gemini-1.5-flash`.
   - **Ô chọn Công cụ (Tool Whitelist)**: Các ô Checkbox chọn `kb_search`.

---

### BƯỚC 2: XỬ LÝ SỰ KIỆN SUBMIT VÀ XUẤT DỮ LIỆU JSON

1. Khi người dùng bấm nút **"Tạo Agent"**, lập trình hàm JS/TS thu thập dữ liệu từ các ô nhập liệu.
2. Ép kiểu dữ liệu thu thập được thành định dạng object JSON:
   ```javascript
   const agentConfig = {
     instructions: formInstructions,
     model: selectedModel,
     tool_whitelist: selectedTools
   };
   ```

---

### BƯỚC 3: PUSH CODE VÀ TẠO PULL REQUEST #1

1. Mở Terminal tại thư mục `agentcore-studio-web`:
   ```bash
   git add .
   git commit -m "feat(web): build agent creation form v0"
   git push origin main
   ```
2. Lên giao diện GitHub cá nhân, tạo **Pull Request #1** gửi sang repo gốc của Mentor.

---

### BƯỚC 4: VIẾT VÀ NỘP BÁO CÁO NGÀY 3 (DAILY NOTE D3)

1. Tạo file `D03-report-SWE-ThieuQuangMinh.md` trong thư mục 📂 `agentcore-studio-kit/docs/reports/`.
2. Dán nội dung:
   ```markdown
   # Daily Report Day 3 — SWE (Thiệu Quang Minh)
   - Ngày: 22/07/2026
   - Việc đã làm: Đã dựng xong Form tạo Agent cơ bản trên React Frontend (apps/web).
   - Tiến độ PR: Đã tạo PR #1 chứa Form UI.
   - Kế hoạch Ngày 4: Bổ sung ô chọn Kho tài liệu (KB Binding) vào Form.
   ```
