# 🧭 HƯỚNG DẪN THỨ TỰ ĐỌC CÁC FILE TRONG THƯ MỤC DAY 03

---

## 📌 MỤC TIÊU CỦA DAY 03 (NGÀY 3)
Ngày 03 là ngày quan trọng nhất của Walking Skeleton: **Xâu Kim (Wiring)** lần đầu tiên cho luồng dữ liệu chạy thông từ **Form UI (SWE) ➔ Recipe (SWE) ➔ Engine Interpreter (AIE-1)**!

Thư mục Day 03 chứa 9 file hướng dẫn chuyên sâu. Dưới đây là lộ trình đọc tối ưu từ tổng quan đến thực hành chi tiết.

---

## 🗺️ THỨ TỰ ĐỌC CÁC FILE CHUẨN (8 BƯỚC THÔNG SUỐT)

```
┌────────────────────────────────────────────────────────┐
│  BƯỚC 1: XEM LIÊN KẾT LOGIC (D1 ➔ D2 ➔ D3)             │
│  📄 LIEN_KET_LIEN_MACH_LOGIC_D1_D2_D3_TOAN_TAP.md      │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 2: NẮM TỔNG QUAN ĐỀ BÀI NGÀY 3                   │
│  📄 NHIEM_VU_CHI_TIET_NGAY_03_SWE.md                   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 3: HỌC BÀI GIẢNG "XÂU KIM" & PYTEST TEST WIRING  │
│  📄 BAI_GIANG_TOAN_TAP_KIEN_THUC_NEN_TANG_NGAY_03.md   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 4: THỰC HÀNH CODE WIRING & PYTEST NỔ MÁY ENGINE  │
│  📄 HUONG_DAN_CHI_TIET_CODE_VA_DAT_DIEM_TUYET_DOI.md  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 5: XÂY DỰNG GIAO DIỆN WEB UI REACT & WORKBENCH   │
│  📄 HUONG_DAN_CHI_TIET_WEB_UI_NGAY_03.md               │
│  📄 HUONG_DAN_LAP_TRINH_WORKBENCH_VA_WEB_NGAY_03.md    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 6: REVIEW PR CỦA DE & HIỂU MÁY CHẤM MENTOR       │
│  📄 GIAI_THICH_CHI_TIET_NGAY_03_PR_DE_VA_DANH_GIA.md   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 7 & 8: CHUẨN HÓA DAILY NOTE & NỘP BÀI GITHUB     │
│  📄 GIAI_DAP_QUY_CHUAN_DAILY_NOTE_VA_QUY_TRINH.md      │
│  📄 MAU_COMMENT_GITHUB_ISSUE_DAY_02_VA_DAY_03.md      │
└────────────────────────────────────────────────────────┘
```

---

### 📍 BƯỚC 1: XEM SỰ LIÊN KẾT LIỀN MẠCH D1 ➔ D2 ➔ D3
* **File cần đọc**: [LIEN_KET_LIEN_MACH_LOGIC_D1_D2_D3_TOAN_TAP.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/LIEN_KET_LIEN_MACH_LOGIC_D1_D2_D3_TOAN_TAP.md)
* **Ý nghĩa**: Giúp bạn nhìn thấy bức tranh toàn cảnh "Chiếc ô-tô AI" từ Học luật (D1) ➔ Đúc khung (D2) ➔ Lắp mạch nổ máy (D3).

---

### 📍 BƯỚC 2: TỔNG QUAN NHIỆM VỤ NGÀY 3
* **File cần đọc**: [NHIEM_VU_CHI_TIET_NGAY_03_SWE.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/NHIEM_VU_CHI_TIET_NGAY_03_SWE.md)
* **Ý nghĩa**: Nắm rõ 2 nhiệm vụ chính: Bút form tạo agent xuất `recipe.agent_config` và Wiring `recipe` sang `interpreter` entry.

---

### 📍 BƯỚC 3: HỌC BÀI GIẢNG TRIẾT LÝ "XÂU KIM" (WIRING)
* **File cần đọc**: [BAI_GIANG_TOAN_TAP_KIEN_THUC_NEN_TANG_NGAY_03_SWE.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/BAI_GIANG_TOAN_TAP_KIEN_THUC_NEN_TANG_NGAY_03_SWE.md)
* **Ý nghĩa**: Giải thích cơ chế `build_agent_config()`, đóng gói Recipe 3-Node và kỹ thuật bắt Exception trong Pytest.

---

### 📍 BƯỚC 4: THỰC HÀNH VIẾT CODE & TEST PYTEST ĐẠT ĐIỂM TỐI ĐA
* **File cần đọc**: [HUONG_DAN_CHI_TIET_CODE_VA_DAT_DIEM_TUYET_DOI_NGAY_03.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/HUONG_DAN_CHI_TIET_CODE_VA_DAT_DIEM_TUYET_DOI_NGAY_03.md)
* **Ý nghĩa**: Cung cấp code mẫu `builder.py` và bài test Pytest `test_wiring_d3.py` để pass 100% kiểm thử của Mentor.

---

### 📍 BƯỚC 5: PHÁT TRIỂN GIAO DIỆN WEB UI REACT
* **Files cần đọc**: 
  - [HUONG_DAN_CHI_TIET_WEB_UI_NGAY_03.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/HUONG_DAN_CHI_TIET_WEB_UI_NGAY_03.md)
  - [HUONG_DAN_LAP_TRINH_WORKBENCH_VA_WEB_NGAY_03.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/HUONG_DAN_LAP_TRINH_WORKBENCH_VA_WEB_NGAY_03.md)
* **Ý nghĩa**: Hướng dẫn xây dựng Form UI trong ứng dụng React (`apps/web/src/App.tsx`) để tương tác trực quan.

---

### 📍 BƯỚC 6: DỌN ĐƯỜNG CROSS-REVIEW PR VÀ MÁY CHẤM MENTOR
* **File cần đọc**: [GIAI_THICH_CHI_TIET_NGAY_03_PR_DE_VA_DANH_GIA_MENTOR.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/GIAI_THICH_CHI_TIET_NGAY_03_PR_DE_VA_DANH_GIA_MENTOR.md)
* **Ý nghĩa**: Hướng dẫn cách review PR cho DE (Nguyễn Đông Anh) và hiểu tiêu chí quét tự động 1/12 của Mentor.

---

### 📍 BƯỚC 7 & 8: CHUẨN HÓA BÁO CÁO DAILY NOTE & NỘP BÀI
* **Files cần đọc**:
  - [GIAI_DAP_QUY_CHUAN_DAILY_NOTE_VA_QUY_TRINH_GITHUB.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/GIAI_DAP_QUY_CHUAN_DAILY_NOTE_VA_QUY_TRINH_GITHUB.md)
  - [MAU_COMMENT_GITHUB_ISSUE_DAY_02_VA_DAY_03.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day03/MAU_COMMENT_GITHUB_ISSUE_DAY_02_VA_DAY_03.md)
* **Ý nghĩa**: Định dạng báo cáo Daily Note D3 chuẩn chỉnh và mẫu comment thông báo hoàn thành issue.
