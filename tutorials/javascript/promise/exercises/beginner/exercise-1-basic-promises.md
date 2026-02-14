# Exercise 1: Basic Promises

## Difficulty: Beginner

## Objectives
- Create simple Promises
- Use .then() and .catch()
- Understand Promise states

---

## Exercise 1.1: Create Your First Promise

Create a Promise that resolves with the string "Hello, Promises!" after 1 second.

```javascript
// Your code here
function createGreeting() {
  // TODO: Return a Promise that resolves after 1 second
}

// Test your code
createGreeting().then(message => console.log(message));
// Should log: "Hello, Promises!" after 1 second
```

---

## Exercise 1.2: Promise with Condition

Create a function `checkNumber(num)` that returns a Promise:
- Resolves with "Even" if the number is even
- Rejects with an Error "Odd number" if the number is odd

```javascript
// Your code here
function checkNumber(num) {
  // TODO: Return a Promise
}

// Test your code
checkNumber(4)
  .then(result => console.log(result))
  .catch(error => console.error(error.message));
// Should log: "Even"

checkNumber(5)
  .then(result => console.log(result))
  .catch(error => console.error(error.message));
// Should log: "Odd number"
```

---

## Exercise 1.3: Promise Chain

Create a chain that:
1. Starts with the number 5
2. Multiplies it by 2
3. Adds 10
4. Divides by 4
5. Logs the final result

```javascript
// Your code here
Promise.resolve(5)
  // TODO: Add .then() calls to complete the chain
  .then(result => console.log('Final result:', result));
// Should log: "Final result: 5"
```

---

## Exercise 1.4: Error Handling

Create a function `divide(a, b)` that returns a Promise:
- Resolves with the result if b is not zero
- Rejects with an Error "Cannot divide by zero" if b is zero

```javascript
// Your code here
function divide(a, b) {
  // TODO: Return a Promise
}

// Test your code
divide(10, 2)
  .then(result => console.log('Result:', result))
  .catch(error => console.error('Error:', error.message));
// Should log: "Result: 5"

divide(10, 0)
  .then(result => console.log('Result:', result))
  .catch(error => console.error('Error:', error.message));
// Should log: "Error: Cannot divide by zero"
```

---

## Exercise 1.5: Sequential Operations

Create three functions that simulate async operations:
- `fetchUser()` - Returns user object after 500ms
- `fetchPosts(userId)` - Returns posts array after 500ms
- `fetchComments(postId)` - Returns comments array after 500ms

Chain them together to get comments for the first post of a user.

```javascript
// Your code here
function fetchUser() {
  // TODO: Return Promise with user object
}

function fetchPosts(userId) {
  // TODO: Return Promise with posts array
}

function fetchComments(postId) {
  // TODO: Return Promise with comments array
}

// Chain them together
fetchUser()
  // TODO: Add .then() calls
  .then(comments => console.log('Comments:', comments))
  .catch(error => console.error('Error:', error));
```

---

## Bonus Challenge

Create a function `retry(fn, maxAttempts)` that:
- Tries to execute function `fn`
- If it fails, retries up to `maxAttempts` times
- Returns the result if successful
- Throws the last error if all attempts fail

```javascript
// Your code here
async function retry(fn, maxAttempts) {
  // TODO: Implement retry logic
}

// Test with a function that fails twice then succeeds
let attempts = 0;
function unreliableFunction() {
  return new Promise((resolve, reject) => {
    attempts++;
    if (attempts < 3) {
      reject(new Error('Failed'));
    } else {
      resolve('Success!');
    }
  });
}

retry(unreliableFunction, 5)
  .then(result => console.log(result))
  .catch(error => console.error(error));
// Should log: "Success!" after 3 attempts
```

---

## Tips

- Remember to return Promises in .then() to maintain the chain
- Always handle errors with .catch()
- Use setTimeout to simulate async operations
- Test your code with different inputs

---

## Next Steps

Once you complete these exercises, check the solutions in `/solutions/beginner/` and move on to intermediate exercises!
