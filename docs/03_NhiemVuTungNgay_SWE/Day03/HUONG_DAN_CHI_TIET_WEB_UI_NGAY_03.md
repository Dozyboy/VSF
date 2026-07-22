# 🌐 HƯỚNG DẪN CHI TIẾT DỰNG FRONTEND WEB FORM TRONG `apps/web` (NGÀY 3 - SWE)

---

## 🎯 1. VAI TRÒ CỦA WEBSITE TRONG NGÀY 3 (D3)

Đề bài Ngày 3 cho vị trí SWE yêu cầu:
> **"Bút form tạo agent ➔ xuất `recipe.agent_config` ; wiring `recipe` ➔ `interpreter` entry"**

Website nằm tại submodule **`apps/web`** (dự án React + TypeScript độc lập dùng Vite và React Flow) chính là **Giao diện làm việc trực quan người dùng (Frontend UI)** nơi khách hàng thực hiện tạo Agent.

---

## 🛠️ 2. CHI TIẾT CÁC THÀNH PHẦN FORM TRÊN UI (`apps/web/src/App.tsx`)

Trong file `apps/web/src/App.tsx`, giao diện Form được thiết kế gồm 3 ô nhập liệu chính khớp 100% với Contract `AgentConfig` v0:


```tsx
// 1. Instructions (Prompt dặn dò AI): Ô nhập văn bản đa dòng (Textarea)
<textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />

// 2. Model (Mô hình LLM chọn): Dropdown lựa chọn
<select value={model} onChange={(e) => setModel(e.target.value)}>
  <option value="gemini-2.5-flash">gemini-2.5-flash</option>
  <option value="gpt-4o-mini">gpt-4o-mini</option>
</select>

// 3. Tool Whitelist (Công cụ cấp phép): Checklist tích chọn
<input type="checkbox" checked={kbSearchEnabled} onChange={(e) => setKbSearchEnabled(e.target.checked)} />
```

Khi người dùng bấm nút **"Xuất agent_config (JSON)"**, Form sẽ đóng gói dữ liệu và hiển thị ngay khối JSON chuẩn `AgentConfig`:
```json
{
  "instructions": "Hãy tra cứu tài liệu Callisto và trả lời thắc mắc của người dùng.",
  "model": "gemini-2.5-flash",
  "tool_whitelist": [
    "kb_search"
  ]
}
```

---

## ❓ 3. CÓ NÊN ĐƯA NỘI DUNG NÀY VÀO BÁO CÁO DAILY NOTE KHÔNG?

👉 **CÓ VÀ ĐÃ ĐƯỢC ĐƯA VÀO BÁO CÁO DAILY NOTE D3 RỒI!**

Trong file báo cáo Daily Note D3 của bạn (`docs/reports/daily-notes/2026-07-22-Dozyboy.md`), nội dung này đã được ghi nhận chuẩn tại mục **Việc đã làm**:

```markdown
- ✅ Cập nhật giao diện Form tạo Agent xuất JSON agent_config tại apps/web/src/App.tsx.
```

---

## 🚀 4. CÁCH CHẠY THỬ NGHIỆM FRONTEND WEB DƯỚI MÁY

Để xem giao diện Web hiển thị thực tế dưới máy của bạn:

1. Mở Terminal PowerShell và di chuyển vào thư mục `apps/web`:
   ```powershell
   cd apps/web
   ```
2. Cài đặt các gói phụ thuộc và chạy Dev Server:
   ```powershell
   pnpm install
   pnpm dev
   ```
3. Mở trình duyệt truy cập đường dẫn local: `http://localhost:5173` để trải nghiệm Form tạo Agent!
