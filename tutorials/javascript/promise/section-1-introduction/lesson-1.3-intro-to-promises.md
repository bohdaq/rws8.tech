# Lesson 1.3: Introduction to Promises

## Learning Objectives
- Understand what a Promise is
- Learn the three Promise states
- See how Promises solve callback hell
- Create your first Promise

---

## What is a Promise?

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation.

Think of it like a **receipt** for an async operation:
- 🎫 You order food (start async operation)
- 🧾 You get a receipt (Promise)
- ⏳ You wait for your order (pending state)
- ✅ Food arrives (fulfilled) OR ❌ Order cancelled (rejected)

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

console.log(promise); // Promise { <pending> }
```

---

## The Three Promise States

A Promise is always in one of three states:

### 1. **Pending** ⏳
Initial state, neither fulfilled nor rejected.

```javascript
const promise = new Promise((resolve, reject) => {
  // Still waiting...
});
console.log(promise); // Promise { <pending> }
```

### 2. **Fulfilled** ✅
Operation completed successfully.

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('Success!');
});
// Promise { 'Success!' }
```

### 3. **Rejected** ❌
Operation failed.

```javascript
const promise = new Promise((resolve, reject) => {
  reject(new Error('Failed!'));
});
// Promise { <rejected> Error: Failed! }
```

### State Transition Diagram

```
    ┌─────────┐
    │ Pending │
    └────┬────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────┐
│Fulfilled│ │ Rejected │
└─────────┘ └──────────┘
```

**Important:** Once a Promise is fulfilled or rejected, it **cannot change state** (it's immutable).

---

## Creating Your First Promise

### Basic Syntax

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Do async work here
  
  if (/* success */) {
    resolve(value); // Fulfill the promise
  } else {
    reject(error);  // Reject the promise
  }
});
```

### Example: Simulating an API Call

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, name: 'John Doe' });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

const userPromise = fetchUser(1);
console.log(userPromise); // Promise { <pending> }
```

---

## Consuming Promises

Use `.then()` to handle success and `.catch()` to handle errors:

```javascript
fetchUser(1)
  .then(user => {
    console.log('User:', user);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

---

## How Promises Solve Callback Hell

### Before (Callbacks):

```javascript
getUser(1, (error, user) => {
  if (error) return console.error(error);
  
  getOrders(user.id, (error, orders) => {
    if (error) return console.error(error);
    
    getDetails(orders[0].id, (error, details) => {
      if (error) return console.error(error);
      
      console.log(details);
    });
  });
});
```

### After (Promises):

```javascript
getUser(1)
  .then(user => getOrders(user.id))
  .then(orders => getDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(error => console.error(error));
```

**Benefits:**
✅ Flat structure (no nesting)  
✅ Single error handler  
✅ Easy to read top-to-bottom  
✅ Easy to add/remove steps

---

## Promise vs Callback Comparison

| Feature | Callbacks | Promises |
|---------|-----------|----------|
| **Readability** | Nested, hard to read | Flat, chainable |
| **Error Handling** | Repeated in each callback | Single `.catch()` |
| **Composition** | Difficult | Easy with `.then()` |
| **Return Values** | Cannot return | Returns new Promise |
| **Standard API** | No standard | Standardized |

---

## Key Promise Concepts

### 1. **Promises are Eager**
They start executing immediately when created:

```javascript
const promise = new Promise((resolve) => {
  console.log('Executing now!'); // Runs immediately
  resolve();
});
```

### 2. **Promises are Immutable**
Once settled (fulfilled/rejected), they cannot change:

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('First');
  resolve('Second'); // Ignored!
  reject('Error');   // Ignored!
});
```

### 3. **Promises Always Return Promises**
`.then()` always returns a new Promise:

```javascript
const promise1 = Promise.resolve(1);
const promise2 = promise1.then(x => x + 1);
const promise3 = promise2.then(x => x + 1);

promise3.then(result => console.log(result)); // 3
```

---

## Real-World Example

```javascript
function checkInventory(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const inStock = Math.random() > 0.3;
      if (inStock) {
        resolve({ item, quantity: 10 });
      } else {
        reject(new Error(`${item} is out of stock`));
      }
    }, 1000);
  });
}

checkInventory('laptop')
  .then(inventory => {
    console.log('In stock:', inventory);
    return inventory;
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
```

---

## Key Takeaways

✅ A **Promise** represents a future value  
✅ Three states: **pending**, **fulfilled**, **rejected**  
✅ Use `.then()` for success, `.catch()` for errors  
✅ Promises solve **callback hell** with flat chains  
✅ Promises are **immutable** once settled

---

## Next Steps

In the next section, we'll dive deeper into:
- Creating custom Promises
- Promise chaining
- Error handling strategies
- The `.finally()` method
