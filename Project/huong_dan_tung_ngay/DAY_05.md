# HƯỚNG DẪN CẦM TAY CHỈ VIỆC — NGÀY 5 (DAY 05)
**Ngày thực hiện:** Thứ Sáu 24/07  
**Vai trò:** SWE (Thiệu Quang Minh)  
**Mục tiêu chính:** Lập trình Khung bảo mật Server-side (Tenant-Wall INV-1) & Ghép nối luồng Weekly Demo #1.

---

### BƯỚC 1: LẬP TRÌNH KHUNG BẢO MẬT TENANT-WALL (INV-1 SKELETON)

1. Mở file Bảo mật Server-side:
   📂 [packages/workbench/src/studio_workbench/tenant_wall.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/tenant_wall.py)

2. Hiện thực hàm `resolve_tenant(session)`:
   - Quy định hàm tự động giải mã `tenant_id` từ Session ở phía Server-side.
   - **Quy tắc quan trọng**: Phớt lờ (Ignore) hoàn toàn nếu client cố tình tự gửi trường `tenant_id` qua request body (để chống lỗ hổng T1 IDOR).
   ```python
   def resolve_tenant(session: object) -> str:
       # Server-side resolution stub v0
       return "ankor"
   ```

---

### BƯỚC 2: THAM GIA WEEKLY DEMO #1 CHIỀU THỨ SÁU

1. Cùng 3 bạn trong team (DE, AIE-1, AIE-2) ghép thử luồng walking-skeleton chạy e2e thật:
   ```
   Form UI (SWE) ➔ Interpreter 3-node (AIE-1) ➔ Tra cứu KB Stub (DE) ➔ Chấm điểm Smoke-eval (AIE-2)
   ```
2. Đảm bảo luồng chạy thành công từ đầu tới cuối trên dữ liệu ghi sẵn (fixtures).

---

### BƯỚC 3: VIẾT VÀ NỘP BÁO CÁO NGÀY 5 (DAILY NOTE D5)

1. Tạo file `D05-report-SWE-ThieuQuangMinh.md` trong thư mục 📂 `agentcore-studio-kit/docs/reports/`.
2. Dán nội dung:
   ```markdown
   # Daily Report Day 5 — SWE (Thiệu Quang Minh)
   - Ngày: 24/07/2026
   - Việc đã làm: Đã hoàn thiện khung tenant_wall.py và tham gia Weekly Demo #1 thành công.
   - Kết quả Tuần 1: Khung Walking-Skeleton đã xâu kim thành công qua 4 quadrant.
   ```
