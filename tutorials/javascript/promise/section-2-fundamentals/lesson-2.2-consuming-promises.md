# Lesson 2.2: Consuming Promises with .then(), .catch(), and .finally()

## Learning Objectives
- Master the `.then()` method
- Learn proper error handling with `.catch()`
- Understand cleanup with `.finally()`
- Chain Promise methods effectively

---

## The .then() Method

`.then()` is used to handle a fulfilled Promise:

```javascript
promise.then(onFulfilled, onRejected);
```

### Basic Usage

```javascript
const promise = Promise.resolve('Hello');

promise.then(value => {
  console.log(value); // 'Hello'
});
```

### .then() Always Returns a Promise

```javascript
const promise1 = Promise.resolve(1);
const promise2 = promise1.then(x => x + 1);
const promise3 = promise2.then(x => x + 1);

promise3.then(result => console.log(result)); // 3
```

---

## Returning Values in .then()

### 1. Return a Value

The next `.then()` receives that value:

```javascript
Promise.resolve(5)
  .then(x => x * 2)      // Returns 10
  .then(x => x + 3)      // Returns 13
  .then(x => console.log(x)); // 13
```

### 2. Return a Promise

The next `.then()` waits for that Promise:

```javascript
Promise.resolve(1)
  .then(x => {
    return new Promise(resolve => {
      setTimeout(() => resolve(x * 2), 1000);
    });
  })
  .then(x => console.log(x)); // 2 (after 1 second)
```

### 3. Return Nothing (undefined)

```javascript
Promise.resolve(5)
  .then(x => {
    console.log(x); // 5
    // No return statement
  })
  .then(x => console.log(x)); // undefined
```

---

## The .catch() Method

`.catch()` handles rejected Promises:

```javascript
promise.catch(onRejected);

// Equivalent to:
promise.then(null, onRejected);
```

### Basic Error Handling

```javascript
Promise.reject(new Error('Failed'))
  .catch(error => {
    console.error('Caught:', error.message);
  });
```

### .catch() in a Chain

```javascript
fetchUser(1)
  .then(user => fetchOrders(user.id))
  .then(orders => processOrders(orders))
  .catch(error => {
    console.error('Error anywhere in chain:', error);
  });
```

**Important:** `.catch()` catches errors from **any previous step** in the chain.

---

## Error Propagation

Errors propagate down the chain until caught:

```javascript
Promise.resolve(1)
  .then(x => {
    throw new Error('Oops!');
  })
  .then(x => {
    console.log('This will not run');
  })
  .then(x => {
    console.log('This will not run either');
  })
  .catch(error => {
    console.error('Caught here:', error.message);
  });
```

---

## The .finally() Method

`.finally()` runs regardless of success or failure:

```javascript
promise.finally(onFinally);
```

### Use Cases

Perfect for cleanup operations:

```javascript
showLoadingSpinner();

fetchData()
  .then(data => displayData(data))
  .catch(error => showError(error))
  .finally(() => {
    hideLoadingSpinner(); // Always runs
  });
```

### Key Characteristics

1. **No arguments:** `.finally()` callback receives no arguments
2. **Transparent:** Passes through the previous value/error
3. **Always runs:** Executes on both success and failure

```javascript
Promise.resolve('value')
  .finally(() => {
    console.log('Cleanup');
    // Cannot access 'value' here
  })
  .then(value => {
    console.log(value); // 'value' - passed through
  });
```

---

## Chaining .then(), .catch(), and .finally()

### Pattern 1: Standard Chain

```javascript
doSomething()
  .then(result => doSomethingElse(result))
  .then(newResult => doThirdThing(newResult))
  .catch(error => console.error(error))
  .finally(() => cleanup());
```

### Pattern 2: Multiple .catch() Handlers

```javascript
doSomething()
  .then(result => {
    return doSomethingElse(result);
  })
  .catch(error => {
    console.error('Error in doSomething:', error);
    return 'fallback value';
  })
  .then(result => {
    return doThirdThing(result);
  })
  .catch(error => {
    console.error('Error in doThirdThing:', error);
  });
```

### Pattern 3: Recovering from Errors

`.catch()` can return a value to recover:

```javascript
fetchPrimaryAPI()
  .catch(error => {
    console.log('Primary failed, trying backup');
    return fetchBackupAPI();
  })
  .then(data => {
    console.log('Got data:', data);
  });
```

---

## Advanced .then() Usage

### Two Arguments: onFulfilled and onRejected

```javascript
promise.then(
  value => console.log('Success:', value),
  error => console.error('Error:', error)
);
```

**Note:** Using `.catch()` is generally preferred for readability.

### Difference Between .then(null, onRejected) and .catch()

They're almost the same, but `.catch()` also catches errors from the success handler:

```javascript
// This catches errors from onFulfilled
promise
  .then(value => {
    throw new Error('Error in handler');
  })
  .catch(error => console.error(error)); // Catches it!

// This does NOT catch errors from onFulfilled
promise.then(
  value => {
    throw new Error('Error in handler');
  },
  error => console.error(error) // Doesn't catch it!
);
```

---

## Real-World Examples

### Example 1: API Call with Loading State

```javascript
let isLoading = false;

function fetchUserData(userId) {
  isLoading = true;
  
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data:', data);
      return data;
    })
    .catch(error => {
      console.error('Failed to fetch user:', error);
      throw error; // Re-throw to propagate
    })
    .finally(() => {
      isLoading = false;
    });
}
```

### Example 2: Retry Logic

```javascript
function fetchWithRetry(url, retries = 3) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        return fetchWithRetry(url, retries - 1);
      }
      throw error;
    });
}
```

### Example 3: Form Submission

```javascript
function submitForm(formData) {
  const submitButton = document.querySelector('#submit');
  submitButton.disabled = true;
  
  return fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(result => {
      showSuccessMessage('Form submitted!');
      return result;
    })
    .catch(error => {
      showErrorMessage('Submission failed: ' + error.message);
      throw error;
    })
    .finally(() => {
      submitButton.disabled = false;
    });
}
```

---

## Common Mistakes

### ❌ Forgetting to Return

```javascript
// Bad - breaks the chain
promise
  .then(result => {
    doSomething(result); // Not returned!
  })
  .then(result => {
    console.log(result); // undefined
  });

// Good
promise
  .then(result => {
    return doSomething(result);
  })
  .then(result => {
    console.log(result); // Correct value
  });
```

### ❌ Nesting Instead of Chaining

```javascript
// Bad - callback hell with Promises
promise.then(result => {
  doSomething(result).then(newResult => {
    doMore(newResult).then(finalResult => {
      console.log(finalResult);
    });
  });
});

// Good - flat chain
promise
  .then(result => doSomething(result))
  .then(newResult => doMore(newResult))
  .then(finalResult => console.log(finalResult));
```

### ❌ Not Handling Errors

```javascript
// Bad - unhandled rejection
promise.then(result => {
  console.log(result);
});

// Good - always handle errors
promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
```

---

## Key Takeaways

✅ `.then()` handles fulfilled Promises and returns a new Promise  
✅ `.catch()` handles rejected Promises from any previous step  
✅ `.finally()` runs cleanup code regardless of outcome  
✅ Always **return** values in `.then()` to maintain the chain  
✅ Prefer **flat chains** over nested Promises  
✅ Always **handle errors** with `.catch()`

---

## Practice Exercise

Create a chain that:
1. Starts with a number
2. Doubles it
3. Adds 10
4. Throws an error if result > 50
5. Catches the error and returns 0
6. Logs "Done" in finally

<details>
<summary>Solution</summary>

```javascript
Promise.resolve(15)
  .then(x => x * 2)
  .then(x => x + 10)
  .then(x => {
    if (x > 50) throw new Error('Too large!');
    return x;
  })
  .catch(error => {
    console.error(error.message);
    return 0;
  })
  .finally(() => {
    console.log('Done');
  })
  .then(result => console.log('Final result:', result));
```
</details>

---

## Next Steps

Next, we'll learn about **Promise chaining** and how to sequence multiple async operations elegantly.
