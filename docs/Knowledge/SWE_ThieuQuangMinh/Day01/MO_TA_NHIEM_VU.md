# 🎯 MÔ TẢ NHIỆM VỤ DAY 01 — SWE (THIỆU QUANG MINH)

---

## 📌 THÔNG TIN CHUNG
* **Vị trí**: Software Engineer (SWE) — Phụ trách Workbench UI & Recipe Architecture
* **Macro Goal**: **G1 — "Đứng được trong Xưởng"**
* **Chủ đề chính**: Onboarding, Setup Môi trường, NDA Pledge, Pre-commit Secrets Scan, và Teach-back Workbench / Recipe boundary.

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Repo skeleton monorepo `VSF` / `agentcore-studio-kit`.
- Cấu trúc thư mục `packages/workbench` và `apps/web`.

### 🔹 Deliverables / Output phải bàn giao:
1. Môi trường phát triển hoàn thiện: `pytest` xanh 100% trên Python 3.12/3.14.
2. Bản cam kết NDA Pledge đã ký + git hook `pre-commit` scan secrets được bật.
3. Bài trình bày Teach-back 10 phút mảng **Workbench UI & Engine vs. Recipe Boundary**.
4. File nhật ký làm việc `daily-note D1` (`agentcore-report/daily-notes/2026-07-20-Dozyboy.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Setup Môi trường & Clone Repository
Thực hiện các lệnh trong terminal:
```bash
git clone --recursive <repo-url>
cd VSF
make setup
```
Chạy pytest kiểm tra môi trường:
```bash
pytest
```
*Yêu cầu*: Màn hình test xanh 100%.

---

### 📌 Bước 2: Ký NDA & Bật Hook Bảo mật Secret Scan
- Copy `.env.example` thành `.env`.
- Bật git hook `pre-commit`:
```bash
pre-commit install
```

---

### 📌 Bước 3: Thuyết trình Teach-back mảng Workbench / Recipe
Chuẩn bị nội dung trình bày 10 phút:
- Giải thích ranh giới **Engine | Recipe made literal**: Tại sao Workbench lại tạo file Recipe cấu hình thay vì sửa code lõi trong Engine?
- Trình bày 3 nấc Fallback UI: React Flow Canvas $\rightarrow$ Form UI $\rightarrow$ Text Mermaid.
- Giải thích vai trò của `graph_lint` kiểm tra chu trình đồ thị DAG.

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Clone repo thành công với 7 submodules.
- [ ] Môi trường Python sẵn sàng, `pytest` xanh 100%.
- [ ] Kích hoạt thành công `pre-commit` scan secret.
- [ ] Ký cam kết bảo mật NDA Pledge.
- [ ] Thuyết trình bài Teach-back thành công trước team & Mentor.
- [ ] Push file Daily Note D1 lên repo.

---

## 💬 MẪU BÁO CÁO DAILY NOTE D1 (SWE)

```markdown
# Daily Note Day 01 — SWE (Thiệu Quang Minh)

## 🟢 Việc đã hoàn thành:
- [x] Clone repo thành công.
- [x] Setup môi trường `make setup`, `pytest` xanh 100%.
- [x] Ký NDA Pledge & bật `pre-commit` scan secret.
- [x] Trình bày bài Teach-back mảng Workbench/Recipe boundary.

## 🧠 Bài học rút ra:
- Tách biệt Engine (code lõi thực thi) và Recipe (config khai báo) giúp hệ thống mở rộng linh hoạt mà không gây sập mã nguồn khi thay đổi yêu cầu.
- Graph Validator đóng vai trò chốt chặn kiểm tra lỗi chu trình DAG trước khi chuyển Recipe cho Engine.
```
