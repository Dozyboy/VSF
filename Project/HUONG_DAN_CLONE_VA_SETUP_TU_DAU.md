# HƯỚNG DẪN CLONE & CẤU HÌNH DỰ ÁN TỪ ĐẦU (TỪ A ĐẾN Z)

> 💡 **Tóm tắt quy trình chuẩn dành cho Windows PowerShell:**
> Đã kiểm tra và chạy thử nghiệm thành công 100% trên hệ thống thực tế (Dành cho tài khoản đã có full quyền truy cập tất cả repos/submodules).

---

## 🛠️ BƯỚC 0: CẤU HÌNH CHUYỂN ĐỔI URL SSH SANG HTTPS (Chỉ chạy 1 lần duy nhất)

Do các submodules trong dự án mặc định được khai báo dưới dạng SSH (`git@github.com:...`), bạn chuyển hướng tự động sang HTTPS để tránh lỗi SSH Host Key Verification:

```powershell
git config --global url."https://github.com/".insteadOf "git@github.com:"
```

---

## 📍 BƯỚC 1: CLONE REPOSITORY VỀ MÁY (BAO GỒM TOÀN BỘ SUBMODULES)

Mở PowerShell tại thư mục làm việc (ví dụ `C:\Users\Admin\OneDrive\Máy tính\Minh\VSF\Code`) và gõ lệnh:

```powershell
git clone --recursive https://github.com/AI20K-VGR/agentcore-studio-kit.git
```

*(Vì bạn đã được cấp đầy đủ quyền truy cập, tham số `--recursive` sẽ tự động clone dự án chính cùng 100% các submodules bao gồm cả `docs/reports` mà **không cần** sửa hay comment out file `.gitmodules`).*

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

Cài đặt đầy đủ các thư viện Python cho toàn bộ Workspace:

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

- **Xóa toàn bộ Container + Xóa sạch Dữ liệu trong Database (Volume):**
  ```powershell
  docker compose down -v
  ```
  > 💡 **Chú thích:** Tham số `-v` (volumes) sẽ xóa sạch dữ liệu trong Postgres để bạn reset Database về trạng thái ban đầu.

- **Xóa cưỡng ép 1 Container cụ thể (nếu container bị kẹt/lỗi không tắt được):**
  ```powershell
  docker rm -f studio-postgres-1
  ```
  > 💡 **Chú thích:** Tham số `-f` (force) ép buộc dừng và xóa container có tên `studio-postgres-1`.

---

## 📍 BƯỚC 5: CHẠY KIỂM TRA TOÀN BỘ TEST SUITE (`uv run pytest`)

Chạy bài test kiểm tra chất lượng toàn bộ dự án:

- **Trên Windows PowerShell:**
  ```powershell
  $env:PYTHONUTF8="1"; uv run pytest
  ```
- **Trên Linux / macOS:**
  ```bash
  make test
  ```

*(Giải thích: Việc thêm `$env:PYTHONUTF8="1"` trước lệnh `uv run pytest` giúp bật chế độ UTF-8 Mode trên Windows, đảm bảo Python đọc các file tài liệu chứa ký tự Tiếng Việt hoặc ký tự đặc biệt bằng chuẩn UTF-8 thay vì bảng mã mặc định hệ thống CP1252/charmap, tránh gặp lỗi `UnicodeDecodeError`).*

---

## 📍 BƯỚC 6: KHỞI CHẠY GIAO DIỆN WEB FRONTEND (`apps/web`)

Để bật trang web UI kéo thả Agent trên máy local:

```powershell
cd apps/web
npm install
npm run dev
```
Trình duyệt sẽ mở ra trang web tại địa chỉ `http://localhost:5173`.
