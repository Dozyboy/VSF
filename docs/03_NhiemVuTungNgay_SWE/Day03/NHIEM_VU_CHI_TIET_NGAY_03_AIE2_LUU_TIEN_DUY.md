# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ DAY 03 — AIE-2 (LƯU TIẾN DUY)

---

## 🚘 THÔNG TIN CHUNG VỀ ISSUE DAY 03 (AIE-2)
* **Issue ID**: Issue Day 3 (AIE-2)
* **Tiêu đề**: `Day 3 — AIE-2 (Lưu Tiến Duy) — Phác smoke-eval runner skeleton`
* **Parent Issue**: `Day 3 — cả nhóm · Form tạo agent + interpreter 3-node hardcode, PR đầu tiên`
* **Assignee**: Lưu Tiến Duy (`dholmes0207`)
* **Role**: AIE-2 (AI Engineer 2 — Phụ trách Evaluation, Smoke-Eval & Quality Assurance)

---

## 🎯 PHẦN I: TÓM TẮT MỤC TIÊU CỦA AIE-2 TRONG NGÀY 03

Trong Ngày 03, **AIE-2 (Lưu Tiến Duy)** tập trung xây dựng bộ bộ khung kiểm định chất lượng:

1. **Phác `smoke-eval runner` Skeleton**: Tạo cấu trúc module runner trong `packages/eval` để đọc các câu test case mẫu và chuẩn bị quy trình đánh giá.
2. **Thiết lập luồng so sánh `actual` vs `expected`**: Chuẩn bị sẵn logic so sánh đầu ra thực tế (`actual`) từ Interpreter với đáp án kỳ vọng (`expected`).
3. **Chờ Interpreter để nối dây**: Chuẩn bị giao diện chờ kết nối với hàm `interpreter.run()` của AIE-1 để kích hoạt kiểm thử tự động ở Ngày 4.

---

## 🔗 PHẦN II: SỰ PHỐI HỢP GIỮA AIE-2 VỚI SWE, DE VÀ AIE-1

```
┌──────────────────────────────┐ ┌──────────────────────────────┐
│    SWE (THIỆU QUANG MINH)    │ │     DE (NGUYỄN ĐÔNG ANH)     │
│  Tạo Recipe 3-Node           │ │  Bắt đầu dựng doc-factory    │
└──────────────┬───────────────┘ └──────────────┬───────────────┘
               │                                │
               └────────────────┬───────────────┘
                                │
                                ▼
                 ┌──────────────────────────────┐
                 │     AIE-1 (TRẦN BÁ ĐẠT)      │
                 │  Thực thi Recipe & xuất      │
                 │  kết quả RunResult           │
                 └──────────────┬───────────────┘
                                │ Truyền RunResult
                                ▼
                 ┌──────────────────────────────┐
                 │     AIE-2 (LƯU TIẾN DUY)     │
                 │  Phác Runner Skeleton        │
                 │  Đọc case ➔ So actual vs     │
                 │  expected ➔ Tính success     │
                 └──────────────────────────────┘
```

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN DÀNH CHO AIE-2

---

### 📌 BƯỚC 1: DỰNG KÍCH THƯỚC BỘ KHUNG `SMOKE-EVAL RUNNER`

#### 🎯 Thao tác thực hiện trong `packages/eval/src/studio_eval/runner_skeleton.py`:
```python
"""
Module: studio_eval.runner_skeleton
Tác giả: AIE-2 (Lưu Tiến Duy)
Mục đích: Phác bộ khung smoke-eval runner chuẩn bị nối với Interpreter ở Ngày 3.
"""

from typing import List, Dict


class SmokeEvalRunner:
    """Bộ khung Runner kiểm thử tự động chất lượng Agent."""

    def __init__(self, golden_cases: List[Dict]):
        self.golden_cases = golden_cases

    def evaluate_case(self, actual_output: str, expected_output: str) -> bool:
        """So sánh kết quả thực tế (actual) với đáp án kỳ vọng (expected)."""
        return actual_output.strip().lower() == expected_output.strip().lower()
```

---

## 📋 PHẦN IV: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) CỦA AIE-2

- [ ] **DoD 1**: Phác xong bộ khung `smoke-eval runner` skeleton.
- [ ] **DoD 2**: Định nghĩa hàm so sánh `actual` vs `expected` cơ bản.
- [ ] **DoD 3**: Chuẩn bị sẵn cổng chờ kết nối với `interpreter.run()` của AIE-1.
- [ ] **DoD 4**: Nộp báo cáo Daily Note D3 (`2026-07-22-TienDuy.md`).

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE DAY 03 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 03 (AIE-2 — Lưu Tiến Duy)

Chào Mentor và cả nhóm, mình đã hoàn thành xong nhiệm vụ Day 03:

#### 🟢 Các mục đã hoàn thành:
- [x] **Smoke-Eval Skeleton**: Phác xong bộ khung runner trong `studio_eval` đọc test cases.
- [x] **Comparison Logic**: Thiết lập logic so sánh `actual` vs `expected`.
- [x] **Wiring Interface**: Chuẩn bị sẵn cổng kết nối để chờ `interpreter.run()` của AIE-1 (@Trần Bá Đạt) nối sang ở Ngày 4.
- [x] **Daily Note**: Push file Daily Note D3 `2026-07-22-TienDuy.md`.

CC: @hieubui2049 (Mentor) / @group
```
