# [SDLC Harness Step 1: Discover & Plan] Kế hoạch xây dựng Smart Task Tracker Web App

## I. MỤC TIÊU DỰ ÁN DEMO THẬT
Xây dựng một ứng dụng Web **Smart Task Tracker (Quản lý công việc thông minh)** chạy thật 100% trên trình duyệt, hỗ trợ người dùng quản lý công việc cá nhân, phân loại mức độ ưu tiên và tự động lưu dữ liệu.

---

## II. ĐỐI CHIẾU QUY TẮC HARNESS E1 RULES
- **Scope & Contract Discipline:** Chỉ tập trung xây dựng các tính năng CRUD công việc, lọc trạng thái, phân loại ưu tiên và lưu `localStorage`. Không làm phình scope.
- **Testability Triad:** Mọi hàm xử lý logic (`addTask`, `toggleTask`, `deleteTask`, `filterTasks`) phải được tách riêng thành các pure functions để hỗ trợ viết Unit Test tự động ở Step 3.

---

## III. DANH SÁCH FILE SẼ TẠO MỚI [NEW]
1. `demo/index.html`: Cấu trúc giao diện HTML5 ứng dụng Task Tracker.
2. `demo/style.css`: Stylesheet CSS giao diện hiện đại, responsive.
3. `demo/app.js`: Logic xử lý JavaScript (CRUD, localStorage, Filter).
4. `demo/test_runner.html`: File kiểm thử tự động (Unit Test Suite) chạy trên trình duyệt.

---

## IV. XÁC NHẬN CHUYỂN BƯỚC (APPROVAL GATE)
- Kế hoạch đã hoàn thành. Sẵn sàng chuyển sang Step 2: Code & RBAC Permission Cage.
