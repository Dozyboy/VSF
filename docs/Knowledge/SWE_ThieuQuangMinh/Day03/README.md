# NHIỆM VỤ & KIẾN THỨC DAY 3 — SWE (THIỆU QUANG MINH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 3)
- [x] **Walking Skeleton 3-Node**: Chạy thông suốt từ Form UI ➔ Recipe ➔ Interpreter entry mà không crash (`kb-retrieve -> llm-step -> tool-call -> end`).
- [x] **Đảm bảo ranh giới DIP**: 100% thành viên chỉ import `studio_contracts`, không import chéo package quadrant. `.importlinter` xanh 100%.
- [x] **Dữ liệu mẫu & CLI Demo**: Có sẵn dữ liệu Callisto thật và chạy được CLI demo mô phỏng.

---

## 🎯 VIỆC CỦA BẠN (SWE - THIỆU QUANG MINH - DAY 3)
1. **Xây dựng Builder**: Viết hàm `build_agent_config()` xuất đối tượng `AgentConfig` Pydantic v0 tại `packages/workbench/src/studio_workbench/builder.py`.
2. **Tạo Recipe Mẫu Day 3**: Viết hàm `create_sample_recipe_d3()` đóng gói `Recipe` mẫu với 3 node tuần tự (`kb-retrieve -> llm-step -> tool-call -> end`).
3. **Wiring & Integration Test**: Viết unit test `packages/workbench/tests/test_wiring_d3.py` nghiệm thu luồng Wiring Recipe sang `studio_engine.interpreter.run`.
4. **Cập nhật Frontend Web UI**: Cập nhật giao diện Form tạo Agent xuất JSON `agent_config` tại `apps/web/src/App.tsx`.
5. **Review PR**: Review PR Day 1 cho DE (Nguyễn Đông Anh).

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Separation of Concerns**: Tách biệt logic đóng gói dữ liệu Form (`builder.py`) với logic kiểm tra đồ thị (`validator.py`).
- **Pydantic Model Nesting**: Cách lồng `AgentConfig` vào trong đối tượng `Recipe` mà vẫn đảm bảo tính imutability (`frozen=True`).
- **Integration Test With Stubs**: Viết unit test kiểm thử điểm nối (seam) giữa Workbench và Engine ngay cả khi Engine mới chỉ có hàm Stub.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/workbench/src/studio_workbench/builder.py` (Hàm `build_agent_config` & `create_sample_recipe_d3`)
- `packages/workbench/tests/test_wiring_d3.py` (Unit test wiring sang Engine)
- `apps/web/src/App.tsx` (Màn hình Form UI xuất JSON config)
- `packages/workbench/src/studio_workbench/__init__.py` (Re-export builder functions)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Form UI (apps/web)] ──(JSON)──> [build_agent_config()] ──> [Recipe Model] ──> [interpreter.run(recipe)]
```
