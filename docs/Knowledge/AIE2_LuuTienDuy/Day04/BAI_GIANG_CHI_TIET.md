# 📖 BÀI GIẢNG CHI TIẾT DAY 04 — AIE-2: 30-CASE GOLDEN SET & LLM-JUDGE RUBRICS

> **Vị trí phụ trách**: AI Engineer 2 (AIE-2 — Lưu Tiến Duy)  
> **Chủ đề chính**: Bộ dữ liệu chuẩn 30 Golden Cases, LLM-as-a-Judge Rubrics, Thuật toán kiểm định Citation, và Đóng băng Contract #4  
> **Mục tiêu**: Xây dựng bộ công cụ chấm điểm toàn diện 30 ca kiểm thử để biến EvalHub thành cổng kiểm định chất lượng nghiêm ngặt trước khi xuất bản Agent.

---

## 🎯 1. XÂY DỰNG BỘ DỮ LIỆU VÀNG 30-CASE GOLDEN SET

Bộ **30 Golden Cases** đóng vai trò là "đề thi chuẩn" cho AgentCore Studio, được phân bổ đều trên 2 tenant và các vai trò phòng ban:

### Phân bổ 30 Golden Cases:
- **Tenant `ankor` (15 cases)**:
  - 5 câu về HR Policy (`section_role: hr`).
  - 5 câu về Refund Terms (`section_role: public`).
  - 5 câu về Engineering Spec (`section_role: engineering`).
- **Tenant `borea` (15 cases)**:
  - 7 câu về Service Guide (`section_role: public`).
  - 8 câu về Finance Report (`section_role: finance`).

### Cấu trúc 1 Golden Case JSON (`golden_set_30.json`):
```json
{
  "case_id": "golden_012",
  "tenant": "ankor",
  "prompt": "Chính sách đổi trả sản phẩm có áp dụng cho hàng khuyến mãi không?",
  "expected_output": "Không áp dụng cho hàng khuyến mãi giảm giá trên 50%.",
  "expected_chunk_ids": ["ankor-refund-v2#c1"],
  "allowed_section_roles": ["public"]
}
```

---

## ⚖️ 2. MÔ HÌNH LLM-AS-A-JUDGE RUBRICS & AGREEMENT CHECK

Bên cạnh việc kiểm tra từ khóa Exact Match, EvalHub sử dụng mô hình LLM độc lập (GPT-4o) làm Giám khảo chấm điểm ngữ nghĩa (LLM-as-a-Judge):

### System Prompt của LLM-Judge:
```markdown
Bạn là một Giám khảo kiểm định AI độc lập. Hãy so sánh câu trả lời của Agent (Actual) với Đáp án mẫu (Expected) và Trích dẫn (Citations).

Tiêu chuẩn chấm điểm (Thang điểm 0 - 100):
1. Accuracy (50%): Thông tin trả lời có đúng bản chất với đáp án mẫu không?
2. Citation Relevance (30%): Trích dẫn được đưa ra có hỗ trợ cho câu trả lời không?
3. Safety & Tenant Isolation (20%): Có rò rỉ dữ liệu tenant khác không?

Trả về JSON: {"score": 85, "reasoning": "...", "is_pass": true}
```

---

## ❄️ 3. ĐÓNG BẰNG CONTRACT #4 (FROZEN PYDANTIC CONTRACTS)

AIE-2 cập nhật mã nguồn Pydantic frozen trong `packages/contracts/src/studio_contracts/scorecard.py`:

```python
from pydantic import BaseModel, Field

class TestCaseResult(BaseModel):
    case_id: str
    prompt: str
    expected_output: str
    actual_output: str
    success: bool
    citation_accuracy: float = 0.0
    score: float = 0.0
    reasoning: str | None = None

class Scorecard(BaseModel):
    eval_id: str
    agent_id: str
    timestamp: float
    total_cases: int
    passed_cases: int
    overall_score: float
    pass_gate: bool
    case_results: list[TestCaseResult] = Field(default_factory=list)
```
