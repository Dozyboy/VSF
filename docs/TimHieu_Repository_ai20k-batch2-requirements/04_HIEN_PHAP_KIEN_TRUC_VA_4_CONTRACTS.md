# 📐 HIẾN PHÁP KIẾN TRÚC LÕI & 4 HỢP ĐỒNG SCHEMA CHUNG
*(Tóm tắt chi tiết từ `00-orientation/umbrella-contract.md`)*

---

## 🏗️ I. QUY TẮC PHÂN CHIA 6 LOẠI NODE ĐÓNG (PALETTE CAP)

Mọi sơ đồ Workflow Agent trong hệ thống **chỉ được phép sử dụng duy nhất 6 loại Node dưới đây** (Nghiêm cấm thêm node ngoài danh sách):

| Loại Node (`node_type`) | Vai trò & Hành vi thực thi | Chủ sở hữu chính |
| :--- | :--- | :--- |
| **`kb-retrieve`** | Gọi dịch vụ `kb.search` tìm kiếm dữ liệu theo Tenant; lọc quyền fail-closed; trả về các đoạn trích dẫn (cited chunks). | AIE-1 (Executor) / DE (KB Search) |
| **`llm-step`** | Thực hiện 1 bước gọi mô hình AI (LLM) thông qua `EmbeddingService` / Gateway. | AIE-1 |
| **`condition`** | Rẽ nhánh điều kiện dựa trên đầu ra của bước trước (ví dụ: điểm số, kết quả đánh giá). | AIE-1 / SWE |
| **`tool-call`** | Gọi các công cụ (Tools) đã được cấp phép trong danh sách trắng (`tool_whitelist`). | AIE-1 / SWE |
| **`hitl-pause`** | Tạm dừng tiến trình để chờ con người vào xem và bấm nút phê duyệt (Approve) trên giao diện. | SWE |
| **`end`** | Kết thúc quy trình, xuất ra kết quả cuối cùng và phát sự kiện Trace cuối. | AIE-1 |

---

## 📜 II. CHI TIẾT 4 HỢP ĐỒNG SCHEMA CHUNG (4 CONTRACTS)

4 Hợp đồng này là **xương sống giao tiếp duy nhất** giữa 4 thành viên. Được **khóa cứng (freeze) vào cuối Tuần 1**.

### 👑 Contract #1: Recipe Schema (Do SWE — Thiệu Quang Minh giữ bút)
Đây là bản thiết kế hoàn chỉnh của một Agent do người dùng cấu hình từ Workbench UI:

```yaml
recipe:
  agent_id: str                   # ID duy nhất của Agent
  tenant: str                     # Mã Tenant sở hữu (ankor | borea)
  agent_config:
    instructions: str             # Câu lệnh hướng dẫn AI (Prompt gốc)
    model: str                    # Tên mô hình AI được chọn (ví dụ: gemini-2.5-flash)
    tool_whitelist: [str]         # Danh sách tên các Tool được phép gọi
  dag:                            # Sơ đồ quy trình kéo-thả từ Canvas
    nodes: [{id, type, params}]   # Danh sách các Node (type ∈ 6 loại node đóng)
    edges: [{from, to, when?}]    # Danh sách các đường nối giữa các Node
  kb_binding: {kb_id, scope}      # Trỏ tới Kho tài liệu KB được phép truy vấn
  golden_set_ref: str             # Trỏ tới bộ 30 câu hỏi test mẫu (AIE-2 dùng chấm điểm)
  scorecard_threshold:            # Ngưỡng điểm để cho phép Publish
    success: float                # Ngưỡng tỷ lệ thành công (ví dụ: >= 0.8)
    citation_accuracy: float      # Ngưỡng độ chính xác trích dẫn (ví dụ: >= 0.9)
```

> 💡 **Nhiệm vụ của SWE:** Viết hàm `graph_lint(recipe)` trong `validator.py` để đảm bảo:
> 1. Mọi node phải nằm trong 6 loại node đóng.
> 2. Sơ đồ không bị lặp vô tận (No cycles).
> 3. Mọi đường nối Edge phải trỏ tới Node ID có thật.
> 4. Tool được gọi trong node `tool-call` phải nằm trong `tool_whitelist`.

---

### Contract #2: TraceEvent Schema (Do DE — Nguyễn Đông Anh giữ bút)
Cấu trúc sự kiện ghi log từng bước chạy của Agent:
- Ghi nhận `event_id`, `run_id`, `agent_id`, `tenant`, `node_id`, `ts` (thời gian).
- Ghi nhận số lượng **Tokens** (Prompt & Completion) và **Chi phí (Cost)**.
- **Quy tắc Cost-lineage:** Con số `cost` phải **khớp chính xác 100% trên cả 3 màn hình**: *UI Test Playground*, *Trace Timeline*, và *Cost Dashboard*.

---

### Contract #3: `kb.search` API (Do DE — Nguyễn Đông Anh giữ bút)
Cổng giao tiếp tìm kiếm tri thức nội bộ:
```python
kb.search(query, tenant, section_roles, top_k) -> [ {chunk_id, text, score, tenant, section_role} ]
```
- **Rào chắn Bảo mật tại Retrieval:** Hàm `kb.search` bắt buộc phải lọc theo `{tenant, section_roles}` **ngay trong câu lệnh SQL/Vector search ở Database**.
- Nếu không thuộc về Tenant ➔ **Trả về danh sách rỗng (`[]`) ngay từ tầng Database**, tuyệt đối không trả dữ liệu ra rồi nhờ LLM "đừng nói".

---

### Contract #4: Scorecard Format (Do AIE-2 — Lưu Tiến Duy giữ bút)
Bảng điểm kết quả kiểm định chất lượng Agent:
- Chạy bộ 30 câu hỏi Golden Cases.
- Tính toán `success_rate` (tỷ lệ trả lời đúng) và `citation_accuracy` (độ chính xác nguồn trích dẫn).
- Trả về kết quả đánh giá cuối cùng: `verdict: "PASS"` hoặc `verdict: "FAIL"`.
- **Nối với SWE:** SWE đọc kết quả `verdict` này để quyết định cho phép sáng nút **Publish** hay **Chặn & Rollback**.
