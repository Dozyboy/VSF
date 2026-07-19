document.addEventListener('DOMContentLoaded', () => {
    // Nav Navigation Elements
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    const pageTitle = document.getElementById('page-title');

    // Navigation Tab Switcher
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('href').replace('#', '');
            
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(sec => {
                if (sec.id === `section-${targetSection}`) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });

            // Update title text
            const sectionNames = {
                'overview': 'SDLC Harness Interactive Control Center',
                'workflow': 'Trình Mô Phỏng Quy Trình 4 Bước (SDLC Engine)',
                'cage': 'Kiểm Tra Quyền Ghi (Two-Tier RBAC Deny-List Cage)',
                'ledger': 'Auto-Decision Ledger (Nhật Ký Quyết Định Tự Động)',
                'reports': 'Báo Cáo & Tài Liệu Nộp Bài Day 2'
            };
            if (sectionNames[targetSection]) {
                pageTitle.textContent = sectionNames[targetSection];
            }
        });
    });

    // Console Output Logging System
    const consoleOutput = document.getElementById('console-output');
    function logToConsole(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logLine = document.createElement('div');
        logLine.className = `log-line ${type}`;
        logLine.textContent = `[${timestamp}] ${message}`;
        consoleOutput.appendChild(logLine);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Step Status Updates
    function updateStepStatus(stepNum, statusText, stateClass) {
        const stepBox = document.getElementById(`step-${stepNum}-box`);
        const stepStatus = document.getElementById(`step-${stepNum}-status`);
        
        stepStatus.textContent = statusText;
        stepBox.className = `step-box ${stateClass}`;
    }

    // Full SDLC Simulator Run
    const btnRunSDLC = document.getElementById('btn-run-sdlc');
    const btnResetDemo = document.getElementById('btn-reset-demo');

    btnRunSDLC.addEventListener('click', async () => {
        logToConsole('[ENGINE] Bắt đầu khởi chạy Full quy trình SDLC Harness v5.3.0...', 'system');

        // Step 1: Discover & Plan
        updateStepStatus(1, 'Đang xử lý...', 'active');
        logToConsole('[STEP 1: PLAN] Đang khởi tạo implementation_plan.md...', 'info');
        await sleep(800);
        logToConsole('[STEP 1: PLAN] Kiểm tra E1 Methodology Rules (scoring-rigor, plan-quality)... PASSED!', 'success');
        updateStepStatus(1, 'Hoàn thành', 'complete');

        // Step 2: Code & Cage
        updateStepStatus(2, 'Đang xử lý...', 'active');
        logToConsole('[STEP 2: CODE] Kiểm tra RBAC Permission Cage cho đường dẫn /src/...', 'info');
        await sleep(900);
        logToConsole('[STEP 2: CODE] Đã ghi file safe_zone thành công. Không chạm vào Core Deny-List Floor.', 'success');
        updateStepStatus(2, 'Hoàn thành', 'complete');

        // Step 3: Test & Verify
        updateStepStatus(3, 'Đang xử lý...', 'active');
        logToConsole('[STEP 3: TEST] Đang kích hoạt 65 Fail-Closed Hooks...', 'warn');
        await sleep(1000);
        logToConsole('[STEP 3: TEST] Chạy Test Triad & Linter. Tất cả test cases: 100% PASSED!', 'success');
        updateStepStatus(3, 'Hoàn thành', 'complete');

        // Step 4: Ship & Ledger
        updateStepStatus(4, 'Đang xử lý...', 'active');
        logToConsole('[STEP 4: SHIP] Đang ghi nhận sự kiện vào Auto-Decision Ledger...', 'info');
        await sleep(800);
        addLedgerEntry('AUTO_SHIP_RELEASE', 'Low', 'Approved');
        logToConsole('[STEP 4: SHIP] ĐÓNG GÓI BẢN PHÁT HÀNH THÀNH CÔNG! Sẵn sàng Deploy.', 'success');
        updateStepStatus(4, 'Đã Ship', 'complete');
    });

    btnResetDemo.addEventListener('click', () => {
        for (let i = 1; i <= 4; i++) {
            updateStepStatus(i, i === 1 ? 'Sẵn sàng' : 'Chờ duyệt', '');
        }
        consoleOutput.innerHTML = `
            <div class="log-line system">[SYSTEM] Đã reset trạng thái demo SDLC Harness v5.3.0.</div>
            <div class="log-line info">[INFO] Sẵn sàng cho lượt chạy mới.</div>
        `;
    });

    // Step-by-Step Interactive Buttons
    document.getElementById('btn-step-plan').addEventListener('click', () => {
        updateStepStatus(1, 'Hoàn thành', 'complete');
        logToConsole('[PLAN] Đã tạo file implementation_plan.md và vượt qua audit CS-10.', 'success');
    });
    document.getElementById('btn-step-code').addEventListener('click', () => {
        updateStepStatus(2, 'Hoàn thành', 'complete');
        logToConsole('[CODE] Đã ghi code theo đúng rào chắn Deny-List permission cage.', 'success');
    });
    document.getElementById('btn-step-test').addEventListener('click', () => {
        updateStepStatus(3, 'Hoàn thành', 'complete');
        logToConsole('[TEST] 65 Hooks kiểm tra đã chạy thành công.', 'success');
    });
    document.getElementById('btn-step-ship').addEventListener('click', () => {
        updateStepStatus(4, 'Đã Ship', 'complete');
        addLedgerEntry('MANUAL_STEP_SHIP', 'Low', 'Approved');
        logToConsole('[SHIP] Dự án đã đi hết quy trình SDLC và được ghi nhận vào Ledger.', 'success');
    });

    // RBAC Permission Cage Auditor Simulator
    const btnTestCage = document.getElementById('btn-test-cage');
    const targetPathSelect = document.getElementById('target-path-select');
    const auditResult = document.getElementById('audit-result');

    btnTestCage.addEventListener('click', () => {
        const path = targetPathSelect.value;
        const isProtected = path.includes('/config/') || path.includes('/.git/') || path.includes('.env');

        if (isProtected) {
            auditResult.className = 'audit-result-box result-denied';
            auditResult.innerHTML = `
                <strong>⛔ WRITING DENIED (CHẶN NỔI NỔI FAIL-CLOSED):</strong><br>
                Đường dẫn <code>${path}</code> nằm trong <strong>Protected Core Deny-List Floor Zone</strong>.<br>
                SDLC Harness RBAC Engine đã chặn hành động ghi này của AI Agent nhằm bảo vệ an toàn dự án.
            `;
        } else {
            auditResult.className = 'audit-result-box result-allowed';
            auditResult.innerHTML = `
                <strong>✅ WRITING PERMITTED (CHO PHÉP GHI):</strong><br>
                Đường dẫn <code>${path}</code> nằm trong <strong>Safe Application Zone</strong>.<br>
                AI Agent được cấp quyền khởi tạo / chỉnh sửa file này.
            `;
        }
    });

    // Auto-Decision Ledger Data Simulation
    const ledgerRows = document.getElementById('ledger-rows');
    const initialLedgerData = [
        { time: '11:42:05', session: 'sess-892a', mode: 'autonomous_plan', action: 'AUTO_APPROVE_PLAN_STRUCTURE', risk: 'Low', status: 'Reviewed' },
        { time: '11:45:18', session: 'sess-892a', mode: 'autonomous_code', action: 'SAFE_ZONE_WRITE_COMPONENT', risk: 'Low', status: 'Reviewed' },
        { time: '11:48:30', session: 'sess-892a', mode: 'autonomous_test', action: 'RUN_HOOK_SUITE_CS10', risk: 'Medium', status: 'Approved' }
    ];

    function renderLedgerTable(data) {
        ledgerRows.innerHTML = '';
        data.forEach(item => {
            const tr = document.createElement('tr');
            const riskBadge = item.risk === 'High' ? 'badge-high' : (item.risk === 'Medium' ? 'badge-medium' : 'badge-low');
            tr.innerHTML = `
                <td><code>${item.time}</code></td>
                <td><code>${item.session}</code></td>
                <td><span class="badge badge-low">${item.mode}</span></td>
                <td><strong>${item.action}</strong></td>
                <td><span class="badge ${riskBadge}">${item.risk}</span></td>
                <td><span class="badge badge-low">${item.status}</span></td>
            `;
            ledgerRows.appendChild(tr);
        });
    }

    function addLedgerEntry(actionName, riskLevel = 'Low', statusText = 'Approved') {
        const timeStr = new Date().toLocaleTimeString();
        initialLedgerData.unshift({
            time: timeStr,
            session: 'sess-live',
            mode: 'auto_sdlc_ship',
            action: actionName,
            risk: riskLevel,
            status: statusText
        });
        renderLedgerTable(initialLedgerData);
    }

    renderLedgerTable(initialLedgerData);

    // Report Tab Switcher & Viewer
    const tabReport1 = document.getElementById('tab-report-1');
    const tabReport2 = document.getElementById('tab-report-2');
    const reportViewArea = document.getElementById('report-view-area');

    const report1HTML = `
        <h2>📋 Báo Cáo Hiện Trạng Làm Việc Với AI (Yêu Cầu Đầu Ra 1)</h2>
        <hr style="border-color: var(--border-color); margin: 12px 0;">
        <p><strong>1. Tần suất sử dụng AI:</strong> HẰNG NGÀY (Daily Pair Programming).</p>
        <p><strong>2. Phạm vi áp dụng:</strong> Viết code (70%), Refactoring & Review (50%), Testing (60%), Planning & Spec (40%), Debugging (80%).</p>
        <p><strong>3. Provider AI & Models:</strong> Antigravity IDE (Gemini 3.5 Flash / Pro, Claude 3.5 Sonnet), GitHub Copilot (GPT-4o), ChatGPT Web.</p>
        <p><strong>4. Điểm hạn chế trước khi có Harness:</strong> Rủi ro AI tự do sửa nhầm file core, thiếu kỉ luật plan trước khi code, và thiếu fail-closed hooks kiểm tra chất lượng.</p>
    `;

    const report2HTML = `
        <h2>💡 Báo Cáo Insight Kỉ Luật SDLC Harness v5.3.0 (Yêu Cầu Đầu Ra 2)</h2>
        <hr style="border-color: var(--border-color); margin: 12px 0;">
        <p><strong>1. Thuận lợi:</strong> Kiểm soát chất lượng 100%, bảo vệ an toàn cho codebase thông qua Two-tier permission deny-list, lưu vết nhật ký minh bạch với Auto-decision ledger.</p>
        <p><strong>2. Khó khăn:</strong> Chi phí thời gian cấu hình ban đầu, overhead khi thực hiện các tác vụ cực nhỏ.</p>
        <p><strong>3. Góc nhìn cá nhân:</strong> SDLC Harness là mô hình chuẩn mực bắt buộc cho dự án doanh nghiệp lớn để biến AI thành một đồng nghiệp kỉ luật, đáng tin cậy.</p>
    `;

    reportViewArea.innerHTML = report1HTML;

    tabReport1.addEventListener('click', () => {
        tabReport1.classList.add('active');
        tabReport2.classList.remove('active');
        reportViewArea.innerHTML = report1HTML;
    });

    tabReport2.addEventListener('click', () => {
        tabReport2.classList.add('active');
        tabReport1.classList.remove('active');
        reportViewArea.innerHTML = report2HTML;
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
