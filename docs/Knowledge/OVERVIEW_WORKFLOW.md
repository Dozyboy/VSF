# TỔNG QUAN HỆ THỐNG AGENTCORE STUDIO & QUY TRÌNH PHỐI HỢP

## 1. GIỚI THIỆU DỰ ÁN
**AgentCore Studio** là một Mini-Studio cho phép 4 kỹ sư OJT (DE, SWE, AIE-1, AIE-2) cùng Mentor xây dựng một hệ thống khởi tạo, kiểm thử và phát hành các AI Agent end-to-end theo các tiêu chuẩn kỹ thuật hàng đầu.

Vòng đời 8 bước của AgentCore Studio:
1. **Form tạo Agent** (SWE — Workbench)
2. **Gắn Tool & KB Scope** (SWE — Workbench)
3. **Vẽ đồ thị Canvas DAG 6 node** (SWE — Web UI & Workbench)
4. **Test & Trace Timeline** với token/cost (AIE-1 — Engine & DE — KB Trace Sink)
5. **Fence-Proof Validation**: Kiểm tra chống rò rỉ dữ liệu tenant (`leakage = 0`) thông qua hàng rào PostgreSQL RLS (DE — KB)
6. **Eval 30-Case Golden Set**: Chấm điểm tự động qua Eval Hub, gate PASS mới cho phép Publish (AIE-2 — Evalhub & SWE — Workbench)
7. **Degrade & Rollback**: Tự động chặn và rollback phiên bản nếu đánh giá không đạt (AIE-2 & SWE)
8. **HITL-Pause**: Tạm dừng và tiếp tục chạy agent khi có phê duyệt từ con người (AIE-1 — Engine)

---

## 2. BẢNG PHÂN CÔNG VAI TRÒ & PHÂN QUYỀN (ROSTER & PERMISSIONS)

| Thành viên | GitHub Account | Package / Submodule Sở Hữu | Vai Trò & Nhiệm Vụ Chính |
|---|---|---|---|
| **SWE — Thiệu Quang Minh (BẠN)** | `Dozyboy` | `packages/workbench`<br>`apps/web` | **Sở hữu Workbench UI & Recipe Architecture**:<br>• Form UI & Canvas React Flow.<br>• Recipe Schema (Contract #1).<br>• Graph Validator (`graph_lint`).<br>• Publish / Rollback & Tenant-Wall (`INV-1`). |
| **DE — Nguyễn Đông Anh** | `DongAnh2704` | `packages/kb` | **Sở hữu KB Pipeline & Security Data RLS**:<br>• Chunking, Embedding, Indexing.<br>• Query `kb.search` qua PostgreSQL RLS.<br>• Trace Sink & Cost Table.<br>• Giữ bút Contract #2 (`kb.search`) & Contract #3 (`trace-event`). |
| **AIE-1 — Trần Bá Đạt** | `TranBaDat2607` | `packages/engine` | **Sở hữu Engine & Interpreter (Stateless)**:<br>• Interpreter execution loop duyệt DAG.<br>• 6 Node Executors (`kb-retrieve`, `llm-step`, `tool-call`, `hitl-pause`,...).<br>• Fixtures VCR cho LLM step. |
| **AIE-2 — Lưu Tiến Duy** | `dholmes0207` | `packages/evalhub` | **Sở hữu Evaluation & Scoring Harness**:<br>• Eval Harness 30 golden cases.<br>• LLM-Judge & Agreement check.<br>• Scorecard compute/render (Contract #4). |
| **Mentor (Anh Hiếu)** | `hieubui2409` | `packages/contracts`<br>`apps/studio`<br>`(repo cha)` | **Architect & Lead**:<br>• Cung cấp infra (Postgres RLS, Docker, OTel, Queue).<br>• Phê duyệt thay đổi hợp đồng frozen Pydantic contracts.<br>• Quản lý Composition Root (`apps/studio`). |
| **Antigravity AI (Tôi)** | — | — | **Trợ lý AI Pair Programmer**:<br>• Hỗ trợ bạn (SWE) và team lập trình, giải thích kiến trúc.<br>• Hướng dẫn TDD, refactor code, kiểm tra tiêu chuẩn DoD. |

---

## 3. LUỒNG CHẠY TÍCH HỢP (INTEGRATION FLOW)

```mermaid
graph TD
    WEB["Form / Canvas UI (apps/web - SWE)"] -->|1. Trả JSON AgentConfig| WB["studio_workbench (SWE)"]
    WB -->|2. Đóng gói Recipe + Validate DAG| ENG["studio_engine (AIE-1)"]
    ENG -->|3. Gọi KbSearch Protocol| KB["studio_kb (DE)"]
    KB -->|4. Lọc RLS theo tenant_id| DB[("PostgreSQL RLS (kb.chunks)")]
    ENG -->|5. Trả kết quả + Citations| EVAL["studio_evalhub (AIE-2)"]
    EVAL -->|6. Chấm 30 Golden Cases -> Verdict| WB
    WB -->|7. Gate PASS -> Publish / FAIL -> Rollback| PUB["Agent Published / Rollbacked"]
```

---

## 4. CẤU TRÚC THƯ MỤC THƯ VIỆN KNOWLEDGE (DAY DẠNG THƯ MỤC)
Mỗi ngày của từng thành viên đã được đưa vào một **Thư mục (Directory) riêng** (`Day01/`, `Day02/`, `Day03/`, `Day04/`, `Day05/`) chứa file `README.md` và sẵn sàng mở rộng thêm tài liệu/code mẫu cho từng ngày:

- `SWE_ThieuQuangMinh/`
  - `Day01/README.md`
  - `Day02/README.md`
  - `Day03/README.md`
  - `Day04/README.md`
  - `Day05/README.md`
- `DE_NguyenDongAnh/`
  - `Day01/README.md`
  - `Day02/README.md`
  - `Day03/README.md`
  - `Day04/README.md`
  - `Day05/README.md`
- `AIE1_TranBaDat/`
  - `Day01/README.md`
  - `Day02/README.md`
  - `Day03/README.md`
  - `Day04/README.md`
  - `Day05/README.md`
- `AIE2_LuuTienDuy/`
  - `Day01/README.md`
  - `Day02/README.md`
  - `Day03/README.md`
  - `Day04/README.md`
  - `Day05/README.md`
