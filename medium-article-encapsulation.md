# JavaScript Encapsulation: Master Data Hiding and Private Variables

*3 min read*

Encapsulation is one of those programming principles that sounds intimidating but is actually quite practical once you understand it. If you've ever wanted to protect your data from being accidentally modified or create cleaner APIs for your code, encapsulation is the answer. Let me show you how it works in JavaScript.

## What is Encapsulation?

Encapsulation is the practice of bundling data and methods together while hiding internal implementation details from the outside world. Think of it like a car - you interact with the steering wheel and pedals (the public interface), but you don't need to know how the engine works internally (the private implementation).

In JavaScript, encapsulation helps you:
- **Protect data** from accidental modification
- **Control access** through validation
- **Hide complexity** from other developers
- **Create better APIs** that are easier to use

```javascript
// Without encapsulation - data is exposed
const account = {
    balance: 1000
};

account.balance = -500; // Oops! No validation

// With encapsulation - data is protected
function createAccount(initialBalance) {
    let balance = initialBalance; // Private
    
    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                return true;
            }
            return false;
        },
        getBalance() {
            return balance;
        }
    };
}

const myAccount = createAccount(1000);
myAccount.deposit(500);
console.log(myAccount.getBalance()); // 1500
myAccount.balance = -500;            // Has no effect!
```

## Private Variables with Closures

Before modern JavaScript, closures were the primary way to create private variables:

```javascript
function Counter() {
    let count = 0; // Private variable
    
    this.increment = function() {
        count++;
        return count;
    };
    
    this.getCount = function() {
        return count;
    };
}

const counter = new Counter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.count); // undefined - private!
```

The `count` variable is only accessible through the methods we've defined. There's no way to directly access or modify it from outside.

## ES2022 Private Fields

Modern JavaScript introduced true private fields using the `#` prefix:

```javascript
class BankAccount {
    #balance; // Private field
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        this.#balance += amount;
        return this.#balance;
    }
    
    withdraw(amount) {
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        this.#balance -= amount;
        return this.#balance;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// account.#balance; // SyntaxError!
```

Private fields are truly private - attempting to access them from outside the class results in a syntax error.

## The Module Pattern

The Module Pattern uses an IIFE to create a private scope:

```javascript
const Calculator = (function() {
    // Private
    let history = [];
    
    function log(operation, result) {
        history.push({ operation, result });
    }
    
    // Public API
    return {
        add(a, b) {
            const result = a + b;
            log(`${a} + ${b}`, result);
            return result;
        },
        
        getHistory() {
            return [...history]; // Return copy
        }
    };
})();

Calculator.add(5, 3);      // 8
console.log(Calculator.history); // undefined - private!
```

## Getters and Setters

Getters and setters provide controlled access with validation:

```javascript
class Temperature {
    #celsius;
    
    get celsius() {
        return this.#celsius;
    }
    
    set celsius(value) {
        if (value < -273.15) {
            throw new Error('Below absolute zero');
        }
        this.#celsius = value;
    }
    
    get fahrenheit() {
        return (this.#celsius * 9/5) + 32;
    }
    
    set fahrenheit(value) {
        this.celsius = (value - 32) * 5/9;
    }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77
```

## Real-World Example: Shopping Cart

Here's a practical shopping cart with proper encapsulation:

```javascript
class ShoppingCart {
    #items;
    #discountRate;
    
    constructor() {
        this.#items = [];
        this.#discountRate = 0;
    }
    
    addItem(product, quantity = 1) {
        const existing = this.#items.find(
            item => item.product.id === product.id
        );
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.#items.push({ product, quantity });
        }
        
        return this.#calculateTotal();
    }
    
    applyDiscount(percentage) {
        if (percentage < 0 || percentage > 100) {
            throw new Error('Invalid discount');
        }
        this.#discountRate = percentage / 100;
        return this.#calculateTotal();
    }
    
    #calculateTotal() {
        const subtotal = this.#items.reduce(
            (sum, item) => sum + (item.product.price * item.quantity),
            0
        );
        return subtotal * (1 - this.#discountRate);
    }
    
    getTotal() {
        return this.#calculateTotal();
    }
}

const cart = new ShoppingCart();
cart.addItem({ id: 1, name: 'Laptop', price: 999 }, 1);
cart.applyDiscount(10);
console.log(cart.getTotal()); // 899.10
```

## Best Practices

**1. Make everything private by default**
Only expose what's necessary for the public API.

**2. Use getters for computed properties**
```javascript
get area() {
    return this.#width * this.#height;
}
```

**3. Validate in setters**
```javascript
set age(value) {
    if (value < 0 || value > 150) {
        throw new Error('Invalid age');
    }
    this.#age = value;
}
```

**4. Return copies, not references**
```javascript
getItems() {
    return [...this.#items]; // Copy
}
```

**5. Use meaningful method names**
```javascript
// Good
activate()
deactivate()
isActive()

// Bad
set()
get()
```

## When to Use Encapsulation

**Use it when:**
- You need to protect data integrity
- You want to control how data is accessed
- You're building reusable components
- You need validation before changes
- You want to hide implementation details

**Skip it when:**
- You're building simple data structures
- The code is only used internally
- Performance is critical
- The data doesn't need protection

## Key Takeaways

- Encapsulation bundles data and methods while hiding implementation
- Use closures for private variables in functions
- ES2022 private fields (#) are the modern way for classes
- The Module Pattern creates singletons with private state
- Getters and setters provide controlled access
- Always return copies of internal data, not references
- Make everything private by default
- Don't over-encapsulate simple structures

Encapsulation is a powerful tool for creating maintainable, secure code. Master it, and you'll write better JavaScript applications.

---

*Want to dive deeper? Check out the full tutorial at [rws8.tech](https://rws8.tech/tutorials/javascript/encapsulation/)*
