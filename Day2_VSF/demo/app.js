// Logic JavaScript cho Smart Task Tracker Web App (SDLC Harness Real Demo)

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const btnClearCompleted = document.getElementById('btn-clear-completed');

    const countTotal = document.getElementById('total-count');
    const countAll = document.getElementById('count-all');
    const countPending = document.getElementById('count-pending');
    const countCompleted = document.getElementById('count-completed');

    let currentFilter = 'all';

    // State Management (LocalStorage)
    let tasks = JSON.parse(localStorage.getItem('harness_tasks')) || [
        { id: '1', text: 'Tìm hiểu tài liệu SDLC Harness v5.3.0', priority: 'high', completed: true },
        { id: '2', text: 'Chạy kiểm thử 65 Fail-Closed Hooks', priority: 'medium', completed: false },
        { id: '3', text: 'Đóng gói sản phẩm demo và ghi Auto-Decision Ledger', priority: 'high', completed: false }
    ];

    function saveTasks() {
        localStorage.setItem('harness_tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Pure helper functions (hỗ trợ Unit Testing ở Step 3)
    function addTask(text, priority) {
        const newTask = {
            id: Date.now().toString(),
            text: text.trim(),
            priority: priority,
            completed: false
        };
        tasks.unshift(newTask);
        saveTasks();
    }

    function toggleTask(id) {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
    }

    function clearCompleted() {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
    }

    // Render Function
    function renderTasks() {
        // Filter logic
        const filteredTasks = tasks.filter(t => {
            if (currentFilter === 'pending') return !t.completed;
            if (currentFilter === 'completed') return t.completed;
            return true; // 'all'
        });

        // Update counts
        const pendingCount = tasks.filter(t => !t.completed).length;
        const completedCount = tasks.filter(t => t.completed).length;

        countTotal.textContent = tasks.length;
        countAll.textContent = tasks.length;
        countPending.textContent = pendingCount;
        countCompleted.textContent = completedCount;

        // Render List
        taskList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';

            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <div class="task-left">
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                        <span class="task-text">${escapeHTML(task.text)}</span>
                        <span class="priority-badge priority-${task.priority}">Ưu tiên ${task.priority}</span>
                    </div>
                    <button class="btn-delete" data-id="${task.id}">🗑️</button>
                `;
                taskList.appendChild(li);
            });
        }
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    }

    // Event Listeners
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (text) {
            addTask(text, priority);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-checkbox')) {
            const id = e.target.getAttribute('data-id');
            toggleTask(id);
        } else if (e.target.classList.contains('btn-delete')) {
            const id = e.target.getAttribute('data-id');
            deleteTask(id);
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderTasks();
        });
    });

    btnClearCompleted.addEventListener('click', () => {
        clearCompleted();
    });

    // Initial Render
    renderTasks();
});
