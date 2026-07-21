# 📑 CHI TIẾT ĐỀ BÀI VÀ NHIỆM VỤ NGÀY 1 (`day-01.md`)
*(Bóc tách chuyên sâu file `week-1/days/day-01.md` — Kickoff: Đứng được trong Xưởng)*

---

## 📅 I. THÔNG TIN CHUNG NGÀY 1
- **Thời gian:** Thứ Hai 20/07 (Ngày làm việc đầu tiên của Chặng 1 / Sprint 1).
- **Macro-Goal phục vụ:** **G1 — "Đứng được trong Xưởng"**.
- **Chủ đề chính:** Kickoff, Onboarding 100%, Dựng môi trường Python 3.12, Ký NDA, Bật Secret-scan và Thực hiện bài **Teach-back**.

---

## 🎯 II. MỤC TIÊU CỦA NGÀY (DAY OBJECTIVE)

Hoàn tất onboarding 100%; dựng môi trường **Python 3.12** chạy `pytest` **màu xanh 100%** trên bộ khung Kit tuần-0; **ký cam kết bảo mật NDA pledge** (dữ liệu Callisto synthetic-only); thực hiện bài **Teach-back 10 phút/người** — mỗi bạn nhận 1 mảng chuyên môn (Quadrant) và giải thích được ranh giới **Engine | Recipe**.

---

## ⚠️ III. VẤN ĐỀ TRỌNG TÂM (PROBLEM STATEMENT)

Trước khi viết bất kỳ dòng code mới nào, bạn phải hiểu rõ mình đang đứng ở đâu trong bức tranh tổng thể:
- **Engine (Động cơ lõi - PTNT xây 1 lần):** Bao gồm `schema/validator`, `interpreter`, `fence`, `trace`, `gate`.
- **Recipe (Công thức khai báo - PTSP tự chỉnh, zero code lõi):** Bao gồm `agent-config`, `DAG`, `kb-binding`, `golden-set`, `scorecard-threshold`.

👉 **Cảnh báo:** Nhầm lẫn giữa ranh giới Engine và Recipe trong Ngày 1 sẽ làm bạn nhầm lẫn tư duy làm việc trong cả tuần!

---

## 📦 IV. DỮ LIỆU ĐẦU VÀO (INPUT) & ĐẦU RA (OUTPUT)

### 🔹 Input được cấp:
- Repo skeleton (khung dự án mono-repo) do Mentor dựng sẵn từ Tuần 0.
- Dữ liệu mẫu *Callisto Handbook seed*.
- Bộ dữ liệu test ghi sẵn (Fixtures-first CI).
- *Lưu ý:* Hôm nay **CHƯA VIẾT CODE MỚI** — chỉ dùng đồ có sẵn.

### 🔹 Output phải bàn giao:
1. Môi trường `python --version` = 3.12 + Ảnh chụp màn hình chạy `pytest` xanh 100%.
2. Cam kết NDA đã ký + Công cụ `secret-scan pre-commit` đã được bật trên Git.
3. Bài trình bày Teach-back (Slide hoặc Whiteboard vẽ sơ đồ) 1 quadrant/người.
4. Nhật ký làm việc cuối ngày `D01-report-SWE-ThieuQuangMinh.md` (Daily-note D1).

---

## 📋 V. BẢNG GIAO VIỆC THEO VỊ TRÍ (DAY ASSIGNMENTS)

| Vị trí | Việc cần thực hiện trong Ngày 1 |
| :--- | :--- |
| **👑 SWE (Thiệu Quang Minh)** | Teach-back mảng **Workbench/Recipe** (Form ➔ Recipe khai báo, zero code lõi) + Vẽ rõ ranh giới **Engine \| Recipe made literal**; Đọc Recipe Schema §3.1 + Luật Fence bảo mật §1. |
| **DE (Nguyễn Đông Anh)** | Teach-back mảng **KB Pipeline** (Ingest➔Chunk➔Embed➔Index + Fence-data + Golden-set); Clone repo, chạy Callisto seed + Fixtures; Đọc `kb.search` + Trace-event trong Umbrella §3.2/§3.3. |
| **AIE-1 (Trần Bá Đạt)** | Teach-back mảng **Interpreter & 6 Node-types đóng** (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end` — CẤM node lạ); Đọc `EmbeddingService Protocol` §3.5. |
| **AIE-2 (Lưu Tiến Duy)** | Teach-back mảng **Eval-Gate là cơ chế** (PASS Scorecard mới Publish; FAIL ➔ Chặn & Rollback) + Màn hình Trace Playground; Đọc Scorecard Format §3.4. |

---

## 🤝 VI. CÁCH THỨC CỘNG TÁC & RÀNG BUỘC

- **Cách cộng tác:** Sáng Ngày 1 diễn ra buổi Kickoff đồng bộ cả team — đọc lộ trình và luật chơi cùng nhau. Chưa ghép code; nhưng mỗi người phải nắm chắc Quadrant của mình và biết 3 người kia giữ gì để sau này ghép qua Hợp đồng Schema, không "làm chung 1 file".
- **Ràng buộc:** 
  - Môi trường đúng **Python 3.12**.
  - **NDA là cổng Pass/Fail:** Dữ liệu Callisto 100% giả lập (Synthetic), 0 PII, mọi identifier tự sinh mới.
  - Chưa gõ code tính năng mới.

---

## ✅ VII. TẮC TIÊU CHUẨN HOÀN THÀNH (DEFINITION OF DONE — DoD)

- [ ] `pytest` xanh 100% trên môi trường Python 3.12 (có ảnh chụp màn hình).
- [ ] Ký bản cam kết bảo mật NDA + Bật `secret-scan pre-commit` thành công.
- [ ] Hoàn thành bài thuyết trình Teach-back 1 Quadrant cho nhóm nghe.
- [ ] Nói được **1 lý do vì sao Fence-tại-retrieval là Luật** (Chặn rò rỉ ngay tại Database, chống prompt injection).
- [ ] Nộp nhật ký làm việc `daily-note D1`.
