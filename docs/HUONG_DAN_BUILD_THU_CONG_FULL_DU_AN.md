# 🛠️ HƯỚNG DẪN CLONE, LẮP RÁP & CHẠY DỰ ÁN VÀO THƯ MỤC `VSF/Build`

Tài liệu này cung cấp 2 giải pháp linh hoạt để dựng dự án **VSF/Build** từ đầu (dành cho cả máy mới chưa clone gì hoặc máy đã có sẵn các repo).

---

## ⚡ CÁCH 1: KHUYÊN DÙNG — CLONE 1 CÂU LỆNH VỚI GIT SUBMODULE (NHANH NHẤT)

Vì repository gốc `agentcore-studio-kit` đã tích hợp sẵn tất cả các repo con dưới dạng **Git Submodules**, bạn chỉ cần dùng đúng **1 câu lệnh** để clone toàn bộ dự án thẳng vào thư mục `VSF/Build` mà không cần copy hay clone thủ công từng repo:

```powershell
# Chạy câu lệnh này tại thư mục gốc Today / VSF:
git clone --recursive https://github.com/AI20K-VGR/agentcore-studio-kit.git VSF/Build
```

> 💡 **Cơ chế:** Lệnh `--recursive` sẽ tự động tải `agentcore-studio-kit` và tự động kéo toàn bộ 7 repo con (`workbench`, `engine`, `kb`, `evalhub`, `web`, `contracts`, `report`) đặt vào đúng vị trí trong `VSF/Build`.

---

## 🔄 CÁCH 2: KỊCH BẢN POWERSHELL TỰ ĐỘNG CLONE & LẮP RÁP (ALL-IN-ONE)

Nếu bạn muốn tự động clone từng repo riêng biệt từ GitHub về rồi lắp ráp ghép lại thành thư mục `VSF/Build`, chỉ cần paste đoạn script PowerShell gộp dưới đây tại thư mục gốc:

```powershell
# 1. Tạo thư mục Build trước
New-Item -ItemType Directory -Force -Path ".\VSF\Build"

# 2. Clone đầy đủ 8 Repositories từ GitHub
git clone https://github.com/AI20K-VGR/agentcore-studio-kit.git
git clone https://github.com/AI20K-VGR/agentcore-studio-workbench.git
git clone https://github.com/AI20K-VGR/agentcore-studio-engine.git
git clone https://github.com/AI20K-VGR/agentcore-studio-kb.git
git clone https://github.com/AI20K-VGR/agentcore-studio-evalhub.git
git clone https://github.com/AI20K-VGR/agentcore-studio-web.git
git clone https://github.com/AI20K-VGR/agentcore-studio-contracts.git
git clone https://github.com/AI20K-VGR/agentcore-report.git

# 3. Lắp ráp và Sao chép toàn bộ vào VSF/Build
Copy-Item -Path ".\agentcore-studio-kit\*" -Destination ".\VSF\Build\" -Recurse -Force
Copy-Item -Path ".\agentcore-studio-workbench\*" -Destination ".\VSF\Build\packages\workbench\" -Recurse -Force
Copy-Item -Path ".\agentcore-studio-engine\*" -Destination ".\VSF\Build\packages\engine\" -Recurse -Force
Copy-Item -Path ".\agentcore-studio-kb\*" -Destination ".\VSF\Build\packages\kb\" -Recurse -Force
Copy-Item -Path ".\agentcore-studio-evalhub\*" -Destination ".\VSF\Build\packages\evalhub\" -Recurse -Force
Copy-Item -Path ".\agentcore-studio-contracts\*" -Destination ".\VSF\Build\packages\contracts\" -Recurse -Force
Copy-Item -Path ".\agentcore-studio-web\*" -Destination ".\VSF\Build\apps\web\" -Recurse -Force
Copy-Item -Path ".\agentcore-report\*" -Destination ".\VSF\Build\docs\reports\" -Recurse -Force
```

---

## 🔗 III. KÍCH HOẠT VÀ LIÊN KẾT CÁC GÓI

Sau khi đã có thư mục `VSF/Build` (theo Cách 1 hoặc Cách 2), di chuyển vào `VSF/Build` để liên kết các gói:

```powershell
cd .\VSF\Build\
pip install -e packages/contracts -e packages/workbench -e packages/engine -e packages/kb -e packages/evalhub
```

---

## ▶️ IV. HƯỚNG DẪN CHẠY DỰ ÁN (RUN & DEMO)

Sau khi build xong tại `VSF/Build`, bạn có 4 cách chạy hệ thống:

### 🟢 Cách 1: Chạy Test Suite toàn hệ thống (Kiểm tra mượt)
```powershell
pytest
```

---

### 🟢 Cách 2: Chạy Engine CLI Demo (Chạy thử Agent Walking Skeleton)
```powershell
python -m studio_engine
```

---

### 🟢 Cách 3: Chạy Backend API Server (FastAPI / Uvicorn)
```powershell
python -m uvicorn studio_app.app:app --reload
```

---

### 🟢 Cách 4: Chạy Frontend Web UI (Giao diện React Flow / Vite)
```powershell
cd apps/web
npm install
npm run dev
```
*➔ Trình duyệt mở giao diện Canvas & Form KB Binding tại `http://localhost:5173`.*

---

*Tài liệu nâng cấp chuẩn hóa tại `VSF/docs/HUONG_DAN_BUILD_THU_CONG_FULL_DU_AN.md` — Hỗ trợ Thiệu Quang Minh (SWE)*
