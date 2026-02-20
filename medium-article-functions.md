# JavaScript Functions: Master the Building Blocks

*3 min read*

Functions are the fundamental building blocks of JavaScript. They allow you to encapsulate code, make it reusable, and organize your programs into logical units. Let me show you everything you need to know.

## Function Declarations vs Expressions

JavaScript has two main ways to create functions:

**Function Declarations:**

```javascript
function add(a, b) {
    return a + b;
}

// Can be called before definition (hoisted)
sayHello(); // Works!

function sayHello() {
    console.log('Hello!');
}
```

**Function Expressions:**

```javascript
const multiply = function(a, b) {
    return a * b;
};

// Cannot be called before definition
// subtract(); // Error!

const subtract = function(a, b) {
    return a - b;
};
```

The key difference: **function declarations are hoisted**, function expressions are not.

## Arrow Functions: The Modern Way

Arrow functions provide concise syntax and have special behavior with `this`:

```javascript
// Traditional
const square1 = function(x) {
    return x * x;
};

// Arrow function - full syntax
const square2 = (x) => {
    return x * x;
};

// Arrow function - concise (implicit return)
const square3 = x => x * x;

console.log(square3(5)); // 25
```

**Arrow function rules:**
- Single parameter: parentheses optional
- Single expression: braces and return optional
- Multiple parameters or no parameters: parentheses required

```javascript
const add = (a, b) => a + b;
const random = () => Math.random();
const makePerson = (name, age) => ({ name, age });
```

## Parameters and Arguments

**Default Parameters:**

```javascript
function greet(name = 'Guest', greeting = 'Hello') {
    console.log(`${greeting}, ${name}!`);
}

greet(); // Hello, Guest!
greet('Alice'); // Hello, Alice!
greet('Bob', 'Hi'); // Hi, Bob!
```

**Rest Parameters:**

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

Rest parameters collect all remaining arguments into an array.

## Higher-Order Functions

Functions that take other functions as arguments or return functions:

```javascript
// Function that takes a function
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);
// 0, 1, 2

// Function that returns a function
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## Callback Functions

Functions passed as arguments to be executed later:

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - select elements
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - combine elements
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15
```

## Immediately Invoked Function Expressions (IIFE)

Functions that execute immediately:

```javascript
// Basic IIFE
(function() {
    console.log('This runs immediately!');
})();

// IIFE with return value
const result = (function() {
    const x = 10;
    const y = 20;
    return x + y;
})();

console.log(result); // 30

// Use case: Creating private scope
const counter = (function() {
    let count = 0; // Private
    
    return {
        increment() {
            count++;
            return count;
        },
        getCount() {
            return count;
        }
    };
})();

counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getCount()); // 2
// counter.count is undefined - private!
```

## Closures

Inner functions remember their outer scope:

```javascript
function makeCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 - separate closure
```

Each counter has its own private `count` variable.

## Best Practices

**1. Use Descriptive Names**

```javascript
// Bad
function f(x, y) {
    return x + y;
}

// Good
function calculateTotal(price, tax) {
    return price + tax;
}
```

**2. Keep Functions Small and Focused**

```javascript
// Each function should do one thing well
function validateUser(user) { /* ... */ }
function saveUser(user) { /* ... */ }
function notifyUser(user) { /* ... */ }
```

**3. Prefer Arrow Functions for Callbacks**

```javascript
// Verbose
numbers.map(function(n) {
    return n * 2;
});

// Concise
numbers.map(n => n * 2);
```

**4. Return Early to Reduce Nesting**

```javascript
// Bad - nested
function processValue(value) {
    if (value) {
        if (value > 0) {
            if (value < 100) {
                return value * 2;
            }
        }
    }
    return 0;
}

// Good - early returns
function processValue(value) {
    if (!value) return 0;
    if (value <= 0) return 0;
    if (value >= 100) return 0;
    return value * 2;
}
```

**5. Use Rest Parameters Instead of arguments**

```javascript
// Bad
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

// Good
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
```

## Common Patterns

**Function Factory:**

```javascript
function createGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeter('Hello');
const sayHi = createGreeter('Hi');

console.log(sayHello('Alice')); // Hello, Alice!
console.log(sayHi('Bob')); // Hi, Bob!
```

**Partial Application:**

```javascript
function partial(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn(...fixedArgs, ...remainingArgs);
    };
}

function greet(greeting, name) {
    return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
console.log(sayHello('Alice')); // Hello, Alice!
```

## Key Takeaways

- **Function declarations** are hoisted, expressions are not
- **Arrow functions** provide concise syntax and lexical `this`
- **Default parameters** provide fallback values
- **Rest parameters** collect remaining arguments
- **Higher-order functions** take or return functions
- **Callbacks** are functions passed to be executed later
- **IIFEs** execute immediately and create private scope
- **Closures** let inner functions access outer scope
- **Keep functions small**, focused, and well-named
- **Use arrow functions** for callbacks and short functions

Understanding functions deeply is essential for writing clean, maintainable JavaScript. Master these concepts, and you'll write better code.

---

*Want to dive deeper? Check out the full tutorial at [rws8.tech](https://rws8.tech/tutorials/javascript/functions/)*
