# Lesson 3.1: Promise.all()

## Learning Objectives
- Understand how Promise.all() works
- Learn when to use parallel Promise execution
- Handle failures in Promise.all()
- Master common patterns and use cases

---

## What is Promise.all()?

`Promise.all()` takes an array of Promises and returns a single Promise that:
- ✅ **Fulfills** when ALL Promises fulfill
- ❌ **Rejects** when ANY Promise rejects

```javascript
Promise.all([promise1, promise2, promise3])
  .then(results => {
    // results is an array: [result1, result2, result3]
  })
  .catch(error => {
    // First rejection
  });
```

---

## Basic Usage

### Example: Fetching Multiple Users

```javascript
const user1 = fetchUser(1);
const user2 = fetchUser(2);
const user3 = fetchUser(3);

Promise.all([user1, user2, user3])
  .then(users => {
    console.log('All users:', users);
    // users = [userData1, userData2, userData3]
  })
  .catch(error => {
    console.error('Failed to fetch users:', error);
  });
```

### Results Order

Results array matches the order of input Promises:

```javascript
Promise.all([
  delay(1000, 'third'),   // Takes longest
  delay(100, 'first'),    // Finishes first
  delay(500, 'second')    // Finishes second
])
.then(results => {
  console.log(results); // ['third', 'first', 'second']
  // Order matches input, not completion time!
});
```

---

## Why Use Promise.all()?

### Sequential vs Parallel Execution

**Sequential (Slow):**
```javascript
const user = await fetchUser(1);      // Wait 1s
const posts = await fetchPosts(1);    // Wait 1s
const comments = await fetchComments(1); // Wait 1s
// Total: 3 seconds
```

**Parallel (Fast):**
```javascript
const [user, posts, comments] = await Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchComments(1)
]);
// Total: 1 second (all run simultaneously)
```

**Performance Gain:** 3x faster! 🚀

---

## Handling Failures

### Fail-Fast Behavior

Promise.all() rejects immediately when ANY Promise rejects:

```javascript
Promise.all([
  Promise.resolve('Success 1'),
  Promise.reject(new Error('Failed!')),
  Promise.resolve('Success 2')
])
.then(results => {
  console.log('All succeeded'); // Never runs
})
.catch(error => {
  console.error('One failed:', error.message);
  // Rejects immediately with first error
});
```

### Handling Individual Failures

Wrap each Promise to prevent fail-fast:

```javascript
function wrapPromise(promise) {
  return promise
    .then(result => ({ status: 'fulfilled', value: result }))
    .catch(error => ({ status: 'rejected', reason: error }));
}

const promises = [
  fetchUser(1),
  fetchUser(999), // Will fail
  fetchUser(3)
].map(wrapPromise);

Promise.all(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.error('Failed:', result.reason.message);
      }
    });
  });
```

**Note:** This is similar to `Promise.allSettled()` (covered in Lesson 3.3).

---

## Common Patterns

### Pattern 1: Fetching Multiple Resources

```javascript
async function loadDashboard(userId) {
  const [user, notifications, settings, activity] = await Promise.all([
    fetchUser(userId),
    fetchNotifications(userId),
    fetchSettings(userId),
    fetchActivity(userId)
  ]);

  return {
    user,
    notifications,
    settings,
    activity
  };
}
```

### Pattern 2: Batch Processing

```javascript
async function processUsers(userIds) {
  const users = await Promise.all(
    userIds.map(id => fetchUser(id))
  );
  
  return users;
}

processUsers([1, 2, 3, 4, 5])
  .then(users => console.log('Processed:', users.length));
```

### Pattern 3: Parallel Validation

```javascript
async function validateForm(formData) {
  const [emailValid, usernameValid, passwordValid] = await Promise.all([
    validateEmail(formData.email),
    validateUsername(formData.username),
    validatePassword(formData.password)
  ]);

  return emailValid && usernameValid && passwordValid;
}
```

### Pattern 4: Multiple API Endpoints

```javascript
async function aggregateData() {
  const [weather, news, stocks] = await Promise.all([
    fetch('https://api.weather.com/current').then(r => r.json()),
    fetch('https://api.news.com/headlines').then(r => r.json()),
    fetch('https://api.stocks.com/prices').then(r => r.json())
  ]);

  return { weather, news, stocks };
}
```

---

## Working with Non-Promise Values

Promise.all() accepts non-Promise values:

```javascript
Promise.all([
  Promise.resolve(1),
  2,                    // Regular value
  Promise.resolve(3),
  'hello'               // Regular value
])
.then(results => {
  console.log(results); // [1, 2, 3, 'hello']
});
```

---

## Real-World Examples

### Example 1: Image Preloader

```javascript
function preloadImages(urls) {
  const promises = urls.map(url => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load ${url}`));
      img.src = url;
    });
  });

  return Promise.all(promises);
}

preloadImages([
  'image1.jpg',
  'image2.jpg',
  'image3.jpg'
])
.then(images => {
  console.log('All images loaded:', images.length);
})
.catch(error => {
  console.error('Failed to load images:', error);
});
```

### Example 2: Database Batch Insert

```javascript
async function batchInsertUsers(users) {
  const insertPromises = users.map(user => {
    return db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [user.name, user.email]
    );
  });

  const results = await Promise.all(insertPromises);
  console.log(`Inserted ${results.length} users`);
  return results;
}
```

### Example 3: Microservices Aggregation

```javascript
async function getOrderDetails(orderId) {
  const [order, customer, items, shipping] = await Promise.all([
    orderService.getOrder(orderId),
    customerService.getCustomer(orderId),
    inventoryService.getItems(orderId),
    shippingService.getStatus(orderId)
  ]);

  return {
    order,
    customer,
    items,
    shipping,
    totalPrice: items.reduce((sum, item) => sum + item.price, 0)
  };
}
```

---

## Performance Considerations

### Limiting Concurrency

Too many parallel requests can overwhelm servers:

```javascript
// Bad: 1000 simultaneous requests
const results = await Promise.all(
  userIds.map(id => fetchUser(id))
);

// Good: Process in batches
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

const results = await batchProcess(userIds, 10, fetchUser);
```

---

## Common Mistakes

### ❌ Not Handling Rejections

```javascript
// Bad - unhandled rejection
Promise.all([promise1, promise2]);

// Good - always handle errors
Promise.all([promise1, promise2])
  .catch(error => console.error(error));
```

### ❌ Sequential Instead of Parallel

```javascript
// Bad - runs sequentially
const results = [];
for (const id of userIds) {
  results.push(await fetchUser(id));
}

// Good - runs in parallel
const results = await Promise.all(
  userIds.map(id => fetchUser(id))
);
```

### ❌ Forgetting to Return Promises

```javascript
// Bad - returns undefined
Promise.all([
  fetchUser(1).then(user => {
    console.log(user);
  })
]);

// Good - returns the value
Promise.all([
  fetchUser(1).then(user => {
    console.log(user);
    return user;
  })
]);
```

---

## Key Takeaways

✅ `Promise.all()` runs Promises **in parallel**  
✅ Returns results in **same order** as input  
✅ **Rejects immediately** if any Promise fails (fail-fast)  
✅ Perfect for **independent operations** that can run simultaneously  
✅ Significantly **improves performance** vs sequential execution  
✅ Consider **batching** for large numbers of operations

---

## Practice Exercise

Create a function that fetches user data, posts, and comments in parallel, and returns a combined object. Handle errors gracefully.

<details>
<summary>Solution</summary>

```javascript
async function getUserProfile(userId) {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(userId),
      fetchPosts(userId),
      fetchComments(userId)
    ]);

    return {
      user,
      posts,
      comments,
      totalPosts: posts.length,
      totalComments: comments.length
    };
  } catch (error) {
    console.error('Failed to load profile:', error);
    throw error;
  }
}
```
</details>

---

## Next Steps

Next, we'll learn about `Promise.race()` - when you only need the fastest Promise to complete!
