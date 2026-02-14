# Lesson 7.2: Debugging Promises

## Learning Objectives
- Identify common Promise pitfalls
- Use debugging tools effectively
- Handle unhandled Promise rejections
- Debug async/await code

---

## Common Promise Pitfalls

### 1. Forgetting to Return

**Problem:**
```javascript
function getData() {
  fetchUser(1).then(user => {
    return user.name; // This return goes to .then(), not getData()
  });
  // getData() returns undefined!
}
```

**Solution:**
```javascript
function getData() {
  return fetchUser(1).then(user => {
    return user.name;
  });
}
```

---

### 2. Nesting Promises (Promise Hell)

**Problem:**
```javascript
fetchUser(1).then(user => {
  fetchPosts(user.id).then(posts => {
    fetchComments(posts[0].id).then(comments => {
      console.log(comments);
    });
  });
});
```

**Solution:**
```javascript
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments));
```

---

### 3. Not Handling Errors

**Problem:**
```javascript
fetchUser(1).then(user => {
  console.log(user);
});
// Unhandled rejection if fetchUser fails!
```

**Solution:**
```javascript
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error('Error:', error));
```

---

### 4. Creating Unnecessary Promises

**Problem:**
```javascript
function getUser(id) {
  return new Promise((resolve, reject) => {
    fetchUser(id)
      .then(user => resolve(user))
      .catch(error => reject(error));
  });
}
```

**Solution:**
```javascript
function getUser(id) {
  return fetchUser(id); // Already returns a Promise!
}
```

---

### 5. Sequential When Parallel is Possible

**Problem:**
```javascript
async function loadData() {
  const users = await fetchUsers();     // Wait
  const posts = await fetchPosts();     // Wait
  const comments = await fetchComments(); // Wait
  // Total: 3 seconds
}
```

**Solution:**
```javascript
async function loadData() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  // Total: 1 second
}
```

---

### 6. Floating Promises

**Problem:**
```javascript
async function processItems(items) {
  items.forEach(async item => {
    await processItem(item); // forEach doesn't wait!
  });
  console.log('Done'); // Logs before processing completes
}
```

**Solution:**
```javascript
async function processItems(items) {
  await Promise.all(items.map(item => processItem(item)));
  console.log('Done'); // Logs after all complete
}

// Or sequential:
async function processItems(items) {
  for (const item of items) {
    await processItem(item);
  }
  console.log('Done');
}
```

---

## Debugging Tools

### 1. Console Logging

```javascript
fetchUser(1)
  .then(user => {
    console.log('1. User fetched:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('2. Posts fetched:', posts);
    return posts;
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
```

### 2. Chrome DevTools

**Breakpoints in async code:**
```javascript
async function getData() {
  debugger; // Execution pauses here
  const user = await fetchUser(1);
  debugger; // And here
  return user;
}
```

**Async stack traces:**
- Chrome DevTools shows full async call stack
- Enable "Async" checkbox in Sources panel

### 3. Promise Inspection

```javascript
const promise = fetchUser(1);
console.log(promise); // Promise { <pending> }

promise.then(user => {
  console.log(promise); // Promise { <fulfilled>: {...} }
});
```

---

## Unhandled Promise Rejections

### Detecting Unhandled Rejections

**Node.js:**
```javascript
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  console.error('Reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
```

**Browser:**
```javascript
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled rejection:', event.reason);
  event.preventDefault();
});
```

### Common Causes

1. **Missing .catch()**
   ```javascript
   fetchUser(1); // ❌ No error handler
   ```

2. **Async function without try/catch**
   ```javascript
   async function getData() {
     await fetchUser(1); // ❌ No try/catch
   }
   ```

3. **Promise in event handler**
   ```javascript
   button.addEventListener('click', () => {
     fetchUser(1); // ❌ Floating promise
   });
   ```

---

## Debugging Async/Await

### 1. Add Try/Catch Blocks

```javascript
async function getData() {
  try {
    const user = await fetchUser(1);
    console.log('User:', user);
    
    const posts = await fetchPosts(user.id);
    console.log('Posts:', posts);
    
    return { user, posts };
  } catch (error) {
    console.error('Error in getData:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}
```

### 2. Use Named Functions

**Bad (anonymous):**
```javascript
const getData = async () => {
  // Stack trace shows "anonymous"
};
```

**Good (named):**
```javascript
async function getData() {
  // Stack trace shows "getData"
}
```

### 3. Add Context to Errors

```javascript
async function fetchUserData(userId) {
  try {
    const user = await fetchUser(userId);
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user ${userId}: ${error.message}`);
  }
}
```

---

## Debugging Techniques

### 1. Promise Chain Logging

```javascript
function logPromise(label) {
  return value => {
    console.log(`${label}:`, value);
    return value;
  };
}

fetchUser(1)
  .then(logPromise('User fetched'))
  .then(user => fetchPosts(user.id))
  .then(logPromise('Posts fetched'))
  .catch(error => console.error('Error:', error));
```

### 2. Timeout Debugging

```javascript
function withTimeout(promise, ms, label = 'Operation') {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
    )
  ]);
}

// Usage
const user = await withTimeout(fetchUser(1), 5000, 'fetchUser');
```

### 3. Performance Tracking

```javascript
async function timedOperation(fn, label) {
  const start = Date.now();
  try {
    const result = await fn();
    console.log(`${label} took ${Date.now() - start}ms`);
    return result;
  } catch (error) {
    console.error(`${label} failed after ${Date.now() - start}ms`);
    throw error;
  }
}

// Usage
const user = await timedOperation(
  () => fetchUser(1),
  'fetchUser'
);
```

---

## Debugging Race Conditions

```javascript
let requestId = 0;

async function fetchUserWithLogging(userId) {
  const id = ++requestId;
  console.log(`[${id}] Starting request for user ${userId}`);
  
  try {
    const user = await fetchUser(userId);
    console.log(`[${id}] Completed request for user ${userId}`);
    return user;
  } catch (error) {
    console.error(`[${id}] Failed request for user ${userId}:`, error);
    throw error;
  }
}

// Now you can track which requests complete in which order
```

---

## Best Practices for Debugging

### ✅ Do's

1. **Always handle errors**
   ```javascript
   try {
     await riskyOperation();
   } catch (error) {
     console.error('Error:', error);
   }
   ```

2. **Use descriptive error messages**
   ```javascript
   throw new Error(`Failed to fetch user ${userId}: ${error.message}`);
   ```

3. **Log important state changes**
   ```javascript
   console.log('Starting data fetch');
   const data = await fetchData();
   console.log('Data fetched successfully');
   ```

4. **Use debugging tools**
   - Chrome DevTools
   - VS Code debugger
   - Node.js inspector

### ❌ Don'ts

1. **Don't swallow errors**
   ```javascript
   // Bad
   try {
     await fetchData();
   } catch (error) {
     // Silent failure
   }
   ```

2. **Don't use console.log in production**
   ```javascript
   // Use a proper logging library
   import logger from './logger';
   logger.error('Error:', error);
   ```

3. **Don't ignore warnings**
   ```javascript
   // Fix unhandled rejection warnings immediately
   ```

---

## Debugging Checklist

When debugging Promise issues:

- [ ] Are all Promises being returned?
- [ ] Are all errors being caught?
- [ ] Are Promises being awaited where needed?
- [ ] Is the code using parallel execution where possible?
- [ ] Are there any floating Promises?
- [ ] Are error messages descriptive?
- [ ] Is there proper logging?
- [ ] Are async stack traces enabled?

---

## Key Takeaways

✅ Always **return Promises** from functions  
✅ **Avoid nesting** - use flat chains  
✅ **Handle all errors** with .catch() or try/catch  
✅ Use **named functions** for better stack traces  
✅ **Log strategically** to track execution flow  
✅ Enable **async stack traces** in DevTools  
✅ Watch for **unhandled rejections**

---

## Next Steps

Next, we'll learn about **performance optimization** for async code!
