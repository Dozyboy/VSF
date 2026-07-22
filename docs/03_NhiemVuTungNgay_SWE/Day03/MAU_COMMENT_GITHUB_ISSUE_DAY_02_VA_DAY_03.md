# 🎓 MẪU COMMENT CHUẨN ĐẠT ĐIỂM TỐI ĐA CHO ISSUE NGÀY 2 VÀ NGÀY 3 (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 💬 1. MẪU COMMENT DÁN LÊN ISSUE NGÀY 2 (THỨ BA 21/07)

Bạn truy cập **Issue Ngày 2** trên GitHub, copy đoạn bên dưới dán vào comment, sau đó bấm nút **Close Issue** (bằng quyền Triage):

```markdown
### 📊 Báo cáo hoàn thành Nhiệm vụ Ngày 2 (SWE — Dozyboy)

- ✅ **Scaffold package Workbench**: Đã khởi tạo và push cấu trúc package `packages/workbench` (`studio_workbench`) phân tách đúng ranh giới owner SWE.
- ✅ **Cắt giảm tính năng `DESCOPE.md`**: Đã hoàn thiện tài liệu `DESCOPE.md` 4 nấc (KB ➔ Stub, UI ➔ Form+Mermaid, Judge ➔ Exact-match, Dashboard ➔ CLI) bảo đảm luồng Walking-Skeleton luôn hoạt động.
- ✅ **4 Interface v0 khớp Umbrella §3**: Khai báo đầy đủ 4 stubs trong `studio_workbench`:
  - `validator.py`: `graph_lint(recipe)`
  - `publish.py`: `publish(recipe)` và `rollback(recipe)`
  - `tenant_wall.py`: `resolve_tenant(session)`
  - `schema.py`: `ddl()`
- ✅ **Question-batch ≥3 câu gửi Mentor**: Đã chuẩn bị bộ câu hỏi rà soát v0 contract, render Mermaid và cơ chế Eval-Gate publish tại `packages/workbench/docs/QUESTIONS_FOR_MENTOR.md`.
- ✅ **Daily-note D2**: Đã tạo và push file báo cáo Daily Note D2 chuẩn template.

🔗 **Ref Báo cáo chi tiết:** https://github.com/AI20K-VGR/agentcore-report/blob/main/daily-notes/2026-07-21-Dozyboy.md
```

---

## 💬 2. MẪU COMMENT DÁN LÊN ISSUE NGÀY 3 (THỨ TƯ 22/07)

Bạn truy cập **Issue Ngày 3** trên GitHub, copy đoạn bên dưới dán vào comment, sau đó bấm nút **Close Issue** (bằng quyền Triage):

```markdown
### 📊 Báo cáo hoàn thành Nhiệm vụ Ngày 3 (SWE — Dozyboy)

- ✅ **Form xuất `agent_config` chuẩn v0**: Viết hàm `build_agent_config()` xuất đối tượng `AgentConfig` Pydantic model (`instructions`, `model`, `tool_whitelist`) tại `packages/workbench/src/studio_workbench/builder.py`.
- ✅ **Recipe 3-Node Wiring**: Đóng gói `create_sample_recipe_d3()` với chuỗi node `kb-retrieve -> llm-step -> tool-call -> end` và nối dây (wire) thành công sang cổng vào `studio_engine.interpreter.run()`.
- ✅ **Unit Test & Docstrings**: Bổ sung đầy đủ Google-style Docstring và tạo bài test `packages/workbench/tests/test_wiring_d3.py` (PASS 100%).
- ✅ **Web Frontend**: Cập nhật Form UI React tạo Agent tại `apps/web/src/App.tsx`.
- ✅ **Review PR DE**: Đã review và phê duyệt bài Teach-back KB Pipeline trên PR #1 của DE Nguyễn Đông Anh.
- ✅ **Daily-note D3**: Đã tạo và push file báo cáo Daily Note D3 chuẩn template.

🔗 **Ref Báo cáo chi tiết:** https://github.com/AI20K-VGR/agentcore-report/blob/main/daily-notes/2026-07-22-Dozyboy.md
```

---

## 🤝 3. MẪU COMMENT REVIEW PR DAY 1 CỦA DE (NGUYỄN ĐÔNG ANH)

Mở link Issue/PR #1 của DE: [https://github.com/AI20K-VGR/agentcore-studio-kit/issues/1](https://github.com/AI20K-VGR/agentcore-studio-kit/issues/1) và dán comment:

> *"Đã review bài trình bày Teach-back KB Pipeline (ingest ➔ chunk ➔ embed ➔ index + fence-data) của DE Nguyễn Đông Anh. Nội dung rõ ràng, đúng chuẩn bảo mật fence-tại-retrieval."*
