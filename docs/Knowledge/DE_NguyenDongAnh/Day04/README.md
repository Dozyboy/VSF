# BẢNG ĐIỀU HƯỚNG KNOWLEDGE DAY 04 — DE (NGUYỄN ĐÔNG ANH)

Chào mừng bạn đến với **Day 04** thuộc vai trò **Data Engineer (DE)** trong dự án AgentCore Studio.

## 📚 TÀI LIỆU HỌC TẬP VÀ THỰC THI NGÀY 04
Nghiên cứu và thực hiện công việc theo 2 tài liệu chuẩn sau:

1. 📖 [**BAI_GIANG_CHI_TIET.md**](file:///c:/Users/thuym/Desktop/Today/VSF/docs/Knowledge/DE_NguyenDongAnh/Day04/BAI_GIANG_CHI_TIET.md): Bài giảng lý thuyết về Xây dựng Pipeline Ingest & Chunking thực tế, Cấu hình bảng PostgreSQL `kb.chunks` với hàng rào RLS 2 lớp (`tenant_id` + `section_role`), và Hệ thống Trace Sink Recorder.
2. 🎯 [**MO_TA_NHIEM_VU.md**](file:///c:/Users/thuym/Desktop/Today/VSF/docs/Knowledge/DE_NguyenDongAnh/Day04/MO_TA_NHIEM_VU.md): Chi tiết Issue GitHub `#16`, quy trình chạy `doc-factory` nạp 5 tài liệu Callisto vào DB, kiểm tra truy vấn lọc RLS, đóng băng Hợp đồng Schema v1 và nộp Daily Note D4.

---

## 📌 TÓM TẮT MỤC TIÊU DoD NGÀY 04
- [x] Chạy `doc-factory` nạp thành công 5 tài liệu Callisto cho 2 tenant `ankor` & `borea`.
- [x] Thiết lập bảng `kb.chunks` trên Postgres có kích hoạt RLS `FORCE ROW LEVEL SECURITY`.
- [x] Hoàn thiện hàm `kb.search` đọc dữ liệu thật từ DB lọc theo tenant & section role.
- [x] Đóng băng Hợp đồng Schema Contract #2 & #3 chuyển sang phiên bản v1 (Frozen).
- [x] Nộp Daily Note D4.
