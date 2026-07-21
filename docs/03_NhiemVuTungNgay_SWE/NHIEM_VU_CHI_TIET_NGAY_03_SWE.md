# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ NGÀY 3 & SỰ LIÊN KẾT D1 - D2 - D3 (SWE — THIỆU QUANG MINH)

---

## 🔗 PHẦN I: SỰ LIÊN KẾT LIỀN MẠCH TỪ NGÀY 1 ➔ NGÀY 2 ➔ NGÀY 3

Nếu chưa hình dung được sự kết nối giữa các ngày, bạn hãy nhìn vào bức tranh tổng thể như việc **xây dựng một chiếc Ô tô AI**:

```
[ NGÀY 1: Học & Phân công ] ──► [ NGÀY 2: Vẽ thiết kế & Dựng khung ] ──► [ NGÀY 3: Lắp mạch & Cho xe chạy thử ]
  • Bạn giữ mảng Vỏ xe & Bàn điều khiển (Workbench/Form).          • Bạn vẽ bản thiết kế v0 (Recipe Contract).                    • Người dùng bấm nút trên Form (Bàn điều khiển).
  • AIE-1 giữ Động cơ (Interpreter).                              • AIE-1 dựng vỏ Động cơ rỗng.                                  • Form sinh ra Recipe ➔ Nắm dây ném vào Động cơ (Wiring).
  • DE giữ Bình xăng/Bộ lọc (KB/Data).                            • DE dựng cấu trúc kho dữ liệu.                                • Chạy thử 3 nấc: Lấy xăng ➔ Nổ máy ➔ Bật đèn (3 Nodes)!
```

### 📍 1. Ngày 1 (D1) — Nhận vị trí & Thấu hiểu Ranh giới
- **Bạn làm gì?**: Nhận mảng **Workbench / Recipe** và nắm chắc nguyên lý:
  - **Engine (Động cơ):** Là phần code lõi chạy ngầm dưới backend (do AIE-1, DE, AIE-2 viết) — xây 1 lần không đổi.
  - **Recipe (Công thức):** Là file cấu hình do người dùng tạo ra từ giao diện của bạn (SWE) — thay đổi tùy thích mà không cần sửa 1 dòng code lõi nào.
- **Mối liên kết**: Ngày 1 chỉ giúp định hình: *"Tôi là SWE, tôi là người làm ra giao diện để người dùng tạo ra bản Recipe"*.

### 📍 2. Ngày 2 (D2) — Vẽ Hiến pháp Contract v0 & Dựng Bộ khung (Scaffold)
- **Bạn làm gì?**: 
  - Khai báo bản mẫu **Contract #1 (`recipe.py`)** v0 — định nghĩa một `Recipe` gồm những trường gì (`agent_id`, `instructions`, `model`, `tool_whitelist`, `dag`).
  - Dựng 4 file rỗng ở backend: `validator.py`, `publish.py`, `tenant_wall.py`, `schema.py`.
- **Mối liên kết**: Ngày 2 tạo ra **"Khuôn mẫu"** và **"Đường ống rỗng"**. Lúc này chưa có dữ liệu nào chạy qua, mọi hàm đều ném lỗi `NotImplementedError`.

### 📍 3. Ngày 3 (D3) — XÂU KIM LẦN ĐẦU (WIRING & CHẠY THÔNG LUỒNG) 🌟
- **Mối liên kết bùng nổ ở Ngày 3**:
  - D2 bạn đã tạo khuôn `Recipe`.
  - **Hôm nay (D3)**: Bạn nối dây (**Wiring**)! 
  - Bạn tạo **Form nhập liệu** ➔ Điền dữ liệu ➔ Xuất ra đúng object `recipe.agent_config` ➔ **Ném object này vào Cổng vào (`entry`) của Động cơ Interpreter (do AIE-1 viết)**.
  - Lần đầu tiên, dữ liệu chảy thông qua 3 mảng: **Form (SWE) ➔ Recipe ➔ Interpreter (AIE-1)**!

---

## 🎯 PHẦN II: CHI TIẾT CỤ THỂ NHIỆM VỤ NGÀY 3 CỦA SWE (THIỆU QUANG MINH)

> **Đề bài của bạn:**
> * **Bút form tạo agent** ➔ xuất `recipe.agent_config`
> * **Wiring** `recipe` ➔ `interpreter` entry

---

### 📥 1. Nhiệm vụ 1: Lập trình Form tạo Agent ➔ Xuất `recipe.agent_config` đúng Shape v0
* **Công việc cụ thể:** Tạo một Form (trên UI React hoặc script/class builder) cho phép người dùng điền thông tin và đóng gói thành object `agent_config` theo đúng chuẩn `recipe.py` (phiên bản v0 đã định nghĩa ở Ngày 2).
* **Cấu trúc dữ liệu phải xuất ra:**
  ```python
  agent_config = {
      "instructions": "Bạn là trợ lý AI tra cứu tài liệu Callisto.",
      "model": "gemini-2.5-flash",
      "tool_whitelist": ["kb_search", "calculator"]
  }
  ```

---

### 🔌 2. Nhiệm vụ 2: Wiring (Xâu kim nối mạch) `recipe` ➔ `interpreter` entry
* **"Wiring" nghĩa là gì?**: Nối đầu ra của Workbench (Recipe) với đầu vào của Động cơ Interpreter (`studio_engine`).
* **Công việc cụ thể:** 
  1. Lấy đối tượng `Recipe` vừa được tạo ra từ Form.
  2. Gọi hàm khởi tạo/thực thi của AIE-1 (ví dụ: `interpreter.run(recipe)`).
  3. Cho tiến trình chạy qua **3 loại Node cơ bản theo đúng thứ tự**:
     - 🔹 **Node 1 (`kb-retrieve`)**: Động cơ đi gọi kho tài liệu KB để lấy thông tin.
     - 🔹 **Node 2 (`llm-step`)**: Động cơ đưa thông tin cho AI (LLM) suy luận trả lời.
     - 🔹 **Node 3 (`tool-call`)**: Động cơ kích hoạt công cụ (nếu có).
  4. **In ra kết quả (`state` cuối cùng)**: Kiểm tra xem kết quả đầu ra sau khi đi qua 3 node có đúng dữ liệu mong đợi hay không.

---

### 📋 3. Bảng Tiêu Chuẩn Hoàn Thành Ngày 3 (DoD - Definition of Done)

| # | Tiêu chí DoD | Mô tả chi tiết hành động của bạn |
| :-: | :--- | :--- |
| 🔲 | **Form xuất `agent_config` đúng shape recipe v0** | Form/Function đóng gói dữ liệu đầu vào xuất ra đúng các trường `instructions`, `model`, `tool_whitelist`. |
| 🔲 | **3 node chạy đúng thứ tự `kb-retrieve ➔ llm-step ➔ tool-call`** | Chạy thử nghiệm luồng xâu kim thành công qua 3 bước và in ra biến `state` cuối cùng trong Terminal/Log. |
| 🔲 | **Node-executor có docstring mô tả input/output** | Các hàm xử lý/gọi executor có ghi chú thích (docstring) giải thích rõ tham số đầu vào (Input) và kết quả trả về (Output). |
| 🔲 | **Review PR Day 1 của DE (Nguyễn Đông Anh)** | Đọc và bấm Duyệt (Approve) Pull Request Teach-back về KB Pipeline của bạn Đông Anh (DE). |
| 🔲 | **Daily-note D3** | Tạo file nhật ký làm việc ngày `D03-report-SWE-ThieuQuangMinh.md` và push lên Git. |
