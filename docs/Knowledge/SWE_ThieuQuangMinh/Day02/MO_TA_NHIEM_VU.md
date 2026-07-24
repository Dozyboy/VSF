# 🎯 MÔ TẢ NHIỆM VỤ DAY 02 — SWE (THIỆU QUANG MINH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#8`
* **Tiêu đề**: `Day 2 — SWE (Thiệu Quang Minh) — Giữ bút draft v0 Contract #1 (recipe) & scaffold packages/workbench`
* **Vị trí**: Software Engineer (SWE)
* **Macro Goal**: Chuyển giao từ **G1 ➔ G2 ("Walking-Skeleton xâu-kim a➔z")**

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Môi trường Day 01 đã setup xanh 100%.
- Tài liệu kiến trúc `umbrella-contract.md` và `charter.md`.

### 🔹 Deliverables / Output phải bàn giao:
1. Cấu trúc cây thư mục scaffold `packages/workbench/`.
2. File `packages/workbench/docs/contracts/recipe.v0.md` (Dự thảo Contract #1 v0).
3. File `packages/workbench/docs/DESCOPE.md` (Kế hoạch cắt giảm 4 nấc cho mảng SWE).
4. File `question-batch.md` chứa $\ge 3$ câu hỏi làm rõ gửi Mentor trước khi gõ code.

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Soạn câu hỏi làm rõ (`question-batch`) gửi Mentor
Tạo file `question-batch.md` chứa 3 câu hỏi chất lượng:
1. *Câu hỏi 1*: File `RecipeDAG` có cần bắt buộc hỗ trợ nhánh rẽ Condition đa nhánh hay chỉ 2 nhánh True/False?
2. *Câu hỏi 2*: `agent_config` có cần lưu trực tiếp vào Postgres DB hay dạng file JSON tĩnh ở Day 2?
3. *Câu hỏi 3*: `tool_whitelist` trong `AgentConfig` có giới hạn số lượng Tool được chọn không?

---

### 📌 Bước 2: Dựng bộ khung Scaffold `packages/workbench/`
Khởi tạo cấu trúc package và file `pyproject.toml`:
```bash
mkdir -p packages/workbench/src/studio_workbench
mkdir -p packages/workbench/tests
mkdir -p packages/workbench/docs/contracts
```

---

### 📌 Bước 3: Soạn Dự thảo Contract #1 `recipe.v0.md`
Viết file `recipe.v0.md` định nghĩa cấu trúc JSON Schema của `AgentConfig`, `RecipeNode`, và `RecipeDAG`.

---

### 📌 Bước 4: Kiểm tra Lint & Push Code
```bash
make lint
git add packages/workbench/
git commit -m "feat(workbench): scaffold package and draft recipe.v0 contract"
git push origin feature/day-02-swe
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Đã gửi bộ `question-batch` $\ge 3$ câu hỏi cho Mentor.
- [ ] Push cấu trúc scaffold `packages/workbench/` lên Git.
- [ ] Soạn xong dự thảo `recipe.v0.md`.
- [ ] Phác thảo xong 4 nấc hạ cấp trong `DESCOPE.md`.
- [ ] Lệnh `make lint` xanh 100%.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #8 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 02 (SWE — Thiệu Quang Minh)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ giữ bút bản v0 trên Issue **#8**:

#### 🟢 Các mục đã bàn giao:
- [x] **Scaffold Workbench**: Dựng xong bộ khung `packages/workbench/`.
- [x] **Contract #1 v0**: Soạn dự thảo `recipe.v0.md` quy định cấu trúc Recipe DAG và AgentConfig.
- [x] **DESCOPE.md**: Xây dựng 4 nấc cắt giảm an toàn cho mảng Workbench & Web UI.
- [x] **Question Batch**: Đã gửi 3 câu hỏi clarifying tới Mentor.

CC: @hieubui2409 (Mentor) / @group
```
