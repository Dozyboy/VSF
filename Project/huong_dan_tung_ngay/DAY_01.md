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
     *(Kết quả báo xanh: `1 passed, 1 xfailed, 1 xpassed` là đạt chuẩn 100%!).*

---

### BƯỚC 2: NỘI DUNG CHI TIẾT TRÌNH BÀY & CHUẨN BỊ CHO BUỔI HỌP 2H30 CHIỀU NAY VỚI MENTOR

Chiều nay lúc **2h30**, team sẽ họp Kickoff Q&A với Mentor. Dưới đây là **kịch bản nói chi tiết từng câu** và **bộ câu hỏi chuẩn bị sẵn** cho bạn:

#### 🗣️ 1. Kịch bản phát biểu (Nói gì khi Mentor gọi tên hoặc bảo Teach-back phần SWE):

> *"Dạ chào anh Mentor và cả team, em xin đại diện vai trò SWE (Software Engineer) trình bày về quadrant Workbench và ranh giới Engine | Recipe ạ:*
>
> 1. **Về ranh giới Engine | Recipe**:
>    - **Engine (Động cơ lõi - do AIE-1 giữ)**: Là bộ thông dịch (Interpreter) chạy 6 node-type đóng. Đây là mã nguồn lõi xử lý, được viết 1 lần (stateless) dùng chung cho tất cả các Agent.
>    - **Recipe (Công thức khai báo - do SWE em giữ bút schema)**: KHÔNG chứa code xử lý logic lõi (**Zero code lõi**), mà chỉ chứa file khai báo định dạng JSON (`agent_config` gồm: instructions, model chọn, tool_whitelist, kb_binding).
>    - **Ý nghĩa phân định ranh giới**: Giúp người dùng trên giao diện Web UI (Form/Canvas) chỉ cần nhập thông số khai báo mà không cần phải can thiệp hay sửa bất kỳ dòng code Python lõi nào.
>
> 2. **Về nhiệm vụ chính của SWE em trong Tuần 1**:
>    - Xây dựng Form tạo Agent đơn giản trên Web UI để chuyển đổi thông tin người dùng nhập thành file JSON `recipe.agent_config`.
>    - Phác thảo `recipe schema` bản v0 để AIE-1, DE và AIE-2 cùng tiêu thụ.
>    - Viết khung middleware `tenant_wall.py` (INV-1) bảo mật Server-side: tự giải mã tenant từ session, phớt lờ `tenant_id` do client tự khai báo.
>    - Phối hợp xâu kim với team để qua mốc Gate Day 10 ạ!"*

---

#### ❓ 2. Bộ câu hỏi dự phòng (Nếu Mentor hỏi vặn lại bạn trong họp):

- **Hỏi 1**: *"SWE giữ bút hợp đồng nào trong 4 hợp đồng schema?"*
  - **Trả lời**: *"Dạ SWE em giữ bút contract #1 — **`recipe schema`**. Cả 3 bạn DE, AIE-1, AIE-2 sẽ tiêu thụ schema này qua giao thức DIP Protocol ạ."*

- **Hỏi 2**: *"Hàng rào bảo mật Tenant-Wall (INV-1) của SWE khác gì với PostgreSQL RLS của DE?"*
  - **Trả lời**: *"Dạ `Tenant-Wall` của SWE bảo vệ ở tầng Server-side API tại ranh giới Workbench — tự resolve `tenant_id` từ Session đăng nhập chứ không bao giờ tin client payload (chống lỗ hổng T1 IDOR). Còn RLS của DE là bảo vệ ở tầng Cơ sở dữ liệu Postgres khi thực hiện truy xuất tài liệu (Retrieval) ạ."*

- **Hỏi 3**: *"Tuần 1 SWE có cần làm Canvas React Flow kéo thả chưa?"*
  - **Trả lời**: *"Dạ chưa ạ! Theo đúng ràng buộc của Tuần 1 (Follow), em chỉ làm **Form tạo Agent đơn giản** để phục vụ luồng mỏng-mà-thông walking-skeleton. Sang Sprint 2 (Assist - Tuần 3) em mới nâng cấp thành Canvas React Flow 6-node ạ."*

---

#### 📋 3. Checklist sẵn sàng trước 2h30:
- [x] Đã nắm chắc kịch bản phát biểu ở trên.
- [x] Đã thuộc 3 câu trả lời dự phòng.
- [x] Đã chạy test Pytest ở Bước 1 xanh 100%.

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
   - Môi trường: Python 3.14 & Pytest chạy xanh (1 passed, 1 xfailed, 1 xpassed).
   - Kiến thức nắm được: Đã phân biệt được Engine (Stateless execution) và Recipe (Declarative JSON schema zero code lõi).
   - Tiến độ: Sẵn sàng tham gia họp Kickoff Q&A 2h30 chiều với Mentor.
   ```

4. Lưu file lại.

---

### BƯỚC 4: KẾT THÚC NGÀY 1 (DoD Checklist)
- [x] Môi trường chạy test bình thường.
- [x] Đã hiểu nhiệm vụ SWE và ranh giới Engine | Recipe.
- [x] Đã chuẩn bị kịch bản phát biểu cho buổi họp 2h30 chiều.
- [x] Đã tạo file Daily Note D1.
