# BÁO CÁO INSIGHT & TRẢI NGHIỆM THỰC TẾ KHI ỨNG DỤNG SDLC HARNESS (v5.3.0)

**Người thực hiện:** Ứng viên / Thực tập sinh  
**Ngày báo cáo:** 19/07/2026  
**Chủ đề:** Đánh giá trải nghiệm, thuận lợi, khó khăn và quan điểm cá nhân khi ứng dụng SDLC Harness cho AI Coding Assistant  
**Resource tham chiếu:** [SDLC Harness Release v5.3.0](https://github.com/hieubui2409/sdlc-harness-release/releases/tag/harness-v5.3.0)

---

## I. TỔNG QUAN VỀ SDLC HARNESS (VERSION 5.3.0)
SDLC Harness là hệ thống kỉ luật & kiểm soát dành cho AI Coding Assistant (Claude Code / Antigravity IDE / Agents). Bản phát hành v5.3.0 mang tới các tính năng cốt lõi:
1. **Auto-decision ledger subsystem:** Nhật ký tự động ghi lại các quyết định của AI dưới dạng JSONL append-only khi chạy chế độ autonomous mà không có sự can thiệp trực tiếp của con người.
2. **Two-tier write-permission deny-list (RBAC Cages):** Cơ chế phân quyền ghi theo vùng cấm (deny-list) thay vì whitelist cũ. AI có thể tự do sáng tạo ở phần lớn codebase nhưng hoàn toàn bị chặn (hard floor fail-closed) ở các vùng bảo vệ đặc biệt (Core config, git hooks, security policies).
3. **65 Fail-closed Hooks & 22 Rules:** Buộc AI trải qua 4 giai đoạn chuẩn hóa: **Discover/Plan $\rightarrow$ Code $\rightarrow$ Test $\rightarrow$ Ship**.

---

## II. ĐÁNH GIÁ THỰC TẾ & INSIGHTS

### 1. Thuận lợi & Lợi ích mang lại (Advantages & Strengths)

- **Kiểm soát chất lượng tuyệt đối (Zero Unbounded AI Run):** AI bắt buộc phải tạo `implementation_plan.md` và giải trình kiến trúc trước khi viết dòng code đầu tiên. Điều này ngăn chặn 100% tình trạng AI sửa code ngẫu nhiên.
- **An toàn cho Core Codebase (Protection via Permission Cages):** Với mô hình Two-tier deny-list cage của v5.3.0, lập trình viên hoàn toàn yên tâm vì AI không thể tự ý sửa đổi file cấu hình hệ thống, kho khóa bí mật, hoặc làm hỏng quy trình CI/CD.
- **Tự động lưu vết quyết định (Auditability & Transparency):** Tính năng **Auto-decision ledger** giúp đội ngũ xem lại chính xác các quyết định tự động mà AI đã đưa ra trong phiên làm việc, đảm bảo khả năng truy vết (traceability) cao.
- **Quy trình kiểm thử chặt chẽ (Fail-closed test gates):** Code do AI tạo ra bắt buộc phải vượt qua các hooks kiểm tra cú pháp, linting, và unit tests trước khi cho phép chuyển sang bước Ship.

---

### 2. Khó khăn & Rào cản gặp phải (Challenges & Bottlenecks)

- **Chi phí thời gian ban đầu (Setup & Overhead):** Việc cấu hình ban đầu, định nghĩa các quy tắc E1 rules và thiết lập environment đòi hỏi lập trình viên phải hiểu rõ về quy trình SDLC Harness.
- **Giảm tốc độ ở các task cực nhỏ (Over-engineering for tiny fixes):** Đối với các tác vụ quá nhỏ (như sửa 1 từ chính tả hoặc đổi 1 màu sắc), quy trình bắt buộc lập Plan $\rightarrow$ Code $\rightarrow$ Test $\rightarrow$ Ship có thể cảm thấy kéo dài hơn bình thường.
- **Đường cong học tập (Learning Curve):** Người dùng cần làm quen với cách tương tác bằng các câu lệnh kỉ luật (Skill triggers, plan approval, review ledger) thay vì gõ prompt tự do.

---

## III. QUAN ĐIỂM CÁ NHÂN & ĐỀ XUẤT CẢI TIẾN (PERSONAL VIEWPOINT)

### 1. Quan điểm cá nhân
- **Về tương lai của AI Software Engineering:** SDLC Harness đại diện cho tư duy làm việc với AI thế hệ mới: **AI là Động cơ (Engine), Harness là Vô lăng & Phanh (Steering & Brakes)**. Muốn xe chạy nhanh và an toàn trên đường cao tốc, ta bắt buộc phải có hệ thống phanh và vô lăng chuẩn xác.
- **Khi nào nên áp dụng:**
  - *Dự án sản phẩm thật / Dự án doanh nghiệp (Production App):* **BẮT BUỘC NÊN ÁP DỤNG**. Lợi ích quản trị và an toàn codebase vượt trội hơn hẳn so với overhead thời gian.
  - *Dự án Hackathon / Prototype 1-2 giờ:* Có thể nới lỏng các rules để ưu tiên tốc độ ra mắt bản alpha.

### 2. Đề xuất cải tiến cho bộ Harness
- **Smart Adaptive Mode:** Tự động điều chỉnh độ nghiêm ngặt của Harness dựa trên độ phức tạp của Task (ví dụ: Task nhỏ dưới 5 dòng code sẽ dùng chế độ Fast-track plan, Task trên 50 dòng sẽ kích hoạt Full Governance).
- **Trực quan hóa Ledger trên Web UI:** Tích hợp sẵn một UI Dashboard nhẹ để quản lý Auto-decision ledger thay vì chỉ đọc qua file JSONL/Markdown.

---

## IV. KẾT LUẬN
Ứng dụng **SDLC Harness v5.3.0** giúp biến AI từ một công cụ "sinh code tự do có rủi ro" thành một **Đồng nghiệp AI kỉ luật, đáng tin cậy và có kiểm soát**. Đây là mô hình phát triển phần mềm chuẩn mực mà mọi kỹ sư phần mềm hiện đại nên áp dụng.
