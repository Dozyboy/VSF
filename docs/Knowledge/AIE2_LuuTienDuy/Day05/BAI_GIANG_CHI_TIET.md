# 📖 BÀI GIẢNG CHI TIẾT DAY 05 — AIE-2: FULL GOLDEN SET EVALUATION & DEGRADE ENGINE

> **Vị trí phụ trách**: AI Engineer 2 (AIE-2 — Lưu Tiến Duy)  
> **Chủ đề chính**: Đánh giá toàn diện 30 Golden Cases, Động cơ Degrade & Rollback Decision Engine, và Sprint 1 Demo  
> **Mục tiêu**: Vận hành bộ máy chấm điểm tự động, cung cấp bằng chứng dữ liệu định lượng (Scorecard) phục vụ cổng kiểm định Publish Agent.

---

## ⚖️ 1. THUẬT TOÁN QUYẾT ĐỊNH DEGRADE & ROLLBACK

Trong Ngày 5, EvalHub triển khai logic đưa ra phán quyết chất lượng (**Verdict Engine**):

```python
class DegradeDecisionEngine:
    def __init__(self, pass_threshold: float = 0.85, min_citation_rate: float = 0.90):
        self.pass_threshold = pass_threshold
        self.min_citation_rate = min_citation_rate

    def evaluate_scorecard(self, scorecard: Scorecard) -> tuple[bool, str]:
        # 1. Kiểm tra điểm tổng kết
        if scorecard.overall_score < self.pass_threshold:
            return False, f"Overall score ({scorecard.overall_score * 100}%) dưới ngưỡng cho phép ({self.pass_threshold * 100}%)."
            
        # 2. Kiểm tra tỷ lệ trích dẫn trung bình
        avg_citation = sum(r.citation_accuracy for r in scorecard.case_results) / len(scorecard.case_results)
        if avg_citation < self.min_citation_rate:
            return False, f"Citation accuracy ({avg_citation * 100}%) bị suy giảm (Degraded)."
            
        return True, "Đạt tiêu chuẩn xuất bản thành công!"
```

---

## 📊 2. KẾT XUẤT BÁO CÁO SCORECARD REPORT FORMAT

File kết quả kiểm định `scorecard_report.json` được lưu trữ để phục vụ theo dõi lịch sử chất lượng Agent theo thời gian:

```json
{
  "eval_id": "eval-20260724-001",
  "agent_id": "agent-ankor-prod",
  "timestamp": 1784800000.0,
  "summary": {
    "total_cases": 30,
    "passed_cases": 27,
    "failed_cases": 3,
    "overall_score": 0.90,
    "citation_accuracy_avg": 0.93,
    "pass_gate": true
  },
  "degrade_analysis": {
    "is_degraded": false,
    "risk_level": "LOW",
    "recommendation": "Sẵn sàng xuất bản lên môi trường Production."
  }
}
```

---

## 🏁 3. QUY TRÌNH DEMO & RETROSPECTIVE SPRINT 1 (EVALHUB DEMO)

Tại buổi tổng kết Sprint 1:
- AIE-2 trình bày luồng Eval-Gate ở Bước 6 trong vòng đời 8 bước.
- Cho xem màn hình chạy tự động 30 Golden Cases và hiển thị Scorecard kết quả.
- Minh họa kịch bản khi cố tình tạo một Agent kém chất lượng (ví dụ: prompt sai) $\rightarrow$ Eval-Gate chặn lệnh Publish và kích hoạt Rollback an toàn.
