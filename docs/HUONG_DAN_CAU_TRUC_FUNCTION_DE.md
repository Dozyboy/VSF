# 📂 HƯỚNG DẪN CẤU TRÚC MÃ NGUỒN VÀ VỊ TRÍ HÀM CHO VAI TRÒ DE (DATA ENGINEER)

> **Tác giả mảng:** DE (Data Engineer — Nguyễn Đông Anh)  
> **Phạm vi quản lý:** Package `studio_kb`, Postgres Database, RLS Security, Vector Search, Trace Sink DB.

---

## 🎯 1. VAI TRÒ VÀ TRÁCH NHIỆM CHÍNH CỦA DE
* Xây dựng và quản lý kho tri thức (Knowledge Base) đa tenant.
* Thực thi bảo mật cấp dòng (Row-Level Security - RLS) đảm bảo không rò rỉ dữ liệu giữa các Tenant (**Zero-Leak Bar**).
* Xây dựng dịch vụ tìm kiếm vector/hybrid (`kb_search`) phục vụ `kb-retrieve` node.
* Quản lý lưu trữ nhật ký thực thi (**Trace Sink DB**) lưu vào bảng `obs.trace_events`.

---

## 📂 2. BẢNG PHÂN LOẠI VÀ VỊ TRÍ LƯU TRỮ CÁC METHOD CHO DE

| Nhóm chức năng của DE | Tên File / Đường dẫn chứa Method | Các hàm / method nhỏ tiêu biểu |
| :--- | :--- | :--- |
| **1. Dịch vụ Tìm kiếm KB & Tenant Scope** | `packages/kb/src/studio_kb/search.py` | • `search()` — Thực thi truy vấn vector + RLS tenant scope <br>• `StaticKbSearch` — Dịch vụ KB tĩnh nạp Chunks Callisto |
| **2. Đóng gói & Chuẩn hóa Tài liệu (Doc Factory)** | `packages/kb/src/studio_kb/doc_factory.py` | • `create_chunk()` — Cắt nhỏ văn bản thành các Chunks có `chunk_id` <br>• `build_doc_metadata()` |
| **3. Khung Bảo mật RLS (Tenant Wall)** | `packages/kb/src/studio_kb/rls_framework.py` | • `apply_tenant_fence()` — Móc nối RLS tenant isolation <br>• `verify_zero_leak()` |
| **4. Lưu vết Thực thi (Trace Sink)** | `packages/kb/src/studio_kb/trace_sink.py` | • `write_trace_event()` — Ghi `TraceEvent` vào DB <br>• `InMemoryTraceWriter` — Sink lưu RAM cho demo |
| **5. Cấu trúc CSDL Postgres DDL** | `docker/postgres-init/01-init.sql` & `docker/postgres-init/02-schema.sql` | Khai báo bảng `kb.documents`, `kb.chunks`, `obs.trace_events` và tiện ích `vector` (pgvector). |

---

## 🛠️ 3. MÓC NỐI GIAO THƯƠNG VỚI CÁC MẢNG KHÁC (SEAM CONTRACTS)
* **Nhận từ SWE**: `recipe.kb_binding.{kb_id, scope}` và `tenant_id` UUID.
* **Cung cấp cho AIE-1**: Hàm `kb_search.search(query, tenant, section_roles, top_k)` trả về danh sách `KbSearchResultItem`.
* **Cung cấp cho Postgres**: Lưu trữ `TraceEvent` thu thập từ `interpreter.run()`.
