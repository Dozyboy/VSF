/**
 * app.js - Calculator Logic & UI Event Handling
 */

class CalculatorEngine {
  constructor() {
    this.history = [];
  }

  calculate(a, b, operator) {
    let result = 0;
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    switch (operator) {
      case '+':
        result = numA + numB;
        break;
      case '-':
        result = numA - numB;
        break;
      case '*':
      case '×':
        result = numA * numB;
        break;
      case '/':
      case '÷':
        if (numB === 0) return 'Error';
        result = numA / numB;
        break;
      case '%':
        result = numA / 100;
        break;
      default:
        return numA;
    }

    // Fix floating point issues (e.g. 0.1 + 0.2 = 0.30000000000000004)
    if (typeof result === 'number') {
      result = parseFloat(result.toFixed(10));
    }
    return result;
  }

  executeOperation(a, b, operator) {
    const res = this.calculate(a, b, operator);
    if (res !== 'Error') {
      const expr = operator === '%' ? `${a}%` : `${a} ${operator} ${b}`;
      this.history.unshift({ expression: expr, result: res });
      if (this.history.length > 50) this.history.pop();
    }
    return res;
  }

  clearHistory() {
    this.history = [];
  }
}

// UI Controller (Browser environment)
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const engine = new CalculatorEngine();
    
    let currentInput = '0';
    let previousInput = '';
    let currentOperator = null;
    let shouldResetDisplay = false;

    const displayCurrent = document.getElementById('display-current');
    const displayPrevious = document.getElementById('display-previous');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    function updateDisplay() {
      if (displayCurrent) displayCurrent.textContent = currentInput;
      if (displayPrevious) {
        displayPrevious.textContent = currentOperator && previousInput !== ''
          ? `${previousInput} ${currentOperator}`
          : '';
      }
    }

    function appendNumber(number) {
      if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
      } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
      }
      updateDisplay();
    }

    function handleOperator(op) {
      if (currentOperator !== null && !shouldResetDisplay) {
        compute();
      }
      previousInput = currentInput;
      currentOperator = op;
      shouldResetDisplay = true;
      updateDisplay();
    }

    function compute() {
      if (currentOperator === null || shouldResetDisplay) return;
      const result = engine.executeOperation(previousInput, currentInput, currentOperator);
      
      currentInput = String(result);
      currentOperator = null;
      previousInput = '';
      shouldResetDisplay = true;
      updateDisplay();
      renderHistory();
    }

    function handlePercentage() {
      const result = engine.executeOperation(currentInput, null, '%');
      currentInput = String(result);
      shouldResetDisplay = true;
      updateDisplay();
      renderHistory();
    }

    function handleClear() {
      currentInput = '0';
      previousInput = '';
      currentOperator = null;
      shouldResetDisplay = false;
      updateDisplay();
    }

    function handleDelete() {
      if (shouldResetDisplay) return;
      if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
        currentInput = '0';
      } else {
        currentInput = currentInput.slice(0, -1);
      }
      updateDisplay();
    }

    function handleToggleSign() {
      if (currentInput === '0') return;
      currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
      updateDisplay();
    }

    function renderHistory() {
      if (!historyList) return;
      historyList.innerHTML = '';
      if (engine.history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">Chưa có lịch sử tính toán</div>';
        return;
      }

      engine.history.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
          <span class="history-expr">${item.expression} =</span>
          <span class="history-res">${item.result}</span>
        `;
        div.addEventListener('click', () => {
          currentInput = String(item.result);
          shouldResetDisplay = true;
          updateDisplay();
        });
        historyList.appendChild(div);
      });
    }

    // Button Click Listeners
    document.querySelectorAll('.btn-key').forEach(button => {
      button.addEventListener('click', (e) => {
        const key = button.getAttribute('data-key');
        const type = button.getAttribute('data-type');

        // Add press effect animation
        button.classList.add('active-press');
        setTimeout(() => button.classList.remove('active-press'), 150);

        if (type === 'number') appendNumber(key);
        else if (type === 'operator') handleOperator(key);
        else if (key === '=') compute();
        else if (key === 'C') handleClear();
        else if (key === 'DEL') handleDelete();
        else if (key === '%') handlePercentage();
        else if (key === '±') handleToggleSign();
      });
    });

    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        engine.clearHistory();
        renderHistory();
      });
    }

    // Keyboard Shortcuts Support
    window.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
      else if (e.key === '.') appendNumber('.');
      else if (e.key === '+' || e.key === '-') handleOperator(e.key);
      else if (e.key === '*') handleOperator('×');
      else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      }
      else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        compute();
      }
      else if (e.key === 'Backspace') handleDelete();
      else if (e.key === 'Escape') handleClear();
      else if (e.key === '%') handlePercentage();
    });

    // Initialize UI
    updateDisplay();
    renderHistory();
  });
}

// Export for Node/Testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CalculatorEngine };
}
