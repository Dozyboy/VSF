# BẢNG ĐIỀU HƯỚNG KNOWLEDGE DAY 04 — AIE-1 (TRẦN BÁ ĐẠT)

Chào mừng bạn đến với **Day 04** thuộc vai trò **AI Engineer 1 (AIE-1)** trong dự án AgentCore Studio.

## 📚 TÀI LIỆU HỌC TẬP VÀ THỰC THI NGÀY 04
Nghiên cứu và thực hiện công việc theo 2 tài liệu chuẩn sau:

1. 📖 [**BAI_GIANG_CHI_TIET.md**](file:///c:/Users/thuym/Desktop/Today/VSF/docs/Knowledge/AIE1_TranBaDat/Day04/BAI_GIANG_CHI_TIET.md): Bài giảng lý thuyết về Cài đặt 6 Node Executors hoàn chỉnh (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`), Phát sự kiện Trace Event real-time, và Kết nối gọi KB thật từ DE.
2. 🎯 [**MO_TA_NHIEM_VU.md**](file:///c:/Users/thuym/Desktop/Today/VSF/docs/Knowledge/AIE1_TranBaDat/Day04/MO_TA_NHIEM_VU.md): Chi tiết Issue GitHub `#17`, các bước hoàn thiện đủ 6 loại node handlers, đấu nối phát sự kiện `TraceEvent` tới Trace Sink của DE và nộp Daily Note D4.

---

## 📌 TÓM TẮT MỤC TIÊU DoD NGÀY 04
- [x] Cài đặt đầy đủ 6 Node Executors trong `packages/engine`.
- [x] Đấu nối hàm `kb-retrieve` tới dịch vụ `kb.search` đọc dữ liệu thật từ Postgres RLS.
- [x] Cài đặt Node `condition` xử lý logic rẽ nhánh True/False.
- [x] Tự động phát ra `TraceEvent` Pydantic model cho mọi bước chạy node.
- [x] Nộp Daily Note D4 (`2026-07-23-TranBaDat2607.md`).
