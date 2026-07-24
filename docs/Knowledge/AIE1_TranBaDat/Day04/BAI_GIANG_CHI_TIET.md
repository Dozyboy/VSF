# 📖 BÀI GIẢNG CHI TIẾT DAY 04 — AIE-1: COMPLETE 6 NODE EXECUTORS & TRACE EVENT EMISSION

> **Vị trí phụ trách**: AI Engineer 1 (AIE-1 — Trần Bá Đạt)  
> **Chủ đề chính**: Cài đặt 6 Node Executors hoàn chỉnh, Node Rẽ nhánh `condition`, Tool Dispatcher và Phát sự kiện Trace Event  
> **Mục tiêu**: Hoàn thiện toàn bộ bộ xử lý node lõi của Engine để hỗ trợ mọi cấu trúc đồ thị DAG nâng cao do Workbench tạo ra.

---

## 🧩 1. CẢI TIẾN BỘ XỬ LÝ 6 NODE EXECUTORS (NODE HANDLERS)

Trong Ngày 4, Engine chuyển đổi từ if/else đơn giản sang kiến trúc **Strategy Pattern** cho 6 Node Executors:

```python
class BaseNodeExecutor(ABC):
    @abstractmethod
    async def execute(self, node: RecipeNode, ctx: ExecutionContext) -> ExecutionContext:
        pass

class KbRetrieveExecutor(BaseNodeExecutor):
    async def execute(self, node: RecipeNode, ctx: ExecutionContext) -> ExecutionContext:
        query = ctx.variables.get("user_query", ctx.inputs.get("query", ""))
        top_k = node.params.get("top_k", 3)
        
        # Gọi KB Search thật của DE
        results = await studio_kb.search.search(query=query, tenant=ctx.tenant_id, top_k=top_k)
        ctx.variables["citations"] = results
        return ctx

class ConditionExecutor(BaseNodeExecutor):
    async def execute(self, node: RecipeNode, ctx: ExecutionContext) -> ExecutionContext:
        expr = node.params.get("expression", "True")
        # Evaluate biểu thức logic từ Context variables
        is_true = evaluate_condition(expr, ctx.variables)
        
        # Cập nhật node kế tiếp theo kết quả Rẽ nhánh
        node.next_node = node.params.get("true_node") if is_true else node.params.get("false_node")
        return ctx
```

---

## 📡 2. PHÁT SỰ KIỆN TRACE EVENT (EMITTING OBSERVABILITY TRACES)

Mỗi khi thực thi xong một Node, Engine có nhiệm vụ khởi tạo và phát ra một đối tượng `TraceEvent` khớp với Hợp đồng Contract #3 của DE:

```python
async def emit_trace(self, node: RecipeNode, ctx: ExecutionContext, start_ts: float, status: str):
    latency = (time.time() - start_ts) * 1000
    event = TraceEvent(
        trace_id=ctx.session_id,
        session_id=ctx.session_id,
        tenant_id=ctx.tenant_id,
        node_id=node.id,
        node_type=node.type,
        ts=time.time(),
        latency_ms=latency,
        prompt_tokens=ctx.variables.get("last_prompt_tokens", 0),
        completion_tokens=ctx.variables.get("last_completion_tokens", 0),
        cost_usd=0.0, # DE sẽ tính toán dựa trên token
        status=status,
        error_msg=ctx.variables.get("error_msg")
    )
    # Gửi sang Trace Sink của DE
    await studio_kb.trace.record_event(event)
```

---

## ⚠️ 3. XỬ LÝ LỖI TRONG NODE EXECUTION

Nếu một Node gặp sự cố trong quá trình chạy (ví dụ lỗi mạng khi gọi API), Engine không được để sập ứng dụng:
1. Bắt ngoại lệ (`try...except Exception`).
2. Cập nhật `ctx.status = "ERROR"`.
3. Phát ra `TraceEvent` với `status = "ERROR"` và nội dung `error_msg`.
4. Dừng Interpreter loop an toàn và trả về ExecutionContext chứa vết lỗi.
