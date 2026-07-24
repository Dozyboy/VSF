# 📖 BÀI GIẢNG CHI TIẾT DAY 03 — SWE: FORM UI, 3-NODE RECIPE GENERATOR & WIRING

> **Vị trí phụ trách**: Software Engineer (SWE — Thiệu Quang Minh)  
> **Chủ đề chính**: Form UI Authoring, Đóng gói Recipe 3-Node Hardcode (`kb-retrieve` -> `llm-step` -> `end`), và Cross-Team Wiring  
> **Mục tiêu**: Xây dựng màn hình nhập thông tin Agent và sinh ra cấu hình Recipe JSON 3-node chuẩn để truyền sang Interpreter của AIE-1 thực thi luồng Walking-Skeleton.

---

## 🎨 1. THIẾT KẾ MÀN HÌNH FORM UI KHỞI TẠO AGENT

Trong Ngày 3, SWE triển khai màn hình Form tác giả Agent (Authoring Form) chứa các trường dữ liệu bắt buộc:

```
┌──────────────────────────────────────────────────────────┐
│                   AGENT CREATION FORM                    │
├──────────────────────────────────────────────────────────┤
│ Agent Name:     [ Agent Hỏi Đáp Callisto               ] │
│ Tenant ID:      [ ankor                              v ] │
│ Instructions:   [ Bạn là trợ lý hỗ trợ khách hàng...   ] │
│ Model Select:   [ gpt-4o                             v ] │
│ KB Scope:       [ [x] public  [x] hr  [ ] finance      ] │
│ Tools Allowed:  [ [x] kb_search  [ ] calculate_refund  ] │
├──────────────────────────────────────────────────────────┤
│                  [ GENERATE RECIPE DAG ]                 │
└──────────────────────────────────────────────────────────┘
```

---

## 🔀 2. ĐÓNG GÓI RECIPE 3-NODE DAG HARDCODE

Sau khi người dùng điền Form, Workbench tự động kết xuất thành file cấu hình `recipe.json` chứa đồ thị 3-Node DAG cơ bản:

```json
{
  "version": "1.0",
  "agent_config": {
    "agent_id": "agent-callisto-001",
    "name": "Agent Hỏi Đáp Callisto",
    "tenant_id": "ankor",
    "instructions": "Trả lời dựa trên tài liệu Callisto được cung cấp.",
    "model": "gpt-4o",
    "kb_scope": ["public", "hr"]
  },
  "start_node_id": "node_kb_1",
  "nodes": [
    {
      "id": "node_kb_1",
      "type": "kb-retrieve",
      "params": {
        "top_k": 3
      },
      "next_node": "node_llm_2"
    },
    {
      "id": "node_llm_2",
      "type": "llm-step",
      "params": {
        "temperature": 0.7
      },
      "next_node": "node_end_3"
    },
    {
      "id": "node_end_3",
      "type": "end",
      "params": {},
      "next_node": null
    }
  ]
}
```

---

## 🔗 3. LUỒNG TÍCH HỢP WIRING GIỮA SWE VÀ AIE-1

```
SWE (Form UI / Recipe Gen) ──> Sinh recipe.json ──> Truyền cho AIE-1 (Engine Interpreter)
                                                            │
                                                            ▼
                                                   Duyệt đồ thị 3 node
                                                   Node 1: Gọi kb.search (DE)
                                                   Node 2: Exec VCR LLM (AIE-1)
                                                   Node 3: Kết thúc luồng
```

### Kiểm tra tính hợp lệ trước khi truyền:
SWE phải gọi `graph_validator.validate(recipe)` để đảm bảo:
- `start_node_id` tồn tại trong mảng `nodes`.
- Mọi `next_node` trỏ tới Node ID có thật.
- Không có vòng lặp chu trình.
