# 🎯 MÔ TẢ NHIỆM VỤ DAY 05 — DE (NGUYỄN ĐÔNG ANH)

---

## 📌 THÔNG TIN CHUNG
* **Issue ID**: `#20`
* **Tiêu đề**: `Day 5 — DE (Nguyễn Đông Anh) — Chạy Suite Fence-Proof Security Test (leakage = 0) & Demo Sprint 1`
* **Vị trí**: Data Engineer (DE)
* **Status**: Target Day 5

---

## 🎯 PHẦN I: MỤC TIÊU VÀ ĐẦU VÀO / ĐẦU RA (INPUT / OUTPUT)

### 🔹 Input được cấp:
- Pipeline KB nạp 5 doc Callisto đã hoạt động ổn định ở Day 4.
- Bộ 100 câu truy vấn test bảo mật (Prompt Injection & Cross-tenant probes).

### 🔹 Deliverables / Output phải bàn giao:
1. Báo cáo Fence-Proof Security Test chứng minh `leakage_rate = 0.0%`.
2. Bảng tổng hợp chi phí `cost_usd` chính xác 100% trong bảng `trace_events`.
3. Phối hợp với AIE-2 trong bài chấm điểm 30 Golden Cases.
4. Tham gia Demo 8 bước và họp Retrospective Sprint 1.
5. File Daily Note D5 (`agentcore-report/daily-notes/2026-07-24-DongAnh2704.md`).

---

## 🚀 PHẦN II: HƯỚNG DẪN CHI TIẾT TỪNG BƯỚC THỰC HIỆN

### 📌 Bước 1: Chạy Suite Kiểm Thử Fence-Proof Security (100 Cases)
Tạo script `scripts/verify_fence_proof.py`:

```python
async def run_fence_proof_suite():
    """Chạy 100 truy vấn ngẫu nhiên giả lập Prompt Injection và lọc tenant."""
    failures = 0
    total = 100
    for query in test_queries:
        results = await kb.search(query=query['prompt'], tenant=query['tenant'])
        for r in results:
            if r['metadata']['tenant'] != query['tenant']:
                failures += 1
                
    leakage_rate = (failures / total) * 100
    print(f"Fence-Proof Result: Leakage Rate = {leakage_rate}%")
    assert leakage_rate == 0.0
```

---

### 📌 Bước 2: Kiểm Tra Bảng Tính Chi Phí Trace Sink (`cost_usd`)
Truy vấn bảng Postgres `trace_events` để xác minh tính chính xác:

```sql
SELECT 
    tenant_id, 
    COUNT(*) as total_events, 
    SUM(prompt_tokens) as total_prompt_tokens,
    SUM(completion_tokens) as total_completion_tokens,
    SUM(cost_usd) as total_cost_usd
FROM trace_events
GROUP BY tenant_id;
```

---

### 📌 Bước 3: Phối Hợp Demo Vòng Đời 8 Bước Sprint 1
Trình bày vai trò của DE ở Bước 4 (Trace Sink) và Bước 5 (Fence-Proof Validation) trước nhóm và Mentor.

---

## 📋 PHẦN III: TIÊU CHUẨN HOÀN THÀNH (DoD CHECKLIST)

- [ ] Chạy script `verify_fence_proof.py` đạt kết quả `leakage_rate = 0.0%`.
- [ ] Bảng `trace_events` tính toán đúng token và `cost_usd`.
- [ ] Tham gia hoàn thành buổi Demo & Retrospective Sprint 1.
- [ ] Push file Daily Note D5 lên repo.

---

## 💬 MẪU COMMENT BÁO CÁO HOÀN THÀNH ISSUE #20 TRÊN GITHUB

```markdown
### 🚀 CẬP NHẬT TIẾN ĐỘ HOÀN THÀNH NHIỆM VỤ DAY 05 (DE — Nguyễn Đông Anh)

Chào Mentor và cả nhóm, mình đã hoàn thành nhiệm vụ trên Issue **#20**:

#### 🟢 Các mục đã bàn giao:
- [x] **Fence-Proof Passed**: Suite test 100 cases đạt tỷ lệ `leakage_rate = 0.0%` tuyệt đối.
- [x] **Trace Cost Verified**: Xác minh bảng `trace_events` tính toán chính xác `cost_usd` và token.
- [x] **Sprint 1 Demo**: Hoàn thành demo thành công luồng KB & Security Data Fence.
- [x] **Daily Note**: Push file Daily Note D5 `2026-07-24-DongAnh2704.md`.

CC: @hieubui2409 (Mentor) / @group
```
