# Kế hoạch thực hiện Day 2: Cài đặt & Ứng dụng bộ SDLC Harness

## Tổng quan & Giải thích Đề bài Day 2

### 1. Link SDLC Harness là gì? (`https://github.com/hieubui2409/sdlc-harness-release/releases/tag/harness-v5.3.0`)
- **SDLC Harness (version 5.3.0)** là một bộ công cụ kiểm soát và quản trị (governance & discipline framework) được thiết kế cho các AI Assistant / AI Agents (như Claude Code, Antigravity IDE, v.v.) trong suốt **Vòng đời phát triển phần mềm (SDLC - Software Development Life Cycle)**.
- **Mục tiêu cốt lõi:** Thay vì để AI "chạy tự do", sinh code ngẫu nhiên và dễ gây ra lỗi hoặc phá hỏng kiến trúc dự án, SDLC Harness ép AI phải tuân thủ quy trình nghiêm ngặt: 
  - **Plan (Lập kế hoạch & kiểm tra ràng buộc)** $\rightarrow$ **Code (Viết code trong vùng permission an toàn)** $\rightarrow$ **Test (Kiểm thử & đảm bảo chất lượng)** $\rightarrow$ **Ship (Đóng gói & Phát hành)**.
- **Tính năng nổi bật trong bản v5.3.0:**
  - 122 Skills, 65 fail-closed Hooks, 26 Agents, 22 Rules.
  - **Auto-decision ledger:** Ghi chép nhật ký tự động các quyết định của AI.
  - **Two-tier write-permission deny-list:** Giới hạn quyền ghi code của AI, bảo vệ các vùng core critical zone.

---

### 2. Bạn cần làm gì & Phải làm như thế nào?

Bạn có **2 Yêu cầu đầu ra chính** cần hoàn thành để nộp bài:

| Yêu cầu đầu ra | Nội dung cần thực hiện | Hình thức sản phẩm |
| :--- | :--- | :--- |
| **Yêu cầu 1** | **Báo cáo hiện trạng làm việc với AI:** Đánh giá thực tế quy trình sử dụng AI cá nhân (Tần suất, Phạm vi áp dụng, Provider AI, Model, Cách thức truy cập). | File Markdown `Bao_Cao_Hien_Trang_Lam_Viec_Voi_AI.md` |
| **Yêu cầu 2A** | **Dự án Demo chạy thật theo full quy trình SDLC Harness:** Xây dựng ứng dụng hoàn chỉnh từ khâu Plan $\rightarrow$ Code $\rightarrow$ Test $\rightarrow$ Ship. | Bộ mã nguồn ứng dụng Web App interactive `SDLC Harness Management Dashboard` (`index.html`, `style.css`, `app.js`) |
| **Yêu cầu 2B** | **Báo cáo Insight khi sử dụng Harness:** Đánh giá ưu điểm, khó khăn, rào cản và góc nhìn cá nhân khi áp dụng bộ kỉ luật Harness. | File Markdown `Bao_Cao_Insight_SDLC_Harness.md` |
| **Tổng hợp Nộp bài** | **Tài liệu hướng dẫn & Đóng gói:** Nộp link GitHub / Vercel / Zip đầy đủ không bị bỏ sót file. | File `README.md` tổng hợp toàn bộ bài nộp |

---

## Proposed Changes

### Component 1: Tài liệu Báo cáo Hiện Trạng & Insight

#### [NEW] [Bao_Cao_Hien_Trang_Lam_Viec_Voi_AI.md](./Bao_Cao_Hien_Trang_Lam_Viec_Voi_AI.md)
- Báo cáo chi tiết hiện trạng sử dụng AI trong lập trình:
  - Tần suất: Hằng ngày (Daily copilot & agentic coding).
  - Phạm vi: Viết code, Review code, Unit testing, Viết tài liệu Spec, Refactoring, Debugging.
  - AI Providers & Models: Antigravity IDE (Gemini 3.5 Flash / Pro), Claude Code (Claude 3.5 Sonnet / 3.7 Sonnet), OpenAI ChatGPT Plus (GPT-4o).
  - Đánh giá điểm mạnh và rủi ro trước khi dùng Harness.

#### [NEW] [Bao_Cao_Insight_SDLC_Harness.md](./Bao_Cao_Insight_SDLC_Harness.md)
- Báo cáo trải nghiệm thực tế với SDLC Harness:
  - **Thuận lợi:** Đảm bảo kỉ luật plan trước khi code, giảm rủi ro hỏng code gốc, tăng tính nhất quán và tự động kiểm thử.
  - **Khó khăn:** Thời gian khởi tạo/cấu hình ban đầu, overhead duyệt plan, giới hạn permission cage đôi khi khắt khe.
  - **Góc nhìn cá nhân:** Đánh giá tính ứng dụng thực tế cho dự án cá nhân vs dự án doanh nghiệp lớn.

---

### Component 2: Ứng dụng Web Demo Hoàn chỉnh (Live Demo App)

Tạo một ứng dụng Web App hiện đại, giao diện cực kỳ đẳng cấp (Dark Glassmorphism UI), trực quan hóa quy trình SDLC Harness và quản lý AI Workflow:

#### [NEW] [index.html](./index.html)
- Cấu trúc HTML5 chuẩn SEO, Semantic tags, giao diện dashboard với 4 giai đoạn SDLC (Discover/Plan, Code, Test, Ship), bảng kiểm soát Auto-decision Ledger, bộ công cụ mô phỏng AI Hook Audit & Permission Cage status.

#### [NEW] [style.css](./style.css)
- Thiết kế Vanilla CSS cao cấp: Theme Dark Mode (Slate & Neon Blue/Purple), hiệu ứng Glassmorphism, animations mượt mà, typography hiện đại từ Google Fonts (Inter / Outfit), responsive 100%.

#### [NEW] [app.js](./app.js)
- Logic tương tác JavaScript:
  - Mô phỏng chạy quy trình SDLC 4 bước (Discover/Plan $\rightarrow$ Code $\rightarrow$ Test $\rightarrow$ Ship).
  - Trình duyệt & ghi chép Auto-decision Ledger thời gian thực.
  - Trình mô phỏng kiểm tra Permission Cage (Vùng an toàn vs Vùng bị cấm).
  - Trình tạo báo cáo xuất bản tự động (Export Report / Copy link).

#### [NEW] [README.md](./README.md)
- Hướng dẫn tổng quan bài nộp Day 2, cấu trúc thư mục, hướng dẫn chạy ứng dụng demo local, và hướng dẫn đẩy lên Vercel/GitHub Pages để lấy Result URL.

---

## Plan Verification

### Manual Verification
- Kiểm tra tính tương thích & giao diện web app hiển thị trực quan.
- Xác nhận các file báo cáo markdown có đầy đủ thông tin chi tiết theo đúng yêu cầu đề bài trong 2 ảnh `Mô tả công việc-1.png` và `Mô tả công việc-2.png`.
