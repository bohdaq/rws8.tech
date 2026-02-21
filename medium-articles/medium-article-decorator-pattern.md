# JavaScript Decorator Pattern: Extend Functionality Dynamically

The Decorator pattern attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality. Let's master it.

## What is the Decorator Pattern?

Decorators wrap objects to add new behavior without modifying the original object's code.

## Function Decorator

```javascript
function logger(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name} with`, args);
        const result = fn(...args);
        console.log(`Result:`, result);
        return result;
    };
}

function add(a, b) {
    return a + b;
}

const loggedAdd = logger(add);
loggedAdd(2, 3);
// Calling add with [2, 3]
// Result: 5
```

## Method Decorator

```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('From cache');
            return cache.get(key);
        }
        
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const fibonacci = memoize(function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});
```

## Real-World Examples

### API Retry Decorator

```javascript
function retry(fn, retries = 3) {
    return async function(...args) {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn(...args);
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(r => setTimeout(r, 1000 * (i + 1)));
            }
        }
    };
}

const fetchWithRetry = retry(fetch);
```

## When to Use

**Good use cases:**
- Add logging/monitoring
- Caching/memoization
- Validation
- Authorization
- Rate limiting

## Benefits

- Open/Closed Principle
- Single Responsibility
- Composable
- Flexible extension

## Key Takeaways

- Decorators add behavior without modification
- Wrap functions/objects
- Composable and reusable
- Alternative to inheritance
- Great for cross-cutting concerns

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/decorator-pattern](https://rws8.tech/tutorials/javascript/decorator-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #DecoratorPattern #DesignPatterns #FunctionalProgramming #WebDevelopment
