# 🎯 MÔ TẢ NHIỆM VỤ DAY 05 — AIE-2 (LƯU TIẾN DUY)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#22`
* **Tiêu đề**: `Day 5 — AIE-2 (Lưu Tiến Duy) — Chạy suite 30 golden cases, xuất scorecard & trả kết quả cho Eval-Gate`
* **Vị trí**: AI Engineer 2 (AIE-2)
* **Status**: Target Day 5

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Bộ 30 Golden Cases từ `golden_set_30.json`.
- Interpreter Execution Runner từ AIE-1.

### 🔹 Deliverables / Output phải bàn giao:
1. Module `studio_evalhub/eval_gate.py` tính toán phán quyết PASS/FAIL cho Eval-Gate.
2. File báo cáo `scorecard_report.json` của đợt kiểm thử Sprint 1.
3. Test suite `tests/test_degrade_rollback.py` kiểm thử tự động tính năng chặn xuất bản khi Agent kém chất lượng.
4. Tham gia Demo 8 bước và họp Retrospective Sprint 1.
5. File Daily Note D5 (`agentcore-report/daily-notes/2026-07-24-dholmes0207.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Viết Module Phán Quyết Eval-Gate (`eval_gate.py`)
Tạo file `packages/evalhub/src/studio_evalhub/eval_gate.py`:

```python
from studio_contracts.scorecard import Scorecard

def evaluate_gate_verdict(scorecard: Scorecard, min_score: float = 0.85) -> bool:
    """Đưa ra quyết định cuối cùng cho cổng Publish."""
    if scorecard.overall_score >= min_score:
        scorecard.pass_gate = True
    else:
        scorecard.pass_gate = False
    return scorecard.pass_gate
```

---

### 📌 Bước 2: Viết Unit Test Kiểm Tra Chặn & Rollback (`test_degrade_rollback.py`)
Tạo script test kiểm thử:

```python
def test_degrade_gate_blocking():
    # Tạo scorecard giả định không đạt (60%)
    bad_scorecard = Scorecard(
        eval_id="e1", agent_id="a1", timestamp=100.0,
        total_cases=30, passed_cases=18, overall_score=0.60, pass_gate=False
    )
    
    verdict = evaluate_gate_verdict(bad_scorecard)
    assert verdict == False # Chặn Publish thành công
```

---

### 📌 Bước 3: Phối Hợp Demo 8 Bước Sprint 1
Trình bày tính năng Eval-Gate ở Bước 6 luồng Demo trước Mentor và toàn nhóm.

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Chạy thành công suite 30 Golden Cases sinh đối tượng `Scorecard`.
- [ ] Module `eval_gate.py` trả về phán quyết PASS/FAIL chính xác.
- [ ] Test suite `test_degrade_rollback.py` PASS xanh 100%.
- [ ] Hoàn thành phần Demo Eval-Gate trong buổi tổng kết Sprint 1.
- [ ] Push file Daily Note D5 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #22 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 05 (AIE-2 — Lưu Tiến Duy)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#22**:

#### 🟢 Các mục đã bàn giao:
- [x] **Full 30 Golden Eval**: Chạy tự động thành công bộ 30 Golden Cases cho Agent.
- [x] **Eval-Gate Decision**: Module `eval_gate.py` trả về phán quyết chất lượng chính xác cho SWE wiring.
- [x] **Degrade & Rollback Tested**: Unit test `test_degrade_rollback.py` PASS 100%.
- [x] **Sprint 1 Demo**: Trình bày thành công tính năng Eval-Gate ở Bước 6 luồng Demo.
- [x] **Daily Note**: Push file Daily Note D5 `2026-07-24-dholmes0207.md`.

CC: @hieubui2409 (Mentor) / @group
```
