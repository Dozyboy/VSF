# 📑 CHI TIẾT ĐỀ BÀI VÀ NHIỆM VỤ NGÀY 2 (`day-02.md`)
*(Bóc tách chuyên sâu file `week-1/days/day-02.md` — Đọc đề, Scaffold, Hỏi rõ)*

---

## 📅 I. THÔNG TIN CHUNG NGÀY 2
- **Thời gian:** Thứ Ba 21/07 (Ngày làm việc thứ 2 của Sprint 1).
- **Macro-Goal phục vụ:** Từng bước chuyển từ **G1 ➔ G2 ("Walking-Skeleton xâu-kim a➔z")**.
- **Chủ đề chính:** Đọc đề Paved-path, Scaffold cấu trúc 4 Quadrants trên Git, Viết danh sách hạ cấp tính năng `DESCOPE.md`, Gửi bộ câu hỏi `question-batch` cho Mentor, Khai báo 4 Hợp đồng Schema phiên bản dự thảo v0.

---

## 🎯 II. MỤC TIÊU CỦA NGÀY (DAY OBJECTIVE)

- Đọc đề **Paved-path trọn vòng đời** (Authoring ➔ Fence chặn rò rỉ tại tầng truy xuất ➔ Eval-Gate cổng kiểm định chặn Publish).
- **Scaffold Repo Mono:** Tạo cấu trúc thư mục/package cho 4 Quadrant (tách đúng Folder cho từng Owner).
- Viết file **`DESCOPE.md`** gồm 4 nấc hạ cấp tính năng.
- Gửi bộ **`question-batch` ≥ 3 câu** làm rõ đề bài với Mentor trước khi gõ code.
- Khai báo **4 Interface v0** (chưa đóng băng).

---

## ⚠️ III. VẤN ĐỀ TRỌNG TÂM (PROBLEM STATEMENT)

- Hợp đồng Schema là **Hiến pháp giao tiếp** — 4 Quadrant chỉ có thể ghép được với nhau nếu tên Interface và trường dữ liệu rõ ràng ngay từ đầu.
- **Luật của Tuần 1:** *"Hỏi rõ (Clarify-first) trước khi code"*.
- Viết file `DESCOPE.md` sẵn trong hôm nay để khi bị kẹt/trễ tiến độ sẽ **cắt tính năng theo danh sách chuẩn**, không cắt tùy hứng làm sập kịch bản Demo.

---

## 📦 IV. DỮ LIỆU ĐẦU VÀO (INPUT) & ĐẦU RA (OUTPUT)

### 🔹 Input được cấp:
- Output hoàn thành của Ngày 1 (Môi trường Python 3.12 xanh + Hiểu Quadrant của mình).
- 4 File gốc SSOT: `charter.md`, `roadmap-3-sprint.md`, `umbrella-contract.md`, `brief-overview.md`.

### 🔹 Output phải bàn giao:
1. Cấu trúc cây Repo Scaffold 4 Quadrant đã được push lên Git.
2. File **`DESCOPE.md`** (4 nấc: KB➔Stub, Canvas➔Form+Mermaid, Judge➔Exact-match, Dashboard➔CLI).
3. 4 Interface v0 Stub (`recipe`, `trace-event`, `kb.search`, `scorecard`).
4. File **`question-batch`** gửi Mentor trước khi gõ code.
5. Nhật ký làm việc cuối ngày `D02-report-SWE-ThieuQuangMinh.md` (Daily-note D2).

---

## 📋 V. BẢNG GIAO VIỆC THỰC TẾ NGÀY 2 THEO VỊ TRÍ

| Vị trí | Việc cần thực hiện trong Ngày 2 |
| :--- | :--- |
| **👑 SWE (Thiệu Quang Minh)** | **Giữ Bút bản v0 `recipe` Interface** (`agent_config` tối thiểu gồm `instructions`, `model`, `tool_whitelist`) + Dựng bộ khung package `packages/workbench/` + Phác thảo các trường dữ liệu trên Form tạo Agent. |
| **DE (Nguyễn Đông Anh)** | **Giữ Bút bản v0 `trace-event` Interface** + `kb.search(query, tenant, top_k)` Signature; Phác Schema tài liệu Callisto (Frontmatter tenant/section) + Bảng Chunk/Index. |
| **AIE-1 (Trần Bá Đạt)** | Phác thảo khung lặp **`interpreter loop`** + Interface xử lý node `execute(node, ctx) -> ctx'`; Chọn định dạng **Fixture VCR-style** cho `llm-step`. |
| **AIE-2 (Lưu Tiến Duy)** | **Giữ Bút bản v0 `scorecard` Interface** (`{case_id, expected, actual, success, citation_accuracy}`); Chốt hình dáng 5 câu test mẫu (smoke-case) cùng DE (DE cung cấp `expected`). |

---

## 🤝 VI. CÁCH THỨC CỘNG TÁC & RÀNG BUỘC

- **Cách cộng tác:** Điểm ghép nối quan trọng nhất hôm nay là **Tên Interface phải khớp chính xác với `umbrella-contract.md §3`**. DE và AIE-2 phải ngồi lại cùng nhau để chốt 5 câu test mẫu. Cấu trúc Scaffold phải tách đúng thư mục cho từng Owner, không để chung một file.
- **Ràng buộc:** 
  - Bám sát **6 loại Node đóng**, CẤM thêm node lạ.
  - 4 Interface mới ở bản dự thảo **v0** (Draft), chưa bị đóng băng.
  - Mỗi nấc cắt giảm trong `DESCOPE.md` phải đảm bảo luồng **Walking-Skeleton VẪN SỐNG**.

---

## ✅ VII. TIÊU CHUẨN HOÀN THÀNH (DEFINITION OF DONE — DoD)

- [ ] Push cấu trúc Repo Scaffold 4 Quadrant lên Git (tách đúng thư mục từng Owner).
- [ ] Soạn xong file `DESCOPE.md` chứa 4 nấc cắt giảm tính năng chuẩn.
- [ ] Khai báo xong 4 Interface v0 có tên trường khớp chính xác với `umbrella-contract.md §3`.
- [ ] Soạn và gửi bộ `question-batch ≥3 câu` cho Mentor **TRƯỚC KHI** gõ code.
- [ ] Nộp nhật ký làm việc `daily-note D2`.
