# 🛠️ HƯỚNG DẪN LẮP RÁP & BUILD THỦ CÔNG FULL DỰ ÁN VÀO THƯ MỤC `VSF/Build`

Tài liệu này hướng dẫn bạn cách tự tay **copy thủ công từng thành phần (packages & apps)** từ các Repository lẻ nằm trong thư mục `Today` để dựng thành một **Bộ dự án Monorepo hoàn chỉnh (Full Project Kit)** tại `c:\Users\thuym\Desktop\Today\VSF\Build`.

---

## 🎯 I. CẤU TRÚC THƯ MỤC KỲ VỌNG SAU KHI LẮP RÁP

Sau khi hoàn thành copy thủ công, thư mục `VSF/Build` của bạn sẽ có dạng chuẩn Monorepo như sau:

```
c:\Users\thuym\Desktop\Today\VSF\Build\
├── apps/
│   └── studio/                  <-- [Copy từ agentcore-studio-web]
├── packages/
│   ├── contracts/               <-- [Copy từ agentcore-studio-kit/packages/contracts]
│   ├── workbench/               <-- [Copy từ agentcore-studio-workbench (Repo SWE của bạn)]
│   ├── engine/                  <-- [Copy từ agentcore-studio-engine (Repo AIE-1 của Đạt)]
│   ├── kb/                      <-- [Copy từ agentcore-studio-kb (Repo DE của Đông Anh)]
│   └── evalhub/                 <-- [Copy từ agentcore-studio-evalhub (Repo AIE-2 của Duy)]
└── HUONG_DAN_BUILD_THU_CONG_FULL_DU_AN.md
```

---

## 📋 II. HƯỚNG DẪN THỰC HIỆN THỦ CÔNG TỪNG BƯỚC

### 📌 BƯỚC 1: TẠO CÁC THƯ MỤC NỀN TẢNG
1. Mở thư mục `c:\Users\thuym\Desktop\Today\VSF\Build`.
2. Tạo 2 thư mục mới:
   - `packages` (nơi chứa các gói logic thư viện)
   - `apps` (nơi chứa ứng dụng giao diện Web/Studio)

---

### 📌 BƯỚC 2: COPY GÓI `contracts` (Hợp đồng dữ liệu dùng chung)
* **Nguồn:** `c:\Users\thuym\Desktop\Today\agentcore-studio-kit\packages\contracts`
* **Hành động:** Copy toàn bộ thư mục `contracts` này.
* **Đích dán:** Dán vào `c:\Users\thuym\Desktop\Today\VSF\Build\packages\`
  * ➔ Kết quả: `VSF\Build\packages\contracts\`

---

### 📌 BƯỚC 3: COPY GÓI `workbench` (Nhiệm vụ SWE — Thiệu Quang Minh)
* **Nguồn:** `c:\Users\thuym\Desktop\Today\agentcore-studio-workbench`
* **Hành động:** 
  1. Copy toàn bộ nội dung trong thư mục `agentcore-studio-workbench`.
  2. Tạo thư mục `workbench` bên trong `VSF\Build\packages\`.
  3. Dán toàn bộ vào `VSF\Build\packages\workbench\`.
* ➔ Kết quả: `VSF\Build\packages\workbench\src\studio_workbench\...`

---

### 📌 BƯỚC 4: COPY GÓI `engine` (Nhiệm vụ AIE-1 — Trần Bá Đạt)
* **Nguồn:** `c:\Users\thuym\Desktop\Today\agentcore-studio-engine`
* **Hành động:** 
  1. Copy toàn bộ nội dung trong thư mục `agentcore-studio-engine`.
  2. Tạo thư mục `engine` bên trong `VSF\Build\packages\`.
  3. Dán toàn bộ vào `VSF\Build\packages\engine\`.
* ➔ Kết quả: `VSF\Build\packages\engine\src\studio_engine\...`

---

### 📌 BƯỚC 5: COPY GÓI `kb` (Nhiệm vụ DE — Nguyễn Đông Anh)
* **Nguồn:** `c:\Users\thuym\Desktop\Today\agentcore-studio-kb`
* **Hành động:** 
  1. Copy toàn bộ nội dung trong thư mục `agentcore-studio-kb`.
  2. Tạo thư mục `kb` bên trong `VSF\Build\packages\`.
  3. Dán toàn bộ vào `VSF\Build\packages\kb\`.
* ➔ Kết quả: `VSF\Build\packages\kb\src\studio_kb\...`

---

### 📌 BƯỚC 6: COPY GÓI `evalhub` (Nhiệm vụ AIE-2 — Lưu Tiến Duy)
* **Nguồn:** `c:\Users\thuym\Desktop\Today\agentcore-studio-evalhub`
* **Hành động:** 
  1. Copy toàn bộ nội dung trong thư mục `agentcore-studio-evalhub`.
  2. Tạo thư mục `evalhub` bên trong `VSF\Build\packages\`.
  3. Dán toàn bộ vào `VSF\Build\packages\evalhub\`.
* ➔ Kết quả: `VSF\Build\packages\evalhub\src\studio_evalhub\...`

---

### 📌 BƯỚC 7: COPY ỨNG DỤNG `studio` (Giao diện Web UI)
* **Nguồn:** `c:\Users\thuym\Desktop\Today\agentcore-studio-web`
* **Hành động:** 
  1. Copy toàn bộ nội dung trong thư mục `agentcore-studio-web`.
  2. Tạo thư mục `studio` bên trong `VSF\Build\apps\`.
  3. Dán toàn bộ vào `VSF\Build\apps\studio\`.
* ➔ Kết quả: `VSF\Build\apps\studio\...`

---

## 🚀 III. KÍCH HOẠT VÀ LIÊN KẾT CÁC GÓI ĐỂ HẾT GẠCH ĐỎ IDE

Sau khi copy thủ công xong toàn bộ, để VS Code / IDE không còn báo lỗi gạch đỏ `studio_contracts` hay `studio_workbench`, bạn thực hiện 1 lần liên kết (Editable Install):

Mở Terminal tại thư mục `c:\Users\thuym\Desktop\Today\VSF\Build` và chạy chuỗi lệnh sau:

```bash
pip install -e packages/contracts
pip install -e packages/workbench
pip install -e packages/engine
pip install -e packages/kb
pip install -e packages/evalhub
```

---

## ✅ IV. KIỂM TRA THÀNH QUẢ (SMOKE TEST)

Khi mở VS Code tại thư mục `VSF/Build`:
1. Mọi nét gạch đỏ `studio_contracts` hay `studio_workbench` sẽ **hoàn toàn biến mất** 🟢.
2. Bạn có thể mở Terminal và chạy test toàn bộ hệ thống bằng lệnh:
   ```bash
   pytest
   ```

*Tài liệu tạo bởi Antigravity AI — Hỗ trợ Thiệu Quang Minh (SWE)*
