# 📖 BÀI GIẢNG CHI TIẾT DAY 02 — AIE-2: SCORECARD CONTRACT V0 & SMOKE-CASES DESIGN

> **Vị trí phụ trách**: AI Engineer 2 (AIE-2 — Lưu Tiến Duy)  
> **Chủ đề chính**: Hợp đồng Schema Contract #4 (`scorecard`), Thiết kế 5 Smoke-Cases với DE, LLM-as-a-Judge vs. Exact Match, và `DESCOPE.md`  
> **Mục tiêu**: Giữ bút dự thảo Hợp đồng Scorecard Contract #4 v0 quy định kết quả chấm điểm kiểm định Agent.

---

## 📜 1. ĐẦU VIỆC GIỮ BÚT (PEN OWNER) CONTRACT #4 SCORECARD V0

AIE-2 đóng vai trò **Giữ Bút (Pen Owner)** cho Hợp đồng Contract #4 (`scorecard`), quy định định dạng kết quả đánh giá giữa EvalHub và Workbench/Publish Manager.

### Dự thảo `scorecard.v0.md` (`packages/evalhub/docs/contracts/scorecard.v0.md`):

```python
class TestCaseResult(BaseModel):
    case_id: str              # Mã câu hỏi test (vd: case_001)
    prompt: str               # Câu hỏi đầu vào
    expected_output: str      # Đáp án mẫu
    actual_output: str        # Kết quả Agent sinh ra
    success: bool             # Kết quả PASS/FAIL của câu
    citation_accuracy: float  # Độ chính xác trích dẫn (0.0 - 1.0)
    score: float              # Điểm số của câu (0.0 - 1.0)
    reasoning: str | None     # Lý do chấm điểm từ LLM-Judge

class Scorecard(BaseModel):
    eval_id: str              # Mã đợt kiểm thử
    agent_id: str             # Agent được đánh giá
    timestamp: float          # Thời điểm đánh giá
    total_cases: int          # Tổng số câu test (5 ở Day 3, 30 ở Day 4)
    passed_cases: int         # Số câu đạt chuẩn PASS
    overall_score: float      # Điểm tổng kết (0.0 - 1.0)
    pass_gate: bool           # Verdict: True (PASS) / False (FAIL)
    case_results: list[TestCaseResult]
```

---

## 🧪 2. THIẾT KẾ 5 SMOKE TEST CASES CÙNG DE

AIE-2 ngồi lại cùng DE (`DongAnh2704`) để thống nhất 5 câu test mẫu dựa trên 5 tài liệu Callisto seed:

```json
[
  {
    "case_id": "smoke_001",
    "tenant": "ankor",
    "prompt": "Thời gian đổi trả hàng của Ankor là bao nhiêu ngày?",
    "expected_output": "30 ngày kể từ ngày mua hàng",
    "expected_chunk_id": "ankor-refund-v2#c0"
  },
  {
    "case_id": "smoke_002",
    "tenant": "ankor",
    "prompt": "Quy trình nghỉ phép của Ankor bao gồm những bước nào?",
    "expected_output": "Nộp đơn trước 3 ngày trên hệ thống HR",
    "expected_chunk_id": "ankor-hr-v1#c0"
  }
]
```

---

## 📉 3. THANG HẠ CẤP TÍNH NĂNG (DESCOPE LADDER) AIE-2

Thang hạ cấp 4 bậc dự phòng cho mảng EvalHub:

```
[Bậc 0: Full LLM-Judge + 30 Cases] GPT-4o LLM-Judge chấm điểm ngữ nghĩa + 30 Golden Set
       │
       ▼ (Descope 1)
[Bậc 1: Exact Match + Citation Match] Chuyển sang so sánh chuỗi String Match + Chunk ID
       │
       ▼ (Descope 2)
[Bậc 2: 5 Smoke Cases Only] Chỉ chấm điểm trên 5 câu smoke test cố định
       │
       ▼ (Descope 3)
[Bậc 3: Always PASS Dummy Gate] Trả về Scorecard cố định pass_gate = True
```
