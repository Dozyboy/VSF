# 📂 HƯỚNG DẪN CẤU TRÚC MÃ NGUỒN VÀ VỊ TRÍ HÀM CHO VAI TRÒ SWE (SOFTWARE ENGINEER)

> **Mục đích:** Quy định và giải thích chi tiết vị trí sắp xếp các phương thức / hàm nhỏ trong dự án cho vai trò SWE (chủ sở hữu Workbench, Recipe Builder, Publish Manager và Web UI).

---

## 🎯 1. TẠI SAO KHÔNG NÊN VIẾT TẤT CẢ VÀO 1 FILE?

Viết tất cả vào 1 file duy nhất (gọi là **God File / Monolith File**) có vẻ nhanh ở những bước đầu, nhưng sẽ gây ra 3 thảm họa lớn khi làm việc nhóm:

1. **Xung đột mã nguồn (Git Conflict liên tục)**:
   * Khi 4 mảng (**SWE**, **DE**, **AIE-1**, **AIE-2**) cùng chỉnh sửa trên 1 file, khi `git push` code của thành viên này sẽ đè nát hoặc xung đột với code của thành viên khác.
2. **Vi phạm nguyên tắc Trách nhiệm Đơn lẻ (Single Responsibility Principle - SRP)**:
   * Lỗi ở 1 dòng SQL của DE hoặc logic LLM của AIE-1 có thể làm sập luôn toàn bộ giao diện UI và luồng kiểm định của SWE.
3. **Không thể mở rộng & Kiểm thử độc lập (Modular Submodules)**:
   * Việc tách nhỏ theo đúng submodule cho phép SWE tự viết Unit Test cho Workbench của mình mà không bị phụ thuộc vào việc DE hay AIE-1 đã dựng xong DB hay Server hay chưa.

---

## 📂 2. BẢNG PHÂN LOẠI VÀ VỊ TRÍ LƯU TRỮ CÁC METHOD CHO SWE

Trong kiến trúc dự án VSF, vai trò **SWE (Software Engineer — Workbench Owner)** sẽ chia các hàm nhỏ vào các file tương ứng theo đúng nhiệm vụ chức năng:

| Nhóm chức năng của SWE | Tên File / Đường dẫn chứa Method | Các hàm / method nhỏ tiêu biểu |
| :--- | :--- | :--- |
| **1. Khởi tạo & Đóng gói Agent Recipe** | `packages/workbench/src/studio_workbench/builder_d4.py` | Các hàm đóng gói dữ liệu từ Form UI thành đối tượng Recipe JSON chuẩn:<br>• `create_recipe_d4()`<br>• `build_agent_config()`<br>• `build_kb_binding()` |
| **2. Kiểm định đồ thị hợp lệ (Validator)** | `packages/workbench/src/studio_workbench/validator.py` | Các hàm kiểm tra tính hợp lệ của cấu trúc đồ thị DAG trước khi đưa vào Interpreter:<br>• `graph_lint(recipe)` |
| **3. Quản lý Xuất bản & Rollback (Publish Flow)** | `packages/workbench/src/studio_workbench/publish_manager.py` | Các hàm đọc Scorecard từ AIE-2 và đưa ra quyết định xuất bản hay khôi phục phiên bản:<br>• `handle_publish_request()`<br>• `publish()`<br>• `rollback()` |
| **4. Cấu trúc lưu trữ CSDL (DDL Storage)** | `packages/workbench/src/studio_workbench/schema.py` | Định nghĩa bảng CSDL lưu vết phiên bản Recipe:<br>• Bảng `wb.recipes`<br>• Bảng `wb.recipe_versions` |
| **5. Giao diện Người dùng (Frontend UI)** | `apps/web/src/App.tsx` | Các hàm React xử lý sự kiện, vẽ đồ thị DAG và gọi API Backend:<br>• `handleExportRecipe()`<br>• `handleRunFullFlow()`<br>• `handlePublishAgent()` |

---

## 🛠️ 3. QUY TRÌNH THỰC THI (WALKING SKELETON) KHI GỌI CÁC HÀM NÀY

Khi thông luồng toàn bộ dự án (ví dụ trong file `demo_day5_full_flow.py`), các hàm của SWE sẽ được gọi theo trình tự:

```text
[Form UI / App.tsx] 
       │
       ▼
[builder_d4.py :: create_recipe_d4()] ──► [validator.py :: graph_lint()]
                                                   │
                                                   ▼
[publish_manager.py :: handle_publish_request()] ◄── [Scorecard (AIE-2)]
       │
       ├── PASS  ──► Publish Version v1.0.0 (Lưu schema.py wb.recipe_versions)
       └── FAIL  ──► Rollback Version v0.9.0
```
