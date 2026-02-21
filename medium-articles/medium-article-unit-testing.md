# JavaScript Unit Testing: Write Reliable Code

Unit testing ensures code reliability and maintainability. Master testing fundamentals, frameworks like Jest and Vitest, and best practices for writing effective tests.

## Basic Test Structure

```javascript
// sum.js
export function sum(a, b) {
    return a + b;
}

// sum.test.js
import { sum } from './sum';

describe('sum function', () => {
    test('adds two positive numbers', () => {
        expect(sum(2, 3)).toBe(5);
    });
    
    test('adds negative numbers', () => {
        expect(sum(-1, -2)).toBe(-3);
    });
    
    test('handles zero', () => {
        expect(sum(0, 5)).toBe(5);
    });
});
```

## Common Assertions

```javascript
// Equality
expect(value).toBe(5); // Strict equality
expect(obj).toEqual({ a: 1 }); // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(0.3); // Floating point

// Strings
expect(str).toMatch(/pattern/);
expect(str).toContain('substring');

// Arrays
expect(arr).toContain(item);
expect(arr).toHaveLength(3);

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow(Error);
expect(() => fn()).toThrow('error message');
```

## Testing Async Code

```javascript
// Promises
test('fetches user data', () => {
    return fetchUser(1).then(user => {
        expect(user.name).toBe('John');
    });
});

// Async/await
test('fetches user data', async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('John');
});

// Resolves/Rejects
test('promise resolves', () => {
    return expect(fetchUser(1)).resolves.toHaveProperty('name');
});

test('promise rejects', () => {
    return expect(fetchUser(-1)).rejects.toThrow('Invalid ID');
});
```

## Setup and Teardown

```javascript
describe('Database tests', () => {
    let db;
    
    beforeAll(async () => {
        // Runs once before all tests
        db = await connectDatabase();
    });
    
    afterAll(async () => {
        // Runs once after all tests
        await db.close();
    });
    
    beforeEach(() => {
        // Runs before each test
        db.clear();
    });
    
    afterEach(() => {
        // Runs after each test
        db.cleanup();
    });
    
    test('inserts user', async () => {
        await db.insert({ name: 'John' });
        expect(await db.count()).toBe(1);
    });
});
```

## Mocking

```javascript
// Mock function
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
expect(mockFn()).toBe(42);

// Mock implementation
const mockFetch = jest.fn()
    .mockResolvedValue({ json: () => ({ data: 'test' }) });

// Spy on method
const spy = jest.spyOn(obj, 'method');
obj.method();
expect(spy).toHaveBeenCalled();
```

## Best Practices

- Test one thing per test
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Keep tests independent
- Mock external dependencies
- Aim for high coverage
- Test edge cases

## Key Takeaways

- Unit tests verify individual functions
- Use describe/test for organization
- Assertions check expected outcomes
- Test async code with async/await
- Setup/teardown for test isolation
- Mock external dependencies
- Follow testing best practices

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/unit-testing](https://rws8.tech/tutorials/javascript/unit-testing/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #UnitTesting #Jest #Vitest #Testing #QualityAssurance
