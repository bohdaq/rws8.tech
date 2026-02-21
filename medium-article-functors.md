# Understanding JavaScript Functors and Applicatives: Master Functional Programming Patterns

Functors and Applicatives sound complex, but they're fundamental patterns that make functional programming powerful and practical. They let you work with values in containers without unwrapping them, making your code more composable and predictable.

## What is a Functor?

A functor is a container that implements a `map` method. The `map` method applies a function to the value(s) inside the container and returns a new container with the transformed value(s).

Think of it as a box with a value inside. You can transform what's in the box without opening it.

### Functor Implementation

```javascript
class Box {
    constructor(value) {
        this.value = value;
    }

    map(fn) {
        return new Box(fn(this.value));
    }

    inspect() {
        return `Box(${this.value})`;
    }
}

// Usage
const box = new Box(5);
const result = box
    .map(x => x * 2)
    .map(x => x + 10);

console.log(result.inspect()); // Box(20)
```

**How it works:** Each `map` transforms the value inside the box and returns a new box. You never directly access the value - you always work through `map`.

## The Functor Laws

For something to be a functor, it must follow two laws:

### 1. Identity Law

```javascript
// Mapping with the identity function should do nothing
const identity = x => x;
box.map(identity) === box.map(x => x)
```

### 2. Composition Law

```javascript
// Mapping with composed functions should be the same as
// mapping with each function separately
const f = x => x * 2;
const g = x => x + 10;
const compose = (f, g) => x => f(g(x));

box.map(compose(f, g)) === box.map(g).map(f)
```

## Real-World Functor Example: Safe Division

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
        return this.isNothing() 
            ? Maybe.of(null) 
            : Maybe.of(fn(this.value));
    }

    getOrElse(defaultValue) {
        return this.isNothing() ? defaultValue : this.value;
    }
}

// Safe calculation chain
function calculate(a, b, c) {
    return Maybe.of(a)
        .map(x => x / b)  // Could be division by zero
        .map(x => x * c)
        .map(x => x + 100)
        .getOrElse(0);
}

console.log(calculate(10, 2, 5)); // 125
console.log(calculate(10, 0, 5)); // 0 (safe!)
```

## What is an Applicative Functor?

An applicative functor is a functor that can apply a wrapped function to a wrapped value. It has two key methods:
- `of` (or `pure`) - Wraps a value in the functor
- `ap` (apply) - Applies a wrapped function to a wrapped value

### Applicative Implementation

```javascript
class Box {
    constructor(value) {
        this.value = value;
    }

    static of(value) {
        return new Box(value);
    }

    map(fn) {
        return Box.of(fn(this.value));
    }

    ap(boxWithFunction) {
        return boxWithFunction.map(fn => fn(this.value));
    }

    inspect() {
        return `Box(${this.value})`;
    }
}

// Usage
const add = a => b => a + b;

const result = Box.of(5)
    .map(add)  // Box(b => 5 + b)
    .ap(Box.of(10));  // Box(15)

console.log(result.inspect()); // Box(15)
```

**How it works:** `map(add)` creates a box containing a partially applied function. `ap` applies that function to another boxed value.

## Lifting Functions with Applicatives

Applicatives let you "lift" regular functions to work with wrapped values:

```javascript
// Regular function
const add3 = (a, b, c) => a + b + c;

// Curried version for applicatives
const add3Curried = a => b => c => a + b + c;

// Lift it to work with Box values
const result = Box.of(add3Curried)
    .ap(Box.of(1))
    .ap(Box.of(2))
    .ap(Box.of(3));

console.log(result.inspect()); // Box(6)
```

## Real-World Example: Form Validation

```javascript
class Validation {
    constructor(value, isValid = true) {
        this.value = value;
        this.isValid = isValid;
    }

    static success(value) {
        return new Validation(value, true);
    }

    static failure(error) {
        return new Validation(error, false);
    }

    map(fn) {
        return this.isValid 
            ? Validation.success(fn(this.value))
            : this;
    }

    ap(validationWithFn) {
        if (!this.isValid) return this;
        if (!validationWithFn.isValid) return validationWithFn;
        return this.map(validationWithFn.value);
    }

    static of(value) {
        return Validation.success(value);
    }
}

// Validation functions
const validateEmail = email => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? Validation.success(email)
        : Validation.failure('Invalid email');

const validateAge = age =>
    age >= 18
        ? Validation.success(age)
        : Validation.failure('Must be 18 or older');

const validateName = name =>
    name.length >= 2
        ? Validation.success(name)
        : Validation.failure('Name too short');

// Create user object from validated inputs
const createUser = name => email => age => ({
    name,
    email,
    age,
    createdAt: new Date()
});

// Combine validations
const user = validateName('John')
    .map(createUser)
    .ap(validateEmail('john@example.com'))
    .ap(validateAge(25));

console.log(user);
// Validation { value: { name: 'John', email: '...', age: 25, ... }, isValid: true }
```

## Key Differences: Functor vs Applicative vs Monad

**Functor:**
- Has `map`
- Transforms values inside containers
- Example: `Box(5).map(x => x * 2)`

**Applicative:**
- Has `map` and `ap`
- Applies wrapped functions to wrapped values
- Example: `Box(5).map(add).ap(Box(10))`

**Monad:**
- Has `map`, `ap`, and `flatMap`
- Flattens nested containers
- Example: `Box(5).flatMap(x => Box(x * 2))`

## When to Use What

**Use Functors when:**
- You need to transform a single wrapped value
- You're chaining simple transformations
- You don't need to combine multiple wrapped values

**Use Applicatives when:**
- You need to combine multiple wrapped values
- You're validating multiple fields
- You're running independent async operations in parallel

**Use Monads when:**
- Operations depend on previous results
- You need to flatten nested containers
- You're chaining dependent async operations

## Common Pitfalls

### Pitfall 1: Not currying functions

```javascript
// Wrong - can't use with ap
const add = (a, b) => a + b;

// Right - curried for ap
const add = a => b => a + b;
```

### Pitfall 2: Using flatMap when map + ap would work

```javascript
// Overcomplicated with flatMap
Box.of(5).flatMap(a => Box.of(10).map(b => a + b));

// Simpler with applicative
Box.of(5).map(a => b => a + b).ap(Box.of(10));
```

## Key Takeaways

- Functors implement `map` to transform wrapped values
- Functors must follow identity and composition laws
- Applicatives add `ap` to apply wrapped functions to wrapped values
- Applicatives let you combine multiple wrapped values
- Use applicatives for parallel operations and independent validations
- Curry functions to use them with applicatives
- Every monad is an applicative, every applicative is a functor

## Learn More

Want to dive deeper into JavaScript Functors and Applicatives? Check out the full tutorial with detailed examples and implementations at [rws8.tech/tutorials/javascript/functors](https://rws8.tech/tutorials/javascript/functors/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and functional programming. Follow for more tutorials on modern JavaScript, functional patterns, and web technologies.

**Tags:** #JavaScript #Functors #Applicatives #FunctionalProgramming #WebDevelopment #Programming #CodingTutorial
