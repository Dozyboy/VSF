# 📄 CHI TIẾT FILE `README.md` (FILE GỐC ĐIỀU HƯỚNG REPOSITORY)
*(Bóc tách chuyên sâu nội dung file `ai20k-batch2-requirements/README.md`)*

---

## 🌐 I. BẢN CHẤT CỦA FILE `README.md` GỐC
- **Vai trò:** Là **Master Navigation Document (Bản đồ điều hướng chính)** của toàn bộ chương trình OJT AgentCore Studio.
- **Đối tượng đọc:** Dành cho 4 thực tập sinh (DE, SWE, AIE-1, AIE-2).
- **Nguyên tắc:** Hướng dẫn người học đọc tài liệu theo **thứ tự chuẩn 5 bước**, tránh nhảy cóc làm hổng kiến thức nền tảng.

---

## 🪜 II. BA TẦNG CẤU TRÚC ĐỀ BÀI

Đề bài dự án được thiết kế theo 3 tầng từ cao xuống thấp:

```
Tầng 1: 00-brief-overview.md   ──► Toàn cảnh 6 tuần: Xây cái gì / Vì sao / Ai làm gì / Luật chơi / Đích đến.
            │
            ▼
Tầng 2: Roadmap 3 Sprints      ──► 3 chặng tiến hóa năng lực (Follow ➔ Assist ➔ Apply) + 3 mốc Gate (Day 10/20/30).
            │
            ▼
Tầng 3: Skeleton 30 ngày        ──► Đề bài nhiệm vụ cụ thể từng ngày (D1 ➔ D30) cho từng vị trí.
```

### Bậc thang hình thái Đề bài qua 3 Sprints:
1. **Sprint 1 (Follow - Tuần 1-2):** Đề bài dạng **SPEC** (Chỉ rõ *What* và gợi ý *How*).
2. **Sprint 2 (Assist - Tuần 3-4):** Đề bài dạng **GOAL** (Chỉ rõ *What* và tiêu chí nghiệm thu; KHÔNG liệt kê các bước làm).
3. **Sprint 3 (Apply - Tuần 5-6):** Đề bài dạng **PROBLEM** (Nêu bài toán *Why* + Các ràng buộc; Học viên tự thiết kế giải pháp).

---

## 📑 III. CẤU TRÚC 6 TRƯỜNG CỦA MỘT "DAY-GOAL" (NHIỆM VỤ NGÀY)

Mỗi file ngày (`day-XX.md`) sẽ diễn giải nhiệm vụ theo đúng 6 trường chuẩn:

| Trường | Ý nghĩa & Tiêu chuẩn |
| :--- | :--- |
| **`objective`** | Mục tiêu làm việc trong ngày, bắt đầu bằng động từ và **đo lường được**. |
| **`cognitive-target`** | Định hướng phát triển 4 vector năng lực: `[NT]` Nhận thức, `[TD]` Tư duy, `[KT]` Kiến thức, `[KN]` Kỹ năng. |
| **`deliverable`** | Sản phẩm đầu ra có thể **link được hoặc chạy được** (Minh chứng *"Evidence-or-it-didn't-happen"*). |
| **`mentor-touchpoint`** | Điểm chạm với Mentor (Mặc định dạng bất đồng bộ - Async). |
| **`self-check`** | 2–3 câu hỏi tự kiểm tra chất lượng công việc trước khi coi là xong. |
| **`eval-axis`** | Trục tự đánh giá năng lực (A&I, S&E, OQ&R). |

---

## 📌 IV. BẢNG TỔNG HỢP QUY ƯỚC & KÝ HIỆU CHUẨN

* **Quadrant:** 4 mảng chuyên môn do 4 bạn làm chủ end-to-end (DE, SWE, AIE-1, AIE-2).
* **Engine \| Recipe:** Engine = Động cơ lõi build một lần; Recipe = Công thức khai báo dạng YAML/JSON, zero code lõi.
* **6 Node-Type đóng (CAP CỨNG):** `kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end` — **Tuyệt đối cấm thêm node lạ**.
* **Fence (Rào chắn bảo mật):** Lọc quyền ngay tại tầng truy xuất Database (`kb.search`). Đòi hỏi **`leakage = 0`**.
* **Eval-Gate (Cổng kiểm định):** Nếu kết quả test bị `FAIL` ➔ **Chặn nút Publish & Gọi Rollback**.
* **Trace / Cost-Lineage:** Nhật ký từng bước chạy. Con số chi phí (`cost`) phải **khớp chính xác trên cả 3 màn hình**.
* **Contract (4 Hợp đồng Schema):** Recipe, Trace-Event, `kb.search`, Scorecard. Đóng băng cuối Tuần 1. Đổi phải có 4/4 chữ ký đồng ý.
* **Fixtures-First:** CI chạy 100% bằng dữ liệu ghi sẵn (fixtures/VCR), không chấm điểm dựa vào độ thông minh của LLM.
* **Descope-Ladder:** Thang 4 nấc cắt giảm tính năng khi bị kẹt (KB ➔ Stub, Canvas ➔ Form/Mermaid, Judge ➔ Exact-match, Dashboard ➔ CLI).
* **Luật 2-4-8:** Kẹt 2h tự ghi giả thuyết ➔ Kẹt 4h xin hint ➔ Kẹt 8h Mentor làm việc cùng 30 phút.
