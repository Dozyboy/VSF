# 🏁 CHI TIẾT ĐỀ BÀI TUẦN 1 (`week-1/README.md`)
*(Bóc tách chuyên sâu nội dung file `week-1/README.md`)*

---

## 🎯 I. NỘI DUNG TRỌNG TÂM CỦA TUẦN 1

- **Tên chặng:** Sprint 1 — Nấc **Follow (Làm-theo)**.
- **Mục tiêu duy nhất:** Dựng thành công một bộ khung **Walking-Skeleton (Khung xương biết đi) xâu-kim qua CẢ 4 vị trí (DE, SWE, AIE-1, AIE-2)**.
- **Tư tưởng chủ đạo:** *"Mỏng mà thông chứ không dày mà đứt"* — Thà làm 1 luồng chạy thông suốt từ đầu đến cuối còn hơn làm 4 mảng đẹp đẽ nhưng rời rạc không nối được vào nhau.

---

## ⚠️ II. 4 CẠM BẪY HAY GIẾT THỰC TẬP SINH Ở TUẦN 1

1. **Bẫy 1: Không xâu được kim (Thất bại phổ biến nhất):** Mỗi người tự đào sâu mảng của mình, đến cuối tuần ghép lại không khớp nhau ➔ **Cách trượt số 1**.
2. **Bẫy 2: Code trước khi hiểu đề:** Không đọc kỹ Hợp đồng Schema, cắm đầu vào code ➔ Sai giao diện, phải đập đi làm lại. *Luật Tuần 1: Hỏi rõ (Question-batch) trước, code sau.*
3. **Bẫy 3: Over-Engineer quá sớm:** Vừa vào đã đòi dựng Vector DB thật, làm Canvas xịn, viết LLM Judge ➔ Làm sớm việc của Sprint 2/3 sẽ bị Mentor chặn.
4. **Bẫy 4: Mock lẫn nhau để né tích hợp:** Giả vờ nối code. *Yêu cầu: 4 vị trí phải nối code THỰC TẾ với nhau qua 4 Schema.*

---

## 📦 III. ĐỊNH HÌNH LUỒNG WALKING-SKELETON (ĐÍCH GATE DAY 10)

Đầu ra bắt buộc của Day 10 là **1 luồng chạy thật từ A đến Z** qua cả 4 vị trí:

```
[Form Tạo Agent] ──► [Interpreter 3-Node] ──► [KB Stub 5 Docs] ──► [Trace vào SQLite] ──► [Smoke Eval]
     (SWE)               (AIE-1)                 (DE)                (DE)               (AIE-2)
```

---

## 🤝 IV. PHÂN CÔNG VÀ 4 HỢP ĐỒNG SCHEMA PHIÊN BẢN v0 (TUẦN 1)

Ở Tuần 1, 4 Hợp đồng Schema ở phiên bản **Draft (v0)** để ghép nối, chưa bị khóa cứng:

| Hợp đồng | Người giữ Bút | Nhiệm vụ chính trong Tuần 1 |
| :--- | :---: | :--- |
| **`recipe` Schema** | **SWE (Thiệu Quang Minh)** | Dựng Form tạo Agent ➔ Sinh file `recipe.agent_config` (`instructions`, `model`, `tool_whitelist`) + Khung `workbench/`. |
| **`trace-event` Schema** | **DE (Nguyễn Đông Anh)** | Dựng Trace Sink lưu vào SQLite (`event_id`, `tokens`, `cost`) + Đọc log hiển thị Timeline. |
| **`kb.search` API** | **DE (Nguyễn Đông Anh)** | Dựng KB Stub 5 tài liệu Callisto + Viết hàm `kb.search` trả về các đoạn trích dẫn (cited chunks). |
| **`scorecard` Format** | **AIE-2 (Lưu Tiến Duy)** | Dựng Smoke-eval 5 câu test ➔ In bảng điểm (tỷ lệ thành công & độ chính xác trích dẫn đọc từ Trace). |
| *(Tiêu thụ API)* | **AIE-1 (Trần Bá Đạt)** | Dựng Interpreter 3-node hardcode (`kb-retrieve ➔ llm-step ➔ tool-call`) + Nối vào `kb.search` của DE. |
