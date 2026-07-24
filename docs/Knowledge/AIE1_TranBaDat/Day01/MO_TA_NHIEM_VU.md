# 🎯 MÔ TẢ NHIỆM VỤ DAY 01 — AIE-1 (TRẦN BÁ ĐẠT)

---

## 📌 THÔNG TIN CHUNG
* **Vị trí**: AI Engineer 1 (AIE-1) — Phụ trách Interpreter Engine & Node Executors
* **Macro Goal**: **G1 — "Đứng được trong Xưởng"**
* **Chủ đề chính**: Onboarding, Setup Môi trường Python, NDA Pledge, Pre-commit Secrets Scan, và Teach-back Interpreter Engine & 6 Node types.

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Repo skeleton monorepo `VSF` / `agentcore-studio-kit`.
- Cấu trúc thư mục `packages/engine`.

### 🔹 Deliverables / Output phải bàn giao:
1. Môi trường phát triển hoàn thiện: `pytest` xanh 100% trên Python.
2. Bản cam kết NDA Pledge đã ký + git hook `pre-commit` scan secrets được bật.
3. Bài trình bày Teach-back 10 phút mảng **Interpreter Engine & 6 Node Types đóng**.
4. File nhật ký làm việc `daily-note D1` (`agentcore-report/daily-notes/2026-07-20-TranBaDat2607.md`).

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

### 📌 Bước 2: Ký NDA & Bật Pre-commit Secrets Scan
- Copy `.env.example` thành `.env`.
- Cài đặt `pre-commit`:
```bash
pre-commit install
```

---

### 📌 Bước 3: Thuyết trình Teach-back mảng Interpreter Engine
Chuẩn bị nội dung trình bày 10 phút:
- Trình bày mô hình Stateless Execution Context: `execute(node, ctx) -> ctx'`.
- Giải thích chi tiết **6 loại node đóng** (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`).
- Trả lời các câu hỏi QA về việc tại sao nghiêm cấm node lạ trong Engine.

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Clone repo thành công với 7 submodules.
- [ ] Môi trường Python sẵn sàng, `pytest` xanh 100%.
- [ ] Kích hoạt thành công git hook `pre-commit`.
- [ ] Ký cam kết bảo mật NDA Pledge.
- [ ] Thuyết trình bài Teach-back mảng Engine thành công.
- [ ] Push file Daily Note D1 lên repo.

---

## 💬 MẪU BÁO CÁO DAILY NOTE D1 (AIE-1)

```markdown
# Daily Note Day 01 — AIE-1 (Trần Bá Đạt)

## 🟢 Việc đã hoàn thành:
- [x] Clone repo monorepo thành công.
- [x] Setup môi trường `make setup`, `pytest` xanh 100%.
- [x] Ký NDA Pledge & bật `pre-commit` scan secret.
- [x] Trình bày bài Teach-back mảng Interpreter Engine & 6 Node Types đóng.

## 🧠 Bài học rút ra:
- Interpreter hoạt động theo cơ chế Stateless Context Passing giúp dễ dàng serialize/deserialize trạng thái khi gặp node HITL-Pause.
- Khóa cứng 6 Node Types đóng là biện pháp phòng thủ vững chắc ngăn các hành vi rủi ro bảo mật trong DAG execution.
```
