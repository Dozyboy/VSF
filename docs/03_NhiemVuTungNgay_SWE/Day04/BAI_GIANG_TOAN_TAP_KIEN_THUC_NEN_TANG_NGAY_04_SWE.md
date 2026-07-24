# 📘 BÀI GIẢNG TOÀN TẬP: KIẾN THỨC NỀN TẢNG NGÀY 04 (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 📚 TỔNG QUAN KIẾN THỨC NỀN TẢNG NGÀY 04

Ngày 4 đánh dấu bước ngoặt chuyển từ **Khung xương chạy rỗng (Basic Walking Skeleton ở Day 3)** sang **Hệ thống AI Agent có kho tri thức thực tế (Knowledge-Grounded Agent)**.

Nhiệm vụ của SWE (Thiệu Quang Minh) trong Ngày 4 không chỉ đơn thuần là gán thuộc tính vào Form, mà là **hiểu sâu sắc kiến trúc Multi-Tenant Knowledge Binding, cơ chế cách ly Tenant Wall (Lớp 1), và quy trình đánh giá Citation Chunks**.

---

## 🏛️ CHƯƠNG 1: TRIẾT LÝ MULTI-TENANT KB BINDING (`kb_binding.{kb_id, scope}`)

### 1.1 Khái niệm KB Binding là gì?
Trong hệ thống AgentCore Studio:
- **Engine** là động cơ chạy chung cho tất cả các khách hàng (Multi-Tenant Engine).
- **Knowledge Base (KB)** là kho dữ liệu tri thức chứa tài liệu, văn bản, chính sách nội bộ.
- **`kb_binding`** là "chiếc cầu nối" khai báo trong Recipe, quy định rõ:
  1. `kb_id`: Mã định danh kho tri thức cụ thể (ví dụ: `kb-callisto-policies-v1`).
  2. `scope`: Phạm vi phân quyền dữ liệu (ví dụ: `tenant-ankor`, `tenant-callisto`, `public`).

```
 ┌───────────────────────────────────────────────────────────┐
 │                   FORM UI WORKBENCH (SWE)                 │
 │  • Chọn KB ID: kb-callisto-v1                             │
 │  • Chọn Scope: tenant-ankor                               │
 └─────────────────────────────┬─────────────────────────────┘
                               │ Đóng gói vào Recipe
                               ▼
 ┌───────────────────────────────────────────────────────────┐
 │                  RECIPE SCHEMA (CONTRACT #1)              │
 │  kb_binding: {                                            │
 │      "kb_id": "kb-callisto-v1",                           │
 │      "scope": "tenant-ankor"                              │
 │  }                                                        │
 └─────────────────────────────┬─────────────────────────────┘
                               │ Wiring vào Engine
                               ▼
 ┌───────────────────────────────────────────────────────────┐
 │                TENANT WALL GUARD (LAYER 1 SECURITY)       │
 │  • Kiểm tra: tenant của Agent == scope của KB?            │
 │  • Cho phép truy vấn kho KB `kb-callisto-v1`             │
 └───────────────────────────────────────────────────────────┘
```

---

### 1.2 Mối liên kết trực tiếp với Lớp 1 (Tenant Wall) từ Bài học Ngày 1
Tại Bài giảng Ngày 1, chúng ta đã học về **6 Lớp Bảo vệ (Defense-in-Depth)**. Lớp 1 chính là **Tenant Wall**:
* **Rủi ro lớn nhất trong hệ thống AI Agent doanh nghiệp**: Thất thoát dữ liệu chéo giữa các Tenant (Cross-tenant data leak). Nếu Tenant A gửi câu hỏi mà Engine lại đi tra cứu trong KB của Tenant B, đó là vi phạm bảo mật nghiêm trọng!
* **Giải pháp ở Ngày 4**: SWE đưa `scope` và `kb_id` vào trực tiếp cấu trúc `kb_binding`. Khi Node `kb-retrieve` trong Recipe kích hoạt, `tenant_wall.py` sẽ kiểm tra chéo:
```text
CheckPass = (Recipe.tenant == KbBinding.scope) OR (KbBinding.scope == "public")
```

---

## 🔍 CHƯƠNG 2: CƠ CHẾ TRÍCH DẪN & CHUNK ID (`kb.search` ➔ `chunk_id`)

### 2.1 Tại sao text thô là chưa đủ cho RAG/Agent?
Khi Agent trả lời câu hỏi dựa trên tài liệu (RAG - Retrieval-Augmented Generation), việc chỉ trả về văn bản thô không đủ để đánh giá độ tin cậy. 
Hệ thống bắt buộc phải trả về **`chunk_id`** (Mã đoạn trích dẫn cụ thể):

```json
{
    "chunk_id": "callisto-sec-003",
    "score": 0.94,
    "content": "Các truy vấn API của Tenant phải luôn đi kèm API Key hợp lệ...",
    "document": "Callisto_Security_Guide.pdf",
    "page": 12
}
```

### 2.2 Vai trò của `chunk_id` trong Đánh giá Tự động (Citation Evaluation)
* **Citation Accuracy (Độ chính xác trích dẫn)**: Đo lường xem đoạn văn bản `chunk_id` mà Agent lấy ra có đúng là đoạn chứa đáp án chuẩn hay không.
* Nếu Agent trả lời đúng nội dung nhưng lấy nhầm `chunk_id` (trích dẫn sai vị trí), điểm Citation sẽ bị trừ.

---

## 🧪 CHƯƠNG 3: NGUYÊN TẮC NHÃN TAY (GROUND TRUTH) & NDA CLEAN SYNTHETIC DATA

### 3.1 Nhãn tay (Human-labeled Ground Truth) là gì?
Để biết một bài test AI Agent thành hay bại, chuyên gia (hoặc kỹ sư) phải tạo sẵn bộ dữ liệu mẫu gồm 3 thành phần:
1. **Input Query**: Câu hỏi người dùng.
2. **Expected Ground Truth Answer**: Đáp án chuẩn do người gán nhãn viết.
3. **Expected Citation `chunk_id`**: Mã đoạn trích dẫn chuẩn chứa thông tin.

### 3.2 Chuẩn NDA Clean & Callisto Synthetic Dataset
Trong môi trường phát triển phần mềm doanh nghiệp:
* **Tài liệu thật của khách hàng**: Chứa bí mật kinh doanh, dữ liệu cá nhân (PII), thông tin nhạy cảm. Tuyệt đối KHÔNG đưa vào codebase hoặc git repository công khai.
* **Tập dữ liệu Synthetic (Tạo mới NDA Clean)**: Tạo ra một công ty giả tưởng đặt tên là **Callisto Synthetic Corp**, viết các bộ quy trình/chính sách giả định nhưng có cấu trúc và thuật ngữ y hệt tài liệu thật.

---

## 📊 CHƯƠNG 4: BẢNG ĐIỂM IN CLI (SMOKE-EVAL SCORECARD)

Đầu ra của Ngày 4 đòi hỏi một bảng điểm in trực tiếp ra CLI với đúng 5 dòng tương ứng với 5 test case:

```
======================================================================
📊 BẢNG ĐIỂM KẾT QUẢ SMOKE-EVAL DAY 04 (CALLISTO SYNTHETIC)
======================================================================
CASE ID    | STATUS     | CITATION CHUNK ID         | MATCH   
----------------------------------------------------------------------
Case_01    | SUCCESS    | callisto-ret-chunk-001    | PASS    
Case_02    | SUCCESS    | callisto-sec-chunk-003    | PASS    
Case_03    | SUCCESS    | callisto-sla-chunk-002    | PASS    
Case_04    | SUCCESS    | callisto-iam-chunk-005    | PASS    
Case_05    | SUCCESS    | callisto-api-chunk-004    | PASS    
======================================================================
🎯 ĐÁNH GIÁ CHUNG: 5/5 Cases PASSED (100%)
======================================================================
```

---

## 💡 TỔNG KẾT BÀI GIẢNG DAY 04
Ngày 4 đưa SWE đến năng lực **đóng gói cấu hình kho tri thức có phân quyền Multi-Tenant**, làm tiền đề vững chắc cho Ngày 5 khi toàn bộ nhóm ghép luồng hoàn chỉnh chuẩn bị cho buổi Gate Review!
