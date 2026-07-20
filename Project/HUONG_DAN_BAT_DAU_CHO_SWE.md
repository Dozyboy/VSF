# GIẢI THÍCH CHI TIẾT DỰ ÁN & HƯỚNG DẪN BẮT ĐẦU DÀNH CHO SWE (THIỆU QUANG MINH)

---

## 1. BẢN CHẤT DỰ ÁN AGENTCORE STUDIO LÀ GÌ?

Hệ thống này giống như **"Wordpress hoặc Canva dành để thiết kế AI Agents"**:

- Bình thường, nếu muốn tạo một con AI tự trả lời khách hàng, người ta phải ngồi viết code Python rất phức tạp.
- Hệ thống **AgentCore Studio** tạo ra một **trang web (UI Canvas)**: Một người không biết lập trình chỉ cần vào web:
  1. Nhập tên và câu lệnh hướng dẫn cho con AI (Instructions).
  2. Chọn kho tài liệu nội bộ (Knowledge Base) để AI biết đường tìm thông tin.
  3. Kéo thả các hình khối (Node) trên màn hình để thiết kế quy trình: *Tra cứu tài liệu -> Hỏi AI -> Kiểm tra kết quả -> Trả lời khách*.
  4. Bấm nút **Test** để chạy thử.
  5. Bấm nút **Publish** để phát hành con AI đó ra ngoài cho mọi người dùng.

---

## 2. PHÂN CÔNG TRONG TEAM 4 NGƯỜI (SWE ĐANG Ở ĐÂU?)

Hệ thống được chia làm 4 mảnh (4 Quadrant) cho 4 bạn thực tập:

```
[BẠN - SWE]              [AIE-1]               [DE]                [AIE-2]
Workbench UI + Code    Interpreter Loop      Knowledge Base       Eval & Scorecard
(Xưởng thiết kế web)  (Động cơ chạy AI)     (Kho tài liệu DB)    (Trọng tài chấm điểm)
```

- **BẠN (SWE - Software Engineer)**: Làm chủ xưởng **Workbench** (`agentcore-studio-workbench` và `agentcore-studio-web`). Bạn tạo ra giao diện web cho người ta vẽ sơ đồ Agent, viết bộ kiểm tra luật xem sơ đồ vẽ có hợp lệ không (`validator.py`), bảo mật không cho công ty này đọc trộm dữ liệu công ty khác (`tenant_wall.py`), và quản lý nút Publish phát hành Agent (`publish.py`).
- **AIE-1 (AI Engineer 1)**: Viết **Động cơ chạy (Engine)** — Đội này nhận sơ đồ do bạn tạo ra từ UI và bắt đầu cho AI thật chạy từng bước.
- **DE (Data Engineer)**: Viết **Kho tài liệu (KB)** — Đội này cắt file PDF/Word nội bộ ra và lưu vào Database để AI tra cứu.
- **AIE-2 (AI Engineer 2)**: Viết **Bộ chấm điểm (EvalHub)** — Đội này lấy con Agent ra chạy thử 30 câu hỏi xem nó đạt mấy điểm. Nếu bị rớt điểm, AIE-2 sẽ báo về cho bạn (SWE) để nút Publish trên UI bị khóa lại.

---

## 3. LÀ VAI TRÒ SWE, BẠN PHẢI BẮT ĐẦU TỪ ĐÂU? (HƯỚNG DẪN TỪNG BƯỚC THỰC TẾ)

### 📍 Bước 1: Khởi động môi trường dự án
Mở Terminal tại thư mục `Project` và gõ lần lượt các lệnh:
1. `make setup` *(Được dùng để cài đặt thư viện Python tự động qua `uv`)*.
2. `make dev` *(Được dùng để bật Database Postgres bằng Docker)*.
3. `make test` *(Chạy thử hệ thống test)*.

---

### 📍 Bước 2: Viết code cho file đầu tiên (`validator.py`)
Mở file backend Workbench của bạn:
📂 [packages/workbench/src/studio_workbench/validator.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/validator.py)

Thay câu lệnh `raise NotImplementedError(...)` bằng code Python thực tế để kiểm tra 4 luật của sơ đồ DAG:
1. **Luật 1**: Duyệt qua danh sách Node, đảm bảo `node.type` chỉ thuộc 6 loại node cho phép (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`).
2. **Luật 2 (Chống lặp vô tận)**: Kiểm tra xem các đường nối mũi tên (Edge) có bị vòng lặp vô tận (Cycle) không. Nếu có lặp thì báo lỗi `raise ValueError("cycle")`.
3. **Luật 3**: Kiểm tra các đường nối mũi tên `edge.to` xem nó có trỏ tới một `node.id` tồn tại thật không.
4. **Luật 4**: Nếu node gọi tool (`tool-call`), kiểm tra tên tool đó có nằm trong danh sách được phép `agent_config.tool_whitelist` hay không.

*(Mở file test [test_graph_lint.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/tests/test_graph_lint.py) để xem người ta viết test mẫu sẵn).*

---

### 📍 Bước 3: Viết code bảo mật (`tenant_wall.py`)
Mở file:
📂 [packages/workbench/src/studio_workbench/tenant_wall.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/tenant_wall.py)

Viết hàm `resolve_tenant(session)` để đọc ra `tenant_id` từ thông tin đăng nhập session ở Server-side, tuyệt đối không lấy `tenant_id` do người dùng truyền từ trình duyệt lên để tránh bị mạo danh.

---

### 📍 Bước 4: Viết luồng Publish & Khôi phục (`publish.py`)
Mở file:
📂 [packages/workbench/src/studio_workbench/publish.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/agentcore-studio-workbench/src/studio_workbench/publish.py)

Viết hàm `publish(recipe, scorecard)`:
1. Cho `recipe` chạy qua `graph_lint` (Bước 2) để kiểm tra hợp lệ.
2. Đọc kết quả `scorecard.gate.verdict` do AIE-2 chấm điểm. Nếu `verdict == "FAIL"`, lập tức **chặn Publish** và tự động gọi hàm `rollback()`. Nếu PASS thì lưu recipe mới vào Database.

---

### 📍 Bước 5: Sang làm Frontend UI (`agentcore-studio-web`)
Chuyển terminal sang thư mục web frontend:
`cd agentcore-studio-web` -> gõ `pnpm dev` để bật trang web local.
- Dựng giao diện Form nhập thông tin Agent.
- Dựng giao diện Canvas kéo thả sơ đồ 6 ô Node bằng thư viện **React Flow**.

---

### 💡 Tóm lại tinh thần làm việc:
Mở file [roadmap-3-sprint.md](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Project/ai20k-batch2-requirements/00-orientation/roadmap-3-sprint.md) ra, tìm tới các dòng ghi chữ **SWE**, mỗi ngày bạn chỉ cần làm xong 1 dòng đó là hoàn thành nhiệm vụ!
