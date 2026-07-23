# NHIỆM VỤ & KIẾN THỨC DAY 4 — DE (NGUYỄN ĐÔNG ANH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 4)
- [x] **Data-Threading xuyên suốt**: Dữ liệu truyền liên tục qua các node trong Interpreter.
- [x] **Verification 5/5 PASS**: `StaticKbSearch` và Golden-set 5 cases chạy khớp 100% trên cả 2 trục (Chéo Tenant SC-04 và Chéo Vai SC-05 đều từ chối đúng).
- [x] Chạy `python -m studio_evalhub.cli` ra kết quả **5/5 PASS**.
- [x] `make test` và `make lint` xanh 100% workspace.

---

## 🎯 VIỆC CỦA BẠN (DE - NGUYỄN ĐÔNG ANH - DAY 4)
1. **Triển khai `StaticKbSearch`**: Viết `packages/kb/src/studio_kb/static_search.py` tìm kiếm trực tiếp trên 25 chunks Callisto, lọc chính xác theo `tenant_id` và `section_role`.
2. **Xây dựng Golden-set 5 Test Cases**: Tạo file `packages/kb/golden/smoke-5.yaml` chứa 5 kịch bản thử nghiệm:
   - SC-01: Ankor leave days (Answerable)
   - SC-02: Borea leave days (Answerable)
   - SC-03: Ankor expense limit (Answerable)
   - SC-04: Cross-tenant leak attempt (Refusal - Ankor hỏi dữ liệu Borea)
   - SC-05: Cross-role leak attempt (Refusal - User vai Engineering hỏi bảng lương HR)
3. **Thương lượng Contract với AIE-2**: Thống nhất quy tắc so khớp đáp án (`expected` cụm ngắn) và trường `expected_section_role`.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Static Search Security Verification**: Tạo một lớp truy vấn bộ nhớ tĩnh có cùng logic lọc bảo mật như DB thật để kiểm tra toàn bộ pipeline trước khi nối Postgres RLS.
- **Cross-Role Isolation (SC-05)**: Đảm bảo kiểm tra đúng hai lớp: lớp 1 là `tenant_id` và lớp 2 là `section_role` (quyền truy cập theo vai trò công việc).

---

## 📁 FILE CODE LIÊN QUAN
- `packages/kb/src/studio_kb/static_search.py` (Lớp `StaticKbSearch` truy vấn 25 chunks)
- `packages/kb/golden/smoke-5.yaml` (File 5 test cases golden set)
- `packages/kb/tests/test_static_search.py` (Test suite cho static search)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[KbRetrieveExecutor] ──> [StaticKbSearch.search(query, tenant, section_roles)]
                                  │
                       ┌──────────┴──────────┐
                  (Match Role)        (Mismatch Role)
                       ▼                     ▼
               [Return Chunks]        [Return Empty []] ──> [Trigger Refusal]
```
