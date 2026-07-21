# 🗓️ LỘ TRÌNH 3 SPRINTS & SKELETON 30 NGÀY LÀM VIỆC
*(Tóm tắt chi tiết từ `00-orientation/roadmap-3-sprint.md`)*

---

## 🚀 I. KHUNG 3 SPRINTS & 3 MỐC ĐỊNH GIÁ (GATE)

Tiến độ 6 tuần làm việc được chia thành 3 Chặng (Sprint) với các hình thức đề bài và mốc kiểm định tăng dần:

```
Sprint 1 (Follow - Tuần 1-2) ──► GATE 1 (Day 10): Walking-Skeleton xâu-kim a→z
       │ (Đề dạng Spec: Chỉ rõ what + how)
       ▼
Sprint 2 (Assist - Tuần 3-4) ──► GATE 2 (Day 20): Canvas + KB thật + Trace + Eval v1
       │ (Đề dạng Goal: Chỉ rõ what + tiêu chí nhận diện)
       ▼
Sprint 3 (Apply - Tuần 5-6)  ──► FINAL GATE (Day 30): Demo 8 bước a→z + Bàn giao
         (Đề dạng Problem: Cho bài toán & ràng buộc, tự tìm giải pháp)
```

---

## 🎯 II. 6 MACRO-GOALS TỔNG THỂ (G1 – G6)

| Macro-Goal | Tuần | Đích đến bắt buộc (Definition of Done) |
| :--- | :---: | :--- |
| **G1: Đứng được trong Xưởng** | Tuần 1 | Dựng xong môi trường Python 3.12, chạy Pytest xanh, ký NDA, thực hiện xong bài **Teach-back 10 phút/người**. |
| **G2: Walking-Skeleton Xâu-kim** | Tuần 2 | **Mốc Gate Day 10 (GATE CỨNG):** Tạo được 1 luồng mỏng-mà-thông xâu qua cả 4 vị trí: Form ➔ Interpreter ➔ KB Stub ➔ Trace ➔ Smoke Eval. |
| **G3: Đóng băng 4 Contracts** | Tuần 3 | Viết xong Design-Note cá nhân; **Khóa cứng (Freeze) 4 Hợp đồng Schema** chung cho cả team. |
| **G4: Tích hợp Lần đầu** | Tuần 4 | **Mốc Gate Day 20:** Dựng xong Canvas React Flow, KB thật có phân quyền Tenant, Màn hình Trace Viewer và Eval v1. |
| **G5: Trust-Grade Quality** | Tuần 5 | Hoàn thiện Bảo mật Fence tại Retrieval (Leakage = 0), Eval-Gate chặn Publish + Rollback, Cost-lineage khớp 3 màn hình. |
| **G6: Bàn giao & Vận hành** | Tuần 6 | **Final Gate Day 30:** Hoàn thiện tài liệu Bàn giao (Handover), Chạy **Cross-handover test (vận hành mảng người khác 30 phút)**, Trình diễn thành công Demo 8 bước tốt nghiệp. |

---

## 📋 III. SKELETON CHI TIẾT THEO NGÀY DÀNH CHO SWE (THIỆU QUANG MINH)

### 🔹 SPRINT 1 (Tuần 1-2): Tập trung Xâu-kim Luồng Mỏng
- **D1 (T2):** Kickoff, dựng môi trường Python 3.12, ký NDA, bài Teach-back về Workbench/Recipe.
- **D2 (T3):** Đọc đề paved-path, phác thảo bộ khung Workbench và danh sách nấc cắt giảm descope-ladder.
- **D3 (T4):** Viết Form tạo Agent cơ bản (`agent-config`).
- **D6 (T2):** Xâu-kim lần 1: Nối Form ➔ Interpreter ➔ KB Stub ➔ Trace (Luồng mỏng thông suốt).
- **D8 (T5):** Dựng khung bảo mật Tenant-Wall (INV-1): giải mã `session_id` lấy `{tenant, user, role}` ở Server-side.
- **D10 (T6):** **GATE 1:** Trình diễn luồng Walking-Skeleton xâu qua cả 4 người + Trả lời phản biện về Fence.

### 🔹 SPRINT 2 (Tuần 3-4): Canvas React Flow & Validator
- **D11 (T2):** Tham gia Hội thảo Chốt hợp đồng (Freeze 4 Schema: Recipe, Trace, KB search, Scorecard).
- **D12 (T3):** Dựng Canvas React Flow với Palette 6 loại node + Lập trình bộ kiểm định `validator.py` (`graph_lint`).
- **D17 (T4):** Cài đặt bộ lọc quyền bắt buộc `tenant_id NOT NULL` tại Server-side, chạy test T1 IDOR xanh.
- **D20 (T6):** **GATE 2:** Tích hợp Canvas React Flow + Recipe Validator vào hệ thống chung.

### 🔹 SPRINT 3 (Tuần 5-6): Eval-Gate, Rollback & Demo Tốt nghiệp
- **D23 (T4):** Cài đặt Node tạm dừng `hitl-pause` trong Playground.
- **D24 (T5):** Lập trình luồng **Publish & Rollback**: Nối kết quả Eval Scorecard vào nút Publish. Nếu `verdict == FAIL` ➔ Chặn Publish & Gọi Rollback.
- **D28 (T4):** Viết tài liệu Bàn giao (Handover Doc) & Danh mục kịch bản lỗi (Failure-mode Catalog).
- **D29 (T5):** Kiểm tra Bàn giao chéo (Cross-handover test) & Tổng duyệt Demo 8 bước.
- **D30 (T6):** **FINAL GATE:** Trình diễn thành công bài Demo 8 bước Tốt nghiệp trước Mentor!
