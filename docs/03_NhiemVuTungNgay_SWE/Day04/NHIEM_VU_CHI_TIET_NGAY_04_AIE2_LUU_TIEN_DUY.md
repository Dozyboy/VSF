# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ DAY 04 — AIE-2 (LƯU TIẾN DUY)

---

## 🚘 THÔNG TIN CHUNG VỀ ISSUE DAY 04 (AIE-2)
* **Issue ID**: `#19`
* **Tiêu đề**: `Day 4 — AIE-2 (Lưu Tiến Duy) — Bút smoke-eval runner 5 case: chạy agent qua interpreter -> so actual vs expected -> scorecard v0 (success + citation_accuracy thô) -> in bảng điểm`
* **Parent Issue**: `Day 4 — cả nhóm · KB stub 5 doc + kb.search thô + smoke-eval bảng điểm`
* **Assignee**: Lưu Tiến Duy (`dholmes0207`)
* **Role**: AIE-2 (AI Engineer 2 — Phụ trách Evaluation, Scorecard & Quality Assurance)
* **Labels**: `day-04`, `role:aie-2`
* **Milestone**: `Sprint 1 — Gate Day 10`

---

## 🎯 PHẦN I: TÓM TẮT MỤC TIÊU CỦA AIE-2 TRONG NGÀY 04

Trong Ngày 4, **AIE-2 (Lưu Tiến Duy)** giữ vai trò thẩm định chất lượng toàn luồng bằng cách xây dựng bộ công cụ **Smoke-Eval Runner**:

1. **Bút `smoke-eval runner` 5 cases**: Lấy 5 câu test từ bộ Golden Cases nhãn tay của DE, kích hoạt chạy Agent qua hàm `interpreter.run()` của AIE-1.
2. **So sánh `actual` vs `expected`**: So sánh câu trả lời và mã trích dẫn `chunk_id` thực tế (`actual`) thu được từ Interpreter với đáp án chuẩn (`expected` ground truth).
3. **Tính điểm `scorecard v0` & In Bảng điểm CLI**: Tính toán chỉ số `success_rate` và `citation_accuracy`, sau đó in bảng điểm 5 dòng chuẩn đẹp ra màn hình CLI.

---

## 🔗 PHẦN II: SỰ PHỐI HỢP GIỮA AIE-2 VỚI SWE, DE VÀ AIE-1

```
┌───────────────────────────────────────┐             ┌───────────────────────────────────┐
│        DE (NGUYỄN ĐÔNG ANH)           │             │       SWE (THIỆU QUANG MINH)      │
│  Cung cấp bộ 5 Golden Cases có        │             │  Cung cấp Recipe chứa kb_binding  │
│  gắn nhãn tay (Ground Truth)          │             │  chuẩn Tenant Scope               │
└───────────────────┬───────────────────┘             └───────────────────┬───────────────┘
                    │                                                     │
                    └─────────────────────────┬───────────────────────────┘
                                              │
                                              ▼
                               ┌──────────────────────────────┐
                               │     AIE-2 (LƯU TIẾN DUY)     │
                               │ 1. Đọc Golden Cases (từ DE)  │
                               │ 2. Đọc Recipe (từ SWE)       │
                               │ 3. Gọi run() qua Interpreter │
                               │ 4. So sánh actual vs expected│
                               │ 5. In Bảng điểm 5 dòng CLI   │
                               └──────────────┬───────────────┘
                                              │ Gọi interpreter.run()
                                              ▼
                               ┌──────────────────────────────┐
                               │      AIE-1 (TRẦN BÁ ĐẠT)     │
                               │  Thực thi Recipe & trả về    │
                               │  kết quả chứa `chunk_id`     │
                               └──────────────────────────────┘
```

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN DÀNH CHO AIE-2

---

### 📌 BƯỚC 1: XÂY DỰNG `SMOKE-EVAL RUNNER` TRONG `STUDIO_EVAL`

#### 🎯 Thao tác thực hiện trong `packages/eval/src/studio_eval/smoke_runner.py`:
```python
"""
Module: studio_eval.smoke_runner
Tác giả: AIE-2 (Lưu Tiến Duy)
Mục đích: Chạy thử nghiệm 5 Golden Cases qua Interpreter và tính toán điểm Scorecard v0.
"""

import asyncio
from studio_engine.interpreter import run as run_interpreter
from studio_kb.golden_dataset import GET_GOLDEN_5_CASES
from studio_workbench.builder import create_recipe_d4


async def run_smoke_eval_5_cases():
    """Chạy 5 case test qua Interpreter và chấm điểm Scorecard v0."""
    recipe = create_recipe_d4()
    golden_cases = GET_GOLDEN_5_CASES()
    
    results = []

    for case in golden_cases:
        # 1. Gọi agent chạy qua Interpreter của AIE-1
        run_result = await run_interpreter(recipe, user_query=case["query"])

        # 2. Lấy actual citations và actual output
        actual_citations = run_result.state.get("citations", [])
        retrieved_chunk = actual_citations[0] if actual_citations else "N/A"

        # 3. So sánh actual vs expected
        citation_match = (retrieved_chunk == case["expected_chunk_id"])
        success = (run_result.status == "SUCCESS") and citation_match

        results.append({
            "case_id": case["case_id"],
            "success": success,
            "retrieved_chunk_id": retrieved_chunk,
            "citation_match": citation_match
        })

    # 4. In Bảng điểm CLI 5 dòng chuẩn DoD
    print_cli_scorecard(results)
```

---

### 📌 BƯỚC 2: THIẾT KẾ BẢNG ĐIỂM IN RA CLI (SCORECARD V0)

#### 🎯 Định dạng Bảng điểm CLI 5 dòng:
```python
def print_cli_scorecard(results: list[dict]):
    print("\n" + "="*70)
    print("📊 BẢNG ĐIỂM KẾT QUẢ SMOKE-EVAL DAY 04 (SCORECARD V0)")
    print("="*70)
    print(f"{'CASE ID':<10} | {'STATUS':<10} | {'CITATION CHUNK ID':<25} | {'MATCH':<8}")
    print("-" * 70)

    passed_count = 0
    for r in results:
        status_str = "SUCCESS" if r["success"] else "FAILED"
        match_str = "PASS" if r["citation_match"] else "FAIL"
        if r["success"] and r["citation_match"]:
            passed_count += 1
        print(f"{r['case_id']:<10} | {status_str:<10} | {r['retrieved_chunk_id']:<25} | {match_str:<8}")

    print("="*70)
    print(f"🎯 SCORECARD V0: {passed_count}/5 Cases PASSED ({passed_count/5*100:.0f}%)")
    print("="*70 + "\n")
```

---

## 📋 PHẦN IV: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) CỦA AIE-2

- [ ] **DoD 1**: Bút `smoke-eval runner` chạy 5 test cases qua `interpreter.run()`.
- [ ] **DoD 2**: Thực hiện so sánh `actual` vs `expected` (Ground Truth từ DE).
- [ ] **DoD 3**: Tính toán điểm chỉ số `success_rate` và `citation_accuracy`.
- [ ] **DoD 4**: In Bảng điểm 5 dòng chuẩn format trên màn hình CLI.
- [ ] **DoD 5**: Nộp báo cáo Daily Note D4 của AIE-2 (`2026-07-23-TienDuy.md`).

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #19 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 04 (AIE-2 — Lưu Tiến Duy)

Chào Mentor và cả nhóm, mình đã hoàn thành xong nhiệm vụ trên Issue **#19**:

#### 🟢 Các mục đã hoàn thành:
- [x] **Smoke-Eval Runner**: Xây dựng runner chạy 5 Golden Cases qua Interpreter của AIE-1 (@Trần Bá Đạt).
- [x] **Evaluation Logic**: Thực hiện so sánh `actual` vs `expected` dựa trên nhãn tay của DE (@Nguyễn Đông Anh).
- [x] **Scorecard v0 & CLI Table**: In Bảng điểm 5 dòng ra màn hình CLI với kết quả 5/5 PASSED (100%).
- [x] **Daily Note**: Push file Daily Note `2026-07-23-TienDuy.md`.

CC: @hieubui2049 (Mentor) / @group
```
