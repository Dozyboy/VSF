# HƯỚNG DẪN CLONE & CẤU HÌNH DỰ ÁN TỪ ĐẦU (TỪ A ĐẾN Z)

> 💡 **Tóm tắt quy trình chuẩn dành cho Windows PowerShell:**
> Đã kiểm tra và chạy thử nghiệm thành công 100% trên hệ thống thực tế (Dành cho tài khoản đã có full quyền truy cập tất cả repos/submodules).

---

## 🛠️ BƯỚC 0: CẤU HÌNH BAN ĐẦU HỆ THỐNG (Chỉ chạy 1 lần duy nhất)

### 🔹 1. Chuyển đổi URL SSH sang HTTPS:
Do các submodules trong dự án mặc định được khai báo dưới dạng SSH (`git@github.com:...`), bạn chuyển hướng tự động sang HTTPS để tránh lỗi SSH Host Key Verification:

```powershell
git config --global url."https://github.com/".insteadOf "git@github.com:"
```

### 🔹 2. Bật chuẩn mã hóa UTF-8 cố định cho Python trên Windows:
Tránh lỗi `UnicodeDecodeError: 'charmap' codec...` khi Python đọc các file tài liệu chứa ký tự Tiếng Việt hoặc ký tự đặc biệt:

```powershell
[System.Environment]::SetEnvironmentVariable('PYTHONUTF8', '1', 'User')
```
> 💡 **Lưu ý:** Sau khi chạy câu lệnh trên, bạn tắt cửa sổ PowerShell hiện tại và mở lại cửa sổ mới (hoặc mở lại Terminal trong VS Code) để máy áp dụng cấu hình vĩnh viễn.

---

## 📍 BƯỚC 1: CLONE REPOSITORY VỀ MÁY (BAO GỒM TOÀN BỘ SUBMODULES)

Mở PowerShell tại thư mục làm việc và gõ lệnh:

```powershell
git clone --recursive https://github.com/AI20K-VGR/agentcore-studio-kit.git
```

*(Vì bạn đã được cấp đầy đủ quyền truy cập, tham số `--recursive` sẽ tự động clone dự án chính cùng 100% các submodules bao gồm cả `docs/reports` mà **không cần** sửa hay comment out file `.gitmodules`).*

### 🔹 Cách kiểm tra xem đã clone đủ 100% Submodules chưa:
Di chuyển vào thư mục dự án `cd agentcore-studio-kit` và gõ lệnh:

```powershell
git submodule status --recursive
```

- **Kết quả chuẩn:** Tất cả các dòng hiển thị **không có ký tự dấu trừ `-` ở đầu** (các dòng đều bắt đầu bằng khoảng trắng và mã commit hash, ví dụ: ` c1f9513... packages/workbench`).
- **Nếu thấy có dấu trừ `-` ở đầu (chưa clone đủ hoặc bị sót):** Bạn gõ thêm câu lệnh sau để tự động tải về đầy đủ các submodules còn thiếu:
  ```powershell
  git submodule update --init --recursive
  ```

---

## 📍 BƯỚC 2: DI CHUYỂN VÀO THƯ MỤC DỰ ÁN & TẠO FILE CẤU HÌNH MÔI TRƯỜNG (`.env`)

Di chuyển vào thư mục dự án vừa clone:

```powershell
cd agentcore-studio-kit
```

Tạo file `.env` từ mẫu `.env.example`:

- **Trên Windows PowerShell:**
  ```powershell
  copy .env.example .env
  ```
- **Trên Git Bash / Linux / macOS:**
  ```bash
  cp .env.example .env
  ```

---

## 📍 BƯỚC 3: KHỞI TẠO MÔI TRƯỜNG PYTHON & CÀI THƯ VIỆN (`uv sync`)

### 🔹 1. Cài đặt công cụ `uv` (Nếu máy tính chưa cài đặt):
`uv` là công cụ quản lý thư viện và môi trường ảo Python tốc độ cao (bắt buộc phải có để chạy lệnh `uv sync`).

- **Trên Windows PowerShell (Khuyên dùng):**
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```
- **Hoặc dùng pip (nếu máy đã có Python):**
  ```powershell
  pip install uv
  ```
- **Trên Linux / macOS:**
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```

> 💡 **Lưu ý quan trọng:** Sau khi cài đặt thành công `uv`, bạn cần **tắt cửa sổ PowerShell / Terminal hiện tại và mở lại cửa sổ mới** để hệ thống nhận diện câu lệnh. Kiểm tra bằng lệnh: `uv --version`.

### 🔹 2. Cài đặt đầy đủ các thư viện Python cho toàn bộ Workspace:

- **Trên Windows PowerShell:**
  ```powershell
  uv sync
  ```
- **Trên Linux / macOS:**
  ```bash
  make setup
  ```

---

## 📍 BƯỚC 4: KHỞI ĐỘNG & QUẢN LÝ DATABASE POSTGRESQL VỚI DOCKER

Bật Cơ sở dữ liệu PostgreSQL + extension pgvector trên Docker container:

### 🔹 1. Khởi động Database (Khi bắt đầu làm việc):
```powershell
docker compose up -d
```
> 💡 **Chú thích:** Lệnh `up -d` sẽ tải image PostgreSQL và khởi chạy container dưới nền (detached mode), giúp ứng dụng kết nối tới Database.

- **Xem trạng thái container đang chạy:**
  ```powershell
  docker compose ps
  ```
  > 💡 **Chú thích:** Kiểm tra xem container Database đã ở trạng thái `Up` (đang chạy) hay chưa.

---

### 🔹 2. Tắt / Dừng Database (Khi kết thúc không muốn chạy app nữa):
> 💡 **Trả lời:** Đúng vậy! Khi bạn xong việc và không dùng app nữa, bạn nên tắt Docker container để giải phóng dung lượng RAM, CPU và giải phóng cổng kết nối (Port `5432`) cho máy tính.

- **Tắt tạm thời container (Giữ nguyên dữ liệu & cấu hình - Khuyên dùng khi tắt máy nghỉ làm):**
  ```powershell
  docker compose stop
  ```
  > 💡 **Chú thích:** Tạm dừng container an toàn. Đây là câu lệnh khuyên dùng khi bạn hết giờ làm việc và chuẩn bị tắt máy. Hôm sau bật máy làm tiếp, bạn chỉ cần gõ `docker compose up -d` (hoặc `docker compose start`) là Database sẽ bật lại ngay trong 1 giây mà không bị mất dữ liệu.

- **Tắt và dọn dẹp Container (Gỡ bỏ container, giữ lại volume dữ liệu):**
  ```powershell
  docker compose down
  ```
  > 💡 **Chú thích:** Dừng và xóa hẳn container ra khỏi danh sách. Hôm sau muốn làm tiếp bạn gõ `docker compose up -d` thì Docker sẽ tạo lại container mới (tốn thêm vài giây tạo lại). Dữ liệu vẫn được giữ trong Volume.

---

### 🔹 3. Xóa Container & Reset Dữ liệu (Khi bị lỗi hoặc muốn làm lại từ đầu):

- **Xóa Container + Xóa dữ liệu (Volume) của dự án:**
  ```powershell
  docker compose down -v
  ```
  > 💡 **Chú thích:** Tham số `-v` (volumes) sẽ xóa sạch dữ liệu trong Postgres để bạn reset Database về trạng thái ban đầu (Image bản thiết kế vẫn giữ lại để lần sau khởi động nhanh).

- **Xóa toàn bộ Container + Volume + Xóa luôn cả Docker Image của dự án:**
  ```powershell
  docker compose down -v --rmi all
  ```
  > 💡 **Chú thích:** Tham số `--rmi all` sẽ xóa thêm cả file Image (`pgvector/pgvector`) khỏi máy tính để giải phóng bộ nhớ.

- **Xóa cưỡng ép 1 Container cụ thể (nếu container bị kẹt/lỗi không tắt được):**
  ```powershell
  docker rm -f studio-postgres-1
  ```
  > 💡 **Chú thích:** Tham số `-f` (force) ép buộc dừng và xóa container có tên `studio-postgres-1`.

---

### 🔹 4. Siêu dọn dẹp toàn bộ Docker (Làm sạch 100% Containers, Volumes, Images & Cache rác):

Khi bạn muốn giải phóng tối đa dung lượng ổ đĩa đĩa hoặc dọn dẹp Docker về trạng thái trắng tinh như mới cài đặt:

```powershell
docker system prune -a --volumes -f
```
> ⚠️ **Chú thích:** Lệnh này sẽ xóa sạch:
> - Tất cả các Container đã dừng.
> - Tất cả các Docker Images không dùng đến (bao gồm cả image `pgvector`).
> - Tất cả các Volumes & Networks rác trên toàn bộ hệ thống Docker.

---

## 📍 BƯỚC 5: CHẠY KIỂM TRA TOÀN BỘ TEST SUITE (`uv run pytest`)

Chạy bài test kiểm tra chất lượng toàn bộ dự án:

- **Trên Windows PowerShell:**
  ```powershell
  uv run pytest
  ```
- **Trên Linux / macOS:**
  ```bash
  make test
  ```

*(Chú thích: Nếu bạn đã thực hiện Bước 0.2 thiết lập `PYTHONUTF8`, bạn chỉ cần gõ đơn giản `uv run pytest` mà không cần thêm bất kỳ tiền tố nào khác).*

---

## 📍 BƯỚC 6: KHỞI CHẠY GIAO DIỆN WEB FRONTEND (`apps/web`)

Để bật trang web UI kéo thả Agent trên máy local:

```powershell
cd apps/web
npm install
npm run dev
```
Trình duyệt sẽ mở ra trang web tại địa chỉ `http://localhost:5173`.
