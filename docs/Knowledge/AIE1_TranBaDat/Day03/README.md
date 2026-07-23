# NHIỆM VỤ & KIẾN THỨC DAY 3 — AIE-1 (TRẦN BÁ ĐẠT)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 3)
- [x] **Walking Skeleton 3-Node**: Chạy thông suốt từ Form UI ➔ Recipe ➔ Interpreter entry.
- [x] **Đảm bảo ranh giới DIP**: 100% thành viên chỉ import `studio_contracts`.
- [x] **Dữ liệu mẫu & CLI Demo**: Có sẵn dữ liệu Callisto thật và chạy được CLI demo.

---

## 🎯 VIỆC CỦA BẠN (AIE-1 - TRẦN BÁ ĐẠT - DAY 3)
1. **Triển khai Interpreter Loop Đơn Giản**: Duyệt danh sách các node trong Recipe theo trình tự và gọi executor tương ứng.
2. **Nối Dependency Injection**: Nhận các collaborator stubs (`kb_search`, `llm`, `embedding`, `trace_writer`) qua keyword-only arguments của `interpreter.run()`.
3. **Viết CLI Demo Day 3**: Tạo file `packages/engine/src/studio_engine/__main__.py` chạy mô phỏng 1 Recipe 3 node (`kb-retrieve -> llm-step -> tool-call -> end`).

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Runtime Dependency Injection (DI)**: Không khởi tạo trực tiếp DB/API client bên trong Engine mà tiêm các giao diện Protocol từ bên ngoài vào, giúp Engine hoàn toàn độc lập và dễ dàng viết Unit Test.
- **State Propagation in DAG**: Lưu kết quả trả về của mỗi node vào `state[node_id]` để các node tiếp theo có thể tham chiếu dữ liệu.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/engine/src/studio_engine/interpreter.py` (Vòng lặp `run()` hoàn thiện cơ bản)
- `packages/engine/src/studio_engine/__main__.py` (CLI Demo chạy 3 node)
- `packages/engine/tests/test_interpreter_behavior.py` (Test kiểm tra hành vi interpreter)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
1. CLI khởi tạo Recipe 3 node.
2. Gọi `interpreter.run(recipe, kb_search=..., llm=...)`.
3. In kết quả cuối cùng và nhật ký thực thi ra terminal.
