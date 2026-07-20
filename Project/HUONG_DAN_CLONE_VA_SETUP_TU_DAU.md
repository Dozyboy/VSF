# HƯỚNG DẪN CLONE & CẤU HÌNH DỰ ÁN TỪ ĐẦU (TỪ A ĐẾN Z)

---

## 📍 BƯỚC 1: CLONE DỰ ÁN CÓ TÍNH NĂNG KÉO SUBMODULES
Mở Terminal tại thư mục bạn muốn chứa dự án mới và gõ lệnh:

```bash
git clone --recursive https://github.com/AI20K-VGR/agentcore-studio-kit.git
```
*(Lưu ý: Phải có chữ `--recursive` để Git tự động kéo sạch sẽ 9 repo con về máy).*

---

## 📍 BƯỚC 2: DI CHUYỂN VÀO THƯ MỤC VỪA CLONE
```bash
cd agentcore-studio-kit
```

---

## 📍 BƯỚC 3: TẠO FILE CẤU HÌNH MÔI TRƯỜNG (`.env`)
Tạo file `.env` từ file mẫu `.env.example` bằng lệnh:

- Trên PowerShell (Windows):
  ```powershell
  copy .env.example .env
  ```
- Trên Git Bash / Linux / macOS:
  ```bash
  cp .env.example .env
  ```

---

## 📍 BƯỚC 4: KHỞI TẠO MÔI TRƯỜNG PYTHON & CÀI THƯ VIỆN (`make setup`)
Chạy câu lệnh đồng bộ các gói Python workspace:
```bash
make setup
```
*(Hoặc gõ lệnh `uv sync` nếu chạy bằng `uv` trực tiếp)*. 

Lệnh này sẽ tự động tạo môi trường ảo `.venv` và cài đặt đầy đủ tất cả thư viện Python cho cả 6 packages.

---

## 📍 BƯỚC 5: KHỞI ĐỘNG DATABASE POSTGRESQL (`make dev`)
Bật Cơ sở dữ liệu PostgreSQL + extension pgvector trên Docker:
```bash
make dev
```
*(Lệnh này sẽ gọi `docker compose up -d` ở chế độ chạy ngầm)*.

---

## 📍 BƯỚC 6: CHẠY KIỂM TRA TOÀN BỘ TEST SUITE (`make test`)
Chạy toàn bộ bài test của cả dự án để đảm bảo mọi thứ đã thông suốt:
```bash
make test
```
*(Nếu tất cả test báo màu XANH tức là dự án của bạn đã hoạt động hoàn hảo 100%)*.

---

## 📍 BƯỚC 7: KHỞI CHẠY GIAO DIỆN WEB FRONTEND (`apps/web`)
Để bật trang web UI kéo thả Agent trên máy local:
```bash
cd apps/web
npm install
npm run dev
```
Trình duyệt sẽ mở ra trang web tại địa chỉ `http://localhost:5173`.
