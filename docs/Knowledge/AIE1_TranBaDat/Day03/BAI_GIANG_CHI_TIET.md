# 📖 BÀI GIẢNG CHI TIẾT DAY 03 — AIE-1: 3-NODE RUNNER, CROSS-QUADRANT WIRING & VCR EXECUTION

> **Vị trí phụ trách**: AI Engineer 1 (AIE-1 — Trần Bá Đạt)  
> **Chủ đề chính**: Thực thi 3-Node DAG Runner, Tích hợp Stub `kb.search` của DE, và VCR Fixture Execution  
> **Mục tiêu**: Xây dựng đoạn mã chạy thực tế cho 3 node đầu tiên để hoàn thành luồng Walking-Skeleton xâu kim 4 mảng ở Day 3.

---

## 🔗 1. LUỒNG WIRING 3-NODE DAG TRONG INTERPRETER

Trong Ngày 3, Interpreter của AIE-1 nhận Recipe 3-node từ SWE và thực thi theo chuỗi:

```
[ Node 1: kb-retrieve ] ──> Gọi studio_kb.search.search(...) (DE stub)
                                    │
                                    ▼ Trả về chunks []
[ Node 2: llm-step ]     ──> Đọc prompt_hash -> Tìm fixture JSON -> Lấy trả lời
                                    │
                                    ▼ Đính kèm text vào context
[ Node 3: end ]          ──> Hoàn thành luồng -> Trả về final output
```

### Hàm Handler Dispatcher (`interpreter.py`):
```python
class Interpreter:
    async def execute_node(self, node: RecipeNode, ctx: ExecutionContext) -> ExecutionContext:
        if node.type == "kb-retrieve":
            # Gọi stub kb.search từ DE
            query = ctx.inputs.get("user_query", "")
            chunks = await studio_kb.search.search(query=query, tenant=ctx.tenant_id)
            ctx.variables["retrieved_chunks"] = chunks
            
        elif node.type == "llm-step":
            # Đọc fixture offline
            response_text = self.load_vcr_fixture(ctx)
            ctx.variables["llm_response"] = response_text
            
        elif node.type == "end":
            ctx.status = "COMPLETED"
            
        return ctx
```

---

## 📹 2. THỰC THI NODE `LLM-STEP` VỚI VCR FIXTURE OOF-LINE

Node `llm-step` đóng vai trò sinh câu trả lời dựa trên prompt và thông tin tri thức đã được truy xuất từ `kb-retrieve`.

### Thuật toán đọc Fixture:
1. Tổng hợp `system_prompt` + `user_query` + `retrieved_chunks`.
2. Tạo mã Hash MD5 của chuỗi văn bản trên (`hash_key`).
3. Đọc file `packages/engine/fixtures/llm_responses.json`.
4. Nếu tìm thấy `hash_key`, trả về `expected_response`. Nếu không thấy, trả về câu phản hồi giả định mặc định (fallback fixture).

---

## ⚠️ 3. CÁC LỖI CẦN BẢO VỆ KHI CHẠY RUNNER

- **Null Context Pointer**: Không khởi tạo `ctx.variables` khiến các node đằng sau bị lỗi `KeyError`.
- **Unhandled Node Type**: Quên xử lý `node.type == 'end'` khiến vòng lặp `while` bị chạy vô tận.
- **ImportError**: Nhầm lẫn tên đường dẫn `studio_kb.search.search`.
