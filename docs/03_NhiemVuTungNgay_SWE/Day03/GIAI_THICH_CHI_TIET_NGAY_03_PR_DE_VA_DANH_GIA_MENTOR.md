# 🎓 GIẢI THÍCH CHI TIẾT NHIỆM VỤ NGÀY 3, PR CỦA DE & ĐÁNH GIÁ MENTOR (SWE — THIỆU QUANG MINH / DOZYBOY)

---

## 📌 PHẦN 1: BẠN PHẢI LÀM GÌ CHI TIẾT TRONG NGÀY 3 (22/07)?

### 1.1 Bối cảnh & Ranh giới công việc của bạn (SWE)
* **Vùng quản lý của bạn:** 2 submodules chính:
  1. Backend Workbench: `packages/workbench` (`studio_workbench`)
  2. Frontend Web UI: `apps/web` (React/Vite)
* **Ranh giới bảo vệ:** Bạn **tuyệt đối không sửa code** trong `packages/kb` (do DE giữ), `packages/engine` (do AIE-1 giữ) hay `packages/evalhub` (do AIE-2 giữ).
* **Mục tiêu Ngày 3 ("Xâu kim" / Wiring):** 
  Sau khi D2 đã định nghĩa bản vẽ rỗng (`Recipe` schema), **Ngày 3 bạn phải nối dây**: Nhận thông tin từ Form nhập liệu ➔ Xuất ra đối tượng `agent_config` chuẩn ➔ Đóng gói thành `Recipe` chứa chuỗi 3 node ➔ Ném đối tượng này sang Cổng vào (`entry point`) của Động cơ Interpreter do AIE-1 phụ trách.

---

### 1.2 Chi tiết 5 bước cần thực hiện trong Ngày 3

#### 📍 Bước 1: Viết logic Form xuất `agent_config` đúng shape Recipe v0
* **Nơi làm:** `packages/workbench/src/studio_workbench/builder.py`
* **Nhiệm vụ:** Viết hàm nhận input từ Form và trả về đối tượng `AgentConfig` chuẩn Pydantic:
  ```python
  from studio_contracts import AgentConfig

  def build_agent_config(instructions: str, model: str, tool_whitelist: list[str]) -> AgentConfig:
      """Tạo đối tượng AgentConfig chuẩn từ dữ liệu Form UI."""
      return AgentConfig(
          instructions=instructions,
          model=model,
          tool_whitelist=tool_whitelist
      )
  ```

#### 📍 Bước 2: Tạo Recipe mẫu chứa đúng 3 Node tuần tự (`kb-retrieve ➔ llm-step ➔ tool-call`)
* **Nơi làm:** `packages/workbench/src/studio_workbench/builder.py`
* **Nhiệm vụ:** Viết hàm đóng gói một `Recipe` chạy thử nghiệm gồm 3 node chính và node kết thúc (`END`):
  ```python
  from studio_contracts import Recipe, Dag, Node, Edge, NodeType, KbBinding, ScorecardThreshold

  def create_sample_recipe_d3() -> Recipe:
      config = build_agent_config(
          instructions="Hãy trả lời thắc mắc từ tài liệu Callisto.",
          model="gemini-2.5-flash",
          tool_whitelist=["kb_search"]
      )
      
      # 3 Node chính + 1 Node END
      nodes = [
          Node(id="n1", type=NodeType.KB_RETRIEVE, params={"query": "Callisto policy"}),
          Node(id="n2", type=NodeType.LLM_STEP, params={"temperature": 0.0}),
          Node(id="n3", type=NodeType.TOOL_CALL, params={"tool": "kb_search"}),
          Node(id="n4", type=NodeType.END, params={})
      ]
      
      # Nối mũi tên: n1 -> n2 -> n3 -> n4
      edges = [
          Edge(from_="n1", to="n2"),
          Edge(from_="n2", to="n3"),
          Edge(from_="n3", to="n4")
      ]
      
      return Recipe(
          agent_id="agent-d3-demo",
          tenant="ankor",
          agent_config=config,
          dag=Dag(nodes=nodes, edges=edges),
          kb_binding=KbBinding(kb_id="kb-callisto", scope="public"),
          golden_set_ref="golden-set-1",
          scorecard_threshold=ScorecardThreshold(success=0.9, citation_accuracy=0.95)
      )
  ```

#### 📍 Bước 3: Wiring (Nối dây) Recipe sang dòng chạy của Interpreter
* **Nơi làm:** `packages/workbench/tests/test_wiring_d3.py`
* **Nhiệm vụ:** Import hàm `run` từ `studio_engine.interpreter` (chỉ gọi hàm, không sửa code engine) để kiểm tra luồng dữ liệu truyền từ Workbench sang Engine:
  ```python
  import pytest
  from studio_workbench.builder import create_sample_recipe_d3
  from studio_engine.interpreter import run

  @pytest.mark.asyncio
  async def test_wiring_d3():
      recipe = create_sample_recipe_d3()
      # Kiểm tra wiring truyền Recipe vào Interpreter entry
      with pytest.raises(NotImplementedError):
          await run(recipe, trace_writer=None)
  ```

#### 📍 Bước 4: Viết Docstring đầy đủ cho các hàm Executor / Helper
* Đảm bảo mọi hàm bạn viết ở Ngày 3 đều bổ sung comment chuẩn Python giải thích tham số `Args`, kết quả trả về `Returns`, và lỗi `Raises` (Google style docstring).

#### 📍 Bước 5: Review PR của DE & Đóng Daily Note D3
* Đọc bài trình bày Teach-back của DE (Nguyễn Đông Anh) trên GitHub Issue #1.
* Tạo file báo cáo daily note `docs/reports/daily-notes/2026-07-22-Dozyboy.md`.

---

## 📌 PHẦN 2: GIẢI THÍCH MỤC "PR Day 1 — DE (Nguyễn Đông Anh)... #1 mở"

### 2.1 Ý nghĩa của mục này
Đây là **tiêu chí phối hợp nhóm (Peer Review / Cross-review)** bắt buộc trong quy trình làm việc Agile.

* **Tại sao có dòng này?**
  Vào **Ngày 1**, bạn đồng nghiệp **Nguyễn Đông Anh (role Data Engineer - DE)** làm nhiệm vụ trình bày bài giảng Teach-back về KB Pipeline (`ingest` ➔ `chunk` ➔ `embed` ➔ `index` + cơ chế bảo vệ `fence-data`). DE đã đẩy bài lên **PR / Issue #1** trên GitHub: [Link Issue #1](https://github.com/AI20K-VGR/agentcore-studio-kit/issues/1).
* **Bạn (SWE) phải làm gì với mục này?**
  1. Click vào link [Issue #1 / PR #1](https://github.com/AI20K-VGR/agentcore-studio-kit/issues/1).
  2. Đọc nội dung trình bày Teach-back của DE.
  3. Để lại một comment nhận xét/góp ý hoặc bấm **Approve / Review** để xác nhận bạn đã hiểu mảng dữ liệu mà DE phụ trách.
  4. Sau khi hoàn thành việc review này, bạn mới được đánh dấu tích `[x]` vào ô checkbox trong bảng DoD của bạn.

---

## 📌 PHẦN 3: GIẢI THÍCH LỜI DẶN CỦA MENTOR & LÝ DO ĐIỂM 1/12 "INSUFFICIENT"

### 3.1 Mentor dặn "comment dưới issue, ref vào file báo cáo, tóm tắt và quyền Triage" nghĩa là sao?

1. **Quyền Triage là gì?**
   - Mentor đã cấp quyền **Triage** trên GitHub cho cả team. Quyền này cho phép bạn quản lý Issue: gán nhãn (label), gán người làm (assignee), và **tự bấm nút Close Issue (đóng issue)** khi đã hoàn thành công việc mà không cần chờ Mentor bấm nút.
2. **Quy trình báo cáo chuẩn mà Mentor yêu cầu:**
   - **Bước A (Viết báo cáo):** Tạo file báo cáo chi tiết trong thư mục repository theo đường dẫn `docs/reports/daily-notes/2026-07-22-Dozyboy.md`.
   - **Bước B (Push Git):** Commit và push file báo cáo đó lên repo GitHub trong submodule `docs/reports`.
   - **Bước C (Comment & Ref trên Issue):** Mở Issue Ngày 3 của bạn trên GitHub, viết 1 comment ngắn gọn:
     - Tóm tắt 3-4 dòng các việc đã làm xong trong ngày.
     - Dán đường dẫn (**Reference / Ref**) trỏ tới file báo cáo vừa push (Ví dụ: `Ref: docs/reports/daily-notes/2026-07-22-Dozyboy.md`).
   - **Bước D (Close Issue):** Dùng quyền **Triage** bấm nút **Close Issue** để xác nhận đã hoàn thành Ngày 3.

---

### 3.2 Tại sao Mentor chấm bạn được `1/12` và đánh giá `insufficient`?

Hệ thống chấm điểm tự động (Test Harness / Evaluator) của Mentor chạy 12 tiêu chí kiểm tra tự động đối với tài khoản của bạn. Bạn bị `1/12` (`insufficient` = Chưa đủ bằng chứng / Chưa đạt) vì 3 nguyên nhân chính:

1. **Chưa có/Chưa push file báo cáo Daily Note:** Bài test không tìm thấy file báo cáo hợp lệ của bạn tại `docs/reports/daily-notes/` hoặc thiếu các nội dung minh chứng cho D1, D2, D3.
2. **Chưa comment ref & close Issue trên GitHub:** Mentor/Test harness kiểm tra API GitHub thấy Issue chưa có comment tóm tắt ref link báo cáo và Issue chưa được close.
3. **Code chưa vượt qua bài test kiểm định (Fail Test / Stub chưa điền):** Các hàm `build_agent_config` và script test wiring D3 chưa được commit hoặc test pytest bị lỗi.

---

## 🚀 PHẦN 4: LỘ TRÌNH HÀNH ĐỘNG KHẮC PHỤC NGAY ĐỂ ĐẠT ĐIỂM TỐI ĐA (DOD)

Để chuyển từ **1/12 (insufficient)** lên **12/12 (PASSED)**, bạn làm đúng theo 4 bước sau:

### 🛠️ Bước 1: Hoàn thiện code Ngày 3 trong Workbench
1. Tạo/Sửa file `packages/workbench/src/studio_workbench/builder.py`.
2. Tạo file test `packages/workbench/tests/test_wiring_d3.py`.
3. Thêm Docstring Google style cho tất cả các hàm.
4. Mở PowerShell tại `packages/workbench` và chạy kiểm tra:
   ```powershell
   cd packages/workbench
   uv run pytest
   ```

### 📄 Bước 2: Viết Báo cáo Daily Note D3 đầy đủ
Tạo file `docs/reports/daily-notes/2026-07-22-Dozyboy.md` chuẩn template.

### 📤 Bước 3: Commit và Push code lên GitHub Submodules
```powershell
# Submodule Workbench
cd packages/workbench
git add .
git commit -m "feat(workbench): complete D3 tasks - builder, 3-node wiring, docstrings"
git push origin main

# Submodule Web
cd ../../apps/web
git add .
git commit -m "feat(web): add agent_config creation form for D3"
git push origin main

# Submodule Reports
cd ../../docs/reports
git add .
git commit -m "docs(reports): add daily note 2026-07-22-Dozyboy.md for D3"
git push origin main
```

### 💬 Bước 4: Comment ref link và Close Issue trên GitHub (Quyền Triage)
1. Mở [Issue #1 (PR DE)](https://github.com/AI20K-VGR/agentcore-studio-kit/issues/1) ➔ Viết comment nhận xét bài Teach-back của DE.
2. Mở **Issue Ngày 3 của bạn** trên GitHub ➔ Viết comment tóm tắt kèm ref link.
3. Bấm **Close Issue** (Sử dụng quyền Triage được Mentor cấp).
