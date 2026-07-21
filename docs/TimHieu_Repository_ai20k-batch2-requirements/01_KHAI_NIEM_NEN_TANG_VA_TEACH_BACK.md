# 📖 CÁC KHÁI NIỆM NỀN TẢNG & CHUẨN BỊ CHO BÀI TEACH-BACK
*(Tóm tắt chi tiết từ `00-orientation/pre-reading.md`)*

---

## 💡 I. CÁC KHÁI NIỆM LÕI CHUNG (CẢ 4 VỊ TRÍ PHẢI THUỘC LÒNG)

### 1. Ranh giới Engine | Recipe (`engine | recipe boundary`)
- **Engine (Động cơ lõi - PTNT xây 1 lần):** Chứa bộ thông dịch (interpreter), trình xử lý 6 loại node, hàng rào bảo mật (fence), bộ ghi trace và cổng kiểm định (eval-gate).
- **Recipe (Công thức khai báo - PTSP tự chỉnh, ZERO code lõi):** Chứa thông tin cấu hình agent (`instructions`, `model`, `tools`), sơ đồ DAG kéo-thả, trỏ tới kho tri thức KB và bộ test golden-set.
- **Đích đến:** Đổi hành vi của Agent chỉ cần sửa file YAML/JSON cấu hình Recipe, **tuyệt đối không chạm vào code lõi Engine**.

### 2. Walking-Skeleton (Khung xương biết đi)
- Cuối Tuần 1 (Day 10), team phải dựng xong **1 luồng chạy nối liền từ đầu đến cuối (UI ➔ Engine ➔ KB ➔ EvalHub)**.
- Dù chức năng còn "mỏng" (dùng data stub/hardcode), nhưng **toàn bộ sợi xích kết nối phải thông suốt 100%**. Đây là mốc Gate cứng bắt buộc.

### 3. Fixtures-First (Chạy test dựa trên bản ghi sẵn)
- Mọi bài test trên CI chạy 100% dựa vào dữ liệu phản hồi được ghi sẵn (VCR style).
- Điểm đánh giá dự án nằm ở **chất lượng Pipeline, Hàng rào bảo mật Fence, và Trace**, chứ **không phụ thuộc vào độ thông minh ngẫu nhiên của LLM thật**.

### 4. Đóng băng Hợp đồng & Mini-RFC (`contract-freeze & mini-RFC`)
- 4 hợp đồng dữ liệu Schema (Recipe, Trace, KB Search, Scorecard) sẽ bị **khóa cứng (freeze) vào cuối Tuần 1**.
- Nếu muốn thay đổi bất kỳ trường dữ liệu nào trong Schema, phải làm bản đề xuất **Mini-RFC** và đạt được **4/4 chữ ký đồng ý** của cả team + Mentor.

### 5. Thang cắt giảm tính năng (`descope-ladder`)
- Danh sách các nấc hạ cấp tính năng khi bị trễ tiến độ/kẹt:
  1. *KB thật* ➔ *KB Stub tĩnh (5 docs)*
  2. *Canvas React Flow* ➔ *Form + Mermaid diagram*
  3. *LLM Judge* ➔ *Exact-match scorer*
  4. *Cost Dashboard* ➔ *Bảng hiển thị trên CLI*
- **Quy tắc:** Khi cắt giảm tính năng theo thang này, **kịch bản Demo 8 bước end-to-end vẫn phải sống**.

### 6. Bức tường Bảo mật Tenant-Wall (INV-1)
- Lấy `session_id` để tự giải mã thông tin `{tenant, user, role}` ở **phía Server-side**.
- **Fail-Closed:** Nếu không xác định được Tenant, mặc định trả về 0 kết quả.
- **Chống lỗi bảo mật:** Chống lỗ hổng T1 IDOR (đọc lén tài nguyên của tenant khác) và T6 Label-Spoofing (giả mạo nhãn tenant).

### 7. Node Tạm dừng Chờ Duyệt (`hitl-pause node`)
- Nút tạm dừng quy trình để con người bấm phê duyệt (Human-in-the-loop).
- Trạng thái dừng chờ là một trạng thái chính thức (`running ➔ waiting_human ➔ resumed`), không phải là vòng lặp chờ hay thử lại (retry/poll).

---

## 🎯 II. KHÁI NIỆM CHUYÊN SÂU THEO TỪNG VỊ TRÍ (QUADRANT)

### 👑 1. SWE (Software Engineer — Thiệu Quang Minh)
- **Recipe Schema + Validator + Graph-lint:** Định nghĩa cấu trúc file Recipe, viết bộ kiểm tra hợp lệ sơ đồ DAG (bắt các lỗi lặp vô tận, node không hợp lệ) **trước khi cho phép chạy**.
- **React Flow Canvas:** Dựng giao diện kéo-thả quy trình vẽ sơ đồ Agent với palette đóng gồm 6 loại node.
- **Publish Flow + Eval-Gate Wiring + Rollback:** Nối cổng kiểm định chất lượng vào nút Publish. Nếu điểm test bị rớt (`FAIL`), lập tức **chặn Publish** và **Rollback** về phiên bản cũ.

### 2. DE (Data Engineer — Nguyễn Đông Anh)
- **Chunk ➔ Embed ➔ Index per-tenant:** Cắt nhỏ tài liệu, biến đổi thành Vector và đánh chỉ mục phân tách riêng biệt theo từng Tenant.
- **Fence-data tại Retrieval:** Chặn rò rỉ dữ liệu **ngay tại câu truy vấn Database**, đảm bảo độ rò rỉ `leakage = 0`.
- **Trace Sink + Cost Table + Golden-Set:** Dựng nhật ký sự kiện, bảng theo dõi chi phí và bộ 30 câu hỏi chuẩn (golden cases).

### 3. AIE-1 (AI Engineer 1 — Trần Bá Đạt)
- **Interpreter + 6 Node Executors:** Bộ thông dịch chạy sơ đồ DAG qua 6 loại node và lưu các điểm kiểm tra (checkpoints).
- **EmbeddingService Protocol (2-impl):** Thiết kế 1 interface chung cho service embedding có 2 bản cài đặt (1 bản Stub local và 1 bản gọi API thật).

### 4. AIE-2 (AI Engineer 2 — Lưu Tiến Duy)
- **Eval Harness + Scorecard:** Bộ khung tự động chạy 30 câu test và in ra bảng điểm PASS/FAIL.
- **LLM-Judge:** Dùng AI làm trọng tài chấm điểm tự động nhưng có đối chiếu với đáp án chuẩn do người gán nhãn.
