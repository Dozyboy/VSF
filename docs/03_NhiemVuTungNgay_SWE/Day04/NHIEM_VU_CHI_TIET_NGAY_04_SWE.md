# 📑 HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC NGÀY 04 (SWE — THIỆU QUANG MINH)

---

## 🚘 THÔNG TIN CHUNG VỀ ISSUE DAY 04
* **Issue ID**: `#18`
* **Tiêu đề**: `Day 4 — SWE (Thiệu Quang Minh) — Recipe thêm kb_binding.{kb_id,scope} (form khai scope tenant); wiring recipe -> interpreter đọc kb_binding`
* **Parent Issue**: `Day 4 — cả nhóm · KB stub 5 doc + kb.search thô + smoke-eval bảng điểm`
* **Ngày thực hiện**: Thứ Năm 23/07/2026 (Chặng 1 — Sprint 1 — Tuần 1)
* **Vai trò**: SWE (Software Engineer — Workbench & Web UI)

---

## 🔗 PHẦN I: SỰ LIÊN KẾT LIỀN MẠCH TỪ NGÀY 1 ➔ NGÀY 2 ➔ NGÀY 3 ➔ NGÀY 04

Để nắm trọn vẹn lý do tại sao Ngày 4 chúng ta làm công việc này, hãy nhìn vào **Chuỗi tiến hóa của Chiếc Ô-tô AI Agent**:

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│   NGÀY 1 (20/07)        │     │   NGÀY 2 (21/07)        │     │   NGÀY 3 (22/07)        │     │   NGÀY 4 (23/07)        │
│ Học Ranh Giới & Luật    │ ──► │ Dựng Bộ Khung (v0)      │ ──► │ Wiring Nổ Máy 3 Node    │ ──► │ Tích Hợp KB Scope Tenant│
│ • Tenant Wall (Lớp 1)   │     │ • Schema Recipe         │     │ • Form UI ➔ Recipe      │     │ • kb_binding.{kb_id,    │
│ • Defense-in-Depth      │     │ • Stub interfaces       │     │ • Nối vào Interpreter   │     │   scope}                │
│                         │     │ • DESCOPE.md            │     │ • Pytest bắt Exception  │     │ • kb.search chunk_id    │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
```

### 📍 1. Ngày 1 (D1): Đặt nền móng tư tưởng Bảo mật Tenant Wall
- **Đã làm**: Học về **6 Lớp Bảo vệ (Defense-in-Depth)**. Lớp 1 chính là **Tenant Wall** (Bức tường ngăn cách giữa các khách hàng/công ty khác nhau). Một Agent của Tenant A tuyệt đối không được đọc nhầm dữ liệu Knowledge Base (KB) của Tenant B.
- **Sợi dây sang D4**: Ngày 4 chính là lúc SWE đưa khái niệm **Tenant Wall** từ lý thuyết D1 vào thẳng schema của Recipe dưới dạng tham số `kb_binding = {kb_id: ..., scope: ...}`.

### 📍 2. Ngày 2 (D2): Định hình Contract v0
- **Đã làm**: Khai báo Pydantic model `KbBinding` rỗng và các Stub interface trong `studio_workbench`.
- **Sợi dây sang D4**: Ngày 2 chỉ mới khai báo lớp `KbBinding(kb_id, scope)` dạng static. Đến Ngày 4, SWE mở rộng Form UI và Builder để người dùng thực sự khai báo KB binding động từ giao diện Workbench.

### 📍 3. Ngày 3 (D3): Xâu kim Walking Skeleton 3 Node
- **Đã làm**: Nối dữ liệu từ Form UI ➔ `AgentConfig` ➔ `Recipe` (3 node: `kb-retrieve ➔ llm-step ➔ tool-call`) ➔ `interpreter.run()`.
- **Sợi dây sang D4**: Ngày 3 luồng `kb-retrieve` mới chỉ gửi query thô mà chưa truyền thông tin KB ID hay Scope Tenant. Ngày 4 SWE sẽ "wire" sâu hơn: trích xuất `kb_binding` từ Recipe và truyền vào cho `interpreter` đọc để gọi `kb.search` của DE.

### 📍 4. Ngày 4 (D4): Bùng nổ Tích hợp KB Binding & Citation Evaluation 🌟
- **Nhiệm vụ trọng tâm Ngày 4**: 
  1. Cập nhật `Recipe` / Workbench Builder để hỗ trợ khai báo `kb_binding.{kb_id, scope}`.
  2. Wiring `recipe -> interpreter` trích xuất `kb_binding` chính xác khi thực thi node `kb-retrieve`.
  3. Phối hợp với DE và AIE-2 để hàm `kb.search` trả về đúng `chunk_id` (citation).
  4. Chạy 5 test case Callisto synthetic có nhãn tay và in Bảng điểm 5 dòng ra CLI.

---

## 🎯 PHẦN II: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) NGÀY 04

- [ ] **DoD 1**: Cập nhật Form/Builder khai báo `kb_binding.{kb_id, scope}` theo đúng chuẩn Tenant Scope.
- [ ] **DoD 2**: Wiring `recipe -> interpreter` đọc và trích xuất thành công `kb_binding`.
- [ ] **DoD 3**: Kiểm thử `kb.search` trả về đúng `chunk_id` (đạt yêu cầu trích dẫn/citation).
- [ ] **DoD 4**: Xây dựng 5 test cases Callisto synthetic NDA-clean có nhãn tay (Ground truth).
- [ ] **DoD 5**: Chạy bài test Smoke-Eval in ra Bảng điểm 5 dòng trên CLI (`Success Rate` + `Citation Chunk ID`).
- [ ] **DoD 6**: Đẩy báo cáo Daily Note D4 (`2026-07-23-Dozyboy.md`).

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN D4

---

### 📌 BƯỚC 1: KHAI BÁO & KIỂM TRA `KbBinding` TRONG `builder.py`

#### 🎯 Mục tiêu:
Cho phép Form UI / Workbench Builder tiếp nhận tham số `kb_id` và `scope` (ví dụ: `kb_id="kb-callisto-policies-v1"`, `scope="tenant-ankor"`) và gán chính xác vào đối tượng `Recipe`.

#### 🛠️ Thao tác thực hiện:
1. Mở file `packages/workbench/src/studio_workbench/builder.py`.
2. Cập nhật hàm `build_recipe_with_kb()` hoặc mở rộng `build_agent_config()`:
   ```python
   from studio_contracts import Recipe, KbBinding, AgentConfig, Dag, Node, Edge, NodeType

   def build_recipe_d4(
       agent_id: str,
       tenant: str,
       instructions: str,
       model: str,
       kb_id: str,
       scope: str,
       tool_whitelist: list[str]
   ) -> Recipe:
       """Tạo đối tượng Recipe Ngày 4 có chứa thông tin KB Binding theo Tenant Scope."""
       
       # 1. Khởi tạo AgentConfig
       config = AgentConfig(
           instructions=instructions,
           model=model,
           tool_whitelist=tool_whitelist
       )

       # 2. Khởi tạo KbBinding tuân thủ Lớp 1 Tenant Wall (Day 1)
       kb_bind = KbBinding(
           kb_id=kb_id,
           scope=scope
       )

       # 3. Tạo các Node cho DAG (kb-retrieve -> llm-step -> tool-call -> end)
       nodes = [
           Node(id="n1", type=NodeType.KB_RETRIEVE, params={"query": "Callisto NDA & Security Policy"}),
           Node(id="n2", type=NodeType.LLM_STEP, params={"temperature": 0.0}),
           Node(id="n3", type=NodeType.TOOL_CALL, params={"tool": "kb_search"}),
           Node(id="n4", type=NodeType.END, params={})
       ]

       edges = [
           Edge(from_="n1", to="n2"),
           Edge(from_="n2", to="n3"),
           Edge(from_="n3", to="n4")
       ]

       return Recipe(
           agent_id=agent_id,
           tenant=tenant,
           agent_config=config,
           dag=Dag(nodes=nodes, edges=edges),
           kb_binding=kb_bind,
           golden_set_ref="golden-set-d4-callisto",
           scorecard_threshold=None
       )
   ```

---

### 📌 BƯỚC 2: WIRING `recipe -> interpreter` ĐỌC `kb_binding`

#### 🎯 Mục tiêu:
Đảm bảo khi `interpreter.run(recipe)` được kích hoạt, `interpreter` có thể trích xuất `recipe.kb_binding.kb_id` và `recipe.kb_binding.scope` để truyền sang API `kb.search(query, kb_id, scope)` của DE.

#### 🛠️ Thao tác thực hiện:
1. Viết bài test wiring `test_wiring_d4.py` trong `packages/workbench/tests/test_wiring_d4.py`.
2. Kiểm tra việc trích xuất thuộc tính `kb_binding` từ `recipe`:
   ```python
   import pytest
   from studio_workbench.builder import build_recipe_d4

   def test_recipe_kb_binding_extraction():
       recipe = build_recipe_d4(
           agent_id="agent-callisto-01",
           tenant="tenant-ankor",
           instructions="Hỗ trợ tra cứu quy định Callisto",
           model="gemini-2.5-flash",
           kb_id="kb-callisto-v1",
           scope="tenant-ankor",
           tool_whitelist=["kb_search"]
       )

       # Đảm bảo kb_binding được đọc chính xác
       assert recipe.kb_binding is not None
       assert recipe.kb_binding.kb_id == "kb-callisto-v1"
       assert recipe.kb_binding.scope == "tenant-ankor"
       assert recipe.tenant == "tenant-ankor"
   ```

---

### 📌 BƯỚC 3: PHỐI HỢP KIỂM THỬ `kb.search` TRẢ VỀ `chunk_id` (CITATION CHẤM ĐƯỢC)

#### 🎯 Mục tiêu:
Hàm `kb.search` do DE (Nguyễn Đông Anh) cung cấp phải trả về danh sách các kết quả trích dẫn có chứa `chunk_id`.

#### 🛠️ Định dạng dữ liệu Trích dẫn (Citation Chunk):
```python
{
    "chunk_id": "callisto-sec-chunk-003",
    "score": 0.92,
    "content": "Quy định bảo mật Callisto: Mọi dữ liệu khách hàng phải được mã hóa AES-256...",
    "source_doc": "Callisto_Security_Policy_v2.pdf"
}
```

---

### 📌 BƯỚC 4: CHẨN BỊ 5 TEST CASES CÓ NHÃN TAY (GROUND TRUTH) NDA SẠCH

#### 🎯 Danh sách 5 Case Mẫu Callisto Synthetic NDA Clean:
| Case ID | Câu hỏi (Query) | Kỳ vọng `chunk_id` đúng (Ground Truth Citation) |
| :--- | :--- | :--- |
| **Case 1** | "Thời gian hoàn trả sản phẩm Callisto là bao nhiêu ngày?" | `callisto-ret-chunk-001` |
| **Case 2** | "Chính sách bảo mật dữ liệu Callisto quy định chuẩn mã hóa nào?" | `callisto-sec-chunk-003` |
| **Case 3** | "SLA phản hồi sự cố cấp độ Critical của Callisto là mấy giờ?" | `callisto-sla-chunk-002` |
| **Case 4** | "Quy trình xin cấp quyền tài khoản tenant mới thực hiện thế nào?" | `callisto-iam-chunk-005` |
| **Case 5** | "Hạn mức truy vấn API hàng ngày của tài khoản Standard là bao nhiêu?" | `callisto-api-chunk-004` |

---

### 📌 BƯỚC 5: CHẠY SMOKE EVAL VÀ IN BẢNG ĐIỂM 5 DÒNG RA CLI

#### 🎯 Code Script In Bảng Điểm CLI (`smoke_eval_d4.py`):
```python
def print_cli_scorecard(results: list[dict]):
    print("\n" + "="*70)
    print("📊 BẢNG ĐIỂM KẾT QUẢ SMOKE-EVAL DAY 04 (CALLISTO SYNTHETIC)")
    print("="*70)
    print(f"{'CASE ID':<10} | {'STATUS':<10} | {'CITATION CHUNK ID':<25} | {'MATCH':<8}")
    print("-" * 70)
    
    success_count = 0
    for item in results:
        status_str = "SUCCESS" if item["success"] else "FAILED"
        match_str = "PASS" if item["citation_match"] else "FAIL"
        if item["success"] and item["citation_match"]:
            success_count += 1
            
        print(f"{item['case_id']:<10} | {status_str:<10} | {item['retrieved_chunk_id']:<25} | {match_str:<8}")
        
    print("="*70)
    print(f"🎯 ĐÁNH GIÁ CHUNG: {success_count}/5 Cases PASSED ({success_count/5*100:.0f}%)")
    print("="*70 + "\n")
```

---

## 🏁 TỔNG KẾT BƯỚC CHUẨN BỊ BÁO CÁO
Sau khi thực thi xong các bước trên, bạn tiến hành push code và cập nhật Daily Note `2026-07-23-Dozyboy.md` để hoàn thành 100% nhiệm vụ Day 04!
