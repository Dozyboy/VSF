# 📚 TỔNG QUAN & CHI TIẾT TỪNG FILE/FOLDER TRONG REPOSITORY `ai20k-batch2-requirements`

---

## 🌐 I. TỔNG QUAN VỀ REPOSITORY `ai20k-batch2-requirements`

* **Bản chất:** Đây là **"Repository Đề Bài & Sự Thật Lõi (Single Source of Truth - SSOT)"** do Mentor quản lý.
* **Mục đích:** Chứa toàn bộ Hiến pháp chương trình, Tài liệu kiến trúc, Hợp đồng dữ liệu (Contracts), Lộ trình 3 Sprints (30 ngày), và Chi tiết đề bài từng ngày cho 4 kỹ sư thực tập (DE, SWE, AIE-1, AIE-2).
* **Quyền hạn:** Bản này dành cho Học viên (**Read-Only** — chỉ đọc, không sửa).

---

## 🌳 II. CẤU TRÚC CÂY THƯ MỤC (DIRECTORY TREE)

```
ai20k-batch2-requirements/
├── 📄 README.md                      <-- File điều hướng chính (Đọc đầu tiên)
├── 📜 nda-denylist.sh                <-- Script kiểm tra bảo mật NDA / rò rỉ dữ liệu
├── ⚙️ .pre-commit-config.yaml         <-- Cấu hình quét rò rỉ secret/key trước khi commit
│
├── 📂 00-orientation/                <-- TÀI LIỆU ĐỊNH HƯỚNG BAN ĐẦU & NỀN TẢNG KIẾN TRÚC
│   ├── 📄 pre-reading.md             <-- [Bước 0] Khái niệm cần tìm hiểu & chuẩn bị cho Day 1
│   ├── 📄 brief-overview.md          <-- [Bước 1] Toàn cảnh 6 tuần: Xây cái gì, vì sao, ai làm gì
│   ├── 📄 roadmap-3-sprint.md        <-- [Bước 2] Lộ trình 3 Sprints x 2 tuần (30 ngày + 3 mốc Gate)
│   ├── 📄 umbrella-contract.md       <-- [Bước 3] Kiến trúc lõi & 4 Hợp đồng Schema chung
│   ├── 📄 charter.md                 <-- [Bước 4] Hiến pháp dự án & Demo 8 bước end-to-end
│   └── 📄 decisions-locked.md        <-- 12 Quyết định kiến trúc đã khóa cứng (Không được sửa)
│
└── 📂 week-1/                        <-- ĐỀ BÀI VÀ THỰC THI TUẦN 1 (SPRINT 1 - FOLLOW)
    ├── 📄 README.md                  <-- Tổng quan mục tiêu Tuần 1 (Mốc Gate Day 10 Walking-Skeleton)
    └── 📂 days/                      <-- Chi tiết đề bài từng ngày của Tuần 1
        ├── 📄 day-01.md              <-- Chi tiết Ngày 1 (Kickoff, Teach-back, NDA, Pytest)
        └── 📄 day-02.md              <-- Chi tiết Ngày 2 (Form tạo Agent & Recipe Contract)
```

---

## 📄 III. CHI TIẾT TỪNG FILE & FOLDER

### 1. Các File ở Thư mục Gốc (Root)

#### 🔹 `README.md` — File Điều hướng Chính (Master Navigation)
- **Vai trò:** Bản đồ chỉ đường cho toàn bộ dự án.
- **Nội dung chính:**
  - Hướng dẫn thứ tự đọc tài liệu chuẩn từ **Bước 0 ➔ Bước 4** (không nhảy cóc).
  - Giải thích 3 tầng đề bài: Tổng quan ➔ 3 Sprint (Follow/Assist/Apply) ➔ Skeleton 30 ngày.
  - Bảng tra cứu các thuật ngữ quan trọng: *Quadrant, Engine | Recipe, 6-node đóng, Fence, Eval-Gate, 4 Contracts, Descope-ladder, 3 mốc Gate (Day 10/20/30), Luật 2-4-8*.
  - 3 điều nhớ nằm lòng: *"Mỏng-mà-thông > Dày-mà-đứt"*, *"Code của bạn là hợp đồng người khác dùng"*, *"Chứng minh bằng test, không bằng lời"*.

#### 🔹 `nda-denylist.sh` & `.pre-commit-config.yaml`
- **Vai trò:** Công cụ tự động bảo vệ an ninh thông tin.
- **Nội dung:** Chứa các kịch bản kiểm tra tự động xem trong code có lỡ dán API Key, Token, Mật khẩu hoặc Thông tin thật của người thật (PII) hay không trước khi bạn commit code lên Git.

---

### 2. Thư mục `00-orientation/` (Bộ Tài liệu Định hướng & Kiến trúc)

Đây là **trái tim kiến trúc của toàn bộ dự án**, bạn phải đọc kỹ các file theo đúng thứ tự:

1. **`00-orientation/pre-reading.md` (Đọc Bước 0)**
   - *Mục đích:* Chuẩn bị kiến thức trước khi bước vào Ngày 1.
   - *Nội dung:* Bối cảnh thị trường AI Agent ("Create → Test → Trust") và danh sách các thuật ngữ cốt lõi mà 4 vị trí bắt buộc phải tự tìm hiểu để chuẩn bị cho bài thuyết trình **Teach-Back** ngày đầu tiên.

2. **`00-orientation/brief-overview.md` (Đọc Bước 1)**
   - *Mục đích:* Cho bạn cái nhìn toàn cảnh 6 tuần (30 ngày làm việc).
   - *Nội dung:* Đề bài tổng quan xây dựng AgentCore Studio, phân chia 4 mảng ghép (4 Quadrants) và kịch bản Demo 8 bước.

3. **`00-orientation/roadmap-3-sprint.md` (Đọc Bước 2)**
   - *Mục đích:* Bản lộ trình thời gian chi tiết 3 Sprints (6 tuần / 30 ngày).
   - *Nội dung:*
     - **Sprint 1 (Follow - Tuần 1-2):** Đích mốc **Gate Day 10 (Walking-Skeleton)** - Chạy mỏng-mà-thông qua cả 4 người.
     - **Sprint 2 (Assist - Tuần 3-4):** Đích mốc **Gate Day 20** (Canvas + KB thật).
     - **Sprint 3 (Apply - Tuần 5-6):** Đích mốc **Gate Day 30** (Demo end-to-end + Bàn giao).
     - Bảng phân công công việc chi tiết cho từng ngày (D1 ➔ D30) của từng vai trò (SWE, DE, AIE-1, AIE-2).

4. **`00-orientation/umbrella-contract.md` (Đọc Bước 3)**
   - *Mục đích:* Định nghĩa **4 Hợp đồng Dữ liệu dùng chung (Data Contracts)** cho cả 4 vị trí.
   - *Nội dung:* Recipe Schema *(SWE giữ bút)*, TraceEvent Schema, `kb.search` Interface, và Scorecard Schema.

5. **`00-orientation/charter.md` (Đọc Bước 4)**
   - *Mục đích:* **Hiến pháp chương trình** — Bộ quy tắc ứng xử và nguyên tắc bất biến (Ranh giới Engine | Recipe, Kịch bản 8 bước Demo, Quy trình xin đổi Hợp đồng).

6. **`00-orientation/decisions-locked.md`**
   - *Mục đích:* Danh sách **12 Quyết định kiến trúc đã khóa cứng** (Python 3.12, `uv`, FastAPI, React Flow, PostgreSQL RLS...) sinh viên tuân thủ làm theo.

---

### 3. Thư mục `week-1/` (Nội dung Thực thi Tuần 1)

* **`week-1/README.md`**: Tổng quan mục tiêu Tuần 1 (Sprint 1 - Chặng Follow) nhằm ghép nối bộ khung 4 mảnh ghép lại với nhau thành một luồng "Walking-Skeleton" thông suốt trước ngày 10 (Gate Day 10).
* **`week-1/days/day-01.md`**: Đề bài chi tiết Ngày 1 (Kickoff, làm quen xưởng, kiểm tra môi trường Python 3.12, chạy Pytest xanh, ký NDA, bật Secret-scan và bài Teach-Back).
* **`week-1/days/day-02.md`**: Đề bài chi tiết Ngày 2 (SWE: Xây dựng Form tạo Agent cơ bản + Chốt phiên bản ban đầu của Contract `Recipe`).

---

## 🚀 IV. THỨ TỰ ĐỌC VÀ LÀM VIỆC DÀNH CHO BẠN (SWE — THIỆU QUANG MINH)

1. **Bước 1:** Đọc `README.md` ở ngoài gốc để nắm các ký hiệu/quy ước.
2. **Bước 2:** Đọc `00-orientation/pre-reading.md` ➔ Chuẩn bị kiến thức cho bài **Teach-Back**.
3. **Bước 3:** Đọc `00-orientation/umbrella-contract.md` (Chú ý phần **Contract 1: Recipe Schema** vì bạn là SWE giữ bút phần này).
4. **Bước 4:** Mỗi ngày làm việc, chỉ cần mở file trong `week-1/days/day-XX.md` tương ứng để xem nhiệm vụ chi tiết của ngày đó và thực hiện!
