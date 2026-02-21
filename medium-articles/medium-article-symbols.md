# JavaScript Symbols: Unique Identifiers and Metaprogramming

Symbols are a primitive data type for creating unique identifiers. Perfect for private properties, avoiding naming collisions, and implementing metaprogramming patterns with well-known symbols.

## Basic Usage

```javascript
// Create unique symbol
const id = Symbol('id');
const id2 = Symbol('id');

console.log(id === id2); // false - each is unique

// Use as object property
const user = {
    name: 'John',
    [id]: 123
};

console.log(user[id]); // 123
console.log(user.name); // 'John'
```

## Private Properties

```javascript
const _private = Symbol('private');

class User {
    constructor(name) {
        this.name = name;
        this[_private] = 'secret';
    }
    
    getSecret() {
        return this[_private];
    }
}

const user = new User('John');
console.log(user.name); // 'John'
console.log(user[_private]); // undefined (not accessible)
console.log(user.getSecret()); // 'secret'
```

## Well-Known Symbols

```javascript
// Symbol.iterator
const iterable = {
    data: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => ({
                value: this.data[index++],
                done: index > this.data.length
            })
        };
    }
};

for (const value of iterable) {
    console.log(value); // 1, 2, 3
}

// Symbol.toStringTag
class MyClass {
    get [Symbol.toStringTag]() {
        return 'MyClass';
    }
}

console.log(Object.prototype.toString.call(new MyClass()));
// [object MyClass]
```

## Global Symbol Registry

```javascript
// Create/retrieve global symbol
const globalSym = Symbol.for('app.id');
const sameSym = Symbol.for('app.id');

console.log(globalSym === sameSym); // true

// Get key for symbol
console.log(Symbol.keyFor(globalSym)); // 'app.id'
```

## Best Practices

- Use for truly unique identifiers
- Implement private properties
- Leverage well-known symbols
- Use Symbol.for() for cross-realm symbols
- Not enumerable in for...in loops
- Use Object.getOwnPropertySymbols() to access

## Key Takeaways

- Symbols are unique, immutable primitives
- Perfect for private properties
- Not enumerable by default
- Well-known symbols enable metaprogramming
- Symbol.for() creates global symbols
- Each Symbol() call creates unique value

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/symbols](https://rws8.tech/tutorials/javascript/symbols/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #Symbols #ES6 #Metaprogramming #AdvancedJS
