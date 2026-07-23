# 🛠️ HƯỚNG DẪN LẮP RÁP, BUILD & CHẠY DỰ ÁN VÀO THƯ MỤC `VSF/Build`

Tài liệu này hướng dẫn bạn thực hiện lắp ráp dự án **bằng câu lệnh Terminal (PowerShell)** tại thư mục gốc `Today` và **cách chạy (Run / Demo / Web)** bộ khung hoàn chỉnh sau khi build.

---

## 🚀 I. CÁC CÂU LỆNH COPY BẰNG POWERSHELL (CHẠY TỪ THƯ MỤC GỐC `Today`)

Mở Terminal (PowerShell) tại thư mục `Today` và copy/paste câu lệnh gộp **All-In-One**:

```powershell
Copy-Item -Path ".\agentcore-studio-kit\*" -Destination ".\VSF\Build\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-workbench\*" -Destination ".\VSF\Build\packages\workbench\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-engine\*" -Destination ".\VSF\Build\packages\engine\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-kb\*" -Destination ".\VSF\Build\packages\kb\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-evalhub\*" -Destination ".\VSF\Build\packages\evalhub\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-web\*" -Destination ".\VSF\Build\apps\studio\" -Recurse -Force
```

---

## 🔗 II. KÍCH HOẠT VÀ LIÊN KẾT CÁC GÓI

Sau khi copy xong, di chuyển vào `VSF/Build` và kích hoạt liên kết các gói:

```powershell
cd .\VSF\Build\
pip install -e packages/contracts -e packages/workbench -e packages/engine -e packages/kb -e packages/evalhub
```

---

## ▶️ III. HƯỚNG DẪN CHẠY DỰ ÁN (RUN & DEMO)

Sau khi build xong tại `VSF/Build`, bạn có 4 cách chạy hệ thống:

### 🟢 Cách 1: Chạy Test Suite toàn hệ thống (Kiểm tra xem mượt không)
```powershell
pytest
```
*➔ Lệnh này sẽ quét toàn bộ 5 packages và ứng dụng `studio` để kiểm tra mượt mà từ A-Z.*

---

### 🟢 Cách 2: Chạy Engine CLI Demo (Chạy thử Agent Walking Skeleton)
```powershell
python -m studio_engine
```
*➔ Lệnh này chạy luồng Agent 4-node thực tế (`kb-retrieve` -> `llm-step` -> `tool-call` -> `end`) và in kết quả ra Terminal.*

---

### 🟢 Cách 3: Chạy Backend API Server (FastAPI / Uvicorn)
```powershell
python -m uvicorn studio_app.app:app --reload
```
*➔ Khởi chạy máy chủ Backend AgentCore Studio Server tại `http://localhost:8000`.*

---

### 🟢 Cách 4: Chạy Frontend Web UI (Giao diện React Flow / Vite)
Nếu có thư mục `apps/web` (hoặc `apps/studio/web`):
```powershell
cd apps/web
npm install
npm run dev
```
*➔ Mở giao diện Canvas vẽ Agent trên trình duyệt web.*

---

*Tài liệu tạo bởi Antigravity AI — Hỗ trợ Thiệu Quang Minh (SWE)*
