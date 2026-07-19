# BÁO CÁO HIỆN TRẠNG LÀM VIỆC VỚI AI VÀ QUY TRÌNH PHÁT TRIỂN PHẦN MỀM

**Người thực hiện:** Ứng viên / Thực tập sinh  
**Ngày báo cáo:** 19/07/2026  
**Dự án / Nội dung:** Day 2 - Cài đặt & Ứng dụng bộ SDLC Harness  

---

## I. MỤC TIÊU BÁO CÁO
Báo cáo này mô tả chi tiết hiện trạng, tần suất, phạm vi và các công cụ/provider AI đang được ứng dụng trong công việc phát triển phần mềm thực tế hàng ngày, làm cơ sở để đối chiếu trước và sau khi áp dụng bộ kỉ luật **SDLC Harness (for Claude Code / AI Assistant)**.

---

## II. CHI TIẾT HIỆN TRẠNG SỬ DỤNG AI

### 1. Tần suất sử dụng AI (Frequency of Use)
- **Tần suất chính:** **HẰNG NGÀY (Daily & Continuous)**.
- **Cách thức vận hành:** AI được tích hợp như một **Pair Programmer (Lập trình viên song hành)** trong hầu hết các phiên làm việc (Coding sessions).
- **Mức độ phụ thuộc / tương tác:**
  - *Định kỳ hằng ngày:* Hỗ trợ gợi ý code thông minh (Autocomplete), giải thích đoạn code phức tạp, tìm lỗi cú pháp và gợi ý thuật toán tối ưu.
  - *Theo từng sprint / giai đoạn:* Hỗ trợ phân tích yêu cầu bài toán (Requirements Analysis), phác thảo kiến trúc hệ thống, xây dựng tài liệu API Spec.

---

### 2. Phạm vi áp dụng AI (Scope of Application)
AI đang được ứng dụng trong hầu hết các khâu của vòng đời phát triển phần mềm (SDLC), cụ thể:

| Khâu trong SDLC | Phạm vi & Tác vụ chi tiết do AI hỗ trợ | Tỷ lệ đóng góp của AI |
| :--- | :--- | :--- |
| **1. Planning & Spec** | Phác thảo ý tưởng, phân tích yêu cầu kĩ thuật, tạo danh sách công việc (Task breakdown), viết tài liệu `README.md` và API Specification. | **40%** (Gợi ý khung & tiêu chuẩn) |
| **2. Viết Code (Development)** | Viết các hàm helper, tạo UI components, sinh code mẫu (boilerplate code), chuyển đổi định dạng dữ liệu (data transformations). | **70%** (Tốc độ sinh code cực nhanh) |
| **3. Code Review & Refactoring** | Kiểm tra code smells, gợi ý tối ưu hiệu năng (Performance Optimization), chuẩn hóa naming convention, phát hiện lỗ hổng bảo mật cơ bản. | **50%** (Đóng vai trò reviewer thứ 2) |
| **4. Testing (Kiểm thử)** | Sinh tự động các kịch bản Unit Test (Jest, PyTest), Integration Test mock data, Edge-case testing. | **60%** (Tạo test cases bao phủ rộng) |
| **5. Debugging & Troubleshooting** | Phân tích Log lỗi, đọc Stack trace, đưa ra nguyên nhân gốc rễ (Root cause analysis) và gợi ý bản sửa lỗi (Bug fix). | **80%** (Tiết kiệm thời gian tra cứu) |

---

### 3. Danh sách Provider AI & Công cụ sử dụng (AI Tools & Infrastructure)

| Tên công cụ / Nền tảng | AI Model đang dùng | Hình thức truy cập | Mục đích sử dụng chính |
| :--- | :--- | :--- | :--- |
| **Antigravity IDE / Claude Code** | Gemini 3.5 Flash / Pro, Claude 3.5 Sonnet / 3.7 Sonnet | Extension IDE / CLI Tool / Agentic Workspace | Agentic Coding (Tự động đọc toàn bộ dự án, tạo file, sửa code nhiều file, chạy terminal) |
| **GitHub Copilot** | GPT-4o / Claude 3.5 Sonnet | VS Code Extension | Autocomplete code hằng ngày, inline chat trong IDE |
| **ChatGPT Plus / Claude Web** | Claude 3.5 Sonnet, GPT-4o | Web Application UI | Tra cứu kiến thức kiến trúc rộng, brainstorm giải pháp hệ thống |

---

## III. ĐÁNH GIÁ ĐIỂM MẠNH VÀ NHỮNG HẠN CHẾ TRƯỚC KHI CÓ SDLC HARNESS

### 1. Điểm mạnh (Advantages)
- **Tăng năng suất đột phá:** Rút ngắn 40-50% thời gian viết code cơ bản và cấu trúc dự án.
- **Giảm gánh nặng học tập (Learning Curve):** Nhanh chóng tiếp cận thư viện / công nghệ mới thông qua lời giải thích và ví dụ cụ thể từ AI.

### 2. Những điểm hạn chế & Rủi ro khi AI "Chạy tự do" (Gaps & Pain Points)
- **Thiếu kiểm soát kỉ luật (No SDLC discipline):** AI dễ tự ý nhảy vào viết code ngay mà không lập kế hoạch (Plan) chi tiết, dẫn đến thiết kế thiếu sót hoặc đi sai hướng.
- **Rủi ro sửa nhầm file / phá hỏng code gốc (Unbounded file modification):** Khi không có permission Cages, AI có thể tự ý chỉnh sửa hoặc xóa các file quan trọng trong thư mục core/config.
- **Chất lượng code không đồng đều:** AI có thể sinh ra code chạy được nhưng không tuân thủ quy chuẩn thiết kế chung (Coding Standard / Architectural Constraints).
- **Hạ thấp chất lượng kiểm thử:** AI tự code và tự bảo "đã xong" mà thiếu các fail-closed hooks tự động kiểm tra xem code thực sự đã pass test và linting hay chưa.

---

## IV. KẾT LUẬN
Nhận thức được những hạn chế trên, việc áp dụng bộ công cụ **SDLC Harness (v5.3.0)** là bước đi tất yếu nhằm thiết lập **khung quản trị (Governance)**, buộc AI phải hoạt động trong khuôn khổ kỉ luật **Discover/Plan $\rightarrow$ Code $\rightarrow$ Test $\rightarrow$ Ship**, bảo vệ codebase dự án và nâng cao chất lượng phần mềm đầu ra.
