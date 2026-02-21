# Test-Driven Development: Write Tests First

Test-Driven Development (TDD) is a development methodology where you write tests before writing code. Follow the Red-Green-Refactor cycle to build reliable, well-designed software.

## The Red-Green-Refactor Cycle

```
1. RED: Write a failing test
2. GREEN: Write minimal code to pass
3. REFACTOR: Improve code quality
4. Repeat
```

## Example: Building a Calculator

```javascript
// Step 1: RED - Write failing test
describe('Calculator', () => {
    test('adds two numbers', () => {
        const calc = new Calculator();
        expect(calc.add(2, 3)).toBe(5);
    });
});
// Test fails: Calculator doesn't exist

// Step 2: GREEN - Make it pass
class Calculator {
    add(a, b) {
        return a + b;
    }
}
// Test passes!

// Step 3: REFACTOR - Improve if needed
class Calculator {
    add(a, b) {
        return Number(a) + Number(b); // Handle string inputs
    }
}
// Test still passes, code improved
```

## TDD Workflow

```javascript
// 1. Write test for new feature
test('subtracts two numbers', () => {
    const calc = new Calculator();
    expect(calc.subtract(5, 3)).toBe(2);
});

// 2. Run test - it fails (RED)
// 3. Write minimal code
class Calculator {
    add(a, b) {
        return Number(a) + Number(b);
    }
    
    subtract(a, b) {
        return a - b;
    }
}

// 4. Run test - it passes (GREEN)
// 5. Refactor if needed
// 6. Repeat for next feature
```

## Benefits of TDD

- **Better design**: Tests force you to think about API
- **Confidence**: Tests catch regressions
- **Documentation**: Tests show how code should be used
- **Less debugging**: Catch bugs early
- **Refactoring safety**: Tests ensure behavior preserved

## TDD Best Practices

- Write smallest possible test
- Write simplest code to pass
- Refactor only when tests pass
- Keep tests fast
- One assertion per test (when possible)
- Test behavior, not implementation

## When to Use TDD

**Good for:**
- Business logic
- Algorithms
- Utilities
- APIs

**Less useful for:**
- UI prototyping
- Exploratory coding
- Simple CRUD operations

## Key Takeaways

- Write test first (RED)
- Make it pass (GREEN)
- Improve code (REFACTOR)
- Repeat cycle
- Forces better design
- Provides safety net
- Requires discipline

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/tdd](https://rws8.tech/tutorials/javascript/tdd/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #TDD #TestDrivenDevelopment #Testing #SoftwareEngineering
