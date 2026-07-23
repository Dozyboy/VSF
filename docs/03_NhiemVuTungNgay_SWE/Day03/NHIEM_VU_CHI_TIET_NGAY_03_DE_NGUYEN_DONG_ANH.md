# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ DAY 03 — DE (NGUYỄN ĐÔNG ANH)

---

## 🚘 THÔNG TIN CHUNG VỀ ISSUE DAY 03 (DE)
* **Issue ID**: `#11`
* **Tiêu đề**: `Day 3 — DE (Nguyễn Đông Anh) — Cấp kb.search stub signature (chưa có doc) để AIE-1 wiring`
* **Parent Issue**: `Day 3 — cả nhóm · Form tạo agent + interpreter 3-node hardcode, PR đầu tiên`
* **Assignee**: Nguyễn Đông Anh (`DongAnh2704`)
* **Role**: DE (Data Engineer — Phụ trách KB Pipeline, Search Stub & Doc-Factory)
* **Status**: Closed (Đã hoàn thành)

---

## 🎯 PHẦN I: TÓM TẮT MỤC TIÊU CỦA DE TRONG NGÀY 03

Trong Ngày 03, **DE (Nguyễn Đông Anh)** có 2 nhiệm vụ chính phục vụ cho luồng Wiring của cả nhóm:

1. **Cấp `kb.search` Stub Signature (Chưa có doc)**: Tạo hàm khung rỗng `kb.search` trong `packages/kb/src/studio_kb/search.py` để **AIE-1 (Trần Bá Đạt)** có thể `import` và gọi trong node `kb-retrieve`.
2. **Bắt đầu `doc-factory` 5 doc Callisto**: Khởi tạo công cụ `doc-factory` để chuẩn bị sinh ra 5 tài liệu KB Stub cho 2 tenant `ankor` và `borea`.

---

## 🔗 PHẦN II: SỰ PHỐI HỢP GIỮA DE VỚI SWE, AIE-1 VÀ AIE-2

```
                       ┌──────────────────────────────┐
                       │     DE (NGUYỄN ĐÔNG ANH)     │
                       │ 1. Khai báo kb.search stub   │
                       │ 2. Khởi tạo doc-factory      │
                       └──────────────┬───────────────┘
                                      │ Cấp signature kb.search
                                      ▼
                       ┌──────────────────────────────┐
                       │     AIE-1 (TRẦN BÁ ĐẠT)      │
                       │ Node `kb-retrieve` gọi       │
                       │ `kb.search` stub của DE      │
                       └──────────────┬───────────────┘
                                      │ Nối luồng chạy thông
                                      ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│    SWE (THIỆU QUANG MINH)    │ │     AIE-2 (LƯU TIẾN DUY)    │
│  Tạo Recipe 3-Node truyền    │ │  Phác smoke-eval runner     │
│  sang Interpreter            │ │  chờ nổ máy để so sánh       │
└──────────────────────────────┘ └──────────────────────────────┘
```

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN DÀNH CHO DE

---

### 📌 BƯỚC 1: CẤP `KB.SEARCH` STUB SIGNATURE CHO AIE-1

#### 🎯 Thao tác thực hiện trong `packages/kb/src/studio_kb/search.py`:
Khai báo signature chuẩn của hàm `kb.search` để AIE-1 không bị lỗi `ImportError`:

```python
"""
Module: studio_kb.search
Tác giả: DE (Nguyễn Đông Anh)
Mục đích: Cấp signature rỗng cho kb.search để AIE-1 wiring ở Day 3.
"""

async def search(query: str, tenant: str = "ankor", top_k: int = 3) -> list[dict]:
    """Stub signature hàm kb.search phục vụ wiring Ngày 3.

    Args:
        query (str): Câu truy vấn.
        tenant (str): Mã tenant.
        top_k (int): Số lượng kết quả trả về.

    Returns:
        list[dict]: Danh sách đoạn trích rỗng (stub tạm cho Day 3).
    """
    # Stub tạm ở Day 3 trả về danh sách rỗng để AIE-1 test wiring
    return []
```

---

### 📌 BƯỚC 2: KHỞI TẠO `DOC-FACTORY` CHO 5 TÀI LIỆU CALLISTO (2 TENANTS)

#### 🎯 Thao tác thực hiện:
Thiết kế khung `doc-factory` trong `packages/kb/src/studio_kb/doc_factory.py` để chuẩn bị sinh ra 5 tài liệu Markdown chứa YAML Frontmatter cho 2 tenant `ankor` và `borea`:

- **Tenant `ankor`**: Tài liệu quy định đổi trả & bảo mật Ankor Callisto.
- **Tenant `borea`**: Tài liệu quy trình dịch vụ Borea Callisto.

---

## 📋 PHẦN IV: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) CỦA DE

- [ ] **DoD 1**: Cấp thành công signature `kb.search` trong `studio_kb`.
- [ ] **DoD 2**: Bắt đầu dựng `doc-factory` cho 5 tài liệu Callisto.
- [ ] **DoD 3**: Mở Pull Request Day 1 (`Teach-back KB pipeline`) cho SWE review.
- [ ] **DoD 4**: Nộp báo cáo Daily Note D3 (`2026-07-22-DongAnh.md`).

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #11 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 03 (DE — Nguyễn Đông Anh)

Chào Mentor và cả nhóm, mình đã hoàn thành xong nhiệm vụ trên Issue **#11**:

#### 🟢 Các mục đã hoàn thành:
- [x] **KB Search Stub Signature**: Cấp xong signature `kb.search` trong `studio_kb` cho AIE-1 (@Trần Bá Đạt) gọi wiring.
- [x] **Doc-Factory Skeleton**: Khởi tạo khung `doc-factory` chuẩn bị sinh 5 doc Callisto cho 2 tenant `ankor`/`borea`.
- [x] **PR Teach-back**: Mở PR Day 1 cho SWE (@Thiệu Quang Minh) review.
- [x] **Daily Note**: Push file Daily Note D3 `2026-07-22-DongAnh.md`.

CC: @hieubui2049 (Mentor) / @group
```
