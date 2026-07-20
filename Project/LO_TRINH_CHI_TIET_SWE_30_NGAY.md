# LỘ TRÌNH CHI TIẾT TỪNG BƯỚC VÀ KIỂM TRA THƯ MỤC DÀNH CHO SWE (THIỆU QUANG MINH)

---

## 🛑 1. KẾT QUẢ KIỂM TRA THƯ MỤC: CÓ XÓA REPO KHÁC KHÔNG?

👉 **TUYỆT ĐỐI KHÔNG NÊN XÓA! BẠN PHẢI GIỮ LẠI TOÀN BỘ 9 REPO.**

### Lý do Kỹ thuật:
- Dù bạn là **SWE** chỉ trực tiếp sửa code ở `workbench` và `web`, nhưng khi bạn chạy thử nghiệm ứng dụng trên máy (`make test` hoặc `make dev`), server **FastAPI (`apps/studio`)** vẫn cần đọc các file từ `contracts`, `engine`, `kb`, `evalhub` để chạy thông suốt toàn bộ hệ thống.
- Nếu bạn xóa các repo khác đi, ứng dụng trên máy bạn sẽ bị lỗi thiếu thư viện (**ImportError**) và không thể chạy test được nữa.
- Vì vậy, việc giữ đầy đủ 9 repo là **bắt buộc** để toàn bộ hệ thống trên máy bạn hoạt động bình thường.

---

## 📝 2. KHU VỰC NỘP BÁO CÁO HÀNG NGÀY (`docs/reports`)

- **Vị trí lưu báo cáo**: Nằm tại thư mục [agentcore-studio-kit/docs/reports](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-kit/docs/reports).
- Đây là repo riêng (`agentcore-report`) mà Mentor cấp quyền ghi (**TTS-write**) cho các thực tập sinh để viết báo cáo hàng ngày (Daily Report).
- **Cách nộp báo cáo hàng ngày**: 
  1. Mỗi ngày làm việc, bạn vào `agentcore-studio-kit/docs/reports/` tạo 1 file markdown báo cáo (Ví dụ: `D01-report-SWE-ThieuQuangMinh.md`).
  2. Điền các nội dung: Việc đã làm hôm nay, commit hash, các giả thuyết/khó khăn gặp phải.
  3. Commit và Push file này lên repo `agentcore-report`. Hệ thống CI của Mentor sẽ tự động quét file này để ghi nhận điểm danh và đo lường tiến độ.

---

## 🗺️ 3. LỘ TRÌNH TỪNG BƯỚC CHI TIẾT DÀNH CHO SWE (TỪ DAY 1 ĐẾN DAY 30)

---

### 🟢 GIAI ĐOẠN 1: SPRINT 1 — FOLLOW (Tuần 1 & 2 / Ngày 1 đến Ngày 10)
*Mục tiêu: Dựng Walking-Skeleton (Khung mẫu chạy thông) + Chốt Hợp đồng Recipe.*

* **Ngày 1 - 2 (Chuẩn bị & Tìm hiểu)**:
  - Khởi động môi trường: Chạy `make setup` và `make dev` (bật Postgres).
  - Đọc kỹ spec Recipe schema tại `00-orientation/umbrella-contract.md`.
* **Ngày 3 - 5 (Form tạo Agent & INV-1 Skeleton)**:
  - Làm Form tạo Agent đơn giản trên Frontend (`apps/web`): Cho nhập instructions, chọn model, chọn tool whitelist.
  - Chuyển Form-data vừa nhập thành file `recipe.agent_config` dạng JSON.
  - Viết khung hàm `resolve_tenant()` trong [tenant_wall.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/tenant_wall.py) (Bảo mật Server-side).
* **Ngày 6 - 10 (Cùng team vượt Gate Day 10)**:
  - Đảm bảo luồng tạo Agent từ Form UI của bạn gửi dữ liệu sang Engine của AIE-1 chạy mượt mà.
  - **Mốc Gate Day 10**: Tham gia kiểm thử hệ thống walking-skeleton e2e toàn team.

---

### 🟡 GIAI ĐOẠN 2: SPRINT 2 — ASSIST (Tuần 3 & 4 / Ngày 11 đến Ngày 20)
*Mục tiêu: Nâng cấp Form thành Canvas React Flow 6-node + 4 Quy tắc Kiểm định Graph-lint.*

* **Ngày 11 - 15 (Dựng Canvas React Flow & Graph-lint)**:
  - Thay Form nhập đơn giản bằng màn hình **Canvas kéo-thả React Flow** trên Frontend (`apps/web`).
  - Lập trình **4 quy tắc kiểm định DAG** trong [validator.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/validator.py) (`graph_lint`):
    1. Node phải thuộc 6 loại node đóng (`NodeType`).
    2. Không chứa chu trình cấm (Cycle detection).
    3. Mọi Edge phải có điểm trỏ hợp lệ.
    4. Tool gọi trong node phải nằm trong whitelist.
* **Ngày 16 - 20 (Luồng Publish & Tích hợp Eval Gate)**:
  - Lập trình luồng `publish` và `rollback` trong [publish.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/publish.py).
  - Đọc `verdict` từ AIE-2: Nếu `FAIL` -> Tự động chặn nút Publish và Trigger khôi phục bản cũ (`rollback`).
  - **Mốc Gate Day 20**: Chạy thử nghiệm luồng Publish/Rollback lần đầu tiên.

---

### 🔴 GIAI ĐOẠN 3: SPRINT 3 — APPLY (Tuần 5 & 6 / Ngày 21 đến Ngày 30)
*Mục tiêu: Polish UX, Xử lý nấc Descope & Demo 8 bước thành công.*

* **Ngày 21 - 25 (Tối ưu UX Trace & Playground)**:
  - Hoàn thiện giao diện xem Trace Timeline (xem thời gian chạy từng node, token và chi phí phát sinh).
  - Nếu gặp khó khăn/kẹt thời gian ở React Canvas, áp dụng nấc **Descope-ladder**: Chuyển Canvas về dạng Form + Sơ đồ Mermaid (vẫn đảm bảo Demo 8 bước sống tốt).
* **Ngày 26 - 30 (Tổng duyệt & Gate Day 30)**:
  - Chạy thử Demo 8 bước toàn diện hệ thống.
  - Đảm bảo tất cả các bài test CI xanh 100%.
  - Chuẩn bị bàn giao và thuyết minh Demo cuối khóa (Day 30 Gate).
