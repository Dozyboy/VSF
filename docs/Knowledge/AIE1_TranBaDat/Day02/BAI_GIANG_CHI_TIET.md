# 📖 BÀI GIẢNG CHI TIẾT DAY 02 — AIE-1: INTERPRETER LOOP, VCR FIXTURES & DESCOPE

> **Vị trí phụ trách**: AI Engineer 1 (AIE-1 — Trần Bá Đạt)  
> **Chủ đề chính**: Phác thảo Interpreter Execution Loop, Mô hình VCR-Style Fixtures, Dispatcher Pattern, và Thang hạ cấp `DESCOPE.md`  
> **Mục tiêu**: Thiết kế kiến trúc Interpreter loop và cơ chế testing offline với VCR Fixtures để hệ thống có thể chạy thử nghiệm mà không tốn tiền API thật.

---

## 🔁 1. PHÁC THẢO INTERPRETER EXECUTION LOOP

Interpreter trong `studio_engine` đóng vai trò duyệt qua đồ thị Recipe DAG:

```python
class ExecutionContext(BaseModel):
    session_id: str
    tenant_id: str
    inputs: dict = Field(default_factory=dict)
    variables: dict = Field(default_factory=dict)
    history: list[dict] = Field(default_factory=list)
    status: str = "RUNNING"  # RUNNING | PAUSED | COMPLETED | ERROR

class Interpreter:
    def __init__(self, recipe: RecipeDAG):
        self.recipe = recipe
        self.node_map = {node.id: node for node in recipe.nodes}

    async def run(self, ctx: ExecutionContext) -> ExecutionContext:
        curr_id = self.recipe.start_node_id
        while curr_id and ctx.status == "RUNNING":
            node = self.node_map[curr_id]
            ctx = await self.execute_node(node, ctx)
            curr_id = node.next_node
        return ctx
```

---

## 📹 2. MÔ HÌNH FIXTURES-FIRST (VCR-STYLE) CHO LLM STEP

Để phục vụ kiểm thử CI/CD và tiết kiệm chi phí gọi LLM API thật trong chặng phát triển, AIE-1 thiết kế cơ chế **VCR Fixtures**:

### Định dạng VCR Fixture JSON (`fixtures/llm_responses.json`):
```json
{
  "fixtures": [
    {
      "prompt_hash": "a1b2c3d4...",
      "model": "gpt-4o",
      "expected_response": "Theo chính sách hoàn tiền của Ankor Callisto, thời hạn đổi trả sản phẩm là 30 ngày kể từ ngày mua hàng.",
      "prompt_tokens": 120,
      "completion_tokens": 35
    }
  ]
}
```

- Lần đầu tiên chạy (Record mode): Gọi OpenAI API thật và lưu kết quả vào file JSON.
- Các lần chạy tiếp theo (Playback mode): Đọc từ file JSON dựa trên `prompt_hash` $\rightarrow$ Tốc độ test siêu nhanh (< 10ms) và 0% chi phí API.

---

## 📉 3. THANG HẠ CẤP TÍNH NĂNG (DESCOPE LADDER) AIE-1

Thang hạ cấp 4 bậc dự phòng cho mảng Engine:

```
[Bậc 0: Real LLM + 6 Nodes Full] Chạy OpenAI API thật + Đủ 6 Node Handler
       │
       ▼ (Descope 1)
[Bậc 1: VCR Fixtures Playback] Dùng VCR Fixture JSON cho node llm-step
       │
       ▼ (Descope 2)
[Bậc 2: 3-Node Sequential Execution] Chỉ chạy tuyến tính 3 node (kb -> llm -> end)
       │
       ▼ (Descope 3)
[Bậc 3: Mock Hardcoded Return] Trả về chuỗi kết quả cứng cố định ở mọi node
```
