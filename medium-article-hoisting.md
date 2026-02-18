# JavaScript Hoisting: Stop Getting Surprised by Your Code

*Understanding the behavior that confuses every JavaScript developer*

---

Ever written code that worked in a way you didn't expect? Chances are, hoisting was the culprit. Let's demystify this JavaScript behavior once and for all.

## What is Hoisting?

Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution. This means you can sometimes use variables and functions before you declare them.

```javascript
console.log(greeting); // undefined (not an error!)
var greeting = "Hello";

sayHi(); // "Hi!" (works perfectly)
function sayHi() {
    console.log("Hi!");
}
```

Wait, what? How does this work?

## Behind the Scenes

JavaScript processes your code in two phases:

1. **Creation phase** - Declarations are hoisted
2. **Execution phase** - Code runs line by line

```javascript
// What you write:
console.log(x);
var x = 5;

// What JavaScript does:
var x;              // Hoisted to the top
console.log(x);     // undefined
x = 5;              // Assignment stays in place
```

## The var Problem

Variables declared with `var` are hoisted and initialized to `undefined`. This causes unexpected behavior:

```javascript
var name = "Global";

function test() {
    console.log(name); // undefined (not "Global"!)
    var name = "Local";
    console.log(name); // "Local"
}
```

Why `undefined` instead of `"Global"`? Because the local `var name` is hoisted to the top of the function, shadowing the global variable.

## Enter let and const: The Temporal Dead Zone

Modern JavaScript introduced `let` and `const` to fix this confusion. They're hoisted too, but **not initialized**.

```javascript
console.log(x); // ReferenceError!
let x = 5;
```

The period between entering scope and the declaration is called the **Temporal Dead Zone (TDZ)**. During this time, the variable exists but cannot be accessed.

```javascript
function example() {
    // TDZ starts for 'temp'
    console.log(temp); // ReferenceError
    
    let temp = 5;      // TDZ ends
    console.log(temp); // 5
}
```

This is actually a good thing - it catches bugs early!

## Function Hoisting: The Full Story

Function declarations are fully hoisted - both name and body:

```javascript
greet(); // Works!

function greet() {
    console.log("Hello!");
}
```

But function expressions follow variable hoisting rules:

```javascript
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
    console.log("Hi!");
};
```

Why? Because `var sayHi` is hoisted and set to `undefined`, then you try to call `undefined()`.

## Real-World Gotcha: Loop Variables

This classic bug trips up many developers:

```javascript
// With var
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3

// With let
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2
```

With `var`, there's only one `i` hoisted to function scope. With `let`, each iteration gets its own block-scoped `i`.

## Interview Question Alert

```javascript
var a = 1;

function test() {
    console.log(a);
    var a = 2;
}

test(); // What prints?
```

**Answer:** `undefined`

The local `var a` is hoisted, shadowing the global `a`. The function sees:

```javascript
function test() {
    var a;           // Hoisted
    console.log(a);  // undefined
    a = 2;
}
```

## Best Practices to Avoid Hoisting Headaches

### 1. Use const and let, Never var

```javascript
// Good
const PI = 3.14159;
let counter = 0;

// Avoid
var x = 5; // Just don't
```

### 2. Declare Variables at the Top

```javascript
function calculate() {
    // All declarations first
    const TAX_RATE = 0.08;
    let total = 0;
    let subtotal = 0;
    
    // Then use them
    subtotal = getSubtotal();
    total = subtotal * (1 + TAX_RATE);
    return total;
}
```

### 3. Declare Functions Before Use

```javascript
// Clear and predictable
const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet("Alice"));
```

### 4. Enable Strict Mode

```javascript
'use strict';

x = 5; // ReferenceError: x is not defined
```

Strict mode catches many hoisting-related mistakes.

## Arrow Functions and Classes

Arrow functions and classes follow the same rules as `let` and `const`:

```javascript
// ReferenceError
const multiply = (a, b) => a * b;
multiply(2, 3);

// ReferenceError
const dog = new Dog();
class Dog {}
```

This consistency makes modern JavaScript more predictable.

## The Mental Model

Think of hoisting this way:

- **var**: "I exist everywhere in my scope, but I'm `undefined` until you assign me"
- **let/const**: "I exist in my scope, but you can't touch me until you declare me"
- **function declarations**: "I'm fully ready to use anywhere in my scope"
- **function expressions**: "I follow the variable rules"

## Quick Debugging Tip

If you see `undefined` when you expected a value, check if:
1. You're using `var` (switch to `const`/`let`)
2. You're accessing a variable before declaration
3. A local variable is shadowing a global one

If you see `ReferenceError`, check if:
1. You're in the TDZ (accessing `let`/`const` before declaration)
2. You forgot to declare the variable

## The Bottom Line

Hoisting isn't magic - it's JavaScript's two-phase execution model. While you can't turn it off, you can avoid its pitfalls:

- Use `const` by default, `let` when needed
- Declare variables at the top of their scope
- Don't rely on hoisting for clever tricks
- Write code that reads top-to-bottom

Modern JavaScript with `let` and `const` makes hoisting less of a problem. The TDZ might seem annoying, but it catches bugs that `var` would silently hide.

---

*Understanding hoisting transforms it from a source of bugs into a tool for writing better code. Next time you see unexpected `undefined`, you'll know exactly why.*

**Read time: ~3 minutes**
