# NHIỆM VỤ & KIẾN THỨC DAY 5 — SWE (THIỆU QUANG MINH)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 5)
- [ ] **Tích hợp toàn diện qua Composition Root**: Nối 4 mảng qua `apps/studio` (tiêm thật các Collaborators).
- [ ] **Bật PostgreSQL RLS thật**: `kb.chunks` kích hoạt `FORCE ROW LEVEL SECURITY` trên Docker Postgres.
- [ ] **Hoàn thiện 8-Step Lifecycle Demo**: Chạy mượt mà từ Form -> Canvas -> Trace timeline -> Eval gate -> Publish/Rollback.
- [ ] **Zero Leakage**: `make leak-test` xanh tuyệt đối (`leakage = 0`).

---

## 🎯 VIỆC CỦA BẠN (SWE - THIỆU QUANG MINH - DAY 5)
1. **Kết nối Frontend Canvas**: Nối Web UI Vite/React Flow với API backend của `apps/studio` để render và lưu trữ DAG 6 node.
2. **Triển khai Publish & Rollback Gate**:
   - Viết logic trong `packages/workbench/src/studio_workbench/publish.py`.
   - Nhận kết quả Verdict từ `studio_evalhub`: Nếu Verdict là `PASS` -> Thực hiện `publish` phiên bản mới; Nếu `FAIL` -> Chặn phát hành và `rollback` về phiên bản an toàn trước đó.
3. **Phối hợp E2E Demo**: Đóng góp phần việc mảng Workbench vào kịch bản kiểm thử tích hợp `tests/e2e/test_lifecycle.py`.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Eval-Gate Publishing Pattern**: Cơ chế chặn phát hành tự động (Quality Gate) dựa trên điểm số đánh giá thực tế của Agent trước khi ra production.
- **Version Immutability & Rollback Strategy**: Mỗi lần publish tạo ra một Snapshot Immutable; nếu có sự cố rollback chỉ cần trỏ pointer về phiên bản snapshot cũ.
- **React Flow Integration**: Cách chuyển đổi qua lại giữa cấu hình `Recipe` dạng JSON/Pydantic và cấu hình đồ thị `Nodes / Edges` trên giao diện React.

---

## 📁 FILE CODE LIÊN QUAN
- `packages/workbench/src/studio_workbench/publish.py` (Hàm `publish` và `rollback`)
- `apps/web/src/components/Canvas.tsx` (Component render đồ thị Canvas)
- `tests/e2e/test_lifecycle.py` (File test demo 8 bước)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Eval Hub Verdict] ──> [publish.py] ──(PASS)──> [Update Active Snapshot] ──> [Agent Live]
                           │
                         (FAIL)
                           ▼
                    [Trigger Rollback] ──> [Keep Previous Snapshot]
```
