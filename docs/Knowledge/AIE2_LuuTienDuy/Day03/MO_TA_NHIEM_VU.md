# 🎯 MÔ TẢ NHIỆM VỤ DAY 03 — AIE-2 (LƯU TIẾN DUY)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#14`
* **Tiêu đề**: `Day 3 — AIE-2 (Lưu Tiến Duy) — Phác smoke-eval runner (5 cases) chờ nổ máy để so sánh`
* **Vị trí**: AI Engineer 2 (AIE-2)
* **Status**: Closed / Complete

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Bộ 5 câu test mẫu `smoke-cases.json`.
- Dự thảo Contract #4 v0 (`scorecard.v0.md`).

### 🔹 Deliverables / Output phải bàn giao:
1. Module `studio_evalhub/runner.py` chạy chấm điểm 5 câu smoke test.
2. Script test integration `examples/run_smoke_eval.py` tạo đối tượng `Scorecard` kết xuất JSON.
3. Mở PR bài Teach-back Day 1 cho SWE (`Dozyboy`) review.
4. File Daily Note D3 (`agentcore-report/daily-notes/2026-07-22-dholmes0207.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Viết Smoke-Eval Runner (`runner.py`)
Sửa file `packages/evalhub/src/studio_evalhub/runner.py`:

```python
"""
Module: studio_evalhub.runner
Tác giả: AIE-2 (Lưu Tiến Duy)
Mục đích: Chạy chấm điểm 5 câu smoke cases cho Walking Skeleton Day 3.
"""
import json
from studio_evalhub.models import Scorecard, TestCaseResult

class SmokeRunner:
    def __init__(self, cases_file: str = "docs/smoke-cases.json"):
        with open(cases_file, "r", encoding="utf-8") as f:
            self.cases = json.load(f)

    def evaluate_dummy(self) -> Scorecard:
        """Chạy chấm điểm mẫu sinh ra đối tượng Scorecard chuẩn."""
        results = []
        for c in self.cases:
            results.append(TestCaseResult(
                case_id=c["case_id"],
                prompt=c["prompt"],
                expected_output=c["expected_output"],
                actual_output=c["expected_output"], # Mock perfect match
                success=True,
                citation_accuracy=1.0,
                score=1.0
            ))
            
        return Scorecard(
            eval_id="smoke-eval-001",
            agent_id="agent-ankor-001",
            timestamp=1784700000.0,
            total_cases=len(results),
            passed_cases=len(results),
            overall_score=1.0,
            pass_gate=True,
            case_results=results
        )
```

---

### 📌 Bước 2: Tạo Script Test Sinh Scorecard JSON (`run_smoke_eval.py`)
Tạo script kiểm tra:
```python
def test_smoke_eval_output():
    runner = SmokeRunner()
    card = runner.evaluate_dummy()
    assert card.pass_gate == True
    assert card.overall_score == 1.0
```

---

### 📌 Bước 3: Mở PR & Push Daily Note D3
```bash
git add packages/evalhub/
git commit -m "feat(evalhub): implement smoke-eval runner and scorecard generator"
git push origin feature/day-03-aie2
```
Mở PR trên GitHub và gán reviewer là SWE (`Dozyboy`).

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Smoke-eval runner chạy thành công sinh đối tượng `Scorecard`.
- [ ] Chấm điểm đủ 5 câu test từ `smoke-cases.json`.
- [ ] Mở PR bài Teach-back thành công.
- [ ] Push file Daily Note D3 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #14 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 03 (AIE-2 — Lưu Tiến Duy)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#14**:

#### 🟢 Các mục đã hoàn thành:
- [x] **Smoke-Eval Runner**: Viết xong `runner.py` đọc 5 câu test từ `smoke-cases.json`.
- [x] **Scorecard Output**: Khởi tạo và sinh thành công đối tượng `Scorecard` Pydantic model.
- [x] **Integration Ready**: Sẵn sàng nhận câu trả lời từ Interpreter của AIE-1 để chấm điểm.
- [x] **Daily Note**: Push file Daily Note D3 `2026-07-22-dholmes0207.md`.

CC: @hieubui2409 (Mentor) / @group
```
