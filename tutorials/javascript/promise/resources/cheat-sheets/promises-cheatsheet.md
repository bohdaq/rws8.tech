# JavaScript Promises Cheat Sheet

## Quick Reference Guide

---

## Creating Promises

### Basic Promise
```javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

### Immediate Resolution
```javascript
const resolved = Promise.resolve(value);
const rejected = Promise.reject(error);
```

---

## Consuming Promises

### .then()
```javascript
promise.then(
  value => { /* success */ },
  error => { /* failure */ }
);
```

### .catch()
```javascript
promise.catch(error => {
  console.error(error);
});
```

### .finally()
```javascript
promise.finally(() => {
  // Always runs
});
```

### Chaining
```javascript
promise
  .then(result => doSomething(result))
  .then(newResult => doMore(newResult))
  .catch(error => handleError(error))
  .finally(() => cleanup());
```

---

## Promise Static Methods

### Promise.all()
Waits for all Promises, fails fast
```javascript
Promise.all([p1, p2, p3])
  .then(([r1, r2, r3]) => { /* all succeeded */ })
  .catch(error => { /* any failed */ });
```

### Promise.race()
Returns first settled Promise
```javascript
Promise.race([p1, p2, p3])
  .then(result => { /* first to complete */ });
```

### Promise.allSettled()
Waits for all, never fails
```javascript
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach(r => {
      if (r.status === 'fulfilled') {
        console.log(r.value);
      } else {
        console.error(r.reason);
      }
    });
  });
```

### Promise.any()
Returns first fulfilled Promise
```javascript
Promise.any([p1, p2, p3])
  .then(result => { /* first success */ })
  .catch(errors => { /* all failed */ });
```

---

## Async/Await

### Async Function
```javascript
async function myFunction() {
  return value; // Returns Promise
}
```

### Await
```javascript
async function example() {
  const result = await promise;
  console.log(result);
}
```

### Error Handling
```javascript
async function example() {
  try {
    const result = await promise;
  } catch (error) {
    console.error(error);
  } finally {
    cleanup();
  }
}
```

---

## Common Patterns

### Sequential Execution
```javascript
async function sequential() {
  const r1 = await step1();
  const r2 = await step2(r1);
  const r3 = await step3(r2);
  return r3;
}
```

### Parallel Execution
```javascript
async function parallel() {
  const [r1, r2, r3] = await Promise.all([
    step1(),
    step2(),
    step3()
  ]);
  return { r1, r2, r3 };
}
```

### Timeout
```javascript
function timeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}
```

### Retry
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
```

### Delay
```javascript
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

await delay(1000); // Wait 1 second
```

---

## Error Handling

### Promise Error Handling
```javascript
promise
  .then(result => processResult(result))
  .catch(error => {
    console.error('Error:', error);
    return fallbackValue;
  });
```

### Async/Await Error Handling
```javascript
async function example() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw if needed
  }
}
```

### Multiple Catch Handlers
```javascript
promise
  .then(step1)
  .catch(error => {
    console.error('Step 1 failed');
    return fallback;
  })
  .then(step2)
  .catch(error => {
    console.error('Step 2 failed');
  });
```

---

## Best Practices

### ✅ Do's

```javascript
// Return Promises in .then()
promise.then(result => {
  return doSomething(result);
});

// Always handle errors
promise.catch(error => console.error(error));

// Use Promise.all() for parallel operations
const results = await Promise.all([p1, p2, p3]);

// Use async/await for readability
async function getData() {
  const data = await fetchData();
  return data;
}
```

### ❌ Don'ts

```javascript
// Don't forget to return
promise.then(result => {
  doSomething(result); // Missing return!
});

// Don't nest Promises
promise.then(r1 => {
  return promise2.then(r2 => { // Nested!
    return promise3.then(r3 => {
      // ...
    });
  });
});

// Don't use sequential when parallel is possible
const r1 = await fetch1(); // Wait
const r2 = await fetch2(); // Wait
// Use: const [r1, r2] = await Promise.all([fetch1(), fetch2()]);

// Don't mix callbacks and Promises
function bad(callback) {
  return promise.then(result => {
    callback(result); // Confusing!
    return result;
  });
}
```

---

## Promise States

```
┌─────────┐
│ Pending │ ← Initial state
└────┬────┘
     │
┌────┴────┐
│         │
▼         ▼
┌─────────┐  ┌──────────┐
│Fulfilled│  │ Rejected │
└─────────┘  └──────────┘
```

- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed
- **Settled**: Either fulfilled or rejected (final state)

---

## Performance Tips

1. **Use Promise.all() for independent operations**
   ```javascript
   // 3x faster
   const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);
   ```

2. **Batch large operations**
   ```javascript
   for (let i = 0; i < items.length; i += 10) {
     const batch = items.slice(i, i + 10);
     await Promise.all(batch.map(process));
   }
   ```

3. **Implement caching**
   ```javascript
   const cache = new Map();
   async function fetchWithCache(key) {
     if (cache.has(key)) return cache.get(key);
     const data = await fetch(key);
     cache.set(key, data);
     return data;
   }
   ```

---

## Debugging Tips

1. **Add descriptive error messages**
   ```javascript
   throw new Error('Failed to fetch user: ' + userId);
   ```

2. **Use named functions for better stack traces**
   ```javascript
   // Good
   async function fetchUser() { }
   
   // Bad (anonymous)
   const fetchUser = async () => { };
   ```

3. **Log Promise states**
   ```javascript
   promise
     .then(result => {
       console.log('Success:', result);
       return result;
     })
     .catch(error => {
       console.error('Failed:', error);
       throw error;
     });
   ```

---

## Quick Comparison

| Feature | Callbacks | Promises | Async/Await |
|---------|-----------|----------|-------------|
| Syntax | Nested | Chained | Linear |
| Error Handling | Each callback | .catch() | try/catch |
| Readability | Poor | Good | Excellent |
| Debugging | Hard | Medium | Easy |
| Composition | Difficult | Easy | Easy |

---

## Resources

- [MDN Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [JavaScript.info](https://javascript.info/promise-basics)
- [Async/Await Guide](https://javascript.info/async-await)

---

**Print this cheat sheet for quick reference while coding!**
