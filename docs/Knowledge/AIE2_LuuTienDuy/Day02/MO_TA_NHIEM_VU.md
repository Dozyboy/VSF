# 🎯 MÔ TẢ NHIỆM VỤ DAY 02 — AIE-2 (LƯU TIẾN DUY)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#7`
* **Tiêu đề**: `Day 2 — AIE-2 (Lưu Tiến Duy) — Giữ bút draft v0 Contract #4 (scorecard) & scaffold packages/evalhub`
* **Vị trí**: AI Engineer 2 (AIE-2)
* **Macro Goal**: Chuyển giao từ **G1 ➔ G2 ("Walking-Skeleton xâu-kim a➔z")**

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Môi trường Day 01 đã setup xanh 100%.
- Tài liệu kiến trúc `umbrella-contract.md` và `charter.md`.

### 🔹 Deliverables / Output phải bàn giao:
1. Cấu trúc cây thư mục scaffold `packages/evalhub/`.
2. File `packages/evalhub/docs/contracts/scorecard.v0.md` (Dự thảo Contract #4 v0).
3. File `packages/evalhub/docs/smoke-cases.json` (Bộ 5 câu test mẫu chốt với DE).
4. File `packages/evalhub/docs/DESCOPE.md` (Kế hoạch cắt giảm 4 nấc cho mảng EvalHub).
5. File `question-batch.md` chứa $\ge 3$ câu hỏi làm rõ gửi Mentor trước khi gõ code.

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Soạn câu hỏi làm rõ (`question-batch`) gửi Mentor
Tạo file `question-batch.md` chứa 3 câu hỏi chất lượng:
1. *Câu hỏi 1*: Ngưỡng điểm đạt `pass_gate` mặc định là 80% hay 85%?
2. *Câu hỏi 2*: `citation_accuracy` được tính dựa trên trùng khớp `chunk_id` tuyệt đối hay overlap từ ngữ?
3. *Câu hỏi 3*: LLM-Judge có gọi OpenAI API riêng hay dùng chung venv với Engine?

---

### 📌 Bước 2: Dựng bộ khung Scaffold `packages/evalhub/`
Khởi tạo cấu trúc package:
```bash
mkdir -p packages/evalhub/src/studio_evalhub
mkdir -p packages/evalhub/tests
mkdir -p packages/evalhub/docs/contracts
```

---

### 📌 Bước 3: Soạn Dự thảo Contract #4 `scorecard.v0.md`
Viết file `scorecard.v0.md` định nghĩa cấu trúc Pydantic của `TestCaseResult` và `Scorecard`.

---

### 📌 Bước 4: Kiểm tra Lint & Push Code
```bash
make lint
git add packages/evalhub/
git commit -m "feat(evalhub): scaffold package, draft scorecard contract and smoke cases"
git push origin feature/day-02-aie2
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Đã gửi bộ `question-batch` $\ge 3$ câu hỏi cho Mentor.
- [ ] Push cấu trúc scaffold `packages/evalhub/` lên Git.
- [ ] Soạn xong dự thảo `scorecard.v0.md`.
- [ ] Chốt xong 5 câu test mẫu `smoke-cases.json` với DE.
- [ ] Phác thảo xong 4 nấc hạ cấp trong `DESCOPE.md`.
- [ ] Lệnh `make lint` xanh 100%.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #7 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 02 (AIE-2 — Lưu Tiến Duy)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#7**:

#### 🟢 Các mục đã bàn giao:
- [x] **Scaffold EvalHub**: Dựng bộ khung `packages/evalhub/`.
- [x] **Contract #4 v0**: Soạn dự thảo `scorecard.v0.md` quy định định dạng Bảng điểm kiểm định.
- [x] **Smoke Cases**: Chốt 5 câu test mẫu `smoke-cases.json` cùng DE (@DongAnh2704).
- [x] **DESCOPE.md**: Xây dựng 4 nấc cắt giảm an toàn cho mảng EvalHub.
- [x] **Question Batch**: Đã gửi 3 câu hỏi clarifying tới Mentor.

CC: @hieubui2409 (Mentor) / @group
```
