# NHIỆM VỤ & KIẾN THỨC DAY 4 — SWE (THIỆU QUANG MINH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 4)
- [x] **Data-Threading xuyên suốt**: Dữ liệu truyền liên tục qua các node trong Interpreter (Output node này là Input node sau).
- [x] **Verification 5/5 PASS**: Bộ kiểm định `StaticKbSearch` và Golden-set 5 cases chạy khớp 100% trên cả 2 trục (Chéo Tenant SC-04 và Chéo Vai SC-05 đều từ chối đúng).
- [x] Chạy `python -m studio_evalhub.cli` ra kết quả **5/5 PASS**.
- [x] `make test` và `make lint` xanh 100% workspace.

---

## 🎯 VIỆC CỦA BẠN (SWE - THIỆU QUANG MINH - DAY 4)
1. **Triển khai Validator Graph-Lint**: Hoàn thiện `packages/workbench/src/studio_workbench/validator.py`:
   - Phân tích đồ thị DAG 6 node.
   - Phát hiện chu trình (cycle detection) trong đồ thị bằng thuật toán DFS/BFS.
   - Kiểm tra Whitelist Tool hợp lệ.
2. **Nối KB Binding & Scope**: Nối `recipe.kb_binding` (`kb_id`, `scope`) vào `interpreter` để truyền đúng phạm vi tìm kiếm.
3. **Hoàn thiện Tenant-Wall (INV-1)**: Đảm bảo request không chứa `tenant_id` hợp lệ sẽ bị chặn ngay tại tầng Workbench trước khi tới DB.
4. **Cập nhật Unit Tests**: Viết bộ test kiểm tra `graph_lint` bắt chính xác đồ thị lỗi/lặp chu trình tại `packages/workbench/tests/test_validator.py`.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **DAG Cycle Detection**: Thuật toán duyệt đồ thị hướng không chu trình (Directed Acyclic Graph) để đảm bảo Interpreter không rơi vào vòng lặp vô tận.
- **Tenant Isolation (INV-1)**: Ranh giới bảo mật đầu tiên (Tenant Wall) trích xuất và phân giải `tenant_id` từ HTTP Headers.
- **Tool Whitelisting**: Cơ chế kiểm soát an ninh chỉ cho phép Agent sử dụng các tool đã được đăng ký và phê duyệt trước.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/workbench/src/studio_workbench/validator.py` (Hàm `graph_lint` & kiểm tra đồ thị)
- `packages/workbench/src/studio_workbench/tenant_wall.py` (Phân giải `resolve_tenant`)
- `packages/workbench/tests/test_validator.py` (Test suite cho validator)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Recipe Config] ──> [graph_lint()] ──(PASS)──> [resolve_tenant()] ──(Valid)──> [interpreter.run()]
                         │                             │
                     (Has Cycle)                  (Missing Header)
                         ▼                             ▼
                    [Raise Error]                 [Raise 401/403]
```
