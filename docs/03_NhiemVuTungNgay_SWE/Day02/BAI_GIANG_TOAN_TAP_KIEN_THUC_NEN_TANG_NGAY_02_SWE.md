# 📘 BÀI GIẢNG TOÀN TẬP: KIẾN THỨC NỀN TẢNG & THIẾT KẾ KHUNG (SCAFFOLD) NGÀY 02 (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 🏛️ CHƯƠNG 1: XÂY DỰNG BẢN THIẾT KẾ CONTRACT #1 — RECIPE INTERFACE V0

Trong Ngày 2, với vai trò SWE, bạn là người **giữ bút bản mẫu Contract #1 (Recipe Schema)**. Đây là bản hợp đồng dữ liệu quan trọng nhất giao tiếp giữa tầng giao diện người dùng (Form UI) và bộ máy thực thi Động cơ (Engine).

### 1.1 Khai báo Pydantic Model bất biến (`frozen=True`)
Tất cả các đối tượng trong Contract #1 được thiết lập thuộc tính `model_config = ConfigDict(frozen=True)`. 

```python
class AgentConfig(BaseModel):
    model_config = ConfigDict(frozen=True)

    instructions: str
    model: str
    tool_whitelist: list[str]
```

* **Ý nghĩa Kỹ thuật:** `frozen=True` biến các đối tượng Pydantic thành **Immutable Object** (đối tượng không thể sửa đổi thuộc tính sau khi đã khởi tạo). Nếu bất kỳ dòng code nào cố tình thay đổi thuộc tính (ví dụ `recipe.agent_config.model = "gpt-4"`), Pydantic sẽ ném lỗi ngay lập tức. Điều này bảo vệ dữ liệu công thức Agent không bị thay đổi bất ngờ trong quá trình chạy.

---

### 1.2 Giải quyết từ khóa dành riêng (Reserved Keyword) trong Pydantic
Trong Python, từ khóa `from` là một từ khóa hệ thống dành riêng (dùng cho `from module import ...`). Tuy nhiên, trong wire protocol của đồ thị DAG, mũi tên kết nối bắt buộc phải có trường tên là `"from"` và `"to"`.

SWE giải quyết bài toán này bằng kỹ thuật **Field Aliasing** trong file `studio_contracts.recipe`:
```python
class Edge(BaseModel):
    model_config = ConfigDict(frozen=True, populate_by_name=True)

    from_: str = Field(alias="from")
    to: str
    when: str | None = None
```
* **Ý nghĩa Kỹ thuật:** Trong code Python, bạn gọi thuộc tính là `edge.from_`. Nhưng khi xuất ra JSON truyền trên mạng, Pydantic tự động đổi tên thành `"from"`. Cờ `populate_by_name=True` cho phép khởi tạo Edge bằng cả `from_` hoặc `from`.

---

## 🏗️ CHƯƠNG 2: DỰNG BỘ KHUNG 4 STUB INTERFACES TRONG WORKBENCH

Ở Ngày 2, bạn tiến hành đúc bộ khung rỗng (**Scaffold**) cho 4 file chính trong package `packages/workbench/src/studio_workbench/`:

```
packages/workbench/src/studio_workbench/
├── validator.py   ➔ Chứa hàm kiểm định đồ thị graph_lint(recipe)
├── publish.py     ➔ Chứa hàm publish(recipe) & rollback(recipe)
├── tenant_wall.py ➔ Chứa hàm bảo vệ Middleware resolve_tenant(session)
└── schema.py      ➔ Chứa DDL tạo bảng database (wb.recipes & wb.recipe_versions)
```

### 2.1 Cấu trúc Stub Interface trong Python
Một **Stub Interface** là hàm khai báo đúng tên, đúng kiểu dữ liệu nhận vào (Input) và trả về (Output), nhưng thân hàm chưa viết logic mà tạm thời trả về giá trị mặc định hoặc ném lỗi `NotImplementedError`:

```python
def graph_lint(recipe: Recipe) -> list[str]:
    """Kiểm định sơ đồ DAG của Recipe trước khi cho phép chạy.

    Returns:
        list[str]: Danh sách các câu thông báo lỗi (rỗng nếu đồ thị hợp lệ).
    """
    # Stub Ngày 2: Tạm thời trả về danh sách rỗng (coi như hợp lệ)
    return []
```

* **Tác dụng:** Việc dựng Stub giúp các đồng nghiệp (AIE-1, DE, AIE-2) có thể import và gọi hàm của bạn ngay từ Ngày 2 mà không bị lỗi `ImportError`, giúp cả team phát triển song song độc lập!

---

## 🪜 CHƯƠNG 3: NGUYÊN TẮC CẮT GIẢM DỰ PHÒNG (`DESCOPE.md`)

Trong phát triển phần mềm theo chuẩn SDLC, nguy cơ trễ hạn hoặc gặp rào cản kỹ thuật là rất lớn. Triết lý **INV-7** của dự án quy định: *"Cắt độ bóng, không cắt nhịp demo"*.

SWE chuẩn bị sẵn file `packages/workbench/DESCOPE.md` với **4 Nấc hạ cấp tính năng dự phòng**:

1. **Nấc 1 (KB Pipeline ➔ Stub Tĩnh):** Nếu Vector DB chưa dựng xong ➔ KB trả về 5 tài liệu tĩnh giả lập.
2. **Nấc 2 (Workbench UI ➔ Form + Mermaid):** Nếu React Flow kéo thả bị lỗi ➔ Dùng Form nhập liệu + Render chuỗi sơ đồ Mermaid.
3. **Nấc 3 (LLM Judge ➔ Exact-match):** Nếu LLM Judge hết quota API ➔ Dùng thuật toán so sánh chuỗi exact-match.
4. **Nấc 4 (Dashboard ➔ CLI Output):** Nếu Web Dashboard chưa vẽ xong ➔ In bảng log trực tiếp ra Terminal CLI.

---

## ❓ CHƯƠNG 4: NGUYÊN TẮC CLARIFY-FIRST & QUESTION-BATCH

Trước khi đặt bút gõ bất kỳ dòng code logic nào, SWE tuân thủ nguyên tắc **Clarify-First (Hỏi rõ trước khi làm)**.

SWE chuẩn bị file `packages/workbench/docs/QUESTIONS_FOR_MENTOR.md` gồm $\ge 3$ câu hỏi chất lượng gửi Mentor về các điểm mơ hồ trong hợp đồng v0:
1. **Hỏi về Render Mermaid:** Cần quy chuẩn chuỗi Mermaid sinh ra từ DAG như thế nào để hiển thị trên UI?
2. **Hỏi về Cơ chế Eval-Gate Publish:** Khi bấm Publish, Workbench gọi AIE-2 lấy Scorecard bằng API đồng bộ hay bất đồng bộ?
3. **Hỏi về Schema Versioning:** Khi có thay đổi không tương thích (Breaking change) trên `AgentConfig`, cơ chế nâng phiên bản `SCHEMA_VERSION` thực hiện ra sao?
