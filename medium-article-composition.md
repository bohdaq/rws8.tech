# Understanding JavaScript Function Composition and Pipelines: Build Complex Logic from Simple Functions

Function composition is one of the most powerful patterns in functional programming. It lets you combine small, simple functions into complex operations, making your code more modular, testable, and reusable.

## What is Function Composition?

Function composition is the process of combining two or more functions to create a new function. When you compose functions, the output of one function becomes the input of the next.

In mathematics: `(f ∘ g)(x) = f(g(x))`

### Basic Example

```javascript
// Two simple functions
const double = x => x * 2;
const addTen = x => x + 10;

// Manual composition
const doubleThenAddTen = x => addTen(double(x));

console.log(doubleThenAddTen(5)); // 20
// double(5) = 10, then addTen(10) = 20
```

## The compose Function

Instead of manually composing functions, we can create a `compose` utility that does it for us. Compose applies functions from right to left:

```javascript
const compose = (...fns) => x => 
    fns.reduceRight((acc, fn) => fn(acc), x);

// Usage
const doubleThenAddTen = compose(addTen, double);

console.log(doubleThenAddTen(5)); // 20
// Reads right-to-left: double(5) = 10, then addTen(10) = 20
```

**How it works:** `compose` takes any number of functions and returns a new function. When called, it applies the functions from right to left using `reduceRight`.

## The pipe Function

Pipe is like compose, but applies functions from left to right, which many find more intuitive:

```javascript
const pipe = (...fns) => x => 
    fns.reduce((acc, fn) => fn(acc), x);

// Usage
const doubleThenAddTen = pipe(double, addTen);

console.log(doubleThenAddTen(5)); // 20
// Reads left-to-right: double(5) = 10, then addTen(10) = 20
```

**Compose vs Pipe:**
- **compose:** Right-to-left (mathematical notation)
- **pipe:** Left-to-right (more intuitive for many)
- Both do the same thing, just in different order

## Real-World Example: Data Transformation

```javascript
// Individual transformation functions
const trim = str => str.trim();
const toLowerCase = str => str.toLowerCase();
const removeSpaces = str => str.replace(/\s+/g, '-');
const addPrefix = prefix => str => `${prefix}${str}`;

// Compose them into a slug generator
const createSlug = pipe(
    trim,
    toLowerCase,
    removeSpaces,
    addPrefix('blog-')
);

console.log(createSlug('  Hello World  '));
// "blog-hello-world"
```

## Point-Free Style

Point-free style means writing functions without mentioning their arguments. Composition enables this style:

```javascript
// With points (arguments mentioned)
const getNames = users => users.map(user => user.name);

// Point-free (no arguments mentioned)
const prop = key => obj => obj[key];
const map = fn => array => array.map(fn);

const getNames = map(prop('name'));

// Usage
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
];

console.log(getNames(users)); // ['Alice', 'Bob']
```

**Benefits:** Point-free style reduces noise, makes code more declarative, and emphasizes function composition over implementation details.

## Currying for Composition

Currying makes functions more composable by allowing partial application:

```javascript
// Not composable - takes multiple arguments
const add = (a, b) => a + b;

// Composable - curried
const add = a => b => a + b;

// Now we can partially apply
const add10 = add(10);
const add20 = add(20);

const pipeline = pipe(
    add10,
    add20,
    x => x * 2
);

console.log(pipeline(5)); // 70
// 5 + 10 = 15, 15 + 20 = 35, 35 * 2 = 70
```

## Real-World Example: User Data Processing

```javascript
// Utility functions
const map = fn => array => array.map(fn);
const filter = predicate => array => array.filter(predicate);
const prop = key => obj => obj[key];
const sortBy = key => array => 
    [...array].sort((a, b) => a[key] > b[key] ? 1 : -1);

// Data transformations
const users = [
    { name: 'Alice', age: 25, active: true },
    { name: 'Bob', age: 17, active: false },
    { name: 'Charlie', age: 30, active: true },
    { name: 'David', age: 22, active: true }
];

// Build a pipeline
const getActiveAdultNames = pipe(
    filter(user => user.active),
    filter(user => user.age >= 18),
    sortBy('name'),
    map(prop('name'))
);

console.log(getActiveAdultNames(users));
// ['Alice', 'Charlie', 'David']
```

## Async Function Composition

Composing async functions requires handling promises:

```javascript
const asyncPipe = (...fns) => x =>
    fns.reduce(
        (promise, fn) => promise.then(fn),
        Promise.resolve(x)
    );

// Async functions
const fetchUser = async id => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
};

const extractName = user => user.name;
const toUpperCase = str => str.toUpperCase();
const addGreeting = name => `Hello, ${name}!`;

// Compose async pipeline
const greetUser = asyncPipe(
    fetchUser,
    extractName,
    toUpperCase,
    addGreeting
);

// Usage
greetUser(1).then(console.log);
// "Hello, JOHN!"
```

## Real-World Example: API Data Pipeline

```javascript
// API transformation pipeline
const asyncPipe = (...fns) => x =>
    fns.reduce((p, fn) => p.then(fn), Promise.resolve(x));

// Transform functions
const fetchData = async url => {
    const response = await fetch(url);
    return response.json();
};

const extractItems = data => data.items;

const filterActive = items => 
    items.filter(item => item.status === 'active');

const mapToViewModel = items =>
    items.map(item => ({
        id: item.id,
        title: item.title,
        displayDate: new Date(item.createdAt).toLocaleDateString()
    }));

const sortByDate = items =>
    items.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );

// Build the pipeline
const getActiveItems = asyncPipe(
    fetchData,
    extractItems,
    filterActive,
    sortByDate,
    mapToViewModel
);

// Usage
getActiveItems('/api/items')
    .then(items => console.log(items))
    .catch(error => console.error(error));
```

## Debugging Composed Functions

Add a trace function to see intermediate values:

```javascript
const trace = label => value => {
    console.log(`${label}:`, value);
    return value;
};

const pipeline = pipe(
    double,
    trace('after double'),
    addTen,
    trace('after addTen'),
    x => x * 3,
    trace('final result')
);

pipeline(5);
// after double: 10
// after addTen: 20
// final result: 60
```

## Common Pitfalls

### Pitfall 1: Mixing sync and async

```javascript
// Wrong - mixing sync and async functions
const bad = pipe(
    syncFn,
    asyncFn,  // Returns a promise!
    syncFn    // Won't work as expected
);

// Right - use asyncPipe for async functions
const good = asyncPipe(
    syncFn,
    asyncFn,
    syncFn
);
```

### Pitfall 2: Not currying multi-argument functions

```javascript
// Wrong - can't compose
const add = (a, b) => a + b;

// Right - curry it
const add = a => b => a + b;
```

### Pitfall 3: Over-composing

Don't compose just for the sake of it. If a simple function is clearer, use it:

```javascript
// Over-engineered
const getName = pipe(prop('user'), prop('name'));

// Simpler
const getName = data => data.user.name;
```

## Key Takeaways

- Composition combines functions to create new functions
- `compose` applies functions right-to-left
- `pipe` applies functions left-to-right
- Curry functions to make them composable
- Point-free style eliminates argument noise
- Use `asyncPipe` for async function composition
- Add `trace` functions for debugging pipelines
- Composition makes code more modular, testable, and reusable

## Learn More

Want to dive deeper into JavaScript Function Composition? Check out the full tutorial with detailed examples and implementations at [rws8.tech/tutorials/javascript/composition](https://rws8.tech/tutorials/javascript/composition/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and functional programming. Follow for more tutorials on modern JavaScript, functional patterns, and web technologies.

**Tags:** #JavaScript #FunctionComposition #Pipelines #FunctionalProgramming #WebDevelopment #Programming #CodingTutorial
