# 🏗️ HƯỚNG DẪN CẤU TRÚC DỰ ÁN, LUỒNG ROLLBACK & PHẦN VIỆC CỦA SWE

Tài liệu này chi tiết hóa 3 nội dung trọng tâm: **Cấu trúc Thư mục Mono-repo**, **Cơ chế Rollback chi tiết**, và **Danh sách File Python SWE cần lập trình**.

---

## 🏗️ PHẦN 1: CẤU TRÚC THƯ MỤC DỰ ÁN (FRONTEND, BACKEND, SECRET KEY Ở ĐÂU?)

Dự án của bạn được tổ chức theo mô hình **Mono-repo** (Một kho chứa nhiều gói code). Cấu trúc thư mục cụ thể như sau:

```
agentcore-studio-kit/
│
├── 🌐 apps/web/                        <-- FRONTEND (Next.js / React)
│   ├── src/                            <-- Giao diện Form & Canvas kéo-thả
│   └── package.json
│
├── ⚙️ apps/studio/                     <-- BACKEND SERVER (FastAPI Python)
│   ├── .env                            <-- 🔥 CHÌA KHÓA BÍ MẬT SECRET_KEY CẤT Ở ĐÂY!
│   └── src/studio_app/
│       └── middleware.py               <-- Lớp 1 Middleware đứng ở cổng vào HTTP
│
└── 📦 packages/                        <-- CORE LOGIC BACKEND (Chia cho 4 người)
    ├── 👑 workbench/                   <-- THUỘC VỀ BẠN (SWE)! (wb.* DB schema, validator, publish)
    │   └── src/studio_workbench/
    │       ├── validator.py            <-- Viết hàm graph_lint() kiểm tra sơ đồ 6 node
    │       ├── publish.py              <-- Viết luồng publish() và rollback()
    │       └── tenant_wall.py          <-- Viết hàm resolve_tenant() giải mã JWT Token
    │
    ├── 📂 kb/                          <-- THUỘC VỀ DE (kb.* DB schema, vector search)
    ├── 📂 engine/                      <-- THUỘC VỀ AIE-1 (Interpreter running 6 nodes)
    ├── 📂 evalhub/                     <-- THUỘC VỀ AIE-2 (eval.* DB schema, LLM Judge)
    └── 📜 contracts/                   <-- CHỨA 4 HỢP ĐỒNG SCHEMA CHUNG (Dùng chung)
```

### 🔑 Secret Key cất ở đâu và dùng như thế nào?
* **Cất ở đâu:** Trong file bí mật **`apps/studio/.env`** (Ví dụ: `STUDIO_SECRET_KEY="toilagiamdoc_2026"`). File này nằm trên Backend, không bao giờ gửi về cho Frontend.
* **Mã hóa/Giải mã ở đâu:** Trong file [tenant_wall.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/agentcore-studio-kit/packages/workbench/src/studio_workbench/tenant_wall.py) do **SWE (Bạn)** gõ code gọi `jwt.decode(token, os.getenv("STUDIO_SECRET_KEY"))`.

---

## 🔄 PHẦN 2: GIẢI THÍCH LẠI KỸ VỀ CƠ CHẾ ROLLBACK (TỪ A ĐẾN Z)

Hãy tưởng tượng bạn đang bấm nút **Publish bản V2** trên màn hình UI:

```
[Bấm Publish bản V2] ──► [Hàm publish() của SWE chạy]
                                   │
                                   ├── 1. Chạy `graph_lint(recipe)` ➔ Ok!
                                   │
                                   ├── 2. Đọc Scorecard từ AIE-2 ➔ `scorecard.gate.verdict`
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
             verdict == "PASS"             verdict == "FAIL"
                    │                             │
       [Ghi bản V2 vào wb.recipes]         [HÀM publish() TỰ ĐỘNG GỌI rollback()]
       [Lưu V2 vào wb.recipe_versions]            │
       [Hoàn thành Publish]                        ▼
                                            1. Chặn không cho V2 ghi vào DB.
                                            2. Chạy SQL kéo bản V1 từ wb.recipe_versions.
                                            3. Ghi đè V1 lại vào wb.recipes (Restore V1).
                                            4. Trả lỗi báo đỏ về UI: "Chặn Publish! Đã Rollback về V1".
```

### 🗄️ SQL thực hiện cụ thể lúc Rollback:
```sql
-- Kéo bản V1 cũ từ bảng lịch sử `wb.recipe_versions` đè lại bảng hiện hành `wb.recipes`:
UPDATE wb.recipes
SET instructions = v1.instructions, 
    dag = v1.dag, 
    kb_binding = v1.kb_binding
FROM wb.recipe_versions v1
WHERE wb.recipes.agent_id = 'agent_101' AND v1.version = 1;
```

* **V2 hỏng đi đâu?** V2 không được ghi vào bảng `wb.recipes`, nhưng vẫn nằm nguyên trên màn hình Editor UI của bạn dưới dạng **Draft (Nháp)** để bạn xem lại và sửa tiếp!

---

## 📑 PHẦN 3: CHI TIẾT NHỮNG GÌ BẠN (SWE) CẦN TÌM HIỂU VÀ VIẾT CODE THÊM

Để sẵn sàng 100% gõ code, bạn chỉ cần đọc và hoàn thiện **4 File Python chính** nằm trong `packages/workbench/src/studio_workbench/`:

### 1. File [validator.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/agentcore-studio-kit/packages/workbench/src/studio_workbench/validator.py)
* **Nhiệm vụ:** Viết hàm `graph_lint(recipe: Recipe) -> None`.
* **Cần tìm hiểu:**
  * Cách duyệt qua danh sách `recipe.dag.nodes` để kiểm tra `type` phải thuộc 6 node đóng.
  * Cách kiểm tra xem có Node nào bị lặp vòng tròn (Cycle) hay không.

### 2. File [publish.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/agentcore-studio-kit/packages/workbench/src/studio_workbench/publish.py)
* **Nhiệm vụ:** Viết hàm `publish(recipe, scorecard)` và `rollback(agent_id, tenant, to_version)`.
* **Cần tìm hiểu:**
  * Luồng check `graph_lint` ➔ Check `scorecard.gate.verdict == "PASS"`.
  * Cách gọi lệnh SQL tương tác với bảng `wb.recipes` và `wb.recipe_versions`.

### 3. File [tenant_wall.py](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/agentcore-studio-kit/packages/workbench/src/studio_workbench/tenant_wall.py)
* **Nhiệm vụ:** Viết hàm `resolve_tenant(session: object) -> str`.
* **Cần tìm hiểu:**
  * Cách dùng thư viện `pyjwt` lấy chuỗi Token từ session ➔ Giải mã lấy ra chuỗi `tenant_id` thật (chống lỗi IDOR).

### 4. File [schema.py (workbench)](file:///c:/Users/Admin/OneDrive/M%C3%A1y%20t%C3%ADnh/Minh/VSF/Code/agentcore-studio-kit/packages/workbench/src/studio_workbench/schema.py)
* **Nhiệm vụ:** Đọc DDL bảng Database `wb.recipes` và `wb.recipe_versions`.
* **Cần tìm hiểu:** Xem cấu trúc các cột dữ liệu (`agent_id`, `tenant`, `instructions`, `dag`, `kb_binding`...) để phục vụ cho việc viết SQL ở file `publish.py`.
