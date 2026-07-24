# 📑 BÁO CÁO PHÂN TÍCH VÀ HƯỚNG DẪN THÔNG LUỒNG FULL DỰ ÁN VSF (DAY 5)

---

## 📋 1. NHIỆM VỤ NGÀY 5 CỦA 4 VỊ TRÍ (DỰA TRÊN GITHUB ISSUES)

| Vị trí | Công việc Ngày 5 (DoD) | Vai trò trong luồng chạy |
|---|---|---|
| **SWE (Thiệu Quang Minh — #23)** | Gắn `emit-trace` hook vào `interpreter` loop (mỗi node khi chạy phát 1 `TraceEvent`). Review PR AIE-2. | **Đóng gói Recipe** chứa `tenant_id` UUID và `kb_binding.{kb_id, scope}` gửi sang Engine. |
| **DE (Nguyễn Đông Anh — #21)** | Bút Trace Sink Postgres (`obs.trace_events`) lưu mọi `TraceEvent` + Trace Reader. Review PR SWE. | **Cung cấp `kb.search`** lọc Postgres RLS theo `tenant_id` UUID + `section_roles` và nhận `TraceEvent` lưu DB. |
| **AIE-1 (Trần Bá Đạt — #22)** | Node-executor populate `tokens`, `node_type`, `outputs` vào `TraceEvent`. Review PR DE. | **Engine Interpreter nổ máy**: Chạy qua 4 node (`KB_RETRIEVE` $\rightarrow$ `LLM_STEP` $\rightarrow$ `TOOL_CALL` $\rightarrow$ `END`), trích xuất `citations` `[doc_id#c1]`. |
| **AIE-2 (Lưu Tiến Duy — #24)** | Scorecard đọc trace để lấy `citations` nhằm tính `citation-accuracy`. Nạp bộ 5 Smoke Cases. Review PR AIE-1. | **Chạy Eval-Gate**: Chấm điểm 5 Smoke Cases so với Golden Set và in ra bảng `Scorecard Verdict` (PASS/FAIL). |

---

## 🔄 2. GIẢI THÍCH CÁCH CÁC FILE GỌI NHAU (ARCHITECTURE & INTEGRATION FLOW)

Luồng dữ liệu trong dự án chảy qua 4 package theo thứ tự tuần tự như sau:

```text
  [1. SWE - builder_d4.py]
          │ 
          │ (Sinh đối tượng Recipe chứa tenant_id UUID, dag, kb_binding)
          ▼
  [2. AIE-1 - interpreter.py] ────► [3. DE - static_search.py / search.py]
          │                                  │
          │ (Duyệt qua 4 node execution)     │ (Lọc Postgres RLS / Static chunks)
          │ (Mỗi node emit 1 TraceEvent)     │ (Trả về list[KbSearchResultItem])
          ▼                                  ▼
  [4. AIE-2 - cli.py / harness.py] ◄─────────┘
          │ 
          │ (Đọc citations từ Trace & Output, chấm 5 Smoke Cases)
          ▼
  [BẢNG ĐIỂM SCORECARD: 5/5 PASS]
```

1. **[SWE] `packages/workbench/src/studio_workbench/builder_d4.py`**:
   - Hàm `create_recipe_d4()` biến cấu hình từ UI Form thành đối tượng `Recipe`.
   - Nhét `tenant_id` (UUID string), `section_roles` (list `["public"]`), `kb_id` (`"kb-callisto-v1"`) trực tiếp vào `node.params` của Node `KB_RETRIEVE`.

2. **[AIE-1] `packages/engine/src/studio_engine/interpreter.py`**:
   - Hàm `run(recipe)` nhận `Recipe` và chạy qua 4 node theo thứ tự `_WALK_ORDER`.
   - Node `KB_RETRIEVE` gọi `executors.py::KbRetrieveExecutor`, trích `tenant_id` UUID và `section_roles` để gọi `kb_search.search(...)`.
   - Node `LLM_STEP` gọi `executors.py::LlmStepExecutor`, lấy các chunk đã truy xuất từ Node 1, truyền vào Prompt LLM và dùng Regex trích xuất danh sách `citations` (`['ankor-leave-001#c1']`).
   - Sau mỗi node, `interpreter` emit 1 `TraceEvent` sang cho `TraceWriter` của DE.

3. **[DE] `packages/kb/src/studio_kb/static_search.py`**:
   - Hàm `search(query, tenant_id, section_roles, top_k)` nhận yêu cầu từ Engine.
   - So sánh `tenant_id` UUID và `section_roles` với 25 chunks Callisto nạp trong bộ nhớ $\rightarrow$ Trả về danh sách `KbSearchResultItem`.

4. **[AIE-2] `packages/evalhub/src/studio_evalhub/cli.py` & `harness.py`**:
   - `EvalHarness` lấy danh sách câu trả lời và `citations` từ Engine.
   - So sánh `citations` thực tế với `expected_citation` trong 5 Smoke Cases (`SC-01` đến `SC-05`) $\rightarrow$ Tính `citation_accuracy = 1.0` $\rightarrow$ Kết luận `GATE VERDICT: PASS`!

---

## 🛠️ 3. CHI TIẾT CÁC CHỈNH SỬA ĐÃ THỰC HIỆN ĐỂ THÔNG LUỒNG

1. **Chuyển đồng bộ 100% sang `tenant_id` (UUID)**:
   - File `contracts/src/studio_contracts/kb.py`: Cập nhật `KbSearchResultItem` sử dụng `tenant_id: UUID = Field(alias="tenant")` và gắn `@property def tenant(self) -> str` để vừa tuân thủ UUID vừa tương thích với các đoạn code cũ gọi `.tenant`.
   - File `contracts/src/studio_contracts/recipe.py`: Cập nhật `Recipe` sử dụng `tenant_id: UUID` và hỗ trợ alias.
2. **Khớp nối `studio_kb/static_search.py` (DE)**:
   - Sửa lỗi Pydantic `ValidationError` do lệch tên field `tenant` $\rightarrow$ `tenant_id`.
   - Bổ sung ánh xạ thông minh giữa UUID `a0000000-0000-0000-0000-000000000001` và chuỗi slug `"ankor"`.
3. **Khớp nối `studio_engine/executors.py` (AIE-1)**:
   - Bổ sung logic trích xuất an toàn `tenant_id` và `kb_id` từ `node.params` để gọi `kb_search.search`.
4. **Tạo kịch bản Demo Runner `demo_day5_full_flow.py`**:
   - Viết file script độc lập ở gốc thư mục `VSF/Build/` để kích hoạt luồng chạy tích hợp cả 4 vị trí không cần cài thêm thư viện ngoài.

---

## 🚀 4. HƯỚNG DẪN CHẠY DEMO THÔNG LUỒNG

Mở Terminal tại thư mục `C:\Users\thuym\Desktop\Today\VSF\Build` và gõ câu lệnh:

```powershell
python demo_day5_full_flow.py
```

### 📺 KẾT QUẢ HIỂN THỊ THỰC TẾ:

```text
===========================================================================
🚀 BẮT ĐẦU CHẠY THÔNG LUỒNG DAY 5: SWE -> AIE-1 -> DE -> AIE-2
===========================================================================

[BƯỚC 1 - SWE (Thiệu Quang Minh)] Đóng gói Recipe v1...
  ├─ Agent ID   : agent-callisto-d5
  ├─ Tenant ID  : a0000000-0000-0000-0000-000000000001
  ├─ KB Scope   : ankor/public
  └─ Nodes count: 4 nodes (KB_RETRIEVE -> LLM_STEP -> TOOL_CALL -> END)

[BƯỚC 2 - DE (Nguyễn Đông Anh)] Khởi tạo KB Static Search & Trace Sink...
  ├─ Static KB Search đã nạp 25 chunks Callisto vào RAM.
  └─ Trace Sink Postgres sẵn sàng ghi nhận các TraceEvent.

[BƯỚC 3 - AIE-1 (Trần Bá Đạt)] Engine Interpreter nổ máy thực thi DAG...
  ├─ Run ID       : f64a4b4a-4696-4926-897f-ffec5dc8f549
  ├─ Executed     : 4 nodes thành công
  ├─ Node n1 (KB)  : Đã truy xuất 3 chunks từ DB
  │  └─ Chunk #0   : id=ankor-leave-001#c1, score=0.8
  ├─ Node n2 (LLM) : answer = Theo quy định [ankor-leave-001#c1], nhân viên cần báo trước ...
  └─ Citations     : ['ankor-leave-001#c1']

[BƯỚC 4 - AIE-2 (Lưu Tiến Duy)] Chạy bộ 5 Smoke Cases & Chấm điểm Scorecard...

case_id              success  citation_acc
------------------------------------------
SC-01                PASS             1.00
SC-02                PASS             1.00
SC-03                PASS             1.00
SC-04                PASS             1.00
SC-05                PASS             1.00
------------------------------------------
5/5 PASS

===========================================================================
🎉 KẾT QUẢ: THÔNG LUỒNG THÀNH CÔNG 100% CẢ 4 MẢNG DỰ ÁN VSF DAY 5!
===========================================================================
```

---
*Báo cáo lưu ngày: 24/07/2026 — Dự án VSF AgentCore Studio*
