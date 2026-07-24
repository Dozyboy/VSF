# 🎯 MÔ TẢ NHIỆM VỤ DAY 04 — AIE-2 (LƯU TIẾN DUY)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#18`
* **Tiêu đề**: `Day 4 — AIE-2 (Lưu Tiến Duy) — Đóng băng Contract #4, dựng bộ 30 golden cases & LLM-judge evaluator`
* **Vị trí**: AI Engineer 2 (AIE-2)
* **Status**: Target Day 4

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- 5 tài liệu Callisto seed từ DE.
- Hợp đồng Contract #1 Recipe v1 frozen từ SWE.

### 🔹 Deliverables / Output phải bàn giao:
1. Đóng băng Contract #4 `packages/contracts/src/studio_contracts/scorecard.py`.
2. Bộ dữ liệu 30 Golden Cases `packages/evalhub/fixtures/golden_set_30.json`.
3. Evaluator LLM-as-a-Judge trong `studio_evalhub/judge.py`.
4. Unit test `tests/test_golden_eval.py` chạy chấm điểm bộ 30 Golden Cases.
5. File Daily Note D4 (`agentcore-report/daily-notes/2026-07-23-dholmes0207.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Khai báo Contract #4 Frozen trong `packages/contracts`
Tạo file `packages/contracts/src/studio_contracts/scorecard.py` chứa đối tượng `Scorecard` và `TestCaseResult`.

---

### 📌 Bước 2: Soạn Bộ Dữ Liệu 30 Golden Cases (`golden_set_30.json`)
Tạo file `packages/evalhub/fixtures/golden_set_30.json` chứa 30 câu hỏi và nhãn đáp án chuẩn cho 2 tenant `ankor` & `borea`.

---

### 📌 Bước 3: Viết Module LLM-as-a-Judge Evaluator (`judge.py`)
Tạo file `packages/evalhub/src/studio_evalhub/judge.py`:

```python
async def evaluate_with_llm_judge(prompt: str, expected: str, actual: str, citations: list) -> dict:
    """Gọi LLM-Judge chấm điểm chất lượng câu trả lời."""
    # Logic format prompt và parse kết quả JSON...
    return {"score": 0.90, "is_pass": True, "reasoning": "Câu trả lời đúng ngữ nghĩa và có trích dẫn chuẩn."}
```

---

### 📌 Bước 4: Viết Unit Test Chấm Điểm 30 Golden Cases (`test_golden_eval.py`)
Tạo test kiểm thử:

```python
async def test_full_golden_suite():
    evaluator = GoldenEvaluator(dataset_path="fixtures/golden_set_30.json")
    scorecard = await evaluator.run_evaluation(dummy_agent_fn)
    
    assert scorecard.total_cases == 30
    assert scorecard.overall_score >= 0.0
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Đóng băng Hợp đồng Contract #4 v1 trong `packages/contracts`.
- [ ] Hoàn thành bộ 30 Golden Cases trong `golden_set_30.json`.
- [ ] Cài đặt xong LLM-Judge Evaluator trong `studio_evalhub`.
- [ ] Unit test `test_golden_eval.py` PASS 100%.
- [ ] Push file Daily Note D4 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #18 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 04 (AIE-2 — Lưu Tiến Duy)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#18**:

#### 🟢 Các mục đã bàn giao:
- [x] **Frozen Contract #4**: Đóng băng `scorecard.py` Pydantic model trong `packages/contracts`.
- [x] **30 Golden Set**: Biên soạn xong bộ 30 ca kiểm thử vàng `golden_set_30.json` cho 2 tenant.
- [x] **LLM-as-a-Judge**: Cài đặt evaluator `judge.py` chấm điểm ngữ nghĩa và citation accuracy.
- [x] **Golden Suite Test**: Unit test `test_golden_eval.py` PASS 100%.

CC: @hieubui2409 (Mentor) / @group
```
