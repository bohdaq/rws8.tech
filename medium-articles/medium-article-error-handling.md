# JavaScript Error Handling: Build Robust Applications

Proper error handling is essential for building robust, production-ready applications. Master try/catch, custom errors, async error handling, and recovery strategies.

## Basic Error Handling

```javascript
try {
    // Code that might throw an error
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    // Handle the error
    console.error('Operation failed:', error.message);
} finally {
    // Always executes (cleanup)
    cleanup();
}
```

## Error Types

```javascript
// ReferenceError
try {
    console.log(undefinedVariable);
} catch (error) {
    console.log(error.name); // 'ReferenceError'
}

// TypeError
try {
    null.toString();
} catch (error) {
    console.log(error.name); // 'TypeError'
}

// SyntaxError (caught at parse time)
// eval('invalid syntax {');

// RangeError
try {
    new Array(-1);
} catch (error) {
    console.log(error.name); // 'RangeError'
}
```

## Custom Errors

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

// Usage
function validateUser(user) {
    if (!user.email) {
        throw new ValidationError('Email is required');
    }
    if (!user.email.includes('@')) {
        throw new ValidationError('Invalid email format');
    }
}

try {
    validateUser({ name: 'John' });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('Validation failed:', error.message);
    }
}
```

## Async Error Handling

```javascript
// With async/await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new NetworkError('Failed to fetch', response.status);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error('Network error:', error.statusCode);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw if needed
    }
}

// With Promises
fetch('/api/data')
    .then(response => response.json())
    .catch(error => {
        console.error('Failed:', error);
    });
```

## Error Recovery

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

## Best Practices

- Always handle errors appropriately
- Use custom error classes for clarity
- Log errors with context
- Don't swallow errors silently
- Clean up resources in finally blocks
- Re-throw errors when appropriate
- Validate input early

## Key Takeaways

- try/catch/finally for error handling
- Custom error classes provide clarity
- Handle async errors with try/catch or .catch()
- Implement retry logic for transient failures
- Always clean up resources
- Log errors with sufficient context
- Don't ignore errors

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/error-handling](https://rws8.tech/tutorials/javascript/error-handling/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #ErrorHandling #TryCatch #CustomErrors #AsyncErrors #BestPractices
