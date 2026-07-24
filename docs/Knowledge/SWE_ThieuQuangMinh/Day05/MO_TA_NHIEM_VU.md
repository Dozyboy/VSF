# 🎯 MÔ TẢ NHIỆM VỤ DAY 05 — SWE (THIỆU QUANG MINH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#19`
* **Tiêu đề**: `Day 5 — SWE (Thiệu Quang Minh) — Đấu nối publish flow + eval-gate wiring & version/rollback`
* **Vị trí**: Software Engineer (SWE — Lead tác giả Workflow)
* **Status**: Target Day 5

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Module Scorecard Runner từ AIE-2 (`packages/evalhub`).
- Recipe Validator hoàn chỉnh từ Day 4.

### 🔹 Deliverables / Output phải bàn giao:
1. Module `studio_workbench/publish_manager.py` xử lý luồng Publish / Rollback.
2. Integration Test `tests/test_publish_gate.py` kiểm tra 2 kịch bản (PASS ➔ Publish, FAIL ➔ Rollback).
3. Cập nhật Frontend React Web UI hiển thị kết quả Eval-Gate.
4. Tham gia Demo 8 bước và họp Retrospective Sprint 1.
5. File Daily Note D5 (`agentcore-report/daily-notes/2026-07-24-Dozyboy.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Khai báo Module Publish Manager (`publish_manager.py`)
Tạo file `packages/workbench/src/studio_workbench/publish_manager.py`:

```python
from studio_contracts.scorecard import Scorecard

async def handle_publish_request(agent_id: str, recipe: RecipeDAG, scorecard: Scorecard) -> dict:
    """Xử lý lệnh xuất bản dựa trên Scorecard từ EvalHub."""
    if scorecard.pass_gate and scorecard.overall_score >= 0.85:
        return {
            "status": "SUCCESS",
            "published_version": "v1.0.0",
            "message": f"Xuất bản thành công! Điểm đánh giá: {scorecard.overall_score * 100}%"
        }
    else:
        return {
            "status": "ROLLBACKED",
            "active_version": "v0.9.0",
            "message": f"Xuất bản thất bại! Điểm đánh giá {scorecard.overall_score * 100}% dưới ngưỡng 85%."
        }
```

---

### 📌 Bước 2: Viết Integration Test Kiểm Tra Eval-Gate Wiring
Tạo file test `tests/test_publish_gate.py`:

```python
async def test_publish_gate_pass():
    mock_scorecard = Scorecard(pass_gate=True, overall_score=0.90)
    res = await handle_publish_request("agent-1", sample_recipe, mock_scorecard)
    assert res["status"] == "SUCCESS"

async def test_publish_gate_fail_rollback():
    mock_scorecard = Scorecard(pass_gate=False, overall_score=0.65)
    res = await handle_publish_request("agent-1", sample_recipe, mock_scorecard)
    assert res["status"] == "ROLLBACKED"
```

---

### 📌 Bước 3: Trình Bày Demo Vòng Đời 8 Bước Sprint 1
Dẫn dắt bài trình bày Demo của cả nhóm trước Mentor, thực hiện xuất bản thành công một Agent vượt qua cổng kiểm định.

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Luồng Publish / Rollback hoạt động chính xác với kết quả Eval-Gate.
- [ ] Integration Test `test_publish_gate.py` PASS 100%.
- [ ] Hoàn thành phần Demo giao diện tác giả Agent trong buổi tổng kết Sprint 1.
- [ ] Push file Daily Note D5 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #19 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 05 (SWE — Thiệu Quang Minh)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#19**:

#### 🟢 Các mục đã bàn giao:
- [x] **Eval-Gate Wired**: Đấu nối thành công luồng Publish với bộ chấm điểm Scorecard từ AIE-2.
- [x] **Rollback Verified**: Kiểm thử tự động tính năng Rollback phiên bản khi điểm chất lượng không đạt.
- [x] **Sprint 1 Demo**: Lead bài trình bày Demo 8 bước thành công cho cả nhóm.
- [x] **Daily Note**: Push file Daily Note D5 `2026-07-24-Dozyboy.md`.

CC: @hieubui2409 (Mentor) / @group
```
