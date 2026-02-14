# Lesson 4.1: Introduction to Async/Await

## Learning Objectives
- Understand what async/await is
- Learn the async keyword
- Master the await keyword
- Convert Promises to async/await syntax

---

## What is Async/Await?

**Async/await** is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code.

### Before (Promises):
```javascript
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

### After (Async/Await):
```javascript
async function getPosts() {
  try {
    const user = await fetchUser(1);
    const posts = await fetchPosts(user.id);
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

**Benefits:**
✅ More readable - looks like synchronous code  
✅ Easier to debug - better stack traces  
✅ Simpler error handling - use try/catch  
✅ Less nesting - flat structure

---

## The async Keyword

The `async` keyword makes a function return a Promise:

```javascript
async function myFunction() {
  return 'Hello';
}

// Equivalent to:
function myFunction() {
  return Promise.resolve('Hello');
}

myFunction().then(value => console.log(value)); // 'Hello'
```

### Key Points:

1. **Always returns a Promise**
```javascript
async function getValue() {
  return 42;
}

console.log(getValue()); // Promise { 42 }
```

2. **Can use await inside**
```javascript
async function fetchData() {
  const data = await fetch('/api/data');
  return data;
}
```

3. **Works with all function types**
```javascript
// Function declaration
async function func1() {}

// Function expression
const func2 = async function() {};

// Arrow function
const func3 = async () => {};

// Method
const obj = {
  async method() {}
};
```

---

## The await Keyword

The `await` keyword pauses execution until a Promise settles:

```javascript
async function example() {
  console.log('Before await');
  
  const result = await Promise.resolve('value');
  
  console.log('After await');
  console.log(result); // 'value'
}
```

### Rules for await:

1. **Only works inside async functions**
```javascript
// ❌ Error: await outside async function
const result = await fetchData();

// ✅ Correct
async function getData() {
  const result = await fetchData();
}
```

2. **Pauses execution, but doesn't block**
```javascript
async function demo() {
  console.log('1');
  await delay(1000);
  console.log('2'); // Runs after 1 second
}

demo();
console.log('3'); // Runs immediately

// Output: 1, 3, 2
```

3. **Works with any Promise**
```javascript
async function example() {
  const value1 = await Promise.resolve(1);
  const value2 = await fetch('/api/data');
  const value3 = await someAsyncFunction();
}
```

4. **Can await non-Promise values**
```javascript
async function example() {
  const value = await 42; // Wraps in Promise.resolve()
  console.log(value); // 42
}
```

---

## Converting Promises to Async/Await

### Example 1: Simple Chain

**Before:**
```javascript
function getUser() {
  return fetchUser(1)
    .then(user => {
      console.log('User:', user);
      return user;
    });
}
```

**After:**
```javascript
async function getUser() {
  const user = await fetchUser(1);
  console.log('User:', user);
  return user;
}
```

### Example 2: Multiple Steps

**Before:**
```javascript
function processOrder(orderId) {
  return fetchOrder(orderId)
    .then(order => validateOrder(order))
    .then(validOrder => processPayment(validOrder))
    .then(payment => sendConfirmation(payment));
}
```

**After:**
```javascript
async function processOrder(orderId) {
  const order = await fetchOrder(orderId);
  const validOrder = await validateOrder(order);
  const payment = await processPayment(validOrder);
  const confirmation = await sendConfirmation(payment);
  return confirmation;
}
```

### Example 3: With Error Handling

**Before:**
```javascript
function getData() {
  return fetchData()
    .then(data => processData(data))
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}
```

**After:**
```javascript
async function getData() {
  try {
    const data = await fetchData();
    return await processData(data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

---

## Async Functions Always Return Promises

### Returning Values

```javascript
async function getValue() {
  return 42;
}

getValue().then(value => console.log(value)); // 42
```

### Throwing Errors

```javascript
async function throwError() {
  throw new Error('Oops!');
}

throwError().catch(error => console.error(error.message)); // 'Oops!'
```

### Implicit Return

```javascript
async function implicit() {
  // No return statement
}

implicit().then(value => console.log(value)); // undefined
```

---

## Real-World Examples

### Example 1: Fetching User Profile

```javascript
async function getUserProfile(userId) {
  const user = await fetch(`/api/users/${userId}`).then(r => r.json());
  const posts = await fetch(`/api/users/${userId}/posts`).then(r => r.json());
  
  return {
    user,
    posts,
    postCount: posts.length
  };
}

getUserProfile(1)
  .then(profile => console.log(profile))
  .catch(error => console.error(error));
```

### Example 2: Form Submission

```javascript
async function submitForm(formData) {
  const response = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    throw new Error('Submission failed');
  }

  const result = await response.json();
  return result;
}
```

### Example 3: Sequential Operations

```javascript
async function setupUser(userData) {
  console.log('Creating user...');
  const user = await createUser(userData);
  
  console.log('Sending welcome email...');
  await sendWelcomeEmail(user.email);
  
  console.log('Creating default settings...');
  await createDefaultSettings(user.id);
  
  console.log('Setup complete!');
  return user;
}
```

---

## Common Patterns

### Pattern 1: Conditional Await

```javascript
async function getData(useCache) {
  if (useCache) {
    return await getCachedData();
  } else {
    return await fetchFreshData();
  }
}
```

### Pattern 2: Multiple Independent Awaits

```javascript
async function loadPage() {
  const header = await loadHeader();
  const content = await loadContent();
  const footer = await loadFooter();
  
  return { header, content, footer };
}
```

### Pattern 3: Await in Loops

```javascript
async function processItems(items) {
  for (const item of items) {
    await processItem(item); // Sequential
  }
}
```

---

## Async/Await vs Promises

| Feature | Promises | Async/Await |
|---------|----------|-------------|
| **Syntax** | `.then()` chains | `await` keyword |
| **Readability** | Can get nested | Linear, like sync code |
| **Error Handling** | `.catch()` | `try/catch` |
| **Debugging** | Harder | Easier |
| **Compatibility** | ES6 (2015) | ES8 (2017) |

---

## Important Notes

### 1. Async Functions Are Non-Blocking

```javascript
async function slowFunction() {
  await delay(3000);
  console.log('Done');
}

slowFunction(); // Doesn't block
console.log('This runs immediately');
```

### 2. Top-Level Await (ES2022)

In modules, you can use await at the top level:

```javascript
// In a module
const data = await fetchData();
console.log(data);
```

### 3. Async/Await Is Still Promises

Under the hood, async/await uses Promises:

```javascript
async function example() {
  return 'value';
}

// Same as:
function example() {
  return Promise.resolve('value');
}
```

---

## Key Takeaways

✅ `async` makes a function return a Promise  
✅ `await` pauses execution until Promise settles  
✅ Only use `await` inside `async` functions  
✅ Makes async code **look synchronous**  
✅ Better **readability** and **debugging**  
✅ Use `try/catch` for error handling

---

## Practice Exercise

Convert this Promise chain to async/await:

```javascript
function getOrderTotal(orderId) {
  return fetchOrder(orderId)
    .then(order => fetchItems(order.items))
    .then(items => {
      const total = items.reduce((sum, item) => sum + item.price, 0);
      return total;
    });
}
```

<details>
<summary>Solution</summary>

```javascript
async function getOrderTotal(orderId) {
  const order = await fetchOrder(orderId);
  const items = await fetchItems(order.items);
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return total;
}
```
</details>

---

## Next Steps

Next, we'll learn about **error handling with try/catch** in async/await functions!
