# 📖 BÀI GIẢNG CHI TIẾT DAY 03 — AIE-2: SMOKE-EVAL RUNNER & CITATION VERIFICATION

> **Vị trí phụ trách**: AI Engineer 2 (AIE-2 — Lưu Tiến Duy)  
> **Chủ đề chính**: Bộ khung Smoke-Eval Runner, Chấm điểm 5 Smoke Cases, Thuật toán so sánh Exact Match và Citation Accuracy  
> **Mục tiêu**: Xây dựng đoạn mã đánh giá tự động chạy thử trên 5 câu smoke test để chuẩn bị nối vào cổng Eval-Gate ở Day 5.

---

## 🏃 1. THIẾT KẾ BỘ KHUNG SMOKE-EVAL RUNNER

Trong Ngày 3, EvalHub triển khai bộ chạy thử nghiệm **Smoke-Eval Runner** (`runner.py`):

```python
class SmokeEvalRunner:
    def __init__(self, test_cases_path: str = "docs/smoke-cases.json"):
        self.cases = self.load_cases(test_cases_path)

    async def evaluate_agent(self, agent_id: str, interpreter_fn) -> Scorecard:
        results = []
        passed_count = 0
        
        for case in self.cases:
            # 1. Gọi Interpreter chạy sinh câu trả lời
            actual_res = await interpreter_fn(case["prompt"], case["tenant"])
            
            # 2. Chấm điểm câu trả lời
            score, is_pass = self.judge_case(case, actual_res)
            if is_pass:
                passed_count += 1
                
            results.append(TestCaseResult(
                case_id=case["case_id"],
                prompt=case["prompt"],
                expected_output=case["expected_output"],
                actual_output=actual_res.get("text", ""),
                success=is_pass,
                citation_accuracy=score["citation"],
                score=score["overall"]
            ))
            
        overall_score = passed_count / len(self.cases)
        return Scorecard(
            eval_id=f"eval-{uuid4()[:8]}",
            agent_id=agent_id,
            timestamp=time.time(),
            total_cases=len(self.cases),
            passed_cases=passed_count,
            overall_score=overall_score,
            pass_gate=overall_score >= 0.80,
            case_results=results
        )
```

---

## 🔍 2. THUẬT TOÁN ĐÁNH GIÁ CITATION ACCURACY

Độ chính xác trích dẫn (Citation Accuracy) đo lường xem Agent có trích dẫn đúng đoạn `chunk_id` chứa câu trả lời hay không:

```text
Citation Accuracy = 1.0  (nếu expected_chunk_id nằm trong retrieved_chunks)
                  = 0.0  (nếu trích dẫn sai hoặc không có trích dẫn)
```

Việc kiểm tra này giúp ngăn chặn ảo giác (hallucination), đảm bảo Agent chỉ đưa ra câu trả lời khi có bằng chứng tri thức Callisto xác thực.
