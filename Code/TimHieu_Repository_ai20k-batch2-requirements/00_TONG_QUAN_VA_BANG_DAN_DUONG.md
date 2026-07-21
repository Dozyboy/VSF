# 🧭 TỔNG QUAN & BẢNG DẪN ĐƯỜNG DỰ ÁN AGENTCORE STUDIO
*(Tóm tắt chi tiết từ `README.md` & `decisions-locked.md` trong repository `ai20k-batch2-requirements`)*

---

## 🌐 I. BỐI CẢNH & THỨ TỰ ĐỌC TÀI LIỆU CHUẨN

Repository `ai20k-batch2-requirements` là **Nguồn sự thật lõi (SSOT)** do Mentor quản lý.
Để không bị ngợp thông tin, học viên cần tuân thủ **thứ tự đọc 5 bước không nhảy cóc**:

| Bước | File cần đọc | Mục đích & Đích đến |
| :---: | :--- | :--- |
| **Bước 0** | [`00-orientation/pre-reading.md`](file:///C:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/ai20k-batch2-requirements/00-orientation/pre-reading.md) | **Đọc đầu tiên:** Bối cảnh + Đề bài rút gọn + Các khái niệm cần tự research trước Ngày 1 để làm bài Teach-Back. |
| **Bước 1** | [`00-orientation/brief-overview.md`](file:///C:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/ai20k-batch2-requirements/00-orientation/brief-overview.md) | **Toàn cảnh 6 tuần:** Mục tiêu xây dựng cái gì, tại sao, ai sở hữu mảng nào, kịch bản demo 8 bước. |
| **Bước 2** | [`00-orientation/roadmap-3-sprint.md`](file:///C:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/ai20k-batch2-requirements/00-orientation/roadmap-3-sprint.md) | **Lộ trình 30 ngày:** Khung 3 Sprints x 2 tuần (30 ngày làm việc) + các mốc kiểm định Gate Day 10 / Day 20 / Day 30. |
| **Bước 3** | [`00-orientation/umbrella-contract.md`](file:///C:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/ai20k-batch2-requirements/00-orientation/umbrella-contract.md) | **Hiến pháp Kiến trúc Lõi:** Chi tiết 4 Hợp đồng dữ liệu Schema (Recipe, Trace, KB search, Scorecard). |
| **Bước 4** | [`00-orientation/charter.md`](file:///C:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/ai20k-batch2-requirements/00-orientation/charter.md) | **Hiến pháp Chương trình:** Ranh giới Engine \| Recipe, quy tắc NDA, các quyết định đã chốt cứng. |

---

## 🔒 II. 12 QUYẾT ĐỊNH KIẾN TRÚC ĐÃ KHÓA CỨNG (DECISIONS LOCKED)

Các quyết định dưới đây đã được chốt cứng bởi Mentor (coi như Luật bất biến), học viên tuân thủ thực thi:

1. **DEC-E1 (Đội ngũ):** 4 thực tập sinh (1 DE, 1 SWE, 2 AIE). Mentor shadow-working và là người chấm duy nhất.
2. **DEC-E2 (Thời lượng):** 6 tuần = 30 ngày làm việc = 3 Sprints x 2 tuần.
3. **DEC-E3 (Ba mốc Gate):** Gate 1 (Day 10) ➔ Gate 2 (Day 20) ➔ Final Gate (Day 30).
4. **DEC-E5 (Model Access - Fixtures-first):** CI chạy 100% dựa trên dữ liệu ghi sẵn (fixtures/VCR), không phụ thuộc vào IQ hay độ chập chờn của LLM thật.
5. **DEC-E7 (Phiên bản Python):** Sử dụng duy nhất **Python 3.12** (quản lý qua `uv`).
6. **DEC-E8 (Giao diện Canvas):** Sử dụng thư viện **React Flow** trên React/Vite. Nếu kẹt thì hạ cấp xuống Form + Mermaid.
7. **DEC-E9 (Hàng rào Bảo mật Fence):** Bộ lọc quyền phải nằm **TẠI LÚC TRUY VẤN (Retrieval)** ở tầng Database (fail-closed, `tenant_id` mandatory). CẤM "nhờ LLM đừng nói". Độ rò rỉ bắt buộc `leakage = 0`.
8. **DEC-E10 (Dữ liệu thử nghiệm):** 100% dữ liệu giả lập (Synthetic data - bộ tài liệu *Callisto Handbook*, 2 tenant `ankor` & `borea`), không chứa thông tin thật (0 PII).

---

## 💡 III. 3 ĐIỀU NHỚ NẰM LÒNG & QUY TẮC 2-4-8

### 3 Nguyên tắc bất biến:
1. 🥇 **Mỏng-mà-thông > Dày-mà-đứt:** Luồng "Walking-Skeleton" phải kết nối thông suốt cả 4 vị trí trước, rồi mới đắp thêm tính năng sau.
2. 🤝 **Code của bạn là hợp đồng người khác dùng:** Giữ các file Schema sạch đẹp, đổi Schema phải có đủ chữ ký của cả team.
3. 🧪 **Chứng minh bằng test, không bằng lời:** Mọi tính năng (rò rỉ = 0, chặn publish, khớp chi phí) đều phải hiển thị màu xanh trên CI test suite.

### Quy tắc tháo gỡ khi bị kẹt (Luật 2-4-8):
- **Kẹt 2 giờ:** Tự viết lại giả thuyết lỗi ra giấy/nhật ký.
- **Kẹt 4 giờ:** Đặt câu hỏi chi tiết xin gợi ý (hint) từ Mentor/Team.
- **Kẹt 8 giờ:** Mentor sẽ ngồi làm việc cùng bạn 30 phút để giải quyết dứt điểm. *(Đừng bao giờ im lặng chịu kẹt một mình quá 2 giờ!)*
