# 🎯 MÔ TẢ NHIỆM VỤ DAY 02 — DE (NGUYỄN ĐÔNG ANH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#9`
* **Tiêu đề**: `Day 2 — DE (Nguyễn Đông Anh) — Giữ bút draft v0 Contract #2 (kb.search) & Contract #3 (trace-event)`
* **Vị trí**: Data Engineer (DE)
* **Macro Goal**: Chuyển giao từ **G1 ➔ G2 ("Walking-Skeleton xâu-kim a➔z")**

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Môi trường Day 01 đã setup xanh 100%.
- Tài liệu kiến trúc `umbrella-contract.md` và `charter.md`.

### 🔹 Deliverables / Output phải bàn giao:
1. File `packages/kb/docs/contracts/kb-search.v0.md` (Dự thảo Contract #2 v0).
2. File `packages/kb/docs/contracts/trace-event.v0.md` (Dự thảo Contract #3 v0).
3. File `packages/kb/docs/callisto-doc-schema.md` (Quy chuẩn Callisto Frontmatter & Chunking).
4. File `packages/kb/docs/DESCOPE.md` (Kế hoạch cắt giảm 4 nấc cho mảng KB).
5. File `question-batch.md` chứa $\ge 3$ câu hỏi làm rõ gửi Mentor trước khi viết code.

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Soạn câu hỏi làm rõ (`question-batch`) gửi Mentor
Tạo file `question-batch.md` chứa 3 câu hỏi chất lượng liên quan đến Hợp đồng KB:
1. *Câu hỏi 1*: Hàm `kb.search` trả về mảng dictionary hay Pydantic model `KbSearchResult`?
2. *Câu hỏi 2*: Trường `cost_usd` trong `TraceEvent` do DE tính toán trực tiếp hay do AIE-1 truyền sang?
3. *Câu hỏi 3*: Chuẩn đặt tên `chunk_id` có cần bắt buộc dấu `#c` phân tách index không?

---

### 📌 Bước 2: Soạn thảo Dự thảo Contract #2 & Contract #3
- Tạo thư mục `packages/kb/docs/contracts/`.
- Viết file `kb-search.v0.md` định nghĩa tên hàm `search`, tham số `query`, `tenant`, `section_roles`, `top_k`.
- Viết file `trace-event.v0.md` định nghĩa class `TraceEvent` 12 trường thông tin Pydantic.

---

### 📌 Bước 3: Soạn file `DESCOPE.md` và `callisto-doc-schema.md`
- Viết 4 nấc descope bảo vệ mảng KB trong `packages/kb/docs/DESCOPE.md`.
- Quy định cấu trúc YAML Frontmatter tài liệu Callisto trong `callisto-doc-schema.md`.

---

### 📌 Bước 4: Kiểm tra Lint & Push Code
```bash
make lint
git add packages/kb/docs/
git commit -m "feat(kb): add v0 contracts, callisto schema and descope ladder"
git push origin feature/day-02-de
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Đã gửi bộ `question-batch` $\ge 3$ câu hỏi cho Mentor.
- [ ] Soạn xong dự thảo `kb-search.v0.md` và `trace-event.v0.md`.
- [ ] Tạo xong tài liệu `callisto-doc-schema.md`.
- [ ] Phác thảo xong 4 nấc hạ cấp trong `DESCOPE.md`.
- [ ] Lệnh `make lint` xanh 100%.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #9 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 02 (DE — Nguyễn Đông Anh)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ giữ bút bản v0 trên Issue **#9**:

#### 🟢 Các mục đã bàn giao:
- [x] **Contract #2 v0**: Khai báo `kb-search.v0.md` chữ ký hàm `kb.search`.
- [x] **Contract #3 v0**: Khai báo `trace-event.v0.md` cấu trúc `TraceEvent` 12 cột.
- [x] **Callisto Schema**: Viết `callisto-doc-schema.md` quy định Frontmatter & Deterministic Chunking.
- [x] **DESCOPE.md**: Xây dựng 4 nấc cắt giảm an toàn cho mảng KB.
- [x] **Question Batch**: Đã gửi 3 câu hỏi clarifying tới Mentor.

CC: @hieubui2409 (Mentor) / @SWE / @AIE-1 / @AIE-2
```
