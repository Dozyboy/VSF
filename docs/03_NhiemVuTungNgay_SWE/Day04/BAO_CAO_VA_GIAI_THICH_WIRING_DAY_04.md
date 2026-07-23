# 📑 BÁO CÁO PHÂN TÍCH VÀ FIX LỖI WIRING DAY 04 (SWE — THIỆU QUANG MINH)

---

## 📌 1. NGUYÊN NHÂN NGHẼN CHUỖI (SWE -> AIE-1 -> DE)

Khi chạy chuỗi tích hợp end-to-end Ngày 4:
- Node `kb-retrieve` gọi `kb.search` trả về danh sách rỗng `[]` (fail-closed bảo mật).

### 🔍 Phân tích mã nguồn thực tế:
1. **Phía Workbench (`agentcore-studio-workbench/src/studio_workbench/builder_d4.py`):**
   * Đã gắn đúng `kb_binding = KbBinding(kb_id="kb-callisto-v1", scope="ankor/public")` trên `Recipe`.
   * Nhưng Node `n1` (`NodeType.KB_RETRIEVE`) chỉ truyền `params={"query": "Callisto security policy"}` ➔ **Thiếu `tenant` và `section_roles` trong `node.params`**.

2. **Phía Engine (`agentcore-studio-engine/src/studio_engine/executors.py`):**
   * `KbRetrieveExecutor` của AIE-1 (bạn Đạt) bóc `tenant` và `section_roles` trực tiếp từ `node.params`.
   * Do `node.params` không có `tenant` và `section_roles`, `KbRetrieveExecutor` nhận `section_roles = []`.
   * Hàm `kb.search` của DE kích hoạt cơ chế **fail-closed** và trả về rỗng `[]`.

---

## 📌 2. SO SÁNH GIỮA KẾ HOẠCH BÀI GIẢNG VÀ THỰC TẾ TRIỂN KHAI

| Tiêu chí | Kế hoạch ban đầu (Tài liệu Spec D4) | Thực tế triển khai của Đạt (AIE-1) |
| :--- | :--- | :--- |
| **Cách đọc Scope** | Spec ban đầu dự kiến AIE-1 sẽ tự đọc `recipe.kb_binding.scope` từ đối tượng `Recipe`. | Đạt viết `KbRetrieveExecutor` tuân thủ Protocol `NodeExecutor(node: Node)` (chỉ nhận `node`, không nhận `recipe`), nên Đạt đọc từ `node.params`. |
| **Wiring Engine** | Engine (`interpreter.run`) tự trích `recipe.kb_binding` đẩy xuống `node.params`. | Đạt chưa viết logic trích xuất này trong `interpreter.py`, dẫn đến `node.params` bị thiếu dữ liệu. |

---

## 📌 3. ĐÁNH GIÁ TÌNH TRẠNG CỦA CÁC THÀNH VIÊN TRONG NHÓM

1. **AIE-1 (Trần Bá Đạt):** 
   * **Đã làm:** Hoàn thành `KbRetrieveExecutor` nối `kb.search` thật và `LlmStepExecutor` trích `chunk_id`.
   * **Chưa thông:** Đạt chưa xử lý khâu bóc tách `recipe.kb_binding` đẩy vào `node.params` mà kỳ vọng dữ liệu này có sẵn từ Workbench.
2. **DE (Nguyễn Đông Anh):** 
   * **Đã làm:** Hoàn thành `kb.search` thật với RLS Fence-DATA, nhận `section_roles: list[str]`. Đã chạy đúng fail-closed khi `section_roles=[]`.
3. **AIE-2 (Lưu Tiến Duy):** 
   * **Đã làm:** Đang đợi chuỗi SWE → AIE-1 → DE thông suốt để chạy Smoke-Eval chấm điểm 5 dòng CLI.
4. **SWE (Thiệu Quang Minh - Bạn):** 
   * **Đã sửa:** Đã cập nhật `create_recipe_d4` trong Workbench bóc tách `scope="ankor/public"` thành `tenant="ankor"` và `section_roles=["public"]` nhét trực tiếp vào `node.params` của Node `KB_RETRIEVE`.
   * **Đã sửa:** Cập nhật 2 file test wiring (`test_wiring_d3.py` và `test_wiring_d4.py`) chạy xanh với signature mới của `interpreter.run()`.

---

## 🛠️ 4. CHẮC CHẮN CODE ĐÃ ĐƯỢC FIX TRONG WORKBENCH

File `agentcore-studio-workbench/src/studio_workbench/builder_d4.py` đã được cập nhật:

```python
# Extract tenant and section_roles from scope ("ankor/public")
if "/" in scope:
    tenant_from_scope, roles_part = scope.split("/", 1)
    section_roles = [r.strip() for r in roles_part.split(",") if r.strip()]
else:
    tenant_from_scope = tenant
    section_roles = [scope] if scope else ["public"]

nodes = [
    Node(
        id="n1",
        type=NodeType.KB_RETRIEVE,
        params={
            "query": "Callisto security policy",
            "tenant": tenant_from_scope,
            "section_roles": section_roles,
            "top_k": 3,
        },
    ),
    # ...
]
```

---
*Ngày lưu: 23/07/2026 — SWE Thiệu Quang Minh*
