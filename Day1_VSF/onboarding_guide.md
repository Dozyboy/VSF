# AgentCore Studio - Báo cáo Tìm hiểu trước Ngày 1 (SWE Research & Data Task)

Tài liệu này tổng hợp các khái niệm cốt lõi (**Phần 3.1 - Lõi chung**), chi tiết nghiên cứu vai trò **Software Engineer / SWE (Phần 3.2)**, và bảng đăng ký phân công đầu việc vai trò **Data Engineer / DE (Phần 3.3)** mà bạn muốn nhận. Bạn có thể sao chép trực tiếp nội dung dưới đây để điền vào phần báo cáo cá nhân của mình trên Google Docs chung.

---

## PHẦN 1: BÁO CÁO TÌM HIỂU KIẾN THỨC CỐT LÕI (LÕI CHUNG)

### 1. engine | recipe boundary (Ranh giới Động cơ & Công thức)
*   **Định nghĩa:** Tách biệt hoàn toàn mã nguồn thực thi logic chạy (Engine) khỏi file cấu hình định nghĩa hành vi Agent (Recipe - thường là YAML/JSON) giúp thay đổi hành vi Agent mà không cần sửa code lõi.
*   **Ví dụ tối giản:** 
    *   *Tránh làm (Hardcode)*:
        ```python
        def run_agent(user_input):
            if user_input == "hỏi giá":
                return db.query_price()
        ```
    *   *Nên làm (Boundary)*:
        Tạo file `recipe.yaml`:
        ```yaml
        nodes:
          - id: check_price
            type: db_query
            query: "SELECT price FROM products"
        ```
        Engine chỉ đọc cấu trúc đồ thị trong `recipe.yaml` để chạy tổng quát.
*   **Cạm bẫy:** Để logic nghiệp vụ đặc thù của một khách hàng (tenant) hoặc một use-case cụ thể lọt vào mã nguồn của Engine thay vì khai báo trong Recipe.

### 2. walking-skeleton (Khung xương di động)
*   **Định nghĩa:** Một phiên bản sản phẩm cực kỳ tối giản nhưng chạy thông suốt từ đầu đến cuối luồng (End-to-End) để kiểm tra tính tích hợp của cả 4 mảnh (SWE, DE, AIE-1, AIE-2) trước khi đắp thêm tính năng chi tiết.
*   **Ví dụ tối giản:** Xây dựng một luồng: UI gửi câu hỏi $\rightarrow$ Server nhận diện tenant $\rightarrow$ Gọi API mock trả về kết quả cứng $\rightarrow$ Ghi log trace giả $\rightarrow$ Trả kết quả ra màn hình. Toàn bộ các bước đều dùng dữ liệu giả (stub/mock) nhưng hệ thống đã thông luồng.
*   **Cạm bẫy:** Quá tập trung vào việc hoàn thiện thuật toán hay viết prompt LLM phức tạp trong tuần đầu tiên, dẫn đến cuối tuần đầu vẫn chưa kết nối tích hợp được Frontend và Backend.

### 3. fixtures-first (VCR-style)
*   **Định nghĩa:** Ghi lại phản hồi từ các dịch vụ bên ngoài (LLM API, Database, API bên thứ ba) thành các file dữ liệu tĩnh (fixtures) để chạy thử nghiệm và kiểm thử ngoại tuyến (offline) mà không cần gọi API thật.
*   **Ví dụ tối giản:** Lần đầu gọi OpenAI API thì lưu kết quả trả về vào file `fixtures/openai_response.json`. Các lần chạy test tiếp theo sẽ đọc từ file này thay vì gọi thật lên hệ thống của OpenAI.
*   **Cạm bẫy:** Cấu trúc dữ liệu (schema) hệ thống thật thay đổi nhưng file fixture không được cập nhật tương ứng, dẫn đến việc test offline thì PASS nhưng chạy thực tế thì FAIL.

### 4. contract-freeze + mini-RFC
*   **Định nghĩa:** Khóa chặt cấu trúc dữ liệu giao tiếp (schema contracts) giữa các thành phần ngay từ Tuần 1; mọi thay đổi về schema bắt buộc phải được đề xuất qua tài liệu ngắn (mini-RFC) và nhận được sự đồng thuận của cả 4 thành viên.
*   **Ví dụ tối giản:** 4 thành viên thống nhất định dạng JSON của Trace Event. Khi một thành viên muốn thêm trường `cost_usd` vào trace, họ phải viết một đề xuất RFC ngắn 1 trang để cả nhóm review và phê duyệt.
*   **Cạm bẫy:** Thành viên tự ý sửa cấu trúc dữ liệu ở API hoặc cơ sở dữ liệu mà không thông báo, làm hỏng tích hợp của các thành viên khác khi ghép code.

### 5. descope-ladder (Thang giảm phạm vi)
*   **Định nghĩa:** Danh sách các phương án tối giản hóa tính năng (fallbacks) được vạch sẵn từ trước để cắt giảm khi gặp khó khăn về thời gian, đảm bảo dự án vẫn có sản phẩm chạy được đúng hạn.
*   **Ví dụ tối giản:**
    *   *Kế hoạch gốc*: UI kéo thả workflow bằng React Flow Canvas.
    *   *Bậc 1 (Descope)*: Chuyển sang điền Form cấu hình node.
    *   *Bậc 2 (Descope)*: Chỉ viết mã text Mermaid.js để hiển thị sơ đồ tĩnh.
*   **Cạm bẫy:** Cắt giảm tính năng một cách tùy hứng mà không có kế hoạch dự phòng từ trước, làm gãy các hợp đồng schema đã cam kết với các quadrant khác.

### 6. INV-1 Tenant-Wall (Bức tường ngăn cách Tenant)
*   **Định nghĩa:** Cơ chế bảo mật ở phía Server giúp phân giải mã phiên (`session_id`) thành thông tin định danh khách hàng (`tenant_id`), vai trò (`roles`) để lọc dữ liệu, tuyệt đối không tin tưởng tham số tenant do client tự gửi lên.
*   **Ví dụ tối giản:** Client chỉ gửi token/session. Server giải mã ra `tenant: ankor`. Mọi câu truy vấn Database hoặc tìm kiếm tri thức (KB search) đều được đính kèm filter bảo mật bắt buộc: `WHERE tenant_id = 'ankor'`.
*   **Cạm bẫy:** Tin cậy tham số `tenant` do phía Frontend truyền lên (như `GET /kb?tenant=borea`), tạo ra lỗ hổng IDOR cho phép kẻ xấu đổi tham số để đọc trộm dữ liệu tenant khác.

### 7. HITL / hitl-pause node (Điểm tạm dừng chờ con người duyệt)
*   **Định nghĩa:** Một trạng thái lưu checkpoint trong workflow, khi chạy đến node này Engine sẽ lưu trạng thái hiện tại vào database và dừng lại, chờ thao tác duyệt/sửa từ con người rồi mới tiếp tục thực thi.
*   **Ví dụ tối giản:** Workflow chạy đến bước duyệt email gửi khách hàng $\rightarrow$ Lưu trạng thái `waiting_human` $\rightarrow$ Quản trị viên bấm nút "Đồng ý" trên Dashboard $\rightarrow$ Engine cập nhật trạng thái thành `resumed` và gửi email đi.
*   **Cạm bẫy:** Dùng vòng lặp chờ vô hạn (polling) hoặc lệnh tạm dừng hệ thống (`time.sleep()`) để chờ người dùng duyệt, gây nghẽn và tiêu tốn tài nguyên máy chủ.

---

## PHẦN 2: BÁO CÁO TÌM HIỂU KIẾN THỨC CHUYÊN MÔN (SOFTWARE ENGINEER - SWE)

### 1. recipe schema + validator + graph-lint
*   **Định nghĩa:** Bộ công cụ định nghĩa cấu trúc hợp lệ của file cấu hình Recipe (dùng JSON Schema hoặc Pydantic) và bộ kiểm tra logic đồ thị (DAG) để phát hiện các lỗi thiết kế workflow trước khi chạy.
*   **Ví dụ tối giản:** Viết thuật toán phát hiện chu trình (Cycle Detection / DFS) để đảm bảo workflow được thiết kế không có vòng lặp vô hạn (ví dụ: Node A nối B $\rightarrow$ B nối C $\rightarrow$ C nối ngược về A).
*   **Cạm bẫy:** Chỉ kiểm tra kiểu dữ liệu của các trường đơn lẻ (ví dụ: `name` phải là string) mà không validate logic liên kết giữa các node trong đồ thị (như node đích không tồn tại hoặc đồ thị bị cô lập).

### 2. React Flow canvas (fallback form + Mermaid)
*   **Định nghĩa:** Giao diện kéo thả trực quan trên Web (sử dụng React Flow) cho phép người dùng cấu hình workflow, đồng thời chuẩn bị sẵn phương án dự phòng (Form điền thông tin / sơ đồ Mermaid.js) để nhập cấu hình đề phòng trường hợp kéo thả gặp lỗi hoặc chưa làm kịp.
*   **Ví dụ tối giản:** Người dùng kéo Node "LLM Call" kết nối với Node "HITL-Pause". UI React Flow biên dịch trực quan này thành cấu trúc JSON của recipe để lưu trữ.
*   **Cạm bẫy:** Quá tập trung vào việc làm giao diện kéo thả phức tạp, đẹp mắt ngay từ đầu mà bỏ qua phương án fallback, dẫn đến khi vẽ Canvas lỗi thì không có cách nào khác để tạo cấu hình Recipe.

### 3. publish flow + eval-gate wiring + version/rollback
*   **Định nghĩa:** Quy trình xuất bản Agent tích hợp cổng đánh giá chất lượng (eval-gate). Nếu điểm đánh giá tự động (scorecard) dưới ngưỡng, nút Publish sẽ bị khóa và hệ thống giữ nguyên hoặc rollback về phiên bản ổn định trước đó.
*   **Ví dụ tối giản:** Khi bấm "Publish" phiên bản mới $\rightarrow$ Kích hoạt bộ đánh giá chạy trên bộ câu hỏi vàng (30 golden cases) $\rightarrow$ Điểm đạt 85% (ngưỡng sàn 90%) $\rightarrow$ Chặn lệnh Publish, báo lỗi và giữ nguyên phiên bản cũ đang chạy.
*   **Cạm bẫy:** Cho phép xuất bản trực tiếp mà không đi qua cổng eval-gate, hoặc khi quá trình publish phiên bản mới thất bại thì làm hỏng hoặc mất cấu hình của phiên bản cũ đang hoạt động ổn định.

---

## PHẦN 3: ĐĂNG KÝ ĐẦU VIỆC CÁ NHÂN (MONG MUỐN ĐẢM NHẬN VAI TRÒ DATA ENGINEER - DE)

Dù nghiên cứu phần lý thuyết SWE, tôi có định hướng phát triển và đăng ký nhận thực hiện các công việc thuộc vai trò **Data Engineer (DE)** trong dự án 6 tuần:

### 1. Phân khúc KB Pipeline & Retrieval
*   Thiết kế thuật toán chia nhỏ văn bản (chunking) tối ưu dựa trên cấu trúc tài liệu Callisto Handbook (2 tenant ankor/borea).
*   Thiết lập mô hình dịch vụ Embedding và triển khai Vector Database (phân tách độc lập chỉ mục truy vấn `index per-tenant`).

### 2. Bảo mật truy xuất dữ liệu (Data Fencing)
*   Xây dựng lớp bảo mật lọc dữ liệu truy tìm (`fence-data tại-retrieval`) tích hợp trực tiếp vào hàm `kb.search` để chặn rò rỉ dữ liệu chéo tenant và kiểm soát truy cập theo Role $\rightarrow$ Section.

### 3. Đồng bộ & Xóa dữ liệu (Sync & Purge)
*   Viết code kiểm tra trùng lặp khi chạy lại pipeline nạp dữ liệu (`re-index idempotent`) sử dụng mã Hash.
*   Xây dựng quy trình xóa dữ liệu theo yêu cầu (`consent-purge`) và các script kiểm chứng dữ liệu đã được xóa hoàn toàn khỏi Vector DB.

### 4. Hệ thống Quan trắc & Dữ liệu Kiểm định (Observability & Evaluation Data)
*   Thiết kế hệ thống lưu vết sự kiện chạy Agent (`event-sourcing / trace sink`) và bảng tính toán chi phí API (`cost table`).
*   Xây dựng bộ dữ liệu vàng gồm 30 ca kiểm thử mẫu (`golden-set` với đầy đủ nhãn đúng/sai chuẩn) để tích hợp vào cổng đánh giá (eval-gate) trước khi phát hành.
