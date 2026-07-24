# 🎯 MÔ TẢ NHIỆM VỤ DAY 02 — AIE-1 (TRẦN BÁ ĐẠT)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#10`
* **Tiêu đề**: `Day 2 — AIE-1 (Trần Bá Đạt) — Phác khung interpreter loop & VCR fixtures format cho llm-step`
* **Vị trí**: AI Engineer 1 (AIE-1)
* **Macro Goal**: Chuyển giao từ **G1 ➔ G2 ("Walking-Skeleton xâu-kim a➔z")**

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Môi trường Day 01 đã setup xanh 100%.
- Tài liệu kiến trúc `umbrella-contract.md` và `charter.md`.

### 🔹 Deliverables / Output phải bàn giao:
1. Cấu trúc cây thư mục scaffold `packages/engine/`.
2. File `packages/engine/docs/contracts/interpreter-spec.v0.md` (Định nghĩa ExecutionContext & Runner loop).
3. Schema định dạng file VCR Fixture JSON `fixtures/vcr_schema.json`.
4. File `packages/engine/docs/DESCOPE.md` (Kế hoạch cắt giảm 4 nấc cho mảng Engine).
5. File `question-batch.md` chứa $\ge 3$ câu hỏi làm rõ gửi Mentor trước khi gõ code.

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Soạn câu hỏi làm rõ (`question-batch`) gửi Mentor
Tạo file `question-batch.md` chứa 3 câu hỏi chất lượng:
1. *Câu hỏi 1*: `ExecutionContext` có lưu lịch sử tin nhắn dạng List Dict hay đối tượng Message chuyên biệt?
2. *Câu hỏi 2*: Node `condition` xử lý biểu thức rẽ nhánh bằng `eval()` hay parser an toàn?
3. *Câu hỏi 3*: File VCR Fixture sẽ được đặt trong thư mục `fixtures/` hay đi kèm từng package?

---

### 📌 Bước 2: Dựng bộ khung Scaffold `packages/engine/`
Khởi tạo cấu trúc package:
```bash
mkdir -p packages/engine/src/studio_engine
mkdir -p packages/engine/tests
mkdir -p packages/engine/fixtures
```

---

### 📌 Bước 3: Soạn Định dạng VCR Fixtures và Phác thảo Execution Loop
Viết tài liệu spec trong `packages/engine/docs/` định nghĩa đối tượng `ExecutionContext` và khung runner loop.

---

### 📌 Bước 4: Kiểm tra Lint & Push Code
```bash
make lint
git add packages/engine/
git commit -m "feat(engine): scaffold package and draft interpreter loop spec"
git push origin feature/day-02-aie1
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Đã gửi bộ `question-batch` $\ge 3$ câu hỏi cho Mentor.
- [ ] Push cấu trúc scaffold `packages/engine/` lên Git.
- [ ] Phác thảo xong khung `Interpreter` loop và `ExecutionContext`.
- [ ] Định nghĩa xong schema cho VCR Fixture JSON.
- [ ] Phác thảo xong 4 nấc hạ cấp trong `DESCOPE.md`.
- [ ] Lệnh `make lint` xanh 100%.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #10 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 02 (AIE-1 — Trần Bá Đạt)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#10**:

#### 🟢 Các mục đã bàn giao:
- [x] **Scaffold Engine**: Dựng bộ khung `packages/engine/`.
- [x] **Interpreter Spec**: Phác thảo đối tượng `ExecutionContext` và luồng chạy duyệt DAG.
- [x] **VCR Fixtures**: Định nghĩa schema JSON ghi vẹt cho node `llm-step`.
- [x] **DESCOPE.md**: Xây dựng 4 nấc cắt giảm an toàn cho mảng Engine.
- [x] **Question Batch**: Đã gửi 3 câu hỏi clarifying tới Mentor.

CC: @hieubui2409 (Mentor) / @group
```
