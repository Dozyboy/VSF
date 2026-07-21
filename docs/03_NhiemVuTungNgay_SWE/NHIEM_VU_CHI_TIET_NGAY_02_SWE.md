# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ NGÀY 2 (SWE — THIỆU QUANG MINH)

Tài liệu này hướng dẫn từng bước cụ thể thực hiện toàn bộ công việc và tiêu chuẩn hoàn thành (DoD) cho **Ngày 2 (Thứ Ba 21/07 - Chặng 1 - Tuần 1)**.

---

## 💡 TINH THẦN CHUNG NGÀY 2
* **Chủ đề chính:** *Đọc kỹ đề ➔ Dựng khung Repo (Scaffold) ➔ Thống nhất Hợp đồng v0 ➔ Soạn Descope & Hỏi Mentor trước khi gõ code.*
* **Luật Tuần 1:** **Hỏi rõ trước (Clarify-first)**. Hôm nay chưa vội viết logic phức tạp, tập trung dựng bộ khung vững chắc và chốt chuẩn giao tiếp với nhóm.

---

## 🎯 I. THỰC HIỆN CHI TIẾT 3 VIỆC RIÊNG CỦA SWE

### 1️⃣ Việc 1: Viết nháp bản v0 giao kèo `recipe` (Contract #1)
* **Vị trí file:** `packages/contracts/src/studio_contracts/recipe.py`
* **Hành động:** 
  * Khai báo Class/TypedDict/Pydantic `Recipe` phiên bản nháp v0.
  * Đảm bảo chứa trường `agent_config` tối thiểu gồm:
    * `instructions: str` (Câu dặn AI / Prompt gốc).
    * `model: str` (Tên mô hình AI, ví dụ: `gemini-2.5-flash`).
    * `tool_whitelist: list[str]` (Danh sách các Tool được cấp phép).
  * Chứa cấu trúc `dag` (các nodes & edges) và `kb_binding` (`kb_id` & `scope`).

### 2️⃣ Việc 2: Dựng khung package `workbench/` (Bàn tạo Agent)
* **Vị trí thư mục:** `packages/workbench/src/studio_workbench/`
* **Hành động:** 
  * Tạo khung xương cấu trúc file (chưa cần viết logic bên trong, chỉ viết hàm rỗng với `raise NotImplementedError` hoặc `pass`):
    * `validator.py`: Khai báo hàm `graph_lint(recipe)`.
    * `publish.py`: Khai báo hàm `publish(recipe, scorecard)` và `rollback(agent_id, tenant, to_version)`.
    * `tenant_wall.py`: Khai báo hàm `resolve_tenant(session)`.
    * `schema.py`: Khai báo DDL bảng `wb.recipes` và `wb.recipe_versions`.

### 3️⃣ Việc 3: Phác thảo các ô nhập của Form (`form field`)
* **Mục đích:** Phác sẵn danh sách các trường dữ liệu trên giao diện Form tạo Agent.
* **Hành động:** Liệt kê các ô nhập liệu cần có:
  1. Ô gõ tên Agent (`agent_id`).
  2. Ô chọn Tenant sở hữu (`tenant`).
  3. Ô nhập câu lệnh Prompt hướng dẫn (`instructions`).
  4. Dropdown chọn Mô hình AI (`model`).
  5. Checklist chọn danh sách Tool được phép (`tool_whitelist`).
  6. Dropdown chọn Kho tài liệu KB (`kb_binding.kb_id`).
  * *Sau này khi người dùng điền đủ Form này ➔ Hệ thống tự động đóng gói sinh ra file `Recipe`.*

---

## ✅ II. TIÊU CHUẨN HOÀN THÀNH (DEFINITION OF DONE — DoD)

Để tính là hoàn thành 100% Ngày 2, cả nhóm phải hoàn thành 5 đầu việc sau:

### 🗳️ 1. Khung Repo 4 góc việc đã Push lên Git
* Cả 4 thành viên (SWE, DE, AIE-1, AIE-2) đã commit và push cây thư mục 4 package (`packages/workbench`, `packages/kb`, `packages/engine`, `packages/evalhub`) lên repository Git chung.

### 📜 2. File `DESCOPE.md` viết sẵn 4 nấc cắt giảm
* Tạo file `DESCOPE.md` ở gốc repo, thống nhất sẵn 4 nấc lùi dự phòng khi bị trễ tiến độ:
  * **Nấc 1 (KB):** Chưa xong Pipeline KB ➔ Dùng dữ liệu giả (Stub).
  * **Nấc 2 (Canvas):** Chưa xong kéo-thả ➔ Dùng Form nhập liệu + Sơ đồ chuỗi chữ (Mermaid).
  * **Nấc 3 (Judge):** AI Judge chưa xong ➔ Chấm điểm bằng so sánh từ chính xác (Exact-match).
  * **Nấc 4 (Dashboard):** UI Dashboard chưa xong ➔ In kết quả ra dòng lệnh Terminal (CLI).

### ❄️ 3. 4 Bản giao kèo v0 đặt tên khớp `umbrella-contract.md §3`
* Xác nhận 4 file code trong `packages/contracts/src/studio_contracts/` khớp đúng tên trường theo spec:
  1. `recipe.py` (Do SWE giữ bút).
  2. `trace_event.py` (Do DE giữ bút).
  3. `kb.py` - signature `kb.search` (Do DE giữ bút).
  4. `scorecard.py` (Do AIE-2 giữ bút).

### ❓ 4. Bộ câu hỏi ≥ 3 câu (`question-batch`) gửi Mentor
* Gom ít nhất 3 thắc mắc của nhóm về đề bài, kiến trúc hoặc hợp đồng để gửi cho Mentor giải đáp trước khi gõ code thật.

### 📝 5. Viết nhật ký ngày (`daily-note`) D2
* Mỗi thành viên tạo file báo cáo tiến độ ngày `D02-report-SWE-ThieuQuangMinh.md` và push lên Git.

---

## 🔒 III. RÀNG BUỘC BẮT BUỘC

1. **Khóa đúng 6 Node:** Chỉ được phép dùng 6 loại node (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`). CẤM thêm loại node lạ.
2. **Trạng thái v0:** 4 bản Hợp đồng mới ở mức v0 (nháp), chưa đóng băng (freeze). Cuối Tuần 1 mới đóng băng chính thức.
3. **Giữ Walking-Skeleton:** Mỗi nấc cắt giảm trong `DESCOPE.md` vẫn phải đảm bảo luồng chạy từ A➔Z của dự án hoạt động được.
