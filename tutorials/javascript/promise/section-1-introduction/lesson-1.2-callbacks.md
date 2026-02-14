# Lesson 1.2: Callback Functions - The Old Way

## Learning Objectives
- Understand what callback functions are
- Learn common callback patterns
- Recognize the "callback hell" problem
- See why we needed a better solution

---

## What is a Callback Function?

A **callback** is a function passed as an argument to another function, to be executed later.

```javascript
function greet(name, callback) {
  console.log('Hello ' + name);
  callback();
}

greet('Alice', function() {
  console.log('Callback executed!');
});

// Output:
// Hello Alice
// Callback executed!
```

---

## Callbacks for Asynchronous Operations

Callbacks were the original way to handle async operations in JavaScript:

```javascript
setTimeout(function() {
  console.log('This runs after 2 seconds');
}, 2000);
```

### Real-World Example: Reading a File

```javascript
const fs = require('fs');

fs.readFile('data.txt', 'utf8', function(error, data) {
  if (error) {
    console.error('Error reading file:', error);
    return;
  }
  console.log('File contents:', data);
});
```

**Pattern:** `function(error, result)`
- First parameter: error (null if successful)
- Second parameter: result data

---

## Common Callback Patterns

### 1. Error-First Callbacks (Node.js Convention)

```javascript
function fetchUser(id, callback) {
  setTimeout(() => {
    if (id < 0) {
      callback(new Error('Invalid ID'), null);
    } else {
      callback(null, { id: id, name: 'User ' + id });
    }
  }, 1000);
}

fetchUser(1, (error, user) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('User:', user);
});
```

### 2. Success/Failure Callbacks

```javascript
function loadImage(url, onSuccess, onFailure) {
  const img = new Image();
  img.onload = () => onSuccess(img);
  img.onerror = () => onFailure(new Error('Failed to load'));
  img.src = url;
}

loadImage(
  'photo.jpg',
  (img) => console.log('Loaded:', img),
  (error) => console.error('Error:', error)
);
```

---

## The Problem: Callback Hell

When you need to perform multiple async operations in sequence, callbacks get **nested**:

```javascript
getUserData(userId, (error, user) => {
  if (error) {
    console.error(error);
    return;
  }
  
  getOrders(user.id, (error, orders) => {
    if (error) {
      console.error(error);
      return;
    }
    
    getOrderDetails(orders[0].id, (error, details) => {
      if (error) {
        console.error(error);
        return;
      }
      
      getShippingInfo(details.shippingId, (error, shipping) => {
        if (error) {
          console.error(error);
          return;
        }
        
        console.log('Finally got shipping info:', shipping);
      });
    });
  });
});
```

### Problems with Callback Hell:

❌ **Hard to read** - Code grows horizontally  
❌ **Hard to maintain** - Difficult to add/remove steps  
❌ **Error handling** - Must repeat error checks  
❌ **Hard to debug** - Stack traces are confusing  
❌ **Difficult to reason about** - Flow is not clear

---

## Why Callbacks Are Limited

### 1. **No Standard Error Handling**
Different libraries use different patterns:
- Error-first callbacks
- Success/failure callbacks
- Event emitters

### 2. **Cannot Return Values**
```javascript
function getData(callback) {
  setTimeout(() => {
    callback('data');
  }, 1000);
}

const result = getData((data) => {
  return data; // This return goes nowhere!
});

console.log(result); // undefined
```

### 3. **Difficult to Compose**
Hard to combine multiple async operations:
- Run in parallel
- Race conditions
- Wait for all to complete

### 4. **Inversion of Control**
You give your callback to another function and trust it will:
- Call it exactly once
- Call it with the right arguments
- Handle errors properly

---

## The Solution: Promises

Promises were introduced to solve these problems:

```javascript
getUserData(userId)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => getShippingInfo(details.shippingId))
  .then(shipping => console.log('Shipping info:', shipping))
  .catch(error => console.error('Error:', error));
```

**Benefits:**
✅ Flat, readable structure  
✅ Single error handler  
✅ Easy to compose  
✅ Standardized API

---

## Key Takeaways

✅ **Callbacks** are functions passed to be executed later  
✅ **Error-first callbacks** are a common Node.js pattern  
✅ **Callback hell** makes code hard to read and maintain  
✅ **Promises** provide a better alternative  

---

## Next Steps

In the next lesson, we'll introduce **Promises** - the modern solution to callback hell!
