# 🛠️ HƯỚNG DẪN LẮP RÁP & BUILD FULL DỰ ÁN VÀO THƯ MỤC `VSF/Build`

> 💡 **MẸO THÔNG MINH:** Dùng bộ `agentcore-studio-kit` làm **Bộ Khung Chuẩn**, sau đó đè code mới nhất từ các Repo thành viên vào!

---

## 🎯 I. CÁCH LÀM TỐI ƯU NHẤT (COPY KIT LÀM BỘ KHUNG)

Thay vì phải tự tạo từng thư mục `packages`, `apps` thủ công, bạn tận dụng luôn `agentcore-studio-kit` làm khung xương hoàn chỉnh:

### 📌 BƯỚC 1: COPY TOÀN BỘ KIT LÀM KHUNG
1. Copy **toàn bộ nội dung** trong thư mục `c:\Users\thuym\Desktop\Today\agentcore-studio-kit`.
2. Dán trực tiếp vào `c:\Users\thuym\Desktop\Today\VSF\Build\`.
   * ➔ Lúc này `VSF/Build` đã có sẵn đầy đủ khung `apps/`, `packages/`, `pyproject.toml`, `contracts`, `tests`...

---

### 📌 BƯỚC 2: ĐÈ CODE MỚI NHẤT TỪ CÁC REPO THÀNH VIÊN VÀO KHUNG

Bây giờ bạn chỉ cần copy code mới nhất mà 4 thành viên vừa phát triển để đè (overwrite) vào khung:

1. **Gói `workbench` (Code SWE của bạn - Thiệu Quang Minh):**
   * Copy toàn bộ thư mục `c:\Users\thuym\Desktop\Today\agentcore-studio-workbench`
   * Dán đè vào `c:\Users\thuym\Desktop\Today\VSF\Build\packages\workbench`

2. **Gói `engine` (Code AIE-1 của Đạt):**
   * Copy toàn bộ thư mục `c:\Users\thuym\Desktop\Today\agentcore-studio-engine`
   * Dán đè vào `c:\Users\thuym\Desktop\Today\VSF\Build\packages\engine`

3. **Gói `kb` (Code DE của Đông Anh):**
   * Copy toàn bộ thư mục `c:\Users\thuym\Desktop\Today\agentcore-studio-kb`
   * Dán đè vào `c:\Users\thuym\Desktop\Today\VSF\Build\packages\kb`

4. **Gói `evalhub` (Code AIE-2 của Duy):**
   * Copy toàn bộ thư mục `c:\Users\thuym\Desktop\Today\agentcore-studio-evalhub`
   * Dán đè vào `c:\Users\thuym\Desktop\Today\VSF\Build\packages\evalhub`

5. **Ứng dụng `web / studio` (Giao diện):**
   * Copy toàn bộ thư mục `c:\Users\thuym\Desktop\Today\agentcore-studio-web`
   * Dán đè vào `c:\Users\thuym\Desktop\Today\VSF\Build\apps\studio`

---

## 🚀 II. KÍCH HOẠT VÀ LIÊN KẾT CÁC GÓI ĐỂ HẾT GẠCH ĐỎ IDE

Sau khi dán đè xong, mở Terminal tại `c:\Users\thuym\Desktop\Today\VSF\Build` và chạy 1 dòng lệnh:

```bash
pip install -e packages/contracts -e packages/workbench -e packages/engine -e packages/kb -e packages/evalhub
```

---

## ✅ III. KIỂM TRA THÀNH QUẢ (SMOKE TEST)

1. Mở VS Code tại thư mục `VSF/Build`: Toàn bộ gạch đỏ biến mất 🟢.
2. Mở Terminal tại `VSF/Build` và chạy:
   ```bash
   pytest
   ```
   Toàn bộ hệ thống Monorepo sẽ chạy test xanh từ A-Z!

*Tài liệu cập nhật theo ý tưởng tối ưu của Thiệu Quang Minh (SWE)*
