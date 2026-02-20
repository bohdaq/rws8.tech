# JavaScript Variables and Scope: Master var, let, and const

*3 min read*

Variables and scope are fundamental to JavaScript, yet they're often misunderstood. The way you declare variables affects where they can be accessed, how they behave, and whether they can be reassigned. Let me show you what you need to know.

## The Three Ways to Declare Variables

JavaScript has three keywords for declaring variables: `var`, `let`, and `const`. Each has different characteristics.

### var - The Old Way

`var` was the original way to declare variables. It has quirks that can lead to bugs:

```javascript
var name = 'Alice';

// var can be redeclared
var name = 'Bob'; // No error!

// var is function-scoped, not block-scoped
if (true) {
    var message = 'Hello';
}
console.log(message); // 'Hello' - accessible outside!
```

### let - Block-Scoped Variables

`let` was introduced in ES6 and provides block-level scoping:

```javascript
let name = 'Alice';

// let cannot be redeclared
// let name = 'Bob'; // SyntaxError!

// let is block-scoped
if (true) {
    let message = 'Hello';
    console.log(message); // 'Hello'
}
// console.log(message); // ReferenceError

// But let can be reassigned
let age = 30;
age = 31; // This works
```

### const - Constants

`const` declares constants that cannot be reassigned:

```javascript
const PI = 3.14159;

// const cannot be reassigned
// PI = 3.14; // TypeError!

// But const objects can be mutated
const person = { name: 'Alice' };
person.name = 'Bob'; // This works!

// You just can't reassign the variable
// person = {}; // TypeError!
```

## Function Scope vs Block Scope

This is where things get interesting.

**Function Scope (var):**

```javascript
function example() {
    var x = 1;
    
    if (true) {
        var x = 2; // Same variable!
        console.log(x); // 2
    }
    
    console.log(x); // 2 - modified by if block
}
```

**Block Scope (let and const):**

```javascript
function example() {
    let x = 1;
    
    if (true) {
        let x = 2; // Different variable!
        console.log(x); // 2
    }
    
    console.log(x); // 1 - unchanged
}
```

This difference is crucial in loops:

```javascript
// With var - all callbacks reference the same i
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3

// With let - each iteration gets its own i
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2
```

## Lexical Scope and the Scope Chain

JavaScript uses lexical scoping - inner functions can access variables from outer scopes:

```javascript
const globalVar = 'global';

function outer() {
    const outerVar = 'outer';
    
    function inner() {
        const innerVar = 'inner';
        
        // Can access all three
        console.log(globalVar); // 'global'
        console.log(outerVar);  // 'outer'
        console.log(innerVar);  // 'inner'
    }
    
    inner();
}

outer();
```

When JavaScript looks for a variable, it searches:
1. Current scope
2. Parent scope
3. Grandparent scope
4. ... all the way to global scope

## The Temporal Dead Zone (TDZ)

Variables declared with `let` and `const` are in a "temporal dead zone" from the start of the block until the declaration:

```javascript
// With var - hoisted and initialized
console.log(varVariable); // undefined
var varVariable = 'var';

// With let - hoisted but NOT initialized (TDZ)
// console.log(letVariable); // ReferenceError!
let letVariable = 'let';

// TDZ in action
{
    // TDZ starts
    // console.log(x); // ReferenceError
    
    let x = 10; // TDZ ends
    console.log(x); // 10
}
```

## Common Pitfalls

**1. Accidental Global Variables**

```javascript
function bad() {
    accidentalGlobal = 'oops'; // No declaration!
}
bad();
console.log(accidentalGlobal); // 'oops' - leaked!

// Always declare variables
function good() {
    let intentional = 'safe';
}
```

**2. Loop Variable Leakage**

```javascript
// Bad - var leaks
for (var i = 0; i < 5; i++) {}
console.log(i); // 5 - still accessible!

// Good - let is block-scoped
for (let j = 0; j < 5; j++) {}
// console.log(j); // ReferenceError
```

**3. const Doesn't Mean Immutable**

```javascript
// const prevents reassignment, not mutation
const obj = { count: 0 };
obj.count = 1; // Works!

const arr = [1, 2, 3];
arr.push(4); // Works!

// To make truly immutable
const frozen = Object.freeze({ count: 0 });
frozen.count = 1; // Silently fails
```

## Best Practices

**1. Prefer const by Default**

```javascript
const API_KEY = 'abc123';
const user = { name: 'Alice' };
```

This makes your intent clear and prevents accidental reassignment.

**2. Use let When You Need to Reassign**

```javascript
let count = 0;
count++;

let message = 'Loading...';
message = 'Complete!';
```

**3. Avoid var**

There's no good reason to use `var` in modern JavaScript. It has confusing scoping rules and no benefits over `let`/`const`.

**4. Minimize Scope**

```javascript
// Bad - wider scope than needed
function process() {
    let temp = 0;
    // ... lots of code
    if (condition) {
        temp = calculate();
    }
}

// Good - narrower scope
function process() {
    // ... lots of code
    if (condition) {
        const temp = calculate();
    }
}
```

**5. Use Descriptive Names**

```javascript
// Bad
let x = 10;
let y = 20;

// Good
let width = 10;
let height = 20;
```

## Real-World Example: Counter Module

```javascript
function createCounter(initialValue = 0) {
    let count = initialValue; // Private
    
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getValue() {
            return count;
        }
    };
}

const counter = createCounter(0);
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getValue()); // 2

// count is private - can't access directly
console.log(counter.count); // undefined
```

## Key Takeaways

- **Use const by default**, let when you need to reassign, avoid var
- **var is function-scoped**, let and const are block-scoped
- **Lexical scope** means inner functions can access outer variables
- **The scope chain** is searched from inner to outer scopes
- **Temporal Dead Zone** prevents accessing let/const before declaration
- **const prevents reassignment**, not mutation
- **Always declare variables** to avoid accidental globals
- **Minimize scope** and use descriptive names

Understanding variables and scope is essential for writing clean, bug-free JavaScript. Master these concepts, and you'll avoid many common pitfalls.

---

*Want to dive deeper? Check out the full tutorial at [rws8.tech](https://rws8.tech/tutorials/javascript/variables/)*
