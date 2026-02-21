# JavaScript Mocking: Isolate and Control Dependencies

Mocking isolates code under test by replacing dependencies with controlled substitutes. Master mock functions, spies, stubs, and mocking strategies for better tests.

## Mock Functions

```javascript
// Create mock function
const mockFn = jest.fn();

// Set return value
mockFn.mockReturnValue(42);
console.log(mockFn()); // 42

// Set implementation
mockFn.mockImplementation((x) => x * 2);
console.log(mockFn(5)); // 10

// Check calls
mockFn(1, 2, 3);
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(1, 2, 3);
expect(mockFn).toHaveBeenCalledTimes(2);
```

## Mocking Modules

```javascript
// api.js
export async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}

// user.test.js
import { fetchUser } from './api';

jest.mock('./api');

test('loads user data', async () => {
    fetchUser.mockResolvedValue({ id: 1, name: 'John' });
    
    const user = await loadUserProfile(1);
    expect(user.name).toBe('John');
});
```

## Spies

```javascript
// Spy on existing method
const user = {
    getName: () => 'John'
};

const spy = jest.spyOn(user, 'getName');

user.getName();
expect(spy).toHaveBeenCalled();

// Restore original
spy.mockRestore();
```

## Mocking Async Operations

```javascript
// Mock resolved promise
mockFetch.mockResolvedValue({ data: 'test' });

// Mock rejected promise
mockFetch.mockRejectedValue(new Error('Network error'));

// Mock different responses
mockFetch
    .mockResolvedValueOnce({ id: 1 })
    .mockResolvedValueOnce({ id: 2 })
    .mockRejectedValueOnce(new Error('Failed'));
```

## Best Practices

- Mock at boundaries (API, database)
- Don't mock what you don't own
- Keep mocks simple
- Verify mock interactions
- Reset mocks between tests
- Use real objects when possible

## Key Takeaways

- Mocks replace dependencies
- Control return values and behavior
- Verify function calls
- Mock modules and APIs
- Spies track method calls
- Essential for isolated testing

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/mocking](https://rws8.tech/tutorials/javascript/mocking/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #Mocking #Testing #Jest #Vitest #UnitTesting
