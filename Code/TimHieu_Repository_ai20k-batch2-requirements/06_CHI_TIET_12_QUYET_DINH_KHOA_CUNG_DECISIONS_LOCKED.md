# 🔒 CHI TIẾT 12 QUYẾT ĐỊNH KHOÁ CỨNG (`decisions-locked.md`)
*(Bóc tách chuyên sâu nội dung file `00-orientation/decisions-locked.md`)*

---

## 📌 I. BẢN CHẤT CỦA FILE `decisions-locked.md`

File này chứa **12 Quyết định kiến trúc đã được Mentor chốt cứng (Status: Locked)** sau buổi phỏng vấn định hướng ngày 17/07/2026. 

Đây là **quyết định pháp lý kỹ thuật** cho toàn bộ dự án AgentCore Studio, các thực tập sinh tuân thủ 100%, không mở lại tranh luận thay đổi công nghệ nền tảng.

---

## 📊 II. BẢNG CHI TIẾT 12 QUYẾT ĐỊNH ĐÃ CHỐT

| Mã QĐ | Tên Quyết định | Nội dung đã Chốt cứng | Ý nghĩa & Ghi chú thực thi |
| :---: | :--- | :--- | :--- |
| **D-1** | Bộ đề được chọn | **AgentCore Studio "Xưởng Create➔Test➔Trust"** | Chọn bộ đề Xưởng sản xuất Agent trọn vòng đời trong số 8 bộ đề (A–H). |
| **D-2** | Bản chất Sản phẩm | **Full 3-sprint / 30-ngày làm việc** | Độ sâu dự án kéo dài full 6 tuần (3 Sprints), ngang tầm với Set A. |
| **D-3** | Tiêu chí chấm điểm | **Nghiêng về Làm việc Nhóm + Giao hàng thực tế** | Tiêu chí chấm chi tiết do Mentor giữ kín. |
| **D-4** | Giao diện UI | **React Flow Canvas (Sprint 2) + Fallback Form & Mermaid** | Nếu SWE chưa thạo React Flow thì hạ cấp xuống Form + Mermaid mà Demo vẫn sống. |
| **D-5** | Kết nối Mô hình AI | **Fixtures-First (Phase 1)** | CI chạy 100% bằng dữ liệu giả lập/ghi sẵn (VCR style) để không phụ thuộc vào LLM thật. |
| **D-6** | Service Embedding | **`EmbeddingService` Protocol 2-impl** | Thiết kế 1 Interface chung có 2 bản cài đặt (Stub local + Gọi Gateway). |
| **D-7** | Lịch làm việc | **Schedule-Agnostic (Không phụ thuộc ngày dương)** | Day 1 = Thứ Hai; 3 mốc Gate chốt tại Day 10, Day 20, Day 30. |
| **D-8** | Bản trình Lãnh đạo | **Bản điều hành 4–6 trang (Markdown + PDF)** | Viết súc tích, chuyên nghiệp, chống văn phong AI tự động. |
| **D-9** | Đội hình phân công | **1 DE · 1 SWE · 2 AIE (AIE-1, AIE-2)** | Mỗi người sở hữu 1 Quadrant. DE sở hữu mảng rộng nhất (Double-flagship). |
| **D-10** | Phiên bản Python | **Python 3.12** | Thống nhất 1 phiên bản Python duy nhất trên toàn bộ Workspace. |
| **D-11** | Bảo mật KB Fence | **Lọc quyền ngay tại tầng truy xuất (Retrieval)** | Chặn quyền tại SQL/Vector Search; CẤM "nhờ LLM đừng nói"; Yêu cầu `leakage = 0`. |
| **D-12** | Đóng băng Hợp đồng | **4 Schema đóng băng vào cuối Sprint 1 (Day 11)** | Recipe, Trace-Event, KB Search, Scorecard. Muốn đổi phải làm Mini-RFC có 4/4 chữ ký. |

---

## 🪜 III. THANG CẮT GIẢM TÍNH NĂNG CHUẨN (DESCOPE-LADDER)

File này quy định rõ **4 nấc cắt giảm tính năng** khi dự án bị trễ tiến độ. **Bắt buộc phải cắt đúng theo thứ tự này, không cắt tùy hứng**:

1. **Nấc 1 (KB Pipeline):** Chuyển từ KB thật (ingest/embed thật) ➔ **Stub tĩnh (5 tài liệu)**.
2. **Nấc 2 (Giao diện Canvas):** Chuyển từ React Flow kéo-thả ➔ **Form khai báo + Sơ đồ Mermaid tĩnh**.
3. **Nấc 3 (Trọng tài LLM-Judge):** Chuyển từ LLM chấm điểm ➔ **Exact-match / Field-match (So khớp từ ngữ chuẩn)**.
4. **Nấc 4 (Bảng theo dõi Cost):** Chuyển từ Dashboard giao diện ➔ **In bảng thống kê ra màn hình CLI**.

👉 **Đặc điểm quan trọng:** Dù bạn có tụt xuống nấc 4 của Thang cắt giảm thì **Kịch bản Demo tốt nghiệp 8 bước end-to-end VẪN CHẠY VÀ SỐNG 100%**.
