# JavaScript async/await: Modern Async Syntax Made Simple

async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code. It's the modern standard for handling async operations in JavaScript. Let's master it.

## The Problem with Promises

Promises are great, but chaining can get verbose:

```javascript
fetch('/api/user')
    .then(response => response.json())
    .then(user => fetch(`/api/posts/${user.id}`))
    .then(response => response.json())
    .then(posts => {
        console.log(posts);
    })
    .catch(error => console.error(error));
```

## async/await to the Rescue

```javascript
async function getPosts() {
    try {
        const response = await fetch('/api/user');
        const user = await response.json();
        
        const postsResponse = await fetch(`/api/posts/${user.id}`);
        const posts = await postsResponse.json();
        
        console.log(posts);
    } catch (error) {
        console.error(error);
    }
}
```

Much cleaner!

## async Functions

The `async` keyword makes a function return a Promise:

```javascript
async function greet() {
    return 'Hello';
}

// Equivalent to:
function greet() {
    return Promise.resolve('Hello');
}

// Usage
greet().then(message => console.log(message)); // "Hello"
```

## await Keyword

`await` pauses execution until the Promise resolves:

```javascript
async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
}
```

**Important:** `await` only works inside `async` functions!

```javascript
// Error!
function getData() {
    const data = await fetch('/api/data'); // SyntaxError!
}

// Correct
async function getData() {
    const data = await fetch('/api/data'); // Works!
}
```

## Error Handling with try/catch

```javascript
async function fetchUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}
```

### Multiple try/catch Blocks

```javascript
async function processData() {
    let user;
    try {
        user = await fetchUser(1);
    } catch (error) {
        console.error('User fetch failed:', error);
        return;
    }
    
    try {
        await saveToDatabase(user);
    } catch (error) {
        console.error('Database save failed:', error);
    }
}
```

## Sequential vs Parallel Execution

### Sequential (Slow)

```javascript
async function fetchSequential() {
    const user = await fetchUser(1);      // Wait
    const posts = await fetchPosts(1);    // Then wait
    const comments = await fetchComments(1); // Then wait
    
    return { user, posts, comments };
}
// Total time: 3 seconds (1s + 1s + 1s)
```

### Parallel (Fast)

```javascript
async function fetchParallel() {
    const [user, posts, comments] = await Promise.all([
        fetchUser(1),
        fetchPosts(1),
        fetchComments(1)
    ]);
    
    return { user, posts, comments };
}
// Total time: 1 second (all run simultaneously)
```

## Promise.all for Parallel Execution

```javascript
async function fetchMultipleUsers(ids) {
    const promises = ids.map(id => fetchUser(id));
    const users = await Promise.all(promises);
    return users;
}

// Fetch users 1, 2, 3 in parallel
const users = await fetchMultipleUsers([1, 2, 3]);
```

### Handle Individual Failures

```javascript
async function fetchWithFallback(ids) {
    const promises = ids.map(id => 
        fetchUser(id).catch(error => ({ error: error.message }))
    );
    
    const results = await Promise.all(promises);
    return results;
}
```

## Promise.allSettled

Get all results, even if some fail:

```javascript
async function fetchAll(ids) {
    const promises = ids.map(id => fetchUser(id));
    const results = await Promise.allSettled(promises);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`User ${ids[index]}:`, result.value);
        } else {
            console.error(`User ${ids[index]} failed:`, result.reason);
        }
    });
}
```

## Promise.race

Return first completed Promise:

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
    );
    
    return await Promise.race([fetchPromise, timeoutPromise]);
}
```

## Real-World Examples

### API Request with Retry

```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

### Batch Processing

```javascript
async function processBatch(items, batchSize = 5) {
    const results = [];
    
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(item => processItem(item))
        );
        results.push(...batchResults);
    }
    
    return results;
}
```

### Dependent Async Operations

```javascript
async function createUserWithProfile(userData) {
    const user = await createUser(userData);
    const profile = await createProfile(user.id, userData.profile);
    const avatar = await uploadAvatar(user.id, userData.avatar);
    
    return { user, profile, avatar };
}
```

## Common Pitfalls

### 1. Forgetting await

```javascript
// Wrong - returns Promise, not data
async function getData() {
    const data = fetch('/api/data'); // Missing await!
    return data; // Returns Promise
}

// Right
async function getData() {
    const data = await fetch('/api/data');
    return data;
}
```

### 2. Sequential when parallel is better

```javascript
// Slow - sequential
async function fetchData() {
    const users = await fetchUsers();
    const posts = await fetchPosts();
    return { users, posts };
}

// Fast - parallel
async function fetchData() {
    const [users, posts] = await Promise.all([
        fetchUsers(),
        fetchPosts()
    ]);
    return { users, posts };
}
```

### 3. Not handling errors

```javascript
// Bad - unhandled errors
async function fetchData() {
    const data = await fetch('/api/data');
    return data;
}

// Good - error handling
async function fetchData() {
    try {
        const data = await fetch('/api/data');
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
```

## Best Practices

**1. Always handle errors**

```javascript
async function safeOperation() {
    try {
        return await riskyOperation();
    } catch (error) {
        console.error(error);
        return defaultValue;
    }
}
```

**2. Use Promise.all for independent operations**

```javascript
const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
]);
```

**3. Avoid mixing async/await with .then()**

```javascript
// Bad - mixing styles
async function getData() {
    return await fetch('/api/data')
        .then(r => r.json());
}

// Good - consistent style
async function getData() {
    const response = await fetch('/api/data');
    return await response.json();
}
```

**4. Return early on errors**

```javascript
async function processUser(id) {
    const user = await fetchUser(id);
    if (!user) return null;
    
    const processed = await processData(user);
    if (!processed) return null;
    
    return processed;
}
```

## Key Takeaways

- async functions always return Promises
- await pauses execution until Promise resolves
- Use try/catch for error handling
- Promise.all for parallel execution
- Promise.allSettled to handle all results
- Promise.race for timeout patterns
- Avoid sequential when parallel is possible
- Always handle errors properly
- Modern standard for async JavaScript

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/async-await](https://rws8.tech/tutorials/javascript/async-await/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and modern web development.

**Tags:** #JavaScript #AsyncAwait #Promises #AsynchronousProgramming #ModernJavaScript #WebDevelopment
