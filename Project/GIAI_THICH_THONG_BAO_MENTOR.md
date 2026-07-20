# GIẢI THÍCH CHI TIẾT THÔNG BÁO TỪ MENTOR (DỰ ÁN AGENTCORE STUDIO)

---

## 📌 1. TÓM TẮT NHỮNG ĐIỂM CHÍNH CẦN LƯU Ý

1. **Lịch họp Q&A (2h30 chiều nay)**:
   - Anh Mentor thông báo chiều nay lúc **2h30** team sẽ họp nhanh để giải đáp thắc mắc (QA) về dự án **Agent Core**.
   - **Nhiệm vụ sáng nay của bạn**: Tự đọc đề bài, tìm hiểu cấu trúc dự án.
2. **Quy định về Báo cáo & Đề bài**:
   - Đề bài đọc tại `./docs/requirements` (tức thư mục `ai20k-batch2-requirements`).
   - Báo cáo hàng ngày ghi tại `./docs/reports` (repo `agentcore-report`).
   - Các công việc/task sẽ quản lý qua **GitHub Issues** và **PR (Pull Request)**.
3. **Hệ thống tự động chấm điểm (Evidence-based evaluation)**:
   - Mentor thiết lập hệ thống CI/CD tự động thu thập "bằng chứng": số lượng commit, trạng thái code có bị lỗi không, có chạy qua bài test không (Test Coverage), làm đúng tiến độ không (Timeline).
   - Tinh thần là: **"Nói có sách, mách có chứng"** (*Evidence-or-it-didn't-happen*) — code phải xanh CI test mới được tính là xong.
4. **Phân quyền Repo & Xác nhận thông tin**:
   - Mỗi người làm chủ repo riêng của mình (Bạn làm chủ `workbench` và `web`). Khi xong việc thì tạo **PR (Pull Request)** để người phụ trách duyệt.
   - **Cần làm ngay**: Về lại box chat của team, bấm thả emoji (icon) hoặc nhắn tin xác nhận để anh Mentor biết bạn **"đã NTT"** (*NTT = Nhận Thông Tin / Đã Rõ*).

---

## 🏗️ 2. GIẢI THÍCH CHI TIẾT CẤU TRÚC 3 TẦNG SUBMODULES

Cấu trúc dự án lồng nhau theo **3 tầng cây (Tree structure)** như sau:

```text
ai20k-roadmap-training-batch2-6weeks         (Tầng 0: Repo Root ngoài cùng)
└── agentcore-studio-kit                     (Tầng 1: Submodule trung gian gom code)
   ├── packages/contracts  → agentcore-studio-contracts (Tầng 2: Hợp đồng chung)
   ├── apps/studio         → agentcore-studio-app       (Tầng 2: FastAPI App chính)
   ├── packages/kb         → agentcore-studio-kb        (Tầng 2: Knowledge Base - DE)
   ├── packages/engine     → agentcore-studio-engine    (Tầng 2: Interpreter - AIE-1)
   ├── packages/workbench  → agentcore-studio-workbench (Tầng 2: Backend Workbench - SWE/BẠN)
   ├── packages/evalhub    → agentcore-studio-evalhub    (Tầng 2: Eval Hub - AIE-2)
   ├── apps/web            → agentcore-studio-web        (Tầng 2: Frontend Web - SWE/BẠN)
   ├── docs/requirements   → ai20k-batch2-requirements  (Tầng 2: Đề bài - Read-only)
   └── docs/reports        → agentcore-report        (Tầng 2: Nơi viết Báo cáo - TTS Write)

insight/  → grade-eval-engine (Công cụ riêng của Mentor để chấm điểm tự động, BẠN KHÔNG ĐỤNG VÀO)
```

### Chi tiết ý nghĩa từng tầng:
- **Tầng 0 — Superproject (Root)**: Thư mục lớn nhất bao bọc toàn bộ dự án.
- **Tầng 1 — Kit (`agentcore-studio-kit`)**: Thư mục đóng vai trò làm "trạm trung gian" gom cả 9 dự án con lại một chỗ.
- **Tầng 2 — 9 Submodules con**:
  - `packages/workbench` & `apps/web`: **Kho của BẠN (SWE)** để viết code.
  - `packages/contracts`: Định nghĩa data type dùng chung.
  - `docs/requirements`: Chứa tài liệu đề bài (chỉ đọc, không sửa).
  - `docs/reports`: Thư mục để bạn và các bạn thực tập sinh **nộp báo cáo hàng ngày** (bạn có quyền ghi/sửa file tại đây).
- **Cockpit standalone (`insight/`)**: Là bộ công cụ "chấm thi" riêng của Mentor. Nó hoàn toàn đứng ngoài, bạn không cần quan tâm và không được đụng vào.

---

## 🔄 3. NGUYÊN TẮC "COMMIT TỪ TRONG RA NGOÀI" (BUMP POINTER) LÀ GÌ?

Vì các thư mục nằm lồng nhau theo dạng Submodule, nên quy tắc commit code là: **"Sửa ở đâu, commit từ trong ra ngoài ở đó"**.

**Ví dụ thực tế khi bạn (SWE) sửa code:**
1. **Trong cùng (Tầng 2)**: Bạn sửa code ở `packages/workbench`. Bạn `cd packages/workbench`, gõ `git commit` và `git push` lên repo `agentcore-studio-workbench`.
2. **Tầng giữa (Tầng 1)**: Bạn lùi ra ngoài thư mục `agentcore-studio-kit`, gõ `git add packages/workbench` và `git commit` để báo cho Kit biết "con trỏ" của workbench đã được cập nhật bản mới.
3. **Tầng ngoài cùng (Tầng 0)**: Lùi ra thư mục Root, commit và push (hoặc tạo PR) lên repo chính.

---

## 📋 4. VIỆC BẠN CẦN LÀM NGAY SÁNG NAY (TRƯỚC 2H30 CHIỀU)

1. **Xác nhận tin nhắn Mentor**: Nhắn vào kênh chat của team hoặc thả emoji để thông báo mình **"Đã NTT"** (Đã nhận thông tin).
2. **Nắm vững vai trò**: Bạn là **SWE (Software Engineer)**, làm chủ 2 thư mục: `packages/workbench` (backend) và `apps/web` (frontend).
3. **Chuẩn bị tinh thần họp 2h30**: 
   - Bạn đã có đầy đủ kiến thức về kiến trúc dự án và nhiệm vụ SWE.
   - Nếu chiều nay Mentor hỏi: *"Em đã nắm được cấu trúc repo và nhiệm vụ chưa?"*, bạn hoàn toàn có thể tự tin trả lời: 
     > *"Dạ em đã nắm được cấu trúc 3 tầng Monorepo kit, vai trò của em là SWE làm chủ `workbench` (viết `graph_lint`, `tenant_wall` INV-1, `publish`/`rollback`) và `web` (Canvas React Flow & Form UI), cũng như quy trình làm việc theo roadmap ạ!"*
