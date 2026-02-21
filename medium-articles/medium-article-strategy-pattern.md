# JavaScript Strategy Pattern: Interchangeable Algorithms

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it. Let's master it.

## What is the Strategy Pattern?

Strategy allows you to select an algorithm at runtime, avoiding complex conditional logic.

## Basic Example

```javascript
// Strategies
const strategies = {
    credit: (amount) => {
        console.log(`Processing ${amount} via credit card`);
        return { success: true, method: 'credit' };
    },
    
    paypal: (amount) => {
        console.log(`Processing ${amount} via PayPal`);
        return { success: true, method: 'paypal' };
    },
    
    crypto: (amount) => {
        console.log(`Processing ${amount} via cryptocurrency`);
        return { success: true, method: 'crypto' };
    }
};

class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    process(amount) {
        return this.strategy(amount);
    }
}

// Usage
const processor = new PaymentProcessor(strategies.credit);
processor.process(100);

processor.setStrategy(strategies.paypal);
processor.process(50);
```

## Real-World Example

```javascript
class Validator {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    validate(data) {
        return this.strategy.validate(data);
    }
}

const emailStrategy = {
    validate(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};

const phoneStrategy = {
    validate(phone) {
        return /^\d{10}$/.test(phone);
    }
};

const validator = new Validator(emailStrategy);
console.log(validator.validate('test@example.com')); // true
```

## When to Use

**Good use cases:**
- Multiple algorithms for same task
- Eliminate conditional logic
- Runtime algorithm selection
- Payment processing
- Sorting/filtering strategies

## Benefits

- Open/Closed Principle
- Eliminates conditionals
- Runtime flexibility
- Easy to test

## Key Takeaways

- Strategy defines interchangeable algorithms
- Select algorithm at runtime
- Eliminates complex if/else chains
- Each strategy is encapsulated
- Easy to add new strategies

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/strategy-pattern](https://rws8.tech/tutorials/javascript/strategy-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #StrategyPattern #DesignPatterns #SoftwareArchitecture #WebDevelopment
