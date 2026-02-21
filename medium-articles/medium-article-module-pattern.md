# JavaScript Module Pattern: Encapsulation and Privacy

The Module pattern uses closures to create private and public members, providing encapsulation and organizing code into reusable units. It's a classic pattern that predates ES6 modules. Let's master it.

## What is the Module Pattern?

Module pattern uses IIFE (Immediately Invoked Function Expression) and closures to create private scope and expose only what's needed.

## Basic Implementation

```javascript
const Counter = (function() {
    // Private variable
    let count = 0;
    
    // Private function
    function log() {
        console.log(`Count: ${count}`);
    }
    
    // Public API
    return {
        increment() {
            count++;
            log();
        },
        
        decrement() {
            count--;
            log();
        },
        
        getCount() {
            return count;
        }
    };
})();

Counter.increment(); // Count: 1
Counter.increment(); // Count: 2
console.log(Counter.count); // undefined (private)
```

## Revealing Module Pattern

```javascript
const Calculator = (function() {
    let result = 0;
    
    function add(x) {
        result += x;
        return this;
    }
    
    function subtract(x) {
        result -= x;
        return this;
    }
    
    function getResult() {
        return result;
    }
    
    function reset() {
        result = 0;
    }
    
    // Reveal public methods
    return {
        add,
        subtract,
        getResult,
        reset
    };
})();

Calculator.add(5).add(3).subtract(2);
console.log(Calculator.getResult()); // 6
```

## When to Use

**Good use cases:**
- Encapsulation
- Private state
- Namespace management
- Legacy code (pre-ES6)

## Benefits

- Privacy
- Encapsulation
- Clean API
- Namespace protection

## Key Takeaways

- Module pattern creates private scope
- Uses IIFE and closures
- Exposes public API
- Revealing pattern is cleaner
- Modern ES6 modules preferred now

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/module-pattern](https://rws8.tech/tutorials/javascript/module-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #ModulePattern #DesignPatterns #Encapsulation #WebDevelopment
