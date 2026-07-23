# NHIỆM VỤ & KIẾN THỨC DAY 4 — AIE-2 (LƯU TIẾN DUY)

## 📌 XONG NGÀY (DoD CHUNG CẢ NHÓM NGÀY 4)
- [x] **Data-Threading xuyên suốt**: Dữ liệu truyền liên tục qua các node trong Interpreter.
- [x] **Verification 5/5 PASS**: `StaticKbSearch` và Golden-set 5 cases chạy khớp 100%.
- [x] Chạy `python -m studio_evalhub.cli` ra kết quả **5/5 PASS**.
- [x] `make test` và `make lint` xanh 100%.

---

## 🎯 VIỆC CỦA BẠN (AIE-2 - LƯU TIẾN DUY - DAY 4)
1. **Hoàn thiện Smoke Eval 5-Case Runner**:
   - Merge nhánh `aie-2/day-04-smoke-eval-5case` vào `main` repo `evalhub`.
2. **Triển khai Thuật Toán `token-contains`**:
   - Thay thế việc so sánh chuỗi tuyệt đối bằng so sánh các token từ liên tiếp có chuẩn hóa (`lower()` + xóa dấu câu).
   - Giúp tránh việc câu trả lời đúng nghĩa nhưng khác chữ bị chấm nhầm là FAIL.
3. **Xử Lý Trường `expected_section_role` & Cờ `refused`**:
   - Thêm trường `expected_section_role` vào `GoldenCase` để bắt đúng case chéo vai SC-05.
   - Nhận cờ `refused = not retrieved_chunks` từ AIE-1 để xác nhận câu từ chối bảo mật đúng (SC-04 chéo tenant & SC-05 chéo vai).
4. **Nghiệm Thu Kết Quả**: Chạy `python -m studio_evalhub.cli` đạt **5/5 PASS**.

---

## 🧠 KIẾN THỨC NỀN TẢNG (KNOWLEDGE & CONCEPTS)
- **Token-Contains Normalization Algorithm**: Thuật toán tách token `\w+`, chuyển thành chữ thường để so sánh cụm từ mà không bị giòn (fragile) bởi dấu câu hay từ nối.
- **Refusal Evaluation Rule**: Quy tắc chấm điểm câu từ chối: Nếu case có yêu cầu refusal (do lệch tenant hoặc vai), thì `expected_citation` phải rỗng `[]` và cờ `refused` phải là `True`. Bất kỳ citation nào trả về đều bị coi là rò rỉ dữ liệu (FAIL).

---

## 📁 FILE CODE LIÊN QUAN
- `packages/evalhub/src/studio_evalhub/golden_case.py` (Model `GoldenCase` kèm `expected_section_role`)
- `packages/evalhub/src/studio_evalhub/harness.py` (Hàm `_tokenize` & `_contains_phrase`)
- `packages/evalhub/src/studio_evalhub/cli.py` (CLI chạy 5 cases PASS 100%)
- `packages/evalhub/tests/test_smoke_runner.py` (Unit tests cho runner)

---

## 🔄 WORKFLOW & INTEGRATION FLOW
```
[Agent Execution Result]
          │
          ├─► (Is Refusal Case?) ──(Yes)──► [Verify refused==True & citations==[]] ──► [PASS / FAIL]
          │
          └─► (Is Answerable Case?) ──► [Token-Contains Match actual vs expected] ──► [PASS / FAIL]
```
