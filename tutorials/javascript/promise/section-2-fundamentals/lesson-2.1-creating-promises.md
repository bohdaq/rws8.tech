# Lesson 2.1: Creating Promises

## Learning Objectives
- Master the Promise constructor syntax
- Understand resolve and reject functions
- Learn about the executor function
- Create custom Promises for various scenarios

---

## Promise Constructor Syntax

```javascript
const promise = new Promise((resolve, reject) => {
  // Executor function body
});
```

### Components:

1. **`new Promise()`** - Creates a new Promise object
2. **Executor function** - `(resolve, reject) => { }`
3. **`resolve(value)`** - Fulfills the promise with a value
4. **`reject(reason)`** - Rejects the promise with a reason

---

## The Executor Function

The executor function runs **immediately** when the Promise is created:

```javascript
console.log('Before');

const promise = new Promise((resolve, reject) => {
  console.log('Executor runs immediately!');
  resolve();
});

console.log('After');

// Output:
// Before
// Executor runs immediately!
// After
```

**Key Points:**
- Runs synchronously
- Receives two functions: `resolve` and `reject`
- Should call one of them (but not both)

---

## Using resolve()

Call `resolve(value)` when the async operation succeeds:

```javascript
const successPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = { id: 1, name: 'Success' };
    resolve(data); // Fulfill with data
  }, 1000);
});

successPromise.then(data => {
  console.log('Received:', data);
});
```

### What Can You Resolve With?

```javascript
// Primitive values
resolve(42);
resolve('Hello');
resolve(true);

// Objects
resolve({ key: 'value' });
resolve([1, 2, 3]);

// Even another Promise!
resolve(anotherPromise);

// Undefined (no value)
resolve();
```

---

## Using reject()

Call `reject(reason)` when the async operation fails:

```javascript
const failurePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Something went wrong'));
  }, 1000);
});

failurePromise.catch(error => {
  console.error('Error:', error.message);
});
```

### Best Practice: Always Reject with Error Objects

```javascript
// ✅ Good - Error object with stack trace
reject(new Error('Database connection failed'));

// ❌ Bad - String (no stack trace)
reject('Database connection failed');

// ❌ Bad - Undefined
reject();
```

---

## Common Patterns

### 1. Wrapping setTimeout

```javascript
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

delay(2000).then(() => {
  console.log('2 seconds later');
});
```

### 2. Wrapping Callback-Based APIs

```javascript
const fs = require('fs');

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

readFilePromise('file.txt')
  .then(content => console.log(content))
  .catch(error => console.error(error));
```

### 3. Conditional Logic

```javascript
function checkStock(itemId) {
  return new Promise((resolve, reject) => {
    const inStock = Math.random() > 0.5;
    
    setTimeout(() => {
      if (inStock) {
        resolve({ itemId, quantity: 10 });
      } else {
        reject(new Error('Out of stock'));
      }
    }, 1000);
  });
}
```

### 4. Immediate Resolution

```javascript
// Already resolved
const immediate = Promise.resolve('instant value');

// Already rejected
const failed = Promise.reject(new Error('instant error'));
```

---

## Important Rules

### 1. Call resolve() or reject() Only Once

```javascript
new Promise((resolve, reject) => {
  resolve('First');
  resolve('Second'); // Ignored!
  reject('Error');   // Ignored!
});
```

The first call wins, all subsequent calls are ignored.

### 2. Promises Are Immutable

Once settled, a Promise's state cannot change:

```javascript
const promise = Promise.resolve('value');
// This promise will ALWAYS resolve to 'value'
```

### 3. Executor Errors Auto-Reject

If the executor throws an error, the Promise is automatically rejected:

```javascript
const promise = new Promise((resolve, reject) => {
  throw new Error('Oops!');
  // Equivalent to: reject(new Error('Oops!'));
});

promise.catch(error => {
  console.error(error.message); // 'Oops!'
});
```

---

## Real-World Examples

### Example 1: API Request Simulation

```javascript
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching user ${userId}...`);
    
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error('Invalid user ID'));
        return;
      }
      
      const user = {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
      };
      
      resolve(user);
    }, 1500);
  });
}

fetchUser(5)
  .then(user => console.log('User:', user))
  .catch(error => console.error('Error:', error.message));
```

### Example 2: Image Loader

```javascript
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    
    img.src = url;
  });
}

loadImage('photo.jpg')
  .then(img => document.body.appendChild(img))
  .catch(error => console.error(error.message));
```

### Example 3: Database Query Wrapper

```javascript
function queryDatabase(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(new Error(`Database error: ${error.message}`));
      } else {
        resolve(results);
      }
    });
  });
}

queryDatabase('SELECT * FROM users WHERE id = ?', [1])
  .then(users => console.log(users))
  .catch(error => console.error(error));
```

---

## Anti-Patterns to Avoid

### ❌ Don't Create Unnecessary Promises

```javascript
// Bad - wrapping a Promise in a Promise
function bad() {
  return new Promise((resolve, reject) => {
    somePromise()
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
}

// Good - just return the Promise
function good() {
  return somePromise();
}
```

### ❌ Don't Forget to Return

```javascript
// Bad - not returning the Promise
function bad() {
  new Promise((resolve) => {
    resolve('value');
  });
}

// Good - return the Promise
function good() {
  return new Promise((resolve) => {
    resolve('value');
  });
}
```

### ❌ Don't Mix Callbacks and Promises

```javascript
// Bad - mixing paradigms
function bad(callback) {
  return new Promise((resolve) => {
    resolve('value');
    callback('value'); // Confusing!
  });
}

// Good - choose one approach
function good() {
  return new Promise((resolve) => {
    resolve('value');
  });
}
```

---

## Key Takeaways

✅ Use `new Promise((resolve, reject) => {})` to create Promises  
✅ Executor function runs **immediately**  
✅ Call `resolve(value)` for success, `reject(error)` for failure  
✅ Only the **first** resolve/reject call matters  
✅ Always reject with **Error objects**  
✅ Executor errors **auto-reject** the Promise

---

## Practice Exercise

Create a Promise that simulates a coin flip:
- 50% chance to resolve with "Heads"
- 50% chance to resolve with "Tails"
- Takes 1 second to complete

<details>
<summary>Solution</summary>

```javascript
function coinFlip() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
      resolve(result);
    }, 1000);
  });
}

coinFlip().then(result => console.log(result));
```
</details>

---

## Next Steps

Next, we'll learn how to **consume Promises** using `.then()`, `.catch()`, and `.finally()`.
