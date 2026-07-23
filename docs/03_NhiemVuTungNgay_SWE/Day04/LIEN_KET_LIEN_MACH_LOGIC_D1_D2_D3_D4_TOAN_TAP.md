# 🌐 TỔNG TẬP SỰ LIÊN KẾT LIỀN MẠCH LOGIC TỪ NGÀY 1 ➔ NGÀY 2 ➔ NGÀY 3 ➔ NGÀY 4 (SWE)

---

## 🚘 BỨC TRANH TỔNG THỂ: CHUỖI XÂY DỰNG CHIẾC Ô-TÔ AI AGENT (D1 ➔ D4)

Hành trình 4 ngày đầu tiên của vị trí **SWE (Thiệu Quang Minh)** trong Sprint 1 là một chuỗi tiến hóa liên tục, logic tuyệt đối, không có bất kỳ bước nhảy vọt vô căn cứ nào:

```
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│   NGÀY 1 (20/07)        │       │   NGÀY 2 (21/07)        │       │   NGÀY 3 (22/07)        │       │   NGÀY 4 (23/07)        │
│ Học Ranh Giới & Bảo Mật │ ──►   │ Đúc Khung Schema v0     │ ──►   │ Wiring Xâu Kim 3 Node   │ ──►   │ Tích Hợp KB & Citation  │
│ • Định hình ranh giới   │       │ • Schema AgentConfig    │       │ • Form UI ➔ Recipe      │       │ • kb_binding.{kb_id,    │
│   Workbench vs Engine   │       │ • Pydantic Contract #1  │       │ • Nối vào Interpreter   │       │   scope}                │
│ • Lớp 1: Tenant Wall    │       │ • 4 Đường ống Stubs     │       │ • Pytest test_wiring_d3 │       │ • kb.search chunk_id    │
│ • 6 Lớp Defense-in-Depth│       │ • DESCOPE.md            │       │ • Web App React         │       │ • Scorecard CLI 5 dòng  │
└─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘       └─────────────────────────┘
```

---

## 🔗 PHẦN 1: CHI TIẾT SỰ LIÊN KẾT LOGIC XUYÊN SUỐT 4 NGÀY

### 📍 1. NGÀY 1 (D1) — Ranh giới Vai trò SWE & Tư tưởng Lớp 1 Tenant Wall
* **Những gì bạn đã tiếp thu**:
  - Nhận vai trò SWE: Làm chủ mảng **Workbench & Web UI** (`packages/workbench`, `apps/web`).
  - Nắm vững kiến trúc: **Engine (Backend cố định)** vs **Recipe (Công thức cấu hình do SWE đóng gói từ Form UI)**.
  - Hiểu về 6 Lớp Bảo mật, đặc biệt là **Lớp 1: Tenant Wall** (Phân quyền dữ liệu theo khách hàng/Tenant).
* **Mối nối sang Ngày 2**: Nắm vững ranh giới để Ngày 2 bắt tay vào thiết kế bản mẫu Schema Recipe cho Workbench mà không xâm phạm sang phần code của Engine backend.

---

### 📍 2. NGÀY 2 (D2) — Đúc Bản thiết kế Schema & 4 Đường ống Rỗng (Stubs)
* **Những gì bạn đã thực hiện**:
  - Viết bản Contract #1 `studio_contracts.recipe` sử dụng Pydantic bất biến (`frozen=True`).
  - Dựng 4 file khung rỗng trong `studio_workbench`: `validator.py`, `publish.py`, `tenant_wall.py`, `schema.py`.
  - Lập tài liệu hạ cấp nấc tính năng `DESCOPE.md` và câu hỏi mentor `QUESTIONS_FOR_MENTOR.md`.
* **Mối nối sang Ngày 3**: Bản Schema `AgentConfig` và các đường ống rỗng Ngày 2 chính là "khuôn mẫu" để Ngày 3 lấy dữ liệu từ Form UI đóng gói thành đối tượng Recipe thật.

---

### 📍 3. NGÀY 3 (D3) — Xâu Kim (Wiring) Thông Luồng Walking Skeleton 3 Node
* **Những gì bạn đã thực hiện**:
  - Tạo hàm `build_agent_config()` biến dữ liệu thô từ Form UI thành `AgentConfig` chuẩn Pydantic.
  - Đóng gói Recipe 3-Node (`kb-retrieve ➔ llm-step ➔ tool-call`).
  - Nối (Wire) đối tượng Recipe này thẳng vào cổng `run()` của Engine Interpreter (`studio_engine.interpreter`).
  - Viết test Pytest `test_wiring_d3.py` dùng kỹ thuật bắt `NotImplementedError` để chứng minh luồng dữ liệu đã chạy thông.
* **Mối nối sang Ngày 4**: Ngày 3 đã cho chạy thông luồng 3 Node, nhưng Node `kb-retrieve` lúc này mới chỉ gửi câu hỏi thô mà chưa có thông tin kho tri thức (KB ID) hay phạm vi bảo mật (Scope Tenant). Ngày 4 sẽ nâng cấp luồng này bằng cách bổ sung `kb_binding`.

---

### 📍 4. NGÀY 4 (D4) — Tích hợp KB Binding, Multi-Tenant Scope & Smoke Evaluation 🌟
* **Những gì bạn thực hiện ở Ngày 4**:
  - **Đưa Tenant Wall (D1) vào Schema**: Khai báo `kb_binding.{kb_id, scope}` trong Recipe để bảo vệ dữ liệu Tenant theo Lớp 1.
  - **Wiring nâng cấp**: Cập nhật Workbench Builder và script wiring sao cho `interpreter` đọc được `kb_binding` và truyền sang hàm `kb.search` của DE.
  - **Nghiệm thu Citation**: Phối hợp kiểm thử hàm `kb.search` trả về đúng `chunk_id` cho từng trích dẫn.
  - **Đánh giá Bảng điểm**: Thực thi 5 test case Callisto synthetic NDA clean có nhãn tay và in Bảng điểm 5 dòng ra màn hình CLI.

---

## 📊 PHẦN 2: BẢNG ĐỐI CHIẾU TIẾN TRÌNH 4 NGÀY CỦA SWE

| Ngày | Mục tiêu chính | Code / Artifacts tạo ra | Giá trị kết nối vào hệ thống |
| :--- | :--- | :--- | :--- |
| **Ngày 1** | **Hiểu Ranh giới & Luật** | `2026-07-20-Dozyboy.md` | Định hình vai trò SWE: Không sửa code Engine, làm chủ Form UI & Recipe. |
| **Ngày 2** | **Vẽ Thiết kế & Dựng Khung** | `recipe.py`, `validator.py`, `publish.py`, `tenant_wall.py`, `schema.py`, `DESCOPE.md` | Tạo "Khuôn mẫu Recipe v0" và 4 đường ống rỗng để đồng nghiệp import. |
| **Ngày 3** | **Xâu Kim (Wiring)** | `builder.py`, `test_wiring_d3.py`, `App.tsx`, `2026-07-22-Dozyboy.md` | Nối dữ liệu từ Form UI ➔ Recipe ➔ Nổ máy Engine thành công! |
| **Ngày 4** | **KB Binding & Citation Eval** | `builder.py` (update), `test_wiring_d4.py`, `smoke_eval_d4.py`, `2026-07-23-Dozyboy.md` | Nâng cấp kho tri thức Tenant Scope, trả `chunk_id` và in Bảng điểm CLI 5 dòng! |

---

## 🤝 PHẦN 3: SỰ PHỐI HỢP NHÓM 4 VỊ TRÍ TRONG NGÀY 4

```
                       ┌──────────────────────────────┐
                       │          SWE (BẠN)           │
                       │ Form UI ➔ Recipe chứa        │
                       │ kb_binding.{kb_id, scope}    │
                       └──────────────┬───────────────┘
                                      │ Wiring truyền Recipe
                                      ▼
                       ┌──────────────────────────────┐
                       │        AIE-1 (BÁ ĐẠT)        │
                       │ Interpreter đọc kb_binding   │
                       │ gọi kb.search                │
                       └──────────────┬───────────────┘
                                      │ Gọi API Search
                                      ▼
                       ┌──────────────────────────────┐
                       │        DE (ĐÔNG ANH)         │
                       │ Tra cứu KB Stub & trả về     │
                       │ kết quả chứa `chunk_id`      │
                       └──────────────┬───────────────┘
                                      │ Trả kết quả
                                      ▼
                       ┌──────────────────────────────┐
                       │       AIE-2 (TIẾN DUY)       │
                       │ Chấm điểm Citation Accuracy  │
                       │ in Bảng điểm 5 dòng ra CLI   │
                       └──────────────────────────────┘
```

👉 **Kết luận**: Ngày 4 là sự phối hợp nhịp nhàng giữa cả 4 vị trí! SWE chuẩn bị cấu hình `kb_binding`, AIE-1 đọc và gọi search, DE trả về trích dẫn `chunk_id`, và AIE-2 chấm điểm in ra CLI!
