# 🖼️ TOÀN CẢNH DỰ ÁN & KỊCH BẢN DEMO 8 BƯỚC END-TO-END
*(Tóm tắt chi tiết từ `00-orientation/brief-overview.md` & `00-orientation/charter.md`)*

---

## 🎯 I. HÌNH HÀI SẢN PHẨM CUỐI CÙNG (AGENTCORE STUDIO)

Sản phẩm hoàn chỉnh sau 6 tuần là **AgentCore Studio** — một "Xưởng chế tạo Agent" không cần viết code lõi bao gồm các thành phần chính:

```
[ Workbench UI (Form + Canvas React Flow 6-node) ]
                        │
                        ▼
    [ Interpreter Mini (Chạy 6 node types) ]
     ├── Gọi KB Search (Dữ liệu có Fence RLS per-tenant)
     ├── Gọi LLM / Tools (Whitelist)
     └── Emit Trace Event (Ghi log token & chi phí)
                        │
                        ▼
     [ Eval Hub (Chấm 30 golden cases) ]
                        │
       PASS ────────────┴──────────── FAIL
        │                             │
 [ Nút Publish ]              [ Chặn Publish ]
 (Tạo Endpoint)             (Tự động Rollback)
```

---

## 🎬 II. KỊCH BẢN DEMO TỐT NGHIỆP 8 BƯỚC (10 PHÚT)

Đây là bài diễn thuyết tốt nghiệp quan trọng nhất chứng minh toàn bộ dự án chạy thông suốt mà **không chạm 1 dòng code lõi nào**:

| # | Bước Demo | Hành động thực hiện trên Giao diện | Giá trị Chứng minh được |
| :---: | :--- | :--- | :--- |
| **1** | **Tạo Agent** | Mở Workbench ➔ Nhập Form tạo Agent có tên *"Payment-Doc Checker"*. | Tạo Agent không cần viết code. |
| **2** | **Gắn Tool & KB** | Tích chọn 2 Tools (rule-verdict, matching) + Gắn 1 Kho tài liệu (KB) scope `Tenant-X`. | Gán quyền Tool whitelist & Ràng buộc KB scope. |
| **3** | **Vẽ Workflow** | Kéo thả sơ đồ trên Canvas: `kb-retrieve ➔ llm-step ➔ condition ➔ tool-call`. | Sơ đồ DAG thuộc Palette 6-node đóng. |
| **4** | **Bấm Test** | Chạy thử ➔ Màn hình hiển thị **Trace Timeline** từng node + Số lượng Token và Chi phí (Cost) cập nhật real-time. | Ghi nhận Trace & Khớp con số chi phí (Cost-lineage). |
| **5** | **🔥 FENCE PROOF (Money-shot)** | Đang ở Scope `Tenant-X`, đặt câu hỏi mà đáp án **chỉ có trong KB của `Tenant-Y`** ➔ Hệ thống trả về **Từ chối (Refusal) + Audit Log**, không bịa đặt (Hallucinate). | **Hàng rào bảo mật Fence hoạt động 100%, Rò rỉ = 0 (Leakage = 0).** |
| **6** | **Chạy Eval & Publish** | Bấm **Eval** ➔ Chạy bộ 30 bài test Golden Cases ➔ Bảng điểm đạt **PASS** ➔ Nút **Publish** sáng lên ➔ Xuất ra Endpoint công khai. | Cổng kiểm định chất lượng Eval-Gate & Publish. |
| **7** | **🔥 GATE CHẶN & ROLLBACK (Money-shot)** | Cố tình sửa câu lệnh hướng dẫn (Instructions) cho kém đi ➔ Re-eval ➔ Bảng điểm báo **FAIL** ➔ **Hệ thống CHẶN Publish** ➔ Tự động **Rollback** về version cũ. | **Cổng Eval-Gate thực sự chặn được bản kém chất lượng.** |
| **8** | **Tạm dừng HITL** | Chạy thử node `hitl-pause` ➔ Tiến trình tạm dừng chờ con người bấm nút Approve trên màn hình rồi mới chạy tiếp. | Tính năng Human-in-the-loop (HITL) chuẩn mực. |

---

## 🛡️ III. PHẠM VI IN / OUT SCOPE (RANH GIỚI THIẾT KẾ)

### ✅ PHẠM VI LÀM (IN-SCOPE):
- Giao diện Form + Canvas 6 loại node.
- Trình thông dịch Interpreter chạy 6 loại node.
- Fenced-KB: Ingest ➔ Chunk ➔ Embed ➔ Index per-tenant + Lọc quyền tại lúc truy vấn (Retrieval).
- Eval Harness + LLM Judge + Cổng Eval-Gate chặn Publish + Tự động Rollback.
- Ghi Trace Event + Khớp chi phí (Cost) trên 3 màn hình.
- Bức tường bảo mật Tenant-Wall (INV-1) + Node tạm dừng HITL (INV-2).

### ❌ PHẠM VI CẮT BỎ (OUT-OF-SCOPE):
- KHÔNG làm giao tiếp đa Agent phức tạp (Multi-agent handoff).
- KHÔNG làm hệ thống phân quyền tài nguyên sâu (RBAC per-resource).
- KHÔNG làm Vector DB quy mô Production siêu lớn hoặc Re-rank nâng cao.
- KHÔNG kết nối với cổng thanh toán hay tính tiền thật (FinOps Billing).
