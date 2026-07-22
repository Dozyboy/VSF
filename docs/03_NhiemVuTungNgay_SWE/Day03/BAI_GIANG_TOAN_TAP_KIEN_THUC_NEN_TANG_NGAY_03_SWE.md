# 📘 BÀI GIẢNG TOÀN TẬP: KIẾN THỨC NỀN TẢNG & XÂU KIM (WIRING) NGÀY 03 (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 🔗 CHƯƠNG 1: TRIẾT LÝ "XÂU KIM" (WIRING / WALKING SKELETON)

Đến Ngày 3, dự án bước vào giai đoạn quan trọng nhất của Sprint 1: **"Xâu Kim" (Wiring)**.

### 1.1 "Xâu Kim" nghĩa là gì?
Ở Ngày 2, các thành viên đã đúc xong các "đường ống rỗng" (Stubs). Ngày 3 là thời điểm lần đầu tiên dữ liệu thật chảy xuyên suốt qua 3 mảng:
```
[ TẦNG FORM UI (SWE) ] ──► [ ĐÓNG GÓI RECIPE (SWE) ] ──► [ NỔ MÁY ENGINE INTERPRETER (AIE-1) ]
```

Nếu coi dự án như việc chế tạo xe ô tô:
- D1: Học nguyên lý xe.
- D2: Đúc vỏ xe và đặt 4 đường ống rỗng.
- D3: Nắm lấy đầu dây điện từ Bàn điều khiển (Form UI) cắm thẳng vào Cổng nổ máy của Động cơ (Engine `interpreter.run`).

---

## 🛠️ CHƯƠNG 2: CƠ CHẾ ĐÓNG GÓI FORM UI ➔ AGENT_CONFIG & RECIPE MẪU (`builder.py`)

### 2.1 Logic hàm `build_agent_config`
Hàm `build_agent_config` nhận các tham số thô do người dùng chọn trên Form UI (Prompt dặn AI, Mô hình LLM chọn từ Dropdown, Danh sách Tools tích chọn từ Checklist) và biến nó thành đối tượng `AgentConfig` đã qua validation:

```python
def build_agent_config(instructions: str, model: str, tool_whitelist: list[str]) -> AgentConfig:
    return AgentConfig(
        instructions=instructions,
        model=model,
        tool_whitelist=tool_whitelist
    )
```

---

### 2.2 Đóng gói Recipe thử nghiệm 3-Node
SWE khởi tạo hàm `create_sample_recipe_d3()` đóng gói một bản Recipe hoàn chỉnh chứa đúng 3 Node nghiệp vụ tuần tự:

1. **`node_1` (`kb-retrieve`):** Tìm kiếm quy định trong kho tri thức Callisto (`params={"query": "Callisto policy"}`).
2. **`node_2` (`llm-step`):** Đưa tri thức tìm được vào Prompt để LLM xử lý (`params={"temperature": 0.0}`).
3. **`node_3` (`tool-call`):** Thực thi công cụ truy vấn (`params={"tool": "kb_search"}`).
4. **`node_4` (`end`):** Đánh dấu kết thúc tiến trình.

Các node được nối với nhau qua danh sách `Edge` (`node_1 ➔ node_2 ➔ node_3 ➔ node_4`).

---

## 🧪 CHƯƠNG 3: KỸ THUẬT TEST WIRING SANG INTERPRETER ENTRY POINT

### 3.1 Chữ ký hàm Interpreter Entry (`studio_engine.interpreter.run`)
Mở file `packages/engine/src/studio_engine/interpreter.py` (do AIE-1 phụ trách):
```python
async def run(recipe: Recipe, *, trace_writer: TraceWriter) -> RunResult:
    raise NotImplementedError("spec AIE-1: interpreter run() body")
```

---

### 3.2 Kỹ thuật Test Bắt Exception (`NotImplementedError`) trong Pytest
Vì SWE **tuyệt đối không được sửa code của AIE-1**, làm sao SWE chứng minh được dữ liệu Recipe của mình đã "chạy thông" sang Engine?

SWE dùng kỹ thuật bắt Exception trong Pytest tại `packages/workbench/tests/test_wiring_d3.py`:
```python
@pytest.mark.asyncio
async def test_wiring_recipe_to_interpreter_entry():
    recipe = create_sample_recipe_d3()

    # Bắt exception NotImplementedError từ stub của AIE-1
    with pytest.raises(NotImplementedError) as exc_info:
        await run(recipe, trace_writer=None)

    assert "spec AIE-1: interpreter run() body" in str(exc_info.value)
```

* **Ý nghĩa Kỹ thuật:** Khi hàm `await run(recipe)` ném ra lỗi `NotImplementedError` từ chính thân hàm của AIE-1, điều đó chứng minh đối tượng `Recipe` do SWE tạo ra đã vượt qua khâu truyền tham số và chạm thành công vào Cổng nổ máy của Engine!

---

## 🤝 CHƯƠNG 4: PHÂN TÍCH QUY TRÌNH CROSS-REVIEW PR CỦA DE

Trong DoD Ngày 3, SWE phải review PR Day 1 #1 của DE (Nguyễn Đông Anh).

* **Tại sao SWE lại phải review code của DE?**  
  Vì Node đầu tiên trong Recipe 3-Node của bạn chính là `kb-retrieve`. Dữ liệu mà node này tiêu thụ được sinh ra từ chính KB Pipeline (`ingest ➔ chunk ➔ embed ➔ index`) do DE viết. 
* Việc đọc và review PR của DE giúp SWE hiểu rõ định dạng dữ liệu đầu ra của KB, bảo đảm rằng khi Form UI sinh ra cấu hình `kb_binding`, dữ liệu sẽ được khớp nối an toàn và tuân thủ cơ chế bảo mật **Fence-tại-retrieval**.
