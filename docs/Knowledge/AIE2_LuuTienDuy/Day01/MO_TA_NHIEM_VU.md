# 🎯 MÔ TẢ NHIỆM VỤ DAY 01 — AIE-2 (LƯU TIẾN DUY)

---

## 📌 THÔNG TIN CHUNG
* **Vị trí**: AI Engineer 2 (AIE-2) — Phụ trách Evaluation Harness & Scorecard Metrics
* **Macro Goal**: **G1 — "Đứng được trong Xưởng"**
* **Chủ đề chính**: Onboarding, Setup Môi trường Python, NDA Pledge, Pre-commit Secrets Scan, và Teach-back Eval-Gate & Scorecard Format.

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Repo skeleton monorepo `VSF` / `agentcore-studio-kit`.
- Cấu trúc thư mục `packages/evalhub`.

### 🔹 Deliverables / Output phải bàn giao:
1. Môi trường phát triển hoàn thiện: `pytest` xanh 100% trên Python.
2. Bản cam kết NDA Pledge đã ký + git hook `pre-commit` scan secrets được bật.
3. Bài trình bày Teach-back 10 phút mảng **Eval-Gate & Scorecard Format**.
4. File nhật ký làm việc `daily-note D1` (`agentcore-report/daily-notes/2026-07-20-dholmes0207.md`).

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
*Yêu cầu*: Test xanh 100%.

---

### 📌 Bước 2: Ký NDA & Bật Hook Bảo mật Secret Scan
- Copy `.env.example` thành `.env`.
- Cài đặt `pre-commit`:
```bash
pre-commit install
```

---

### 📌 Bước 3: Thuyết trình Teach-back mảng Eval-Gate
Chuẩn bị nội dung trình bày 10 phút:
- Trình bày cơ chế **Eval-Gate là cổng kiểm định**: PASS Scorecard mới cho Publish; FAIL ➔ Chặn & Rollback.
- Giải thích 4 nhóm chỉ số trong Bảng điểm Scorecard Format.
- Minh họa cách làm việc của Trace Playground.

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Clone repo thành công với 7 submodules.
- [ ] Môi trường Python sẵn sàng, `pytest` xanh 100%.
- [ ] Kích hoạt thành công git hook `pre-commit`.
- [ ] Ký cam kết bảo mật NDA Pledge.
- [ ] Thuyết trình bài Teach-back mảng Eval-Gate thành công.
- [ ] Push file Daily Note D1 lên repo.

---

## 💬 MẪU BÁO CÁO DAILY NOTE D1 (AIE-2)

```markdown
# Daily Note Day 01 — AIE-2 (Lưu Tiến Duy)

## 🟢 Việc đã hoàn thành:
- [x] Clone repo monorepo thành công.
- [x] Setup môi trường `make setup`, `pytest` xanh 100%.
- [x] Ký NDA Pledge & bật `pre-commit` scan secret.
- [x] Trình bày bài Teach-back mảng Eval-Gate & Scorecard Format.

## 🧠 Bài học rút ra:
- Eval-Gate đóng vai trò chốt chặn an toàn cuối cùng ngăn việc phát hành một Agent chưa đạt chuẩn ra môi trường production.
- Citation Accuracy là chỉ số quan trọng nhất để đánh giá một RAG Agent có bị hallucinate hay không.
```
