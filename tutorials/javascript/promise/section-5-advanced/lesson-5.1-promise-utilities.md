# Lesson 5.1: Promise Composition and Utilities

## Learning Objectives
- Create reusable Promise utilities
- Master the promisify pattern
- Build delay/sleep functions
- Develop a Promise utility library

---

## Why Build Promise Utilities?

Reusable utilities make your code:
- ✅ More maintainable
- ✅ Less repetitive (DRY principle)
- ✅ Easier to test
- ✅ More readable

---

## Essential Promise Utilities

### 1. Delay/Sleep Function

Create a Promise-based delay:

```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage
await delay(1000); // Wait 1 second
console.log('1 second later');
```

With value:
```javascript
function delay(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

const result = await delay(1000, 'Hello');
console.log(result); // 'Hello' after 1 second
```

---

### 2. Timeout Wrapper

Add timeout to any Promise:

```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), ms);
    })
  ]);
}

// Usage
try {
  const data = await timeout(fetchData(), 5000);
  console.log(data);
} catch (error) {
  console.error('Request timed out');
}
```

---

### 3. Retry Function

Retry failed operations:

```javascript
async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }
    
    console.log(`Retrying... (${retries} attempts left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay);
  }
}

// Usage
const data = await retry(() => fetchData(), 3, 1000);
```

With exponential backoff:
```javascript
async function retryWithBackoff(fn, retries = 3, baseDelay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      
      const delayTime = baseDelay * Math.pow(2, i);
      console.log(`Retry ${i + 1} after ${delayTime}ms`);
      await delay(delayTime);
    }
  }
}
```

---

### 4. Promisify Pattern

Convert callback-based functions to Promises:

```javascript
function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// Usage with Node.js fs
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

const content = await readFilePromise('file.txt', 'utf8');
```

**Note:** Node.js has built-in `util.promisify()`:
```javascript
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
```

---

### 5. Parallel Limit

Control concurrent Promise execution:

```javascript
async function parallelLimit(tasks, limit) {
  const results = [];
  const executing = [];
  
  for (const [index, task] of tasks.entries()) {
    const promise = Promise.resolve().then(() => task());
    results[index] = promise;
    
    if (limit <= tasks.length) {
      const executing = promise.then(() => {
        executing.splice(executing.indexOf(executing), 1);
      });
      executing.push(executing);
      
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}

// Usage: Process 100 items, 5 at a time
const tasks = items.map(item => () => processItem(item));
await parallelLimit(tasks, 5);
```

Simpler version:
```javascript
async function batchProcess(items, batchSize, processor) {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(processor)
    );
    results.push(...batchResults);
  }
  
  return results;
}
```

---

### 6. Promise.map

Like Array.map but for async operations:

```javascript
async function promiseMap(array, asyncFn) {
  return Promise.all(array.map(asyncFn));
}

// Usage
const userIds = [1, 2, 3, 4, 5];
const users = await promiseMap(userIds, fetchUser);
```

With concurrency limit:
```javascript
async function promiseMap(array, asyncFn, concurrency = Infinity) {
  const results = [];
  const iterator = array.entries();
  
  async function worker() {
    for (const [index, item] of iterator) {
      results[index] = await asyncFn(item, index);
    }
  }
  
  const workers = Array(Math.min(concurrency, array.length))
    .fill(iterator)
    .map(worker);
    
  await Promise.all(workers);
  return results;
}
```

---

### 7. Promise.filter

Filter array with async predicate:

```javascript
async function promiseFilter(array, asyncPredicate) {
  const results = await Promise.all(
    array.map(async (item, index) => {
      const shouldInclude = await asyncPredicate(item, index);
      return shouldInclude ? item : null;
    })
  );
  
  return results.filter(item => item !== null);
}

// Usage
const activeUsers = await promiseFilter(users, async user => {
  const isActive = await checkUserStatus(user.id);
  return isActive;
});
```

---

### 8. Promise.reduce

Reduce array with async operations:

```javascript
async function promiseReduce(array, asyncReducer, initialValue) {
  let accumulator = initialValue;
  
  for (const item of array) {
    accumulator = await asyncReducer(accumulator, item);
  }
  
  return accumulator;
}

// Usage
const total = await promiseReduce(
  orderIds,
  async (sum, orderId) => {
    const order = await fetchOrder(orderId);
    return sum + order.total;
  },
  0
);
```

---

### 9. Debounced Promise

Prevent duplicate concurrent calls:

```javascript
function debouncePromise(fn) {
  let inFlight = null;
  
  return function(...args) {
    if (!inFlight) {
      inFlight = fn(...args).finally(() => {
        inFlight = null;
      });
    }
    return inFlight;
  };
}

// Usage
const debouncedFetch = debouncePromise(fetchData);

// Multiple calls return the same Promise
const p1 = debouncedFetch();
const p2 = debouncedFetch();
console.log(p1 === p2); // true
```

---

### 10. Memoize Async Function

Cache Promise results:

```javascript
function memoizeAsync(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const promise = fn(...args);
    cache.set(key, promise);
    
    promise.catch(() => cache.delete(key));
    
    return promise;
  };
}

// Usage
const memoizedFetch = memoizeAsync(fetchUser);

const user1 = await memoizedFetch(1); // Fetches from API
const user2 = await memoizedFetch(1); // Returns cached result
```

---

## Complete Utility Library

```javascript
const PromiseUtils = {
  delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
  },

  timeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), ms)
      )
    ]);
  },

  async retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.delay(delay * Math.pow(2, i));
      }
    }
  },

  async map(array, asyncFn, concurrency = Infinity) {
    const results = [];
    const executing = [];
    
    for (const [index, item] of array.entries()) {
      const promise = asyncFn(item, index).then(result => {
        results[index] = result;
      });
      
      executing.push(promise);
      
      if (executing.length >= concurrency) {
        await Promise.race(executing);
        executing.splice(executing.findIndex(p => p === promise), 1);
      }
    }
    
    await Promise.all(executing);
    return results;
  },

  async filter(array, asyncPredicate) {
    const results = await Promise.all(
      array.map(async (item, index) => ({
        item,
        include: await asyncPredicate(item, index)
      }))
    );
    
    return results.filter(r => r.include).map(r => r.item);
  },

  memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      
      const promise = fn(...args);
      cache.set(key, promise);
      promise.catch(() => cache.delete(key));
      
      return promise;
    };
  }
};

// Export for use
module.exports = PromiseUtils;
```

---

## Real-World Example

```javascript
const API = {
  async fetchUser(id) {
    return PromiseUtils.timeout(
      PromiseUtils.retry(
        () => fetch(`/api/users/${id}`).then(r => r.json()),
        3,
        1000
      ),
      5000
    );
  },

  async fetchAllUsers(ids) {
    return PromiseUtils.map(
      ids,
      id => this.fetchUser(id),
      5 // Max 5 concurrent requests
    );
  }
};
```

---

## Key Takeaways

✅ Build **reusable utilities** for common patterns  
✅ **Promisify** callback-based APIs  
✅ Add **timeout** and **retry** logic  
✅ Control **concurrency** with limits  
✅ **Memoize** expensive async operations  
✅ Create a **utility library** for your project

---

## Practice Exercise

Create a utility function that:
1. Retries up to 3 times
2. Has a 5-second timeout
3. Uses exponential backoff

<details>
<summary>Solution</summary>

```javascript
async function fetchWithRetryAndTimeout(fn, retries = 3, timeoutMs = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      const promise = fn();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeoutMs)
      );
      
      return await Promise.race([promise, timeoutPromise]);
    } catch (error) {
      if (i === retries - 1) throw error;
      
      const delay = 1000 * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```
</details>

---

## Next Steps

Next, we'll learn about **retry logic and exponential backoff** in detail!
