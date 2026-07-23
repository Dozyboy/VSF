# 📑 HƯỚNG DẪN CHI TIẾT NHIỆM VỤ DAY 04 — DE (NGUYỄN ĐÔNG ANH)

---

## 🚘 THÔNG TIN CHUNG VỀ ISSUE DAY 04 (DE)
* **Issue ID**: `#16`
* **Tiêu đề**: `Day 4 — DE (Nguyễn Đông Anh) — Bút doc-factory KB stub 5 doc (frontmatter tenant/section) + kb.search thô (cited chunks, filter tenant naive); golden 5 case sinh từ chính doc-factory + nhãn tay (1 script, 2 deliverable)`
* **Parent Issue**: `Day 4 — cả nhóm · KB stub 5 doc + kb.search thô + smoke-eval bảng điểm`
* **Assignee**: Nguyễn Đông Anh (`DongAnh2704`)
* **Role**: DE (Data Engineer — Phụ trách KB Pipeline, Doc-Factory & Search API)
* **Labels**: `day-04`, `role:de`
* **Milestone**: `Sprint 1 — Gate Day 10`

---

## 🎯 PHẦN I: TÓM TẮT MỤC TIÊU CỦA DE TRONG NGÀY 04

Trong Ngày 4, **DE (Nguyễn Đông Anh)** giữ vai trò cung cấp dữ liệu nền tảng cho cả nhóm:

1. **Bút `doc-factory` tạo 5 tài liệu KB Stub**: Dùng công cụ `doc-factory` sinh ra 5 tài liệu chuẩn Callisto synthetic NDA clean có gắn frontmatter chứa metadata (`tenant`, `section`).
2. **Viết API `kb.search` thô (Cited Chunks & Naive Tenant Filter)**: Xây dựng hàm `kb.search` lọc dữ liệu theo tenant cơ bản, trả về danh sách các đoạn trích dẫn có chứa thuộc tính **`chunk_id`** để chấm điểm trích dẫn.
3. **Bộ Golden 5 Cases có nhãn tay (Human-labeled Ground Truth)**: Sinh 5 câu hỏi/đáp mẫu từ chính `doc-factory` và gắn nhãn tay (Ground Truth `chunk_id`) để AIE-2 dùng chấm điểm.

---

## 🔗 PHẦN II: SỰ PHỐI HỢP GIỮA DE VỚI SWE, AIE-1 VÀ AIE-2

```
                               ┌──────────────────────────────┐
                               │     DE (NGUYỄN ĐÔNG ANH)     │
                               │ 1. Tạo 5 KB docs (doc-factory)│
                               │ 2. Cung cấp API kb.search    │
                               │ 3. Tạo Golden 5 cases        │
                               └──────────────┬───────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │ Cung cấp API kb.search                            │ Cung cấp Golden 5 Cases
                    ▼                                                   ▼
┌───────────────────────────────────────┐             ┌───────────────────────────────────┐
│        AIE-1 (TRẦN BÁ ĐẠT)            │             │        AIE-2 (LƯU TIẾN DUY)       │
│ Node `kb-retrieve` gọi `kb.search`    │             │ So sánh actual với expected       │
│ của DE để lấy `chunk_id`              │             │ từ Golden 5 cases của DE          │
└───────────────────▲───────────────────┘             └───────────────────────────────────┘
                    │ Truyền kb_binding
┌───────────────────┴───────────────────┐
│       SWE (THIỆU QUANG MINH)          │
│ Khai báo kb_binding.{kb_id, scope}    │
└───────────────────────────────────────┘
```

---

## 🚀 PHẦN III: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN DÀNH CHO DE

---

### 📌 BƯỚC 1: XÂY DỰNG `DOC-FACTORY` TẠO 5 TÀI LIỆU KB STUB (FRONTMATTER METADATA)

#### 🎯 Thao tác thực hiện:
Tạo script `packages/kb/src/studio_kb/doc_factory.py` sinh ra 5 tài liệu Markdown chứa YAML Frontmatter:

```markdown
---
doc_id: doc-callisto-001
tenant: tenant-ankor
section: security_policy
title: Quy định Bảo mật Dữ liệu Callisto
---

# Quy định Bảo mật Dữ liệu Callisto
Hệ thống Callisto quy định mọi dữ liệu lưu trữ của Tenant phải được mã hóa theo chuẩn AES-256...
```

---

### 📌 BƯỚC 2: VIẾT API `KB.SEARCH` THÔ TRẢ VỀ `CHUNK_ID` CÓ LỌC TENANT

#### 🎯 Thao tác thực hiện trong `packages/kb/src/studio_kb/search.py`:
```python
"""
Module: studio_kb.search
Tác giả: DE (Nguyễn Đông Anh)
Mục đích: Cung cấp API tìm kiếm tri thức thô trả về chunk_id cho AIE-1.
"""

async def search(query: str, kb_id: str, scope: str, top_k: int = 3) -> list[dict]:
    """Tìm kiếm đoạn trích dẫn từ kho KB theo scope tenant.

    Args:
        query (str): Câu hỏi tìm kiếm.
        kb_id (str): Mã kho tri thức.
        scope (str): Tenant scope để lọc quyền (Tenant Wall).
        top_k (int): Số lượng kết quả trả về.

    Returns:
        list[dict]: Danh sách chunks chứa chunk_id, content và score.
    """
    # 1. Lọc tài liệu theo Tenant Scope (filter tenant naive)
    # 2. Khớp từ khóa đơn giản để tìm ra đoạn trích phù hợp
    # 3. Trả về đối tượng trích dẫn chứa chunk_id bắt buộc
    return [
        {
            "chunk_id": "callisto-sec-chunk-003",
            "content": "Dữ liệu lưu trữ bắt buộc mã hóa theo chuẩn AES-256.",
            "score": 0.95,
            "tenant": scope
        }
    ]
```

---

### 📌 BƯỚC 3: TẠO BỘ GOLDEN 5 CASES CÓ NHÃN TAY (GROUND TRUTH)

#### 🎯 Thao tác thực hiện trong `packages/kb/src/studio_kb/golden_dataset.py`:
Tạo danh sách 5 câu test mẫu có gắn nhãn tay `expected_chunk_id` và `expected_answer` phục vụ AIE-2 làm Smoke-Eval.

---

## 📋 PHẦN IV: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST) CỦA DE

- [ ] **DoD 1**: Sinh 5 tài liệu KB Stub chuẩn Callisto synthetic NDA clean có frontmatter `tenant` / `section`.
- [ ] **DoD 2**: Hoàn thiện hàm `kb.search` trả về danh sách có chứa `chunk_id` và lọc `tenant` naive.
- [ ] **DoD 3**: Sinh 5 Golden Test Cases có gán nhãn tay (Ground truth citation).
- [ ] **DoD 4**: Phối hợp cùng AIE-1 và AIE-2 chạy thử nghiệm luồng tra cứu `kb.search`.
- [ ] **DoD 5**: Nộp báo cáo Daily Note D4 của DE (`2026-07-23-DongAnh.md`).

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #16 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 04 (DE — Nguyễn Đông Anh)

Chào Mentor và cả nhóm, mình đã hoàn thành xong nhiệm vụ trên Issue **#16**:

#### 🟢 Các mục đã hoàn thành:
- [x] **Doc-Factory**: Dùng `doc-factory` sinh 5 tài liệu Callisto Synthetic KB Stub chứa frontmatter (`tenant`, `section`).
- [x] **KB Search API**: Viết hàm `kb.search` thô hỗ trợ `filter tenant naive` và trả về `chunk_id` cho AIE-1 (@Trần Bá Đạt).
- [x] **Golden 5 Cases**: Tạo bộ 5 câu test mẫu gán nhãn tay (Ground truth citation) giao cho AIE-2 (@Lưu Tiến Duy).
- [x] **Smoke-Eval**: Phối hợp cả nhóm chạy thông luồng 5 dòng CLI đạt 5/5 PASSED.
- [x] **Daily Note**: Push file Daily Note `2026-07-23-DongAnh.md`.

CC: @hieubui2049 (Mentor) / @group
```
