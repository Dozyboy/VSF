# 🗺️ TỔNG HỢP HƯỚNG DẪN CẤU TRÚC MÃ NGUỒN & VỊ TRÍ HÀM CHO CẢ 4 MẢNG DỰ ÁN VSF

> **Tài liệu tổng quan:** Bản đồ phân công vị trí hàm/method cho 4 thành viên trong nhóm (SWE, DE, AIE-1, AIE-2) để đảm bảo không ai bị giẫm chân lên code của nhau.

---

## 📌 BẢNG TỔNG QUAN PHÂN CÔNG 4 VỊ TRÍ (4 QUADRANTS)

```text
                     ┌──────────────────────────────────────────┐
                     │          WORKBENCH & WEB UI              │
                     │          (SWE — Thiệu Quang Minh)        │
                     └────────────────────┬─────────────────────┘
                                          │ Recipe JSON
                                          ▼
┌───────────────────────────────────┐           ┌───────────────────────────────────┐
│       KNOWLEDGE BASE & DATA       │           │          INTERPRETER ENGINE       │
│      (DE — Nguyễn Đông Anh)       │◀─────────►│         (AIE-1 — Trần Bá Đạt)     │
└───────────────────────────────────┘           └─────────────────┬─────────────────┘
                                                                  │ RunResult
                                                                  ▼
                                                ┌───────────────────────────────────┐
                                                │         EVALHUB & SCORECARD       │
                                                │        (AIE-2 — Lưu Tiến Duy)     │
                                                └───────────────────────────────────┘
```

---

## 📚 CHI TIẾT HƯỚNG DẪN TỪNG MẢNG

1. 🟢 **SWE (Software Engineer — Thiệu Quang Minh)**:
   * **Chi tiết:** [docs/03_NhiemVuTungNgay_SWE/HUONG_DAN_CAU_TRUC_FUNCTION_SWE.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/03_NhiemVuTungNgay_SWE/HUONG_DAN_CAU_TRUC_FUNCTION_SWE.md)
   * **Nhiệm vụ:** Form UI, Recipe Builder (`builder_d4.py`), Graph Validator (`validator.py`), Cổng xuất bản (`publish_manager.py`).

2. 🔵 **DE (Data Engineer — Nguyễn Đông Anh)**:
   * **Chi tiết:** [docs/HUONG_DAN_CAU_TRUC_FUNCTION_DE.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/HUONG_DAN_CAU_TRUC_FUNCTION_DE.md)
   * **Nhiệm vụ:** Dịch vụ tìm kiếm tri thức (`search.py`), Bảo mật RLS Tenant (`rls_framework.py`), Doc Factory (`doc_factory.py`), Lưu vết Postgres (`trace_sink.py`).

3. 🟣 **AIE-1 (AI Engine Engineer — Trần Bá Đạt)**:
   * **Chi tiết:** [docs/HUONG_DAN_CAU_TRUC_FUNCTION_AIE1.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/HUONG_DAN_CAU_TRUC_FUNCTION_AIE1.md)
   * **Nhiệm vụ:** Động cơ duyệt DAG (`interpreter.py`), Thực thi các loại Node (`executors.py`), Lọc trích dẫn Citation Grounding, Bắn vết Trace Emission.

4. 🔴 **AIE-2 (AI Eval Engineer — Lưu Tiến Duy)**:
   * **Chi tiết:** [docs/HUONG_DAN_CAU_TRUC_FUNCTION_AIE2.md](file:///c:/Users/thuym/Desktop/Today/VSF/docs/HUONG_DAN_CAU_TRUC_FUNCTION_AIE2.md)
   * **Nhiệm vụ:** Bộ chạy kiểm thử Eval Harness (`harness.py`), Cổng chấm điểm Eval Gate (`eval_gate.py`), Render báo cáo CLI (`cli.py`), Xuất Scorecard (`PASS`/`FAIL`).
