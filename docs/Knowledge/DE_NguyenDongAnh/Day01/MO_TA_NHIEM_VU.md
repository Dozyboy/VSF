# 🎯 MÔ TẢ NHIỆM VỤ DAY 01 — DE (NGUYỄN ĐÔNG ANH)

---

## 📌 THÔNG TIN CHUNG
* **Vị trí**: Data Engineer (DE) — Phụ trách KB Pipeline & Security Data Fencing
* **Macro Goal**: **G1 — "Đứng được trong Xưởng"**
* **Chủ đề chính**: Onboarding, Setup Môi trường Python 3.12/3.14, NDA Pledge, Pre-commit Secrets Scan, và Teach-back KB Pipeline.

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Repository monorepo `VSF` / `agentcore-studio-kit`.
- Dữ liệu seed mẫu tài liệu Callisto Handbook (`Day1_VSF/`).
- File cấu hình môi trường `.env.example`.

### 🔹 Deliverables / Output phải bàn giao:
1. Môi trường phát triển hoàn thiện: `pytest` chạy xanh 100% trên Python.
2. Bản cam kết NDA Pledge đã ký + git hook `pre-commit` scan secrets được bật.
3. Bài trình bày Teach-back 10 phút về mảng **KB Pipeline & PostgreSQL RLS Security Fence**.
4. File nhật ký làm việc `daily-note D1` (`agentcore-report/daily-notes/2026-07-20-DongAnh2704.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Setup Môi trường & Clone Repository
Thực hiện các lệnh trong terminal để dựng môi trường:
```bash
git clone --recursive <repo-url>
cd VSF
make setup
```
Kiểm tra phiên bản Python và chạy pytest:
```bash
pytest
```
*Yêu cầu*: Màn hình pytest xanh 100% (0 lỗi).

---

### 📌 Bước 2: Ký NDA & Kích hoạt Hook Bảo mật Pre-commit
- Copy file `.env.example` thành `.env` và điền DSN Postgres mẫu.
- Cài đặt `pre-commit` để tự động chặn commit secret key:
```bash
pre-commit install
```

---

### 📌 Bước 3: Thuyết trình Teach-back mảng KB Pipeline
Chuẩn bị nội dung trình bày 10 phút trước nhóm & Mentor:
- Trình bày luồng 4 bước của KB Pipeline: Ingest $\rightarrow$ Chunk $\rightarrow$ Embed $\rightarrow$ Index.
- Giải thích nguyên lý **Fence-tại-retrieval**: Tại sao RLS lại bảo vệ dữ liệu tốt hơn lọc ở tầng app?
- Trả lời các câu hỏi QA từ Mentor về cơ chế Fail-closed của Postgres RLS.

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DEFINITION OF DONE — DoD)

- [ ] Clone repo thành công với 7 submodules.
- [ ] Môi trường Python sẵn sàng, `pytest` xanh 100%.
- [ ] Đã kích hoạt git hook `pre-commit` scan secret.
- [ ] Ký cam kết bảo mật NDA Pledge.
- [ ] Thuyết trình thành công bài Teach-back mảng KB cho toàn team.
- [ ] Push file Daily Note D1 lên repo.

---

## 💬 MẪU BÁO CÁO DAILY NOTE D1 (DE)

```markdown
# Daily Note Day 01 — DE (Nguyễn Đông Anh)

## 🟢 Việc đã hoàn thành:
- [x] Clone repo monorepo thành công.
- [x] Setup môi trường `uv sync`, `pytest` xanh 100%.
- [x] Ký NDA Pledge & bật `pre-commit` scan secret.
- [x] Trình bày bài Teach-back mảng KB Pipeline & Postgres RLS.

## 🧠 Bài học rút ra:
- Postgres RLS hoạt động ở tầng DB Engine giúp đảm bảo nguyên tắc Fail-closed security ngay cả khi ứng dụng bị SQL/Prompt injection.
- Deterministic Chunk ID là điều kiện tiên quyết để bảo vệ tính chính xác của bộ test Golden Set.
```
