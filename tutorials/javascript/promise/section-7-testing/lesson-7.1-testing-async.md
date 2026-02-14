# Lesson 7.1: Testing Async Code

## Learning Objectives
- Learn how to test Promises with Jest
- Master async/await in tests
- Mock async functions effectively
- Write comprehensive async test suites

---

## Why Test Async Code?

Async code is prone to:
- Race conditions
- Timing issues
- Unhandled rejections
- Flaky tests

**Proper testing ensures reliability and catches edge cases.**

---

## Testing with Jest

Jest is the most popular JavaScript testing framework with built-in async support.

### Setup

```bash
npm install --save-dev jest
```

```json
// package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

---

## Testing Promises with .then()

### Basic Promise Test

```javascript
// fetchUser.js
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}` });
      } else {
        reject(new Error('Invalid ID'));
      }
    }, 100);
  });
}

// fetchUser.test.js
test('fetches user successfully', () => {
  return fetchUser(1).then(user => {
    expect(user.id).toBe(1);
    expect(user.name).toBe('User 1');
  });
});
```

**Important:** Return the Promise so Jest waits for it!

### Testing Rejections

```javascript
test('rejects with invalid ID', () => {
  return fetchUser(-1).catch(error => {
    expect(error.message).toBe('Invalid ID');
  });
});

// Or use expect().rejects
test('rejects with invalid ID', () => {
  return expect(fetchUser(-1)).rejects.toThrow('Invalid ID');
});
```

---

## Testing with Async/Await

### Basic Async Test

```javascript
test('fetches user successfully', async () => {
  const user = await fetchUser(1);
  expect(user.id).toBe(1);
  expect(user.name).toBe('User 1');
});
```

**Cleaner and more readable!**

### Testing Rejections with Async/Await

```javascript
test('rejects with invalid ID', async () => {
  await expect(fetchUser(-1)).rejects.toThrow('Invalid ID');
});

// Or with try/catch
test('rejects with invalid ID', async () => {
  try {
    await fetchUser(-1);
    fail('Should have thrown');
  } catch (error) {
    expect(error.message).toBe('Invalid ID');
  }
});
```

---

## Mocking Async Functions

### Mocking with jest.fn()

```javascript
const mockFetch = jest.fn();

test('calls fetch with correct URL', async () => {
  mockFetch.mockResolvedValue({ data: 'test' });
  
  const result = await mockFetch('/api/users');
  
  expect(mockFetch).toHaveBeenCalledWith('/api/users');
  expect(result.data).toBe('test');
});
```

### Mocking Rejections

```javascript
test('handles fetch errors', async () => {
  mockFetch.mockRejectedValue(new Error('Network error'));
  
  await expect(mockFetch('/api/users')).rejects.toThrow('Network error');
});
```

### Mocking Modules

```javascript
// api.js
export async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// api.test.js
import { fetchUser } from './api';

jest.mock('./api');

test('mocks fetchUser', async () => {
  fetchUser.mockResolvedValue({ id: 1, name: 'John' });
  
  const user = await fetchUser(1);
  expect(user.name).toBe('John');
});
```

---

## Testing Promise.all()

```javascript
test('fetches multiple users', async () => {
  const users = await Promise.all([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  
  expect(users).toHaveLength(3);
  expect(users[0].id).toBe(1);
  expect(users[1].id).toBe(2);
  expect(users[2].id).toBe(3);
});
```

---

## Testing Timeouts

```javascript
function fetchWithTimeout(url, timeout) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}

test('times out after 1 second', async () => {
  jest.useFakeTimers();
  
  const promise = fetchWithTimeout('/api/slow', 1000);
  
  jest.advanceTimersByTime(1000);
  
  await expect(promise).rejects.toThrow('Timeout');
  
  jest.useRealTimers();
});
```

---

## Testing Retry Logic

```javascript
async function retry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}

test('retries 3 times before failing', async () => {
  const mockFn = jest.fn()
    .mockRejectedValueOnce(new Error('Fail 1'))
    .mockRejectedValueOnce(new Error('Fail 2'))
    .mockResolvedValue('Success');
  
  const result = await retry(mockFn, 3);
  
  expect(mockFn).toHaveBeenCalledTimes(3);
  expect(result).toBe('Success');
});

test('throws after max retries', async () => {
  const mockFn = jest.fn().mockRejectedValue(new Error('Always fails'));
  
  await expect(retry(mockFn, 3)).rejects.toThrow('Always fails');
  expect(mockFn).toHaveBeenCalledTimes(3);
});
```

---

## Testing Async Utilities

### Testing Delay Function

```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test('delays for specified time', async () => {
  jest.useFakeTimers();
  
  const promise = delay(1000);
  
  jest.advanceTimersByTime(1000);
  
  await promise;
  
  jest.useRealTimers();
});
```

### Testing Debounce

```javascript
function debounceAsync(fn, delay) {
  let timeoutId;
  let inFlight = null;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    if (inFlight) return inFlight;
    
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        inFlight = fn(...args);
        try {
          const result = await inFlight;
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          inFlight = null;
        }
      }, delay);
    });
  };
}

test('debounces async function', async () => {
  jest.useFakeTimers();
  
  const mockFn = jest.fn().mockResolvedValue('result');
  const debounced = debounceAsync(mockFn, 1000);
  
  debounced('arg1');
  debounced('arg2');
  debounced('arg3');
  
  jest.advanceTimersByTime(1000);
  
  await Promise.resolve(); // Let promises resolve
  
  expect(mockFn).toHaveBeenCalledTimes(1);
  expect(mockFn).toHaveBeenCalledWith('arg3');
  
  jest.useRealTimers();
});
```

---

## Best Practices

### ✅ Do's

1. **Always return or await Promises in tests**
   ```javascript
   test('good test', async () => {
     await fetchUser(1); // ✅
   });
   ```

2. **Use async/await for readability**
   ```javascript
   test('readable test', async () => {
     const user = await fetchUser(1);
     expect(user.id).toBe(1);
   });
   ```

3. **Test both success and failure cases**
   ```javascript
   test('success case', async () => {
     const user = await fetchUser(1);
     expect(user).toBeDefined();
   });
   
   test('failure case', async () => {
     await expect(fetchUser(-1)).rejects.toThrow();
   });
   ```

4. **Mock external dependencies**
   ```javascript
   jest.mock('./api');
   ```

### ❌ Don'ts

1. **Don't forget to return/await**
   ```javascript
   test('bad test', () => {
     fetchUser(1); // ❌ Test completes before Promise
   });
   ```

2. **Don't use done() with async/await**
   ```javascript
   test('bad test', async (done) => { // ❌ Mixing patterns
     await fetchUser(1);
     done();
   });
   ```

3. **Don't test implementation details**
   ```javascript
   // ❌ Bad
   expect(fn.toString()).toContain('await');
   
   // ✅ Good
   const result = await fn();
   expect(result).toBe(expected);
   ```

---

## Complete Test Suite Example

```javascript
// userService.js
export class UserService {
  constructor(api) {
    this.api = api;
  }
  
  async getUser(id) {
    if (id <= 0) {
      throw new Error('Invalid user ID');
    }
    return this.api.fetchUser(id);
  }
  
  async getAllUsers(ids) {
    return Promise.all(ids.map(id => this.getUser(id)));
  }
}

// userService.test.js
import { UserService } from './userService';

describe('UserService', () => {
  let service;
  let mockApi;
  
  beforeEach(() => {
    mockApi = {
      fetchUser: jest.fn()
    };
    service = new UserService(mockApi);
  });
  
  describe('getUser', () => {
    test('fetches user successfully', async () => {
      const mockUser = { id: 1, name: 'John' };
      mockApi.fetchUser.mockResolvedValue(mockUser);
      
      const user = await service.getUser(1);
      
      expect(mockApi.fetchUser).toHaveBeenCalledWith(1);
      expect(user).toEqual(mockUser);
    });
    
    test('throws error for invalid ID', async () => {
      await expect(service.getUser(-1)).rejects.toThrow('Invalid user ID');
      expect(mockApi.fetchUser).not.toHaveBeenCalled();
    });
    
    test('propagates API errors', async () => {
      mockApi.fetchUser.mockRejectedValue(new Error('API error'));
      
      await expect(service.getUser(1)).rejects.toThrow('API error');
    });
  });
  
  describe('getAllUsers', () => {
    test('fetches multiple users', async () => {
      mockApi.fetchUser
        .mockResolvedValueOnce({ id: 1, name: 'John' })
        .mockResolvedValueOnce({ id: 2, name: 'Jane' });
      
      const users = await service.getAllUsers([1, 2]);
      
      expect(users).toHaveLength(2);
      expect(users[0].name).toBe('John');
      expect(users[1].name).toBe('Jane');
    });
  });
});
```

---

## Key Takeaways

✅ Use **async/await** in tests for readability  
✅ Always **return or await** Promises  
✅ **Mock** external dependencies  
✅ Test both **success and failure** cases  
✅ Use **jest.useFakeTimers()** for time-dependent tests  
✅ Write **descriptive test names**

---

## Next Steps

Next, we'll learn about **debugging Promises** and common pitfalls to avoid!
