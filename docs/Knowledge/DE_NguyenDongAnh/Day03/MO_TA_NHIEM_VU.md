# 🎯 MÔ TẢ NHIỆM VỤ DAY 03 — DE (NGUYỄN ĐÔNG ANH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#11`
* **Tiêu đề**: `Day 3 — DE (Nguyễn Đông Anh) — Cấp kb.search stub signature (chưa có doc) để AIE-1 wiring`
* **Vị trí**: Data Engineer (DE)
* **Status**: Closed / Complete

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Dự thảo Contract #2 v0 (`kb-search.v0.md`).
- Yêu cầu signature từ AIE-1 để viết node `kb-retrieve`.

### 🔹 Deliverables / Output phải bàn giao:
1. File `packages/kb/src/studio_kb/search.py` chứa stub signature `async def search(...)`.
2. File `packages/kb/src/studio_kb/doc_factory.py` khung công cụ sinh tài liệu Callisto.
3. Mở Pull Request bài Teach-back Day 1 cho SWE (`Dozyboy`) review.
4. File Daily Note D3 (`agentcore-report/daily-notes/2026-07-22-DongAnh2704.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Khai báo `kb.search` Stub Signature
Sửa file `packages/kb/src/studio_kb/search.py`:

```python
"""
Module: studio_kb.search
Tác giả: DE (Nguyễn Đông Anh)
Mục đích: Cấp signature rỗng cho kb.search để AIE-1 wiring ở Day 3.
"""

async def search(
    query: str,
    tenant: str = "ankor",
    section_roles: list[str] | None = None,
    top_k: int = 3
) -> list[dict]:
    """Stub signature hàm kb.search phục vụ wiring Ngày 3.

    Args:
        query (str): Câu truy vấn.
        tenant (str): Mã tenant (ankor / borea).
        section_roles (list[str]): Vai trò truy cập.
        top_k (int): Số đoạn chunk trả về.

    Returns:
        list[dict]: Danh sách đoạn trích rỗng (stub tạm cho Day 3).
    """
    # Stub tạm ở Day 3 trả về danh sách rỗng để AIE-1 test wiring
    return []
```

---

### 📌 Bước 2: Dựng bộ khung `doc-factory` cho 5 tài liệu Callisto
Tạo file `packages/kb/src/studio_kb/doc_factory.py`:

```python
"""
Module: studio_kb.doc_factory
Mục đích: Khởi tạo khung sinh tài liệu Callisto cho 2 tenant ankor & borea.
"""

class DocFactory:
    def __init__(self, seed_dir: str = "data/seed"):
        self.seed_dir = seed_dir

    def get_seed_documents() -> list[dict]:
        """Danh sách metadata 5 tài liệu Callisto seed."""
        return [
            {"doc_id": "ankor-hr-v1", "tenant": "ankor", "section_role": "hr"},
            {"doc_id": "ankor-refund-v2", "tenant": "ankor", "section_role": "public"},
            {"doc_id": "ankor-eng-spec", "tenant": "ankor", "section_role": "engineering"},
            {"doc_id": "borea-guide-v1", "tenant": "borea", "section_role": "public"},
            {"doc_id": "borea-finance-q2", "tenant": "borea", "section_role": "finance"},
        ]
```

---

### 📌 Bước 3: Mở PR & Push Daily Note D3
```bash
git add packages/kb/src/studio_kb/
git commit -m "feat(kb): provide kb.search stub signature and doc-factory skeleton"
git push origin feature/day-03-de
```
Mở PR trên GitHub và gán reviewer là SWE (`Dozyboy`).

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Cấp signature `kb.search` đúng tham số và kiểu trả về trong `studio_kb/search.py`.
- [ ] Khởi tạo xong `doc_factory.py` chứa danh sách 5 doc Callisto seed.
- [ ] Mở PR Day 1 Teach-back thành công.
- [ ] Push file Daily Note D3 lên repo.

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

CC: @hieubui2409 (Mentor) / @group
```
