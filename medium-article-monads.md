# Understanding JavaScript Monads: Master Functional Programming Patterns

Monads sound intimidating, but they're just a design pattern for handling values in a predictable way. They help you write safer code by making error handling, null checks, and side effects explicit and composable.

## What is a Monad?

A monad is a design pattern that wraps a value and provides a way to chain operations on that value. Think of it as a box that:
- Contains a value
- Provides a way to transform the value (`map`)
- Provides a way to chain operations that return new monads (`flatMap` or `chain`)

Monads help you handle edge cases (null, errors, side effects) in a consistent, composable way.

## The Maybe Monad: Handling Null Safety

The Maybe monad handles values that might be null or undefined. It has two variants: `Just` (has a value) and `Nothing` (no value).

### Implementation

```javascript
class Maybe {
    constructor(value) {
        this.value = value;
    }

    static of(value) {
        return new Maybe(value);
    }

    isNothing() {
        return this.value === null || this.value === undefined;
    }

    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this.value));
    }

    flatMap(fn) {
        return this.isNothing() ? this : fn(this.value);
    }

    getOrElse(defaultValue) {
        return this.isNothing() ? defaultValue : this.value;
    }
}
```

### Usage Example

```javascript
// Without Maybe - lots of null checks
function getUserDiscount(userId) {
    const user = findUser(userId);
    if (!user) return 0;
    
    const membership = user.membership;
    if (!membership) return 0;
    
    const discount = membership.discount;
    if (!discount) return 0;
    
    return discount;
}

// With Maybe - clean and safe
function getUserDiscount(userId) {
    return Maybe.of(findUser(userId))
        .map(user => user.membership)
        .map(membership => membership.discount)
        .getOrElse(0);
}
```

**How it works:** If any step returns null/undefined, `map` stops executing and returns `Nothing`. No null checks needed!

### Real-World Example: Safe Property Access

```javascript
const data = {
    user: {
        profile: {
            address: {
                city: 'San Francisco'
            }
        }
    }
};

// Safe with Maybe
const safeCity = Maybe.of(data)
    .map(d => d.user)
    .map(u => u.profile)
    .map(p => p.address)
    .map(a => a.city)
    .getOrElse('Unknown');

console.log(safeCity); // "San Francisco"

// If data is incomplete
const incompleteData = { user: {} };
const result = Maybe.of(incompleteData)
    .map(d => d.user)
    .map(u => u.profile)
    .map(p => p.address)
    .map(a => a.city)
    .getOrElse('Unknown');

console.log(result); // "Unknown"
```

## The Either Monad: Handling Errors

The Either monad represents a value that can be one of two types: `Left` (error) or `Right` (success). By convention, Right is the "right" (correct) path.

### Implementation

```javascript
class Either {
    constructor(value, isLeft = false) {
        this.value = value;
        this.isLeft = isLeft;
    }

    static left(value) {
        return new Either(value, true);
    }

    static right(value) {
        return new Either(value, false);
    }

    map(fn) {
        return this.isLeft ? this : Either.right(fn(this.value));
    }

    flatMap(fn) {
        return this.isLeft ? this : fn(this.value);
    }

    getOrElse(defaultValue) {
        return this.isLeft ? defaultValue : this.value;
    }

    fold(leftFn, rightFn) {
        return this.isLeft ? leftFn(this.value) : rightFn(this.value);
    }
}
```

### Usage Example

```javascript
// Without Either - try-catch everywhere
function processUser(userId) {
    try {
        const user = findUser(userId);
        if (!user) throw new Error('User not found');
        
        const validated = validateUser(user);
        if (!validated) throw new Error('Invalid user');
        
        return saveUser(validated);
    } catch (error) {
        console.error(error);
        return null;
    }
}

// With Either - functional error handling
function findUserEither(userId) {
    const user = findUser(userId);
    return user 
        ? Either.right(user) 
        : Either.left('User not found');
}

function validateUserEither(user) {
    return validateUser(user)
        ? Either.right(user)
        : Either.left('Invalid user');
}

function saveUserEither(user) {
    try {
        const saved = saveUser(user);
        return Either.right(saved);
    } catch (error) {
        return Either.left(error.message);
    }
}

function processUser(userId) {
    return findUserEither(userId)
        .flatMap(validateUserEither)
        .flatMap(saveUserEither)
        .fold(
            error => console.error('Error:', error),
            user => console.log('Success:', user)
        );
}
```

**How it works:** If any step returns `Left` (error), the chain stops and the error propagates. Only `Right` values continue through the chain.

### Real-World Example: Form Validation

```javascript
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
        ? Either.right(email)
        : Either.left('Invalid email format');
}

function validateAge(age) {
    return age >= 18
        ? Either.right(age)
        : Either.left('Must be 18 or older');
}

function createUser(email, age) {
    return validateEmail(email)
        .flatMap(() => validateAge(age))
        .map(() => ({ email, age, createdAt: new Date() }))
        .fold(
            error => ({ success: false, error }),
            user => ({ success: true, user })
        );
}

console.log(createUser('test@example.com', 25));
// { success: true, user: { email: '...', age: 25, createdAt: ... } }

console.log(createUser('invalid-email', 25));
// { success: false, error: 'Invalid email format' }

console.log(createUser('test@example.com', 16));
// { success: false, error: 'Must be 18 or older' }
```

## The IO Monad: Handling Side Effects

The IO monad wraps side effects (like reading files, making API calls, or logging) to keep your functions pure. The side effect doesn't execute until you explicitly run it.

### Implementation

```javascript
class IO {
    constructor(effect) {
        this.effect = effect;
    }

    static of(value) {
        return new IO(() => value);
    }

    map(fn) {
        return new IO(() => fn(this.effect()));
    }

    flatMap(fn) {
        return new IO(() => fn(this.effect()).effect());
    }

    run() {
        return this.effect();
    }
}
```

### Usage Example

```javascript
// Impure function - side effect happens immediately
function getUserName() {
    return prompt('Enter your name:'); // Side effect!
}

function greetUser() {
    const name = getUserName();
    console.log(`Hello, ${name}!`); // Another side effect!
}

// Pure function with IO - side effects are deferred
function getUserNameIO() {
    return new IO(() => prompt('Enter your name:'));
}

function greetUserIO(name) {
    return new IO(() => console.log(`Hello, ${name}!`));
}

// Build the program (no side effects yet)
const program = getUserNameIO()
    .flatMap(name => greetUserIO(name));

// Execute when ready (side effects happen here)
program.run();
```

**Why this matters:** The IO monad lets you compose side effects without executing them. This makes your code testable and allows you to control when side effects happen.

### Real-World Example: API Calls

```javascript
function fetchUserIO(userId) {
    return new IO(() => fetch(`/api/users/${userId}`).then(r => r.json()));
}

function fetchPostsIO(userId) {
    return new IO(() => fetch(`/api/posts?userId=${userId}`).then(r => r.json()));
}

function displayDataIO(data) {
    return new IO(() => {
        document.getElementById('output').textContent = JSON.stringify(data);
    });
}

// Compose the program
const program = fetchUserIO(1)
    .flatMap(user => 
        fetchPostsIO(user.id)
            .map(posts => ({ user, posts }))
    )
    .flatMap(displayDataIO);

// Execute when ready (e.g., on button click)
document.getElementById('loadBtn').addEventListener('click', () => {
    program.run();
});
```

## When to Use Each Monad

**Use Maybe when:**
- Accessing nested object properties
- Working with optional values
- Avoiding null/undefined checks

**Use Either when:**
- Form validation
- API error handling
- Any operation that can fail with a reason

**Use IO when:**
- File system operations
- Network requests
- DOM manipulation
- Any side effect you want to defer

## Common Pitfalls

### Pitfall 1: Forgetting to run IO

```javascript
// Wrong - IO never executes
const io = new IO(() => console.log('Hello'));

// Right - call run()
io.run();
```

### Pitfall 2: Using map instead of flatMap

```javascript
// Wrong - creates nested monads
Maybe.of(5).map(x => Maybe.of(x * 2)); // Maybe(Maybe(10))

// Right - use flatMap to flatten
Maybe.of(5).flatMap(x => Maybe.of(x * 2)); // Maybe(10)
```

### Pitfall 3: Overusing monads

Not everything needs to be a monad. Use them when they solve a real problem (null safety, error handling, side effects), not just for the sake of being "functional."

## Key Takeaways

- Monads are containers that provide `map` and `flatMap` for chaining operations
- Maybe monad handles null/undefined values safely
- Either monad handles errors functionally without try-catch
- IO monad defers side effects, keeping functions pure
- Use `map` for transformations, `flatMap` for operations that return monads
- Monads make code more composable, testable, and predictable

## Learn More

Want to dive deeper into JavaScript Monads? Check out the full tutorial with detailed examples and implementations at [rws8.tech/tutorials/javascript/monads](https://rws8.tech/tutorials/javascript/monads/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and functional programming. Follow for more tutorials on modern JavaScript, functional patterns, and web technologies.

**Tags:** #JavaScript #Monads #FunctionalProgramming #WebDevelopment #Maybe #Either #IO #Programming #CodingTutorial
