# 🛠️ HƯỚNG DẪN LẮP RÁP & BUILD FULL DỰ ÁN BẰNG CÂU LỆNH TERMINAL

Tài liệu này hướng dẫn bạn thực hiện lắp ráp dự án **hoàn toàn bằng câu lệnh Terminal (PowerShell)** tại thư mục gốc `Today`, không cần thao tác bằng chuột.

---

## 🚀 I. CÁC CÂU LỆNH COPY BẰNG POWERSHELL (CHẠY TỪ THƯ MỤC GỐC `Today`)

Mở Terminal (PowerShell) tại thư mục `Today` và copy/paste các lệnh sau:

### 📌 BƯỚC 1: COPY TOÀN BỘ KIT LÀM BỘ KHUNG CHUẨN
```powershell
Copy-Item -Path ".\agentcore-studio-kit\*" -Destination ".\VSF\Build\" -Recurse -Force
```

---

### 📌 BƯỚC 2: ĐÈ (OVERWRITE) CODE MỚI NHẤT TỪ CÁC REPO RIÊNG LẺ

#### 1. Đè gói `workbench` (SWE — Code của bạn):
```powershell
Copy-Item -Path ".\agentcore-studio-workbench\*" -Destination ".\VSF\Build\packages\workbench\" -Recurse -Force
```

#### 2. Đè gói `engine` (AIE-1 — Code của Đạt):
```powershell
Copy-Item -Path ".\agentcore-studio-engine\*" -Destination ".\VSF\Build\packages\engine\" -Recurse -Force
```

#### 3. Đè gói `kb` (DE — Code của Đông Anh):
```powershell
Copy-Item -Path ".\agentcore-studio-kb\*" -Destination ".\VSF\Build\packages\kb\" -Recurse -Force
```

#### 4. Đè gói `evalhub` (AIE-2 — Code của Duy):
```powershell
Copy-Item -Path ".\agentcore-studio-evalhub\*" -Destination ".\VSF\Build\packages\evalhub\" -Recurse -Force
```

#### 5. Đè ứng dụng `web` (Studio UI):
```powershell
Copy-Item -Path ".\agentcore-studio-web\*" -Destination ".\VSF\Build\apps\studio\" -Recurse -Force
```

---

## ⚡ II. CÂU LỆNH CHẠY GỘP TOÀN BỘ TRONG 1 DÒNG (ONE-LINER)

Nếu bạn muốn chạy **tất cả các bước copy trên trong 1 lần duy nhất**:

```powershell
Copy-Item -Path ".\agentcore-studio-kit\*" -Destination ".\VSF\Build\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-workbench\*" -Destination ".\VSF\Build\packages\workbench\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-engine\*" -Destination ".\VSF\Build\packages\engine\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-kb\*" -Destination ".\VSF\Build\packages\kb\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-evalhub\*" -Destination ".\VSF\Build\packages\evalhub\" -Recurse -Force ; Copy-Item -Path ".\agentcore-studio-web\*" -Destination ".\VSF\Build\apps\studio\" -Recurse -Force
```

---

## 🔗 III. KÍCH HOẠT LIÊN KẾT GÓI & TEST

Sau khi copy bằng câu lệnh xong, di chuyển vào `VSF/Build` và kích hoạt:

```powershell
cd .\VSF\Build\
pip install -e packages/contracts -e packages/workbench -e packages/engine -e packages/kb -e packages/evalhub
pytest
```

*Tài liệu tạo bởi Antigravity AI — Hỗ trợ Thiệu Quang Minh (SWE)*
