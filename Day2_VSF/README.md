# BÀI NỘP BÀI THỰC TẬP DAY 2 - CÀI ĐẶT & ỨNG DỤNG BỘ SDLC HARNESS

**Bài tập Thực tập Day 2: Ứng dụng SDLC Harness cho AI Coding Assistant (Claude Code / Antigravity IDE)**.

---

## 🔗 THÔNG TIN THAM CHIẾU & LINK QUAN TRỌNG

- **Release SDLC Harness Tham Chiếu:** [SDLC Harness Release v5.3.0](https://github.com/hieubui2409/sdlc-harness-release/releases/tag/harness-v5.3.0)
- **Repository chính thức:** `hieubui2409/sdlc-harness-release`
- **Result URL (Sẵn sàng nộp lên Vercel / GitHub Pages):** Nộp link sau khi đẩy repository hoặc deploy ứng dụng web demo.

---

## 📁 CẤU TRÚC THƯ MỤC

```text
Day2_VSF/
├── Mô tả công việc-1.png                      # Ảnh yêu cầu đề bài phần 1
├── Mô tả công việc-2.png                      # Ảnh yêu cầu đề bài phần 2 & nộp link
├── Bao_Cao_Hien_Trang_Lam_Viec_Voi_AI.md      # YÊU CẦU 1: Báo cáo hiện trạng sử dụng AI
├── Bao_Cao_Insight_SDLC_Harness.md            # YÊU CẦU 2B: Báo cáo Insight & Trải nghiệm
└── README.md                                  # Tài liệu tổng hợp & hướng dẫn
```

---

## 📌 TÓM TẮT NỘI DUNG CÁC BÁO CÁO CẦN NỘP

### 1. Yêu cầu đầu ra 1: Báo cáo hiện trạng làm việc với AI
- Xem chi tiết tại file: [`Bao_Cao_Hien_Trang_Lam_Viec_Voi_AI.md`](./Bao_Cao_Hien_Trang_Lam_Viec_Voi_AI.md)
- **Nội dung:** Mô tả chi tiết tần suất sử dụng AI (hằng ngày), phạm vi ứng dụng (Plan, Code, Review, Test, Debug), danh sách Provider AI & Model (Antigravity IDE / Gemini 3.5 Flash, Claude 3.5 Sonnet, Copilot GPT-4o), cùng các bất cập khi AI hoạt động tự do không có rào chắn.

### 2. Yêu cầu đầu ra 2: Dự án Demo & Báo cáo Insight SDLC Harness
- **Dự án Demo running thật:** Ứng dụng Web App `SDLC Harness Governance Dashboard` (`index.html`, `style.css`, `app.js`) mô phỏng 4 bước kỉ luật SDLC:
  1. **Discover & Plan:** Tạo kế hoạch & audit quy tắc E1 rules.
  2. **Code & RBAC Cage:** Kiểm tra rào chắn phân quyền deny-list bảo vệ vùng core.
  3. **Test & Verify:** Kích hoạt 65 fail-closed hooks kiểm tra chất lượng code.
  4. **Ship & Ledger:** Đóng gói bản phát hành và ghi nhận vào Auto-Decision Ledger JSONL.
- **Báo cáo Insight trải nghiệm:** Xem chi tiết tại file [`Bao_Cao_Insight_SDLC_Harness.md`](./Bao_Cao_Insight_SDLC_Harness.md).

---

## 💻 HƯỚNG DẪN MỞ VÀ CHẠY ỨNG DỤNG DEMO LOCAL

### Cách 1: Mở trực tiếp trên trình duyệt
Double click vào file [`index.html`](./index.html) hoặc kéo thả file `index.html` vào trình duyệt Web (Chrome, Edge, Firefox).

### Cách 2: Chạy qua Live Server / Node.js
```bash
# Mở Terminal trong thư mục Day2_VSF
npx serve .
# Hoặc sử dụng extension Live Server trên VS Code / Antigravity IDE
```

