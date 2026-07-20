# GIẢI THÍCH CHI TIẾT THUẬT NGỮ & KHÁI NIỆM DỰ ÁN AGENTCORE STUDIO

---

## 1. VỀ KIẾN TRÚC DỰ ÁN & QUẢN LÝ CODE

* **Monorepo (`agentcore-studio-kit`)**: 
  - *Hiểu đơn giản*: Thay vì tạo 8 dự án/repository nằm rải rác ở 8 nơi khác nhau, **Monorepo** gom cả 8 thư mục dự án con vào trong **1 kho chứa (repository) duy nhất**. Giúp cả team dễ quản lý và chạy thử nghiệm cùng nhau.
* **Git Submodule**:
  - Mỗi thư mục con (`packages/workbench`, `packages/contracts`...) thực chất là một kho Git độc lập. Submodule giúp lồng các kho con này vào trong kho cha `agentcore-studio-kit`.
* **`uv` Workspace**:
  - `uv` là công cụ quản lý thư viện Python siêu nhanh (thay thế cho `pip` hay `poetry`). `uv workspace` giúp quản lý tất cả các gói Python trong dự án bằng **1 file khóa duy nhất (`uv.lock`)**, đảm bảo máy ai chạy cũng không bị lệch phiên bản thư viện.
* **Composition Root (`apps/studio`)**:
  - Là "trạm tổng hợp". 4 người (DE, SWE, AIE-1, AIE-2) viết 4 phần riêng biệt và **không được import trực tiếp code của nhau**. Thư mục `apps/studio` chính là nơi duy nhất đứng ra nhập (import) cả 4 phần lại để tạo thành một web server chạy hoàn chỉnh.
* **FastAPI**:
  - Thư viện Python dùng để tạo ra Web API (các đường dẫn REST HTTP để Frontend gọi xuống lấy dữ liệu).

---

## 2. VỀ AI AGENT & ĐỒ THỊ THỰC THI (ENGINE & RECIPE)

* **AI Agent**:
  - Không chỉ là một khung chat thông thường (như ChatGPT), **AI Agent** là một hệ thống AI thông minh có thể **tự nhận nhiệm vụ**, **tự tra cứu tài liệu**, **gọi công cụ** và **thực hiện từng bước** để hoàn thành công việc được giao.
* **Recipe (Agent Recipe)**:
  - *Hiểu đơn giản*: Là **"Bản thiết kế"** của Agent dưới dạng file JSON. File này quy định: Agent này có tên là gì, dùng AI model nào (GPT-4 hay Gemini), được dùng những công cụ gì, và quy trình xử lý gồm những bước nào.
* **DAG (Directed Acyclic Graph - Đồ thị có hướng không chu trình)**:
  - Quy trình chạy của Agent được vẽ dưới dạng các điểm (Node) nối với nhau bằng các mũi tên (Edge). "Không chu trình" nghĩa là quy trình **đi theo 1 chiều từ ĐẦU đến CUỐI**, tuyệt đối **không được tạo vòng lặp vô tận** làm treo hệ thống.
* **6 Node Types loại đóng (6 bước cố định trên Canvas)**:
  1. `kb-retrieve`: Bước đi tra cứu tài liệu trong Kho kiến thức (Knowledge Base).
  2. `llm-step`: Bước hỏi Mô hình AI (như GPT/Gemini) để suy luận hoặc trả lời.
  3. `condition`: Bước rẽ nhánh điều kiện (VD: Nếu câu trả lời đúng thì đi đường A, sai đi đường B).
  4. `tool-call`: Bước kích hoạt một công cụ bên ngoài (VD: công cụ tính toán, gửi email...).
  5. `hitl-pause` (Human-In-The-Loop): Bước tạm dừng chương trình để **chờ con người vào bấm nút duyệt** mới chạy tiếp.
  6. `end`: Bước kết thúc quy trình.
* **Interpreter (Bộ thông dịch)**:
  - Là bộ máy Python đọc file **Recipe** (bản thiết kế) và thực thi lần lượt từng Node từ đầu đến cuối.

---

## 3. VỀ BẢO MẬT & DỮ LIỆU (TENANT & RLS SECURITY)

* **Tenant / Multi-tenancy (Đa người thuê)**:
  - Hệ thống AgentCore Studio cho nhiều công ty/khách hàng khác nhau cùng sử dụng (gọi là từng **Tenant**). Dữ liệu của Công ty A và Công ty B sống chung trên 1 server/database nhưng **phải được cách ly tuyệt đối**.
* **Tenant-Wall (Hàng rào Tenant - INV-1)** — *(Nhiệm vụ của SWE)*:
  - Khi người dùng gửi yêu cầu lên server, file `tenant_wall.py` do bạn viết sẽ tự giải mã từ Session/Token đăng nhập xem người này thuộc Tenant nào. **Tuyệt đối KHÔNG tin** thông tin `tenant_id` do người dùng tự gửi trên URL/Request (để tránh bị mạo danh).
* **IDOR (Insecure Direct Object Reference - Lỗ hổng T1)**:
  - Lỗi bảo mật nguy hiểm khi kẻ gian cố tình sửa ID trên thanh địa chỉ duyệt web (ví dụ đổi `tenant=company_a` thành `company_b`) để xem trộm dữ liệu công ty khác. `Tenant-Wall` sinh ra để triệt hạ lỗ hổng này.
* **PostgreSQL RLS (Row Level Security)**:
  - Hàng rào bảo mật tầng Cơ sở dữ liệu. Dù bằng cách nào kẻ xấu vượt qua được code backend, database PostgreSQL vẫn tự động chặn và lọc dữ liệu: chỉ cho phép lấy ra các dòng dữ liệu thuộc đúng `tenant_id` được xác thực. Nếu không có `tenant_id`, database trả về 0 dòng (fail-closed).
* **KB (Knowledge Base) & Ingestion / Chunking / Embedding / pgvector**:
  - *Knowledge Base*: Kho chứa tài liệu nội bộ.
  - *Ingestion*: Nạp tài liệu (file PDF, Word) vào hệ thống.
  - *Chunking*: Cắt tài liệu dài thành nhiều đoạn nhỏ (chunk).
  - *Embedding*: Biến các đoạn chữ thành các dãy số (vector) để AI hiểu ý nghĩa.
  - *pgvector*: Công cụ của PostgreSQL dùng để tìm kiếm các dãy số vector này.

---

## 4. VỀ GIAO DIỆN & WORKBENCH (FRONTEND UI)

* **React 19 & Vite 8**:
  - Bộ thư viện và công cụ lập trình giao diện Web bằng TypeScript/JavaScript hiện đại và chạy cực nhanh.
* **React Flow (`reactflow`)**:
  - Thư viện React cho phép tạo ra **màn hình Canvas kéo-thả**. Người dùng có thể kéo các ô Node ra màn hình và dùng chuột nối các mũi tên lại để tạo quy trình cho Agent.
* **Trace & Cost Timeline**:
  - Màn hình xem chi tiết lịch sử chạy của Agent từng milli-giây: bước 1 tốn bao nhiêu token, bước 2 gọi tool gì, tổng chi phí (cost) hết bao nhiêu tiền.

---

## 5. VỀ QUY TRÌNH KIỂM ĐỊNH & PHÁT HÀNH (EVAL & PUBLISH)

* **Graph-lint (`validator.py`)** — *(Nhiệm vụ của SWE)*:
  - Bộ kiểm định đồ thị. Trước khi Agent được phép chạy hoặc phát hành, `graph_lint` sẽ quét qua để đảm bảo đồ thị hợp lệ: đủ 4 quy tắc (node đúng loại, không bị lặp vô tận, không bị đứt mũi tên, tool nằm trong danh sách trắng).
* **Scorecard / Eval Gate (Cổng đánh giá)**:
  - Bảng điểm chấm năng lực của Agent (do AIE-2 chấm trên 30 câu hỏi mẫu). Nếu Agent bị rớt điểm (`verdict == "FAIL"`), hệ thống sẽ **khóa nút Publish** (chặn không cho phát hành bản lỗi ra ngoài).
* **Publish & Rollback** — *(Nhiệm vụ của SWE)*:
  - *Publish*: Phát hành bản Agent mới ra cho người dùng thật sử dụng.
  - *Rollback*: Nếu bản mới bị lỗi/FAIL, hệ thống tự động rút lui và khôi phục lại phiên bản Agent cũ đang chạy ổn định trong DB.
* **Walking-Skeleton (Bộ khung xâu kim)**:
  - Khái niệm làm phần mềm: Xây dựng một bản sơ khai nhất nhưng **chạy thông suốt từ đầu đến cuối** qua cả 4 bộ phận (UI → Engine → KB → Eval). "Mỏng mà thông tốt hơn dày mà đứt".
* **Luật 2-4-8**:
  - Quy tắc ứng phó khi bị kẹt công việc: Kẹt 2h → tự viết giả thuyết; Kẹt 4h → đặt câu hỏi hỏi team/mentor; Kẹt 8h → mentor sẽ ngồi cùng 30 phút để giải quyết.
