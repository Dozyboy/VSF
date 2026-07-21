# 📌 HƯỚNG DẪN & GIẢI THÍCH CHI TIẾT NHIỆM VỤ NGÀY 1 (SWE — THIỆU QUANG MINH)

**Chặng 1 (Sprint 1) • Tuần 1 • Ngày 1 — Buổi ra quân (Kickoff)**

---

## 🎯 I. BẢN CHẤT CỦA NGÀY 1

> 💡 **Thông điệp cốt lõi:** Hôm nay bạn **CHƯA CẦN VIẾT CODE MỚI**.
> Mục tiêu chính của Ngày 1 là làm quen với "xưởng làm việc", kiểm tra dựng đúng môi trường máy tính, chạy thử bộ test khung có sẵn của Mentor (Kit tuần-0), và nắm vững tư duy kiến trúc để chuẩn bị cho các ngày tới.

---

## 🛠️ II. VIỆC CẦN LÀM CỦA BẠN (SOFTWARE ENGINEER — SWE)

Bạn có **2 công việc chính** cần thực hiện và làm chủ:

### 1. Trình bày lại cho cả nhóm nghe (Teach-back)
Bạn cần hiểu sâu và giải thích lại được 2 khái niệm cốt lõi cho 3 thành viên còn lại (DE, AIE-1, AIE-2):
* **Bàn làm việc tạo Agent (Workbench / Recipe):**
  - Giải thích cách một người dùng bình thường có thể tạo ra con AI Agent bằng cách **điền Form & kéo thả sơ đồ** mà không cần đụng vào 1 dòng code Python nào.
* **Phân biệt Ranh giới giữa "Engine" và "Recipe":**
  - **Engine (Động cơ dùng chung - AIE-1 quản lý):** Ví như *động cơ xe ô tô*, chạy chung cho tất cả các con AI Agent.
  - **Recipe (Công thức riêng - SWE quản lý):** Ví như *bản thiết kế/bộ điều khiển riêng* của từng con AI Agent (nó chứa tên, hướng dẫn, danh sách tool được dùng và sơ đồ các bước xử lý).

### 2. Đọc hiểu tài liệu cấu trúc (Specs)
* **Đọc bản mô tả Recipe Schema (Mục §3.1):** Nắm rõ cấu trúc file công thức Agent gồm những trường dữ liệu gì (`instructions`, `tools`, `nodes`, `edges`...).
* **Đọc Luật rào chắn quyền (Mục §1):** Nắm rõ quy định bảo mật phân quyền giữa các khách hàng/tenant.

---

## ✅ III. TIÊU CHÍ BẮT BUỘC HOÀN THÀNH (Definition of Done — DoD)

Để ngày làm việc đầu tiên được tính là **Thành công (PASS)**, bạn cần hoàn thành đủ **5 gạch đầu dòng**:

1. **Chạy bộ test `pytest` thành công (Chụp màn hình):**
   - Chạy lệnh test tự động trên môi trường **Python 3.12**. Tất cả bài test phải hiện màu xanh (Pass 100%), sau đó chụp màn hình lại làm minh chứng.
2. **Ký cam kết bảo mật (NDA) + Bật Secret Scan:**
   - Ký bản cam kết NDA.
   - Cài đặt công cụ `secret-scan pre-commit` (công cụ tự động quét xem bạn có lỡ tay dán mật khẩu hay API Key vào code trước khi lưu/push hay không).
3. **Thực hiện xong bài Teach-back:**
   - Đã trình bày xong phần kiến trúc Workbench/Recipe cho nhóm nghe.
4. **Trả lời được câu hỏi phản biện bảo mật cốt lõi (Fence-tại-retrieval):**
   - *Câu hỏi:* Vì sao phải **lọc quyền ngay tại lúc tra cứu tài liệu từ Database (Fence-tại-retrieval)**, chứ KHÔNG ĐƯỢC nhờ AI theo kiểu bảo *"Mày đọc tài liệu này đi nhưng đừng nói cho người dùng biết nhé"*?
   - *Trả lời mẫu để bạn tham khảo:* Vì nếu đưa dữ liệu bảo mật cho AI rồi dặn nó "đừng nói", người dùng hoàn toàn có thể dùng các câu lệnh lừa (Prompt Injection / Jailbreak) để ép AI nói ra. Vì vậy, **phải chặn ngay từ lúc truy vấn Database (Vector DB / RLS)** — nếu không có quyền thì Database **không trả ra dữ liệu đó cho AI đọc ngay từ đầu**.
5. **Viết Nhật ký làm việc D1:**
   - Tạo file báo cáo cuối ngày `D01-report-SWE-ThieuQuangMinh.md` để tổng kết công việc.

---

## 🔒 IV. ĐIỀU KIỆN BẮT BUỘC (QUY TẮC CỨNG)

* **Đúng phiên bản Python:** Phải chạy đúng môi trường **Python 3.12**.
* **Cam kết bảo mật (NDA) — Điều kiện Đậu/Rớt:** 
  - 100% dữ liệu thử nghiệm trong dự án là **dữ liệu giả lập (Synthetic data)**.
  - Tuyệt đối **KHÔNG sử dụng thông tin thật / dữ liệu cá nhân thật (0 PII)** của bất kỳ ai. Tất cả tên người, mã số, dữ liệu đều phải tự bịa/sinh mới.
