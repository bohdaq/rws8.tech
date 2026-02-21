# JavaScript Spread and Rest Operators: Master the Three Dots

The spread (...) and rest (...) operators look identical but serve opposite purposes. They're essential tools in modern JavaScript that make your code cleaner and more expressive. Let's master both.

## Spread vs Rest: Same Syntax, Different Purpose

**Spread:** Expands an array/object into individual elements
**Rest:** Collects multiple elements into an array

```javascript
// Spread - expands
const arr = [1, 2, 3];
console.log(...arr); // 1 2 3

// Rest - collects
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
}
```

## Spread Operator with Arrays

### Copy Arrays

```javascript
const original = [1, 2, 3];
const copy = [...original];

copy.push(4);
console.log(original); // [1, 2, 3] - unchanged
console.log(copy);     // [1, 2, 3, 4]
```

### Merge Arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Insert in middle
const combined = [...arr1, 99, ...arr2];
console.log(combined); // [1, 2, 3, 99, 4, 5, 6]
```

### Math Operations

```javascript
const numbers = [5, 2, 8, 1, 9];

console.log(Math.max(...numbers)); // 9
console.log(Math.min(...numbers)); // 1
```

### Convert to Array

```javascript
// String to array
const chars = [...'hello'];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// NodeList to array
const divs = [...document.querySelectorAll('div')];

// Set to array
const arr = [...new Set([1, 2, 3])];
```

## Spread Operator with Objects

### Copy Objects

```javascript
const original = { name: 'John', age: 30 };
const copy = { ...original };

copy.age = 31;
console.log(original.age); // 30 - unchanged
```

### Merge Objects

```javascript
const defaults = { theme: 'light', language: 'en' };
const userPrefs = { theme: 'dark' };

const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: 'dark', language: 'en' }
```

### Add/Update Properties

```javascript
const user = { name: 'John', age: 30 };

// Add property
const withEmail = { ...user, email: 'john@example.com' };

// Update property
const olderUser = { ...user, age: 31 };
```

### Conditional Properties

```javascript
const includeEmail = true;

const user = {
    name: 'John',
    age: 30,
    ...(includeEmail && { email: 'john@example.com' })
};
```

## Rest Parameters

### Variable Number of Arguments

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### Rest with Named Parameters

```javascript
function greet(greeting, ...names) {
    return `${greeting} ${names.join(', ')}!`;
}

console.log(greet('Hello', 'John', 'Jane', 'Bob'));
// "Hello John, Jane, Bob!"
```

**Important:** Rest parameters must be last!

```javascript
// Valid
function fn(a, b, ...rest) {}

// Invalid
// function fn(...rest, a) {} // SyntaxError
```

## Real-World Examples

### Immutable Array Operations

```javascript
const todos = [
    { id: 1, text: 'Learn JS', done: false },
    { id: 2, text: 'Build app', done: false }
];

// Add todo
const addTodo = (todos, newTodo) => [...todos, newTodo];

// Update todo
const updateTodo = (todos, id, updates) =>
    todos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
    );
```

### React State Updates

```javascript
// Add item to array
setItems([...items, newItem]);

// Update object
setUser({ ...user, name: 'Jane' });

// Update nested object
setUser({
    ...user,
    address: {
        ...user.address,
        city: 'Boston'
    }
});
```

### Function Composition

```javascript
function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const double = x => x * 2;
const addTen = x => x + 10;

const compute = compose(addTen, double);
console.log(compute(5)); // 20
```

### API Request Builder

```javascript
function buildRequest(url, options = {}) {
    const defaults = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return {
        ...defaults,
        ...options,
        headers: {
            ...defaults.headers,
            ...options.headers
        }
    };
}
```

### Logger Function

```javascript
function log(level, ...messages) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}]`, ...messages);
}

log('INFO', 'User logged in');
log('ERROR', 'Failed to fetch', { userId: 123 });
```

## Performance Considerations

**Shallow Copy Warning:**

```javascript
const original = { user: { name: 'John' } };
const copy = { ...original };

copy.user.name = 'Jane';
console.log(original.user.name); // 'Jane' - modified!
```

Spread creates shallow copies. Nested objects are still referenced.

**Large Arrays:**

For very large arrays, `concat()` may be faster than spread:

```javascript
// Faster for huge arrays
const merged = arr1.concat(arr2);

// vs
const merged = [...arr1, ...arr2];
```

## Common Patterns

### Remove Item from Array

```javascript
const items = [1, 2, 3, 4, 5];
const index = 2;

const newItems = [
    ...items.slice(0, index),
    ...items.slice(index + 1)
];
// [1, 2, 4, 5]
```

### Toggle Boolean Property

```javascript
const user = { name: 'John', active: false };
const toggled = { ...user, active: !user.active };
```

### Flatten Array One Level

```javascript
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = [].concat(...nested);
// [1, 2, 3, 4, 5, 6]
```

## Key Takeaways

- Spread expands, rest collects
- Use spread to copy, merge, and add elements
- Use rest for variable-length function parameters
- Spread creates shallow copies only
- Rest parameters must be last
- Essential for immutable data patterns
- Core feature in modern JavaScript and React

## Learn More

Want to dive deeper into Spread and Rest operators? Check out the full tutorial with detailed examples at [rws8.tech/tutorials/javascript/spread-rest](https://rws8.tech/tutorials/javascript/spread-rest/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and modern web development. Follow for more tutorials on JavaScript, functional patterns, and web technologies.

**Tags:** #JavaScript #SpreadOperator #RestOperator #ES6 #ModernJavaScript #WebDevelopment #Programming
