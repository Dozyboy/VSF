# 🧭 HƯỚNG DẪN THỨ TỰ ĐỌC CÁC FILE TRONG THƯ MỤC DAY 04

---

## 📌 MỤC TIÊU CỦA DAY 04 (NGÀY 4)
Ngày 04 nâng cấp AgentCore Studio từ **Walking Skeleton rỗng sang AI Agent có kho tri thức thực tế (Knowledge-Grounded Agent)** thông qua **KB Binding `kb_binding.{kb_id, scope}`**, trích xuất **Citation Chunk ID (`chunk_id`)**, và in **Bảng điểm 5 dòng CLI**.

---

## 🗺️ THỨ TỰ ĐỌC CÁC FILE CHUẨN (5 BƯỚC THÔNG SUỐT)

```
┌────────────────────────────────────────────────────────┐
│  BƯỚC 1: XEM LIÊN KẾT MẠCH LOGIC (D1 ➔ D2 ➔ D3 ➔ D4)    │
│  📄 LIEN_KET_LIEN_MACH_LOGIC_D1_D2_D3_D4_TOAN_TAP.md   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 2: NẮM CHI TIẾT ĐỀ BÀI ISSUE #18                 │
│  📄 NHIEM_VU_CHI_TIET_NGAY_04_SWE.md                   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 3: HỌC BÀI GIẢNG KB BINDING, SCOPE & CITATIONS   │
│  📄 BAI_GIANG_TOAN_TAP_KIEN_THUC_NEN_TANG_NGAY_04.md   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 4: THỰC HÀNH CODE WIRING D4 & BẢNG ĐIỂM CLI      │
│  📄 HUONG_DAN_CHI_TIET_CODE_VA_DAT_DIEM_TUYET_DOI.md  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│  BƯỚC 5: NỘP BÀI GITHUB ISSUE #18 & DAILY NOTE D4      │
│  📄 MAU_COMMENT_GITHUB_ISSUE_DAY_04.md                 │
└────────────────────────────────────────────────┘
```

---

### 📍 BƯỚC 1: XEM SỰ LIÊN KẾT LIỀN MẠCH D1 ➔ D2 ➔ D3 ➔ D4
* **File cần đọc**: [LIEN_KET_LIEN_MACH_LOGIC_D1_D2_D3_D4_TOAN_TAP.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day04/LIEN_KET_LIEN_MACH_LOGIC_D1_D2_D3_D4_TOAN_TAP.md)
* **Ý nghĩa**: Giúp bạn thấu hiểu hành trình từ Học luật (D1) ➔ Đúc khung Schema v0 (D2) ➔ Wiring Nổ máy 3 Node (D3) ➔ Tích hợp Kho tri thức Tenant Scope & Citation Eval (D4).

---

### 📍 BƯỚC 2: NẮM CHI TIẾT NỘI DUNG ISSUE #18
* **File cần đọc**: [NHIEM_VU_CHI_TIET_NGAY_04_SWE.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day04/NHIEM_VU_CHI_TIET_NGAY_04_SWE.md)
* **Ý nghĩa**: Bóc tách từng yêu cầu kỹ thuật của Issue #18 và 6 tiêu chuẩn hoàn thành nhiệm vụ (DoD Checklist).

---

### 📍 BƯỚC 3: HỌC BÀI GIẢNG KIẾN THỨC NỀN TẢNG NGÀY 4
* **File cần đọc**: [BAI_GIANG_TOAN_TAP_KIEN_THUC_NEN_TANG_NGAY_04_SWE.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day04/BAI_GIANG_TOAN_TAP_KIEN_THUC_NEN_TANG_NGAY_04_SWE.md)
* **Ý nghĩa**: Nạp kiến thức về triết lý KB Binding, cơ chế bảo vệ Lớp 1 (Tenant Wall), Citation Accuracy và bộ dữ liệu Callisto Synthetic NDA Clean.

---

### 📍 BƯỚC 4: THỰC HÀNH VIẾT CODE WIRING & IN BẢNG ĐIỂM CLI
* **File cần đọc**: [HUONG_DAN_CHI_TIET_CODE_VA_DAT_DIEM_TUYET_DOI_NGAY_04.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day04/HUONG_DAN_CHI_TIET_CODE_VA_DAT_DIEM_TUYET_DOI_NGAY_04.md)
* **Ý nghĩa**: Hướng dẫn chi tiết từng dòng code trong `builder.py`, `test_wiring_d4.py`, `synthetic_data_d4.py` và script `smoke_eval_d4.py` in bảng điểm 5 dòng ra CLI.

---

### 📍 BƯỚC 5: MẪU COMMENT NỘP BÀI VÀ BÁO CÁO DAILY NOTE D4
* **File cần đọc**: [MAU_COMMENT_GITHUB_ISSUE_DAY_04.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/Day04/MAU_COMMENT_GITHUB_ISSUE_DAY_04.md)
* **Ý nghĩa**: Cung cấp mẫu comment chuẩn để nộp bài trên GitHub Issue #18 và cấu hình file Daily Note `2026-07-23-Dozyboy.md`.
