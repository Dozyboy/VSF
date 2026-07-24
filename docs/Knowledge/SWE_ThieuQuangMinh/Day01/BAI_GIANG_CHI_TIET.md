# 📖 BÀI GIẢNG CHI TIẾT DAY 01 — SWE: ENGINE VS. RECIPE BOUNDARY & WORKBENCH ARCHITECTURE

> **Vị trí phụ trách**: Software Engineer (SWE — Thiệu Quang Minh)  
> **Chủ đề chính**: Ranh giới Engine | Recipe, Kiến trúc Workbench, Recipe Schema và Graph Linting  
> **Mục tiêu**: Nắm vững ranh giới giữa Động cơ thực thi lõi (Engine) và File công thức cấu hình (Recipe) để xây dựng hệ thống tác vụ linh hoạt không cần sửa code lõi.

---

## 🏛️ 1. RANH GIỚI CỐT LÕI: ENGINE VS. RECIPE (BOUNDARY MADE LITERAL)

Khái niệm quan trọng nhất của toàn bộ hệ thống AgentCore Studio mà SWE phải nắm vững là việc phân tách rạch ròi giữa **Engine** và **Recipe**:

```
┌─────────────────────────────────────────────────────────────┐
│                    WORKBENCH UI (SWE)                       │
│  Tạo Form / Canvas Web UI -> Đóng gói thành file Recipe JSON │
└──────────────────────────────┬──────────────────────────────┘
                               │ Recipe Schema (Contract #1)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   STUDIO ENGINE (AIE-1)                     │
│  Interpreter duyệt đồ thị DAG trong Recipe -> Thực thi      │
└─────────────────────────────────────────────────────────────┘
```

### So sánh Engine và Recipe:

| Tiêu chí | Engine (Động cơ thực thi lõi) | Recipe (File công thức khai báo) |
|---|---|---|
| **Bản chất** | Mã nguồn Python thực thi (`packages/engine`) | File cấu hình JSON/YAML (`recipe.json`) |
| **Quyền sở hữu** | AIE-1 (Trần Bá Đạt) | SWE (Thiệu Quang Minh — Workbench) |
| **Tần suất thay đổi** | Cố định, viết 1 lần (Stateless Interpreter) | Thay đổi liên tục theo use-case người dùng |
| **Chứa logic nghiệp vụ?** | **TUYỆT ĐỐI KHÔNG**. Không chứa thông tin tenant cụ thể | **CÓ**. Chứa instructions, node wiring, KB scope |

### Cạm bẫy thiết kế (Anti-Pattern):
- **Lỗi Hardcode**: Sửa code Python trong Engine để phục vụ một yêu cầu riêng của khách hàng (ví dụ: `if tenant == 'ankor': return ...`).
- **Giải pháp chuẩn**: Toàn bộ logic đó phải được khai báo dưới dạng tham số trong file **Recipe** do Workbench sinh ra.

---

## 🎨 2. KIẾN TRÚC WORKBENCH UI VÀ DỰ PHÒNG (FALLBACK ARCHITECTURE)

Mảng Workbench do SWE làm chủ bao gồm 2 thành phần chính:
1. `apps/web`: Web Frontend (React Flow Canvas + Form UI).
2. `packages/workbench`: Backend Python đóng gói Recipe & Graph Validation.

### Nguyên lý thiết kế Fallback 3 Nấc:
Nếu giao diện kéo thả React Flow gặp sự cố kỹ thuật hoặc chưa hoàn thiện, SWE phải đảm bảo 2 phương án dự phòng hoạt động mượt mà:
- **Bậc 1 (Kéo thả Canvas)**: React Flow UI hiển thị các node và dây nối.
- **Bậc 2 (Form điền)**: Form UI truyền thống điền tên Node, Type, và Next Node ID.
- **Bậc 3 (Text Mermaid)**: Nhập đoạn mã sơ đồ Mermaid.js tĩnh để biên dịch thành Recipe JSON.

---

## 🔍 3. LÝ THUYẾT GRAPH VALIDATOR & GRAPH LINT

Trước khi gửi Recipe JSON cho Engine thực thi, Workbench phải chạy bộ kiểm tra **`graph_lint`** để phát hiện các lỗi đồ thị:

1. **Disconnected Nodes**: Phát hiện các node cô lập không có đường nối từ Start node.
2. **Cycle Detection**: Sử dụng thuật toán DFS (Depth-First Search) để phát hiện vòng lặp vô hạn (chu trình) trong đồ thị DAG.
3. **Invalid Node Types**: Đảm bảo toàn bộ node thuộc **6 loại node đóng** (`kb-retrieve`, `llm-step`, `condition`, `tool-call`, `hitl-pause`, `end`).
