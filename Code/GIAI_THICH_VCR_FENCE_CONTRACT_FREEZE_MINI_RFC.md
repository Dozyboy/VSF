# 📑 GIẢI THÍCH THUẬT NGỮ: VCR-STYLE, FENCE, CONTRACT-FREEZE & MINI-RFC

Tài liệu này tổng hợp giải thích chi tiết các thuật ngữ cốt lõi trong đề bài dự án **AgentCore Studio**.

---

## 📼 1. VCR-style là gì? (Giả lập phản hồi AI khi Test)

* **Nguồn gốc tên gọi:** VCR = *Video Cassette Recorder* (Đầu băng video ngày xưa). Nguyên lý của VCR là **"Thu băng 1 lần ➔ Bấm Play phát lại nhiều lần"**.
* **Trong lập trình AI (VCR-style Fixture cho `llm-step`):**
  * Mỗi lần gọi API AI thật (như Google Gemini hay OpenAI) đều **tốn tiền ($) và mất 2 - 3 giây**.
  * Để phục vụ việc chạy Unit Test tự động hàng ngày:
    * Lần test đầu tiên, hệ thống gọi API thật 1 lần và **ghi (record) câu trả lời của AI vào một file mẫu (Fixture)**.
    * Từ các lần test sau (trên CI/CD), hệ thống chỉ cần **phát lại (replay) đáp án từ file mẫu đó**, tuyệt đối **KHÔNG gọi API AI thật nữa**.
* 🎯 **Tác dụng:** Giúp test chạy cực nhanh (0.01 giây), kết quả luôn ổn định 100% và **tốn 0 đồng tiền API!**

---

## 🛡️ 2. Hàng rào bảo mật Fence là gì?

* **Fence (Hàng rào bảo mật):** Là rào chắn phân quyền giữa các khách hàng/doanh nghiệp (Multi-tenant isolation), đảm bảo Công ty A tuyệt đối không bao giờ đọc lén được dữ liệu của Công ty B (**`leakage = 0`**).
* **Vị trí đặt Fence:** Đặt **ngay tại tầng tra cứu Database (`kb.search`)** bằng cơ chế **Postgres RLS (Row Level Security)**.
* **Luật cứng:** Lọc dữ liệu ngay ở tầng đĩa cứng Postgres, **CẤM "nhờ AI dặn đừng nói"**.

---

## ❄️ 3. Đóng băng Hợp đồng (Contract Freeze) & Mini-RFC là gì?

### A. Đóng băng Hợp đồng (Contract Freeze):
* 4 Hợp đồng (`Recipe`, `TraceEvent`, `kb.search`, `Scorecard`) là **xương sống giao tiếp giữa 4 thành viên** (SWE, DE, AIE-1, AIE-2).
* Cuối Tuần 1, cấu trúc của 4 Hợp đồng này sẽ bị **"Đóng băng" (Freeze)**. 
* **Nghĩa là:** Tên các trường dữ liệu (như `instructions`, `dag`, `tenant_id`, `scorecard`...) sẽ bị **khóa cứng**. Không ai được tự ý đổi tên hay thêm/bớt trường dữ liệu tùy tiện nữa.

### B. Mini-RFC là gì? (Quy trình xin đổi kiến trúc):
* **RFC** (*Request For Comments*) là quy trình chuẩn ở các tập đoàn công nghệ lớn (Google, Amazon...) khi muốn sửa đổi một tiêu chuẩn quan trọng.
* **Quy trình Mini-RFC trong nhóm bạn:** Nếu sang Tuần 2, bạn (SWE) phát hiện cần thêm 1 trường dữ liệu mới vào `Recipe`:
  1. Bạn **KHÔNG ĐƯỢC tự ý sửa code một mình** (vì nếu bạn tự sửa, code của 3 người còn lại sẽ bị lỗi ngay lập tức).
  2. Bạn phải viết 1 bản đề xuất ngắn (**Mini-RFC**) giải thích: *"Vì sao phải thêm trường này? Nó ảnh hưởng thế nào đến DE, AIE-1, AIE-2?"*.
  3. Bản Mini-RFC phải đạt **đủ 4/4 chữ ký đồng ý của cả nhóm + 1 chữ ký của Mentor** thì bạn mới được phép sửa code Hợp đồng!

🎯 **Tác dụng:** Đảm bảo tính kỷ luật chuyên nghiệp, tránh việc 1 người tự ý sửa code làm sập toàn bộ hệ thống của 3 người còn lại!
