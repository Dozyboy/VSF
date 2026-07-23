# 🌐 HƯỚNG DẪN CHI TIẾT DỰNG FRONTEND WEB FORM TRONG `apps/web` (NGÀY 3 - SWE)

---

## 🎯 1. VAI TRÒ CỦA WEBSITE TRONG NGÀY 3 (D3)

Đề bài Ngày 3 cho vị trí SWE yêu cầu:
> **"Bút form tạo agent ➔ xuất `recipe.agent_config` ; wiring `recipe` ➔ `interpreter` entry"**

Website nằm tại submodule **`apps/web`** (dự án React + TypeScript độc lập dùng Vite và React Flow) chính là **Giao diện làm việc trực quan người dùng (Frontend UI)** nơi khách hàng thực hiện tạo Agent.

---

## 🛠️ 2. CHI TIẾT CÁC THÀNH PHẦN FORM TRÊN UI & CODE MẪU (`apps/web/src/App.tsx`)

Trong file `apps/web/src/App.tsx`, giao diện Form được thiết kế gồm 3 ô nhập liệu chính khớp 100% với Contract `AgentConfig` v0:

1. **Instructions (Prompt dặn dò AI):** Textarea nhập hướng dẫn.
2. **Model (Mô hình LLM):** Dropdown chọn `gemini-2.5-flash` hoặc `gpt-4o-mini`.
3. **Tool Whitelist (Công cụ cấp phép):** Checkbox chọn `kb_search`.

Khi bấm nút **"Xuất agent_config (JSON)"**, Form sẽ đóng gói dữ liệu thành JSON chuẩn:
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

### 💻 CODE MẪU THAM KHẢO DÀNH CHO FRONTEND (`apps/web/src/App.tsx`)

> *Lưu ý:* Trọng tâm Ngày 3 của vị trí SWE nằm ở Backend Python (`recipe` & `interpreter`). Nếu bạn muốn chạy hiển thị Form thực tế trên Web UI, bạn có thể dán đoạn code mẫu này vào `apps/web/src/App.tsx`:

```tsx
import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const CLOSED_NODE_TYPES = [
  { type: "kb-retrieve", owner: "AIE-1 / DE" },
  { type: "llm-step", owner: "AIE-1" },
  { type: "condition", owner: "AIE-1 / SWE" },
  { type: "tool-call", owner: "AIE-1 / SWE" },
  { type: "hitl-pause", owner: "SWE / AIE-1" },
  { type: "end", owner: "AIE-1" },
] as const;

function NodeTypePalette() {
  return (
    <aside style={{ width: 200, borderRight: "1px solid #e2e8f0", padding: "16px", fontFamily: "sans-serif", fontSize: 13, backgroundColor: "#f8fafc" }}>
      <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Node palette (6, closed)</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {CLOSED_NODE_TYPES.map((node) => (
          <li key={node.type} style={{ border: "1px solid #cbd5e1", borderRadius: 6, padding: "8px", marginBottom: 8, backgroundColor: "#fff" }}>
            <strong>{node.type}</strong>
            <div style={{ color: "#64748b", fontSize: 11 }}>{node.owner}</div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function AgentConfigForm() {
  const [instructions, setInstructions] = useState("Hãy tra cứu tài liệu Callisto và trả lời thắc mắc của người dùng.");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [kbSearchEnabled, setKbSearchEnabled] = useState(true);
  const [generatedConfig, setGeneratedConfig] = useState<string | null>(null);

  const handleExportJSON = () => {
    const tools: string[] = [];
    if (kbSearchEnabled) tools.push("kb_search");
    const config = { instructions, model, tool_whitelist: tools };
    setGeneratedConfig(JSON.stringify(config, null, 2));
  };

  return (
    <aside style={{ width: 380, borderRight: "1px solid #e2e8f0", padding: "20px", fontFamily: "sans-serif", backgroundColor: "#fff", display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>🤖 Form Tạo Agent (Day 3 SWE)</h2>
      <div>
        <label style={{ fontSize: 13, fontWeight: 600 }}>1. Instructions:</label>
        <textarea rows={4} value={instructions} onChange={(e) => setInstructions(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: 4, boxSizing: "border-box" }} />
      </div>
      <div>
        <label style={{ fontSize: 13, fontWeight: 600 }}>2. Model:</label>
        <select value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: 4 }}>
          <option value="gemini-2.5-flash">gemini-2.5-flash</option>
          <option value="gpt-4o-mini">gpt-4o-mini</option>
        </select>
      </div>
      <div>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: 13 }}>
          <input type="checkbox" checked={kbSearchEnabled} onChange={(e) => setKbSearchEnabled(e.target.checked)} />
          <span><code>kb_search</code> (Tra cứu tri thức Callisto)</span>
        </label>
      </div>
      <button onClick={handleExportJSON} style={{ padding: "10px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>
        📄 Xuất agent_config (JSON)
      </button>
      {generatedConfig && (
        <pre style={{ backgroundColor: "#0f172a", color: "#38bdf8", padding: "12px", borderRadius: 6, fontSize: 12, overflowX: "auto" }}>
          {generatedConfig}
        </pre>
      )}
    </aside>
  );
}

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      <AgentConfigForm />
      <NodeTypePalette />
      <div style={{ flexGrow: 1 }}>
        <ReactFlow nodes={[]} edges={[]} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
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

---

### ⚠️ Xử lý lỗi nếu gặp: `pnpm : The term 'pnpm' is not recognized...`

Nếu gặp lỗi trên do máy chưa cài đặt `pnpm`, bạn xử lý theo các bước:

1. **Cài đặt `pnpm` toàn cục (Khuyên dùng):**
   ```powershell
   npm install -g pnpm
   ```
   *(Hoặc kích hoạt qua Corepack tích hợp sẵn trong Node.js)*:
   ```powershell
   corepack enable
   corepack prepare pnpm@latest --activate
   ```
2. **Kiểm tra lại sau khi cài:**
   ```powershell
   pnpm -v
   ```
3. 💡 **Lưu ý với Monorepo:** Đối với dự án dùng `pnpm workspace`, lệnh `pnpm install` nên được thực hiện từ thư mục gốc của dự án (`agentcore-studio-kit`) thay vì chạy lẻ từng app.

