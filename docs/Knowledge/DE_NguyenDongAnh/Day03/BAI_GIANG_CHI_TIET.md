# 📖 BÀI GIẢNG CHI TIẾT DAY 03 — DE: STUB SIGNATURES & SYNTHETIC DOC-FACTORY

> **Vị trí phụ trách**: Data Engineer (DE — Nguyễn Đông Anh)  
> **Chủ đề chính**: Kỹ thuật Stub Signature cho Cross-Team Wiring, và Thiết kế Synthetic Doc-Factory  
> **Mục tiêu**: Cấp chữ ký hàm rỗng (`kb.search` stub) ngay lập tức để AIE-1 (Engine) không bị block khi nối luồng chạy thử 3-node DAG ở Day 3.

---

## 🔌 1. NGUYÊN LÝ CROSS-TEAM WIRING BẰNG STUB SIGNATURES

Trong lập trình Agile/Scrum theo phương pháp **Walking-Skeleton**, các thành viên không chờ đợi nhau hoàn thiện 100% tính năng mới bắt đầu kết nối tích hợp.

### Sơ đồ phối hợp Wiring Ngày 3:
```
┌────────────────────────────────┐
│      DE (NGUYỄN ĐÔNG ANH)      │
│  Cấp signature kb.search stub  │
└───────────────┬────────────────┘
                │ Cấp import path: studio_kb.search.search
                ▼
┌────────────────────────────────┐
│      AIE-1 (TRẦN BÁ ĐẠT)       │
│  Node `kb-retrieve` gọi        │
│  `kb.search` stub trả về []    │
└───────────────┬────────────────┘
                │ Nối luồng 3-node chạy thông
                ▼
┌────────────────────────────────┐
│     SWE (THIỆU QUANG MINH)     │
│  Tạo Recipe 3-Node truyền      │
│  sang Interpreter runner       │
└────────────────────────────────┘
```

### Tại sao phải tạo Stub Signature rỗng?
Nếu DE chưa viết DB Vector Search thật mà AIE-1 đã cần `import` hàm `search` để viết Node Executor `kb-retrieve`, AIE-1 sẽ gặp lỗi `ModuleNotFoundError` hoặc `ImportError`.
👉 **Giải pháp**: DE cấp một hàm rỗng (`stub signature`) khớp 100% tên tham số và kiểu dữ liệu trả về, trả về danh sách rỗng `[]` để AIE-1 import và test luồng gọi hàm thành công.

---

## 🏭 2. THIẾT KẾ SYNTHETIC DOC-FACTORY CHO 5 TÀI LIỆU CALLISTO

Bộ dữ liệu tri thức thử nghiệm **Callisto** gồm 5 tài liệu Markdown thuộc 2 tenant riêng biệt:

### Cấu trúc 5 tài liệu Callisto Seed:
1. `ankor_hr_policy_v1.md` (Tenant: `ankor`, Role: `hr`) — Quy định nghỉ phép & phúc lợi Ankor.
2. `ankor_refund_terms_v2.md` (Tenant: `ankor`, Role: `public`) — Điều khoản hoàn tiền Ankor.
3. `ankor_engineering_spec.md` (Tenant: `ankor`, Role: `engineering`) — Quy chuẩn kỹ thuật nội bộ.
4. `borea_service_guide_v1.md` (Tenant: `borea`, Role: `public`) — Hướng dẫn dịch vụ Borea.
5. `borea_finance_report_q2.md` (Tenant: `borea`, Role: `finance`) — Báo cáo tài chính Borea.

### Thiết kế `doc_factory.py`:
Công cụ `doc-factory` tự động đọc các file nguyên mẫu trong thư mục seed, kiểm tra tính hợp lệ của Frontmatter, và sinh ra dữ liệu chuẩn cho pipeline nạp dữ liệu ở Day 4.

```python
# Cấu trúc skeleton doc_factory.py
def load_callisto_docs(seed_dir: str) -> list[dict]:
    """Đọc và parse YAML frontmatter của các tài liệu Callisto seed."""
    docs = []
    # Logic parse markdown + frontmatter...
    return docs
```

---

## ⚠️ 3. CÁC LỖI THƯỜNG GẶP KHI TẠO STUB SIGNATURE

1. **Sai kiểu dữ liệu trả về**: Trả về `None` hoặc `dict` thay vì `list[dict]` làm node `kb-retrieve` của AIE-1 bị crash `TypeError`.
2. **Thiếu keyword argument default**: Không đặt giá trị mặc định cho `tenant="ankor"` hoặc `top_k=3` làm hỏng các lời gọi hàm ngắn.
3. **Không đồng bộ module path**: Đặt hàm trong `packages/kb/src/studio_kb/search.py` nhưng export sai trong `__init__.py`.
