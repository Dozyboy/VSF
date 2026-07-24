# 🎯 MÔ TẢ NHIỆM VỤ DAY 04 — SWE (THIỆU QUANG MINH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#15`
* **Tiêu đề**: `Day 4 — SWE (Thiệu Quang Minh) — Đóng băng Contract #1, gắn KB binding UI & validate recipe Pydantic`
* **Vị trí**: Software Engineer (SWE)
* **Status**: Target Day 4

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Package `packages/contracts` để đóng băng Hợp đồng #1.
- Hợp đồng Contract #2 (`kb.search`) v1 frozen từ DE.

### 🔹 Deliverables / Output phải bàn giao:
1. Đóng băng Contract #1 `packages/contracts/src/studio_contracts/recipe.py`.
2. Module `studio_workbench/kb_binding.py` quản lý cấu hình KB Scope.
3. Cập nhật `graph_validator.py` validate đối tượng Recipe theo Hợp đồng Pydantic frozen.
4. Unit test `tests/test_tenant_wall.py` kiểm tra quy tắc bảo mật INV-1.
5. File Daily Note D4 (`agentcore-report/daily-notes/2026-07-23-Dozyboy.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Khai báo Contract #1 Frozen trong `packages/contracts`
Tạo file `packages/contracts/src/studio_contracts/recipe.py` chứa đối tượng `RecipeDAG` và `AgentConfig`.

---

### 📌 Bước 2: Viết Module Quản lý KB Scope Binding
Tạo file `packages/workbench/src/studio_workbench/kb_binding.py`:

```python
def bind_kb_scope(agent_config: AgentConfig, selected_scopes: list[str]) -> AgentConfig:
    """Gắn danh sách KB Scopes hợp lệ vào AgentConfig."""
    valid_scopes = {"public", "hr", "finance", "engineering"}
    for scope in selected_scopes:
        if scope not in valid_scopes:
            raise ValueError(f"Invalid KB scope: {scope}")
            
    agent_config.kb_scope = selected_scopes
    return agent_config
```

---

### 📌 Bước 3: Viết Unit Test Kiểm Tra INV-1 Tenant-Wall (`test_tenant_wall.py`)
Tạo test kiểm tra ngăn chặn override tenant từ client:

```python
def test_tenant_wall_override_prevention():
    session_tenant = "ankor"
    client_payload = {"name": "Test Agent", "tenant_id": "borea"} # Client cố tình đổi tenant
    
    # Server ép buộc dùng session_tenant
    config = build_config_from_session(client_payload, session_tenant)
    assert config.tenant_id == "ankor"
    assert config.tenant_id != "borea"
```

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Đóng băng Hợp đồng Contract #1 v1 trong `packages/contracts`.
- [ ] Tích hợp thành công logic KB Scope Binding vào Workbench.
- [ ] Unit test `test_tenant_wall.py` PASS 100%.
- [ ] Code coverage của package `workbench` đạt $\ge 80\%$.
- [ ] Push file Daily Note D4 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #15 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 04 (SWE — Thiệu Quang Minh)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#15**:

#### 🟢 Các mục đã bàn giao:
- [x] **Frozen Contract #1**: Đóng băng `recipe.py` Pydantic model trong `packages/contracts`.
- [x] **KB Scope Binding**: Tích hợp module gán quyền `kb_scope` cho AgentConfig.
- [x] **INV-1 Tenant-Wall**: Cài đặt và verify unit test chống override tenant ID.
- [x] **Graph Validation**: Validator kiểm tra thành công Recipe theo chuẩn frozen contract.

CC: @hieubui2409 (Mentor) / @group
```
