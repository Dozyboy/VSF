/**
 * app.test.js - Unit tests for Calculator Engine
 */
const { CalculatorEngine } = require('./app.js');

function runTests() {
  console.log('🧪 Running Calculator Engine Unit Tests...\n');
  let passed = 0;
  let failed = 0;

  function assertEqual(actual, expected, testName) {
    if (actual === expected) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName} - Expected: ${expected}, Got: ${actual}`);
      failed++;
    }
  }

  const calc = new CalculatorEngine();

  // Test Addition
  assertEqual(calc.calculate(5, 3, '+'), 8, 'Addition (5 + 3 = 8)');
  assertEqual(calc.calculate(-2, 7, '+'), 5, 'Addition with negative (-2 + 7 = 5)');

  // Test Subtraction
  assertEqual(calc.calculate(10, 4, '-'), 6, 'Subtraction (10 - 4 = 6)');
  assertEqual(calc.calculate(3, 8, '-'), -5, 'Subtraction resulting negative (3 - 8 = -5)');

  // Test Multiplication
  assertEqual(calc.calculate(4, 3, '*'), 12, 'Multiplication (4 * 3 = 12)');
  assertEqual(calc.calculate(0, 5, '*'), 0, 'Multiplication with zero (0 * 5 = 0)');

  // Test Division
  assertEqual(calc.calculate(15, 3, '/'), 5, 'Division (15 / 3 = 5)');
  assertEqual(calc.calculate(10, 0, '/'), 'Error', 'Division by zero handling');

  // Test Percentage
  assertEqual(calc.calculate(50, null, '%'), 0.5, 'Percentage (50% = 0.5)');

  // Test Precision/Floating point handling
  assertEqual(calc.calculate(0.1, 0.2, '+'), 0.3, 'Floating point precision (0.1 + 0.2 = 0.3)');

  // Test History Log
  calc.clearHistory();
  calc.executeOperation(12, 4, '+');
  assertEqual(calc.history.length, 1, 'History recording');
  assertEqual(calc.history[0].expression, '12 + 4', 'History expression string');
  assertEqual(calc.history[0].result, 16, 'History result value');

  console.log(`\n📊 Test Summary: ${passed} Passed, ${failed} Failed`);
  if (failed > 0) {
    process.exit(1);
  }
}

if (require.main === module) {
  runTests();
}

module.exports = { runTests };
