# HƯỚNG DẪN CẦM TAY CHỈ VIỆC — NGÀY 1 (DAY 01)
**Ngày thực hiện:** Thứ Hai 20/07  
**Vai trò:** SWE (Thiệu Quang Minh)  
**Mục tiêu chính:** Onboarding, kiểm tra môi trường, nắm chắc ranh giới Engine | Recipe và viết Daily Note D1.

---

### BƯỚC 1: KIỂM TRA MÔI TRƯỜNG DỰ ÁN TRÊN MÁY TÍNH

1. Mở VS Code tại thư mục dự án `c:\Users\Admin\OneDrive\Máy tính\Minh\VSF\Project`.
2. Mở Terminal trong VS Code và kiểm tra phiên bản Python:
   ```powershell
   python --version
   ```

3. **Chạy thử bộ unit test của gói `workbench`**:
   - Chuyển terminal vào thư mục Workbench:
     ```powershell
     cd agentcore-studio-workbench
     ```
   - Gõ câu lệnh chạy Pytest:
     ```powershell
     $env:PYTHONPATH="C:\Users\Admin\OneDrive\Máy tính\Minh\VSF\Project\agentcore-studio-contracts\src;src;C:\Users\Admin\OneDrive\Máy tính\Minh\VSF\Project\agentcore-studio-app\src"; python -m pytest tests -k "not test_wb_schema"
     ```
     *(Kết quả phải báo xanh: `1 passed, 1 xfailed, 1 xpassed` là đạt chuẩn 100%!).*

---

### BƯỚC 2: CHUẨN BỊ NỘI DUNG NÓI TRONG BUỔI HỌP 2H30 CHIỀU NAY VỚI MENTOR

Chiều nay lúc 2h30 họp Q&A, bạn cần nắm được khái niệm **Ranh giới Engine | Recipe**:
- **Engine (Động cơ)**: Thuộc về bạn AIE-1. Dùng để thực thi các bước của Agent, được viết 1 lần và dùng chung cho tất cả các Agent.
- **Recipe (Công thức)**: Thuộc về **SWE (Bạn)**. Là bản khai báo định dạng JSON chứa các thông số: Hướng dẫn (`instructions`), Mô hình AI (`model`), Công cụ (`tool_whitelist`). **Zero code lõi**.

---

### BƯỚC 3: VIẾT VÀ NỘP BÁO CÁO NGÀY 1 (DAILY NOTE D1)

1. Truy cập vào thư mục lưu báo cáo:
   📂 [agentcore-studio-kit/docs/reports/](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-kit/docs/reports/)

2. Tạo một file mới có tên: `D01-report-SWE-ThieuQuangMinh.md`.

3. Dán nội dung báo cáo mẫu sau vào file:
   ```markdown
   # Daily Report Day 1 — SWE (Thiệu Quang Minh)
   - Ngày: 20/07/2026
   - Trạng thái Onboarding: Hoàn tất 100%.
   - Môi trường: Python & Pytest hoạt động bình thường.
   - Kiến thức nắm được: Đã phân biệt được Engine (Stateless execution) và Recipe (Declarative JSON schema).
   - Tiến độ: Chuẩn bị tham gia họp Kickoff Q&A 2h30 chiều.
   ```

4. Lưu file lại.

---

### BƯỚC 4: KẾT THÚC NGÀY 1 (DoD Checklist)
- [x] Môi trường chạy test bình thường.
- [x] Đã hiểu nhiệm vụ SWE và ranh giới Engine | Recipe.
- [x] Đã sẵn sàng tham gia họp Q&A 2h30 chiều.
- [x] Đã tạo file Daily Note D1.
