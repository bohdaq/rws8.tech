# JavaScript Polymorphism: Write Flexible, Reusable Code

*3 min read*

If you've been writing JavaScript for a while, you've probably used polymorphism without even realizing it. It's one of those concepts that sounds intimidating but is actually quite natural in JavaScript. Let me show you why it matters and how to use it effectively.

## What is Polymorphism?

Polymorphism comes from Greek: "poly" (many) + "morph" (form), meaning "many forms." In programming, it means writing code that works with different types of objects through a common interface.

Unlike Java or C++ where polymorphism relies on inheritance and strict type hierarchies, JavaScript uses **duck typing**: "If it walks like a duck and quacks like a duck, it's a duck." JavaScript doesn't care about an object's type—only what methods it has.

```javascript
// Different objects with the same interface
const dog = {
    speak() { return 'Woof!'; }
};

const cat = {
    speak() { return 'Meow!'; }
};

const robot = {
    speak() { return 'Beep boop!'; }
};

// Polymorphic function - works with any object that has speak()
function makeItSpeak(animal) {
    console.log(animal.speak());
}

makeItSpeak(dog);    // Woof!
makeItSpeak(cat);    // Meow!
makeItSpeak(robot);  // Beep boop!
```

The `makeItSpeak` function doesn't check types. It only cares that the object has a `speak()` method. This is polymorphism in action.

## Duck Typing in Practice

Duck typing makes JavaScript incredibly flexible. Instead of checking an object's type, you check for specific methods or properties:

```javascript
function draw(shape) {
    if (typeof shape.draw === 'function') {
        shape.draw();
    } else {
        console.error('Object is not drawable');
    }
}

const circle = {
    radius: 5,
    draw() {
        console.log(`Drawing circle with radius ${this.radius}`);
    }
};

const square = {
    side: 10,
    draw() {
        console.log(`Drawing square with side ${this.side}`);
    }
};

draw(circle);  // Drawing circle with radius 5
draw(square);  // Drawing square with side 10
```

This pattern is everywhere in JavaScript. Promises work with any "thenable" (object with a `then()` method). Iterators work with any object that has a `next()` method. Array methods work with any array-like object.

## Real-World Example: Payment Processing

Here's a practical example that shows polymorphism's power:

```javascript
class PaymentProcessor {
    processPayment(paymentMethod, amount) {
        if (typeof paymentMethod.pay !== 'function') {
            throw new Error('Invalid payment method');
        }
        return paymentMethod.pay(amount);
    }
}

class CreditCard {
    constructor(cardNumber) {
        this.cardNumber = cardNumber;
    }
    
    pay(amount) {
        console.log(`Charging $${amount} to card ending in ${this.cardNumber.slice(-4)}`);
        return { success: true, method: 'credit_card' };
    }
}

class PayPal {
    constructor(email) {
        this.email = email;
    }
    
    pay(amount) {
        console.log(`Processing $${amount} PayPal payment for ${this.email}`);
        return { success: true, method: 'paypal' };
    }
}

class Cryptocurrency {
    constructor(wallet) {
        this.wallet = wallet;
    }
    
    pay(amount) {
        console.log(`Sending $${amount} worth of crypto to ${this.wallet}`);
        return { success: true, method: 'crypto' };
    }
}

// Usage
const processor = new PaymentProcessor();
processor.processPayment(new CreditCard('1234567890123456'), 100);
processor.processPayment(new PayPal('user@example.com'), 50);
processor.processPayment(new Cryptocurrency('0x742d35Cc'), 200);
```

The `PaymentProcessor` doesn't need to know about specific payment types. It only needs objects with a `pay()` method. Adding new payment methods requires zero changes to the processor.

## Polymorphism with Classes

You can also use ES6 classes for more traditional OOP-style polymorphism:

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    speak() {
        return `${this.name} barks`;
    }
}

class Cat extends Animal {
    speak() {
        return `${this.name} meows`;
    }
}

function describeAnimal(animal) {
    console.log(animal.speak());
}

describeAnimal(new Dog('Rex'));  // Rex barks
describeAnimal(new Cat('Whiskers'));  // Whiskers meows
```

Each subclass overrides `speak()` with its own implementation. The `describeAnimal` function works with any Animal, regardless of the specific subclass.

## Common Pitfalls

**1. Assuming methods exist**

```javascript
// Bad - no validation
function processItem(item) {
    item.process();  // What if item doesn't have process()?
}

// Good - check first
function processItem(item) {
    if (typeof item.process === 'function') {
        item.process();
    }
}

// Better - use optional chaining
function processItem(item) {
    item.process?.();
}
```

**2. Over-engineering**

Don't create complex class hierarchies when simple functions will do. JavaScript's functional nature often makes polymorphism through functions more natural than through classes.

## Best Practices

1. **Design around interfaces** - Think about what methods objects need, not what type they are
2. **Use consistent method names** - If objects do similar things, give them the same method names
3. **Validate interfaces** - Always check that objects have the methods you need
4. **Document expectations** - Use JSDoc to document what methods objects should implement
5. **Consider TypeScript** - For large projects, TypeScript's interfaces provide compile-time checking

## When to Use Polymorphism

**Use it when:**
- You have multiple objects that do similar things differently
- You want functions that work with many types
- You're building plugin systems or extensible architectures
- You want to reduce code duplication

**Avoid it when:**
- You only have one type of object
- Objects don't share common behavior
- Simple conditional logic is clearer
- It adds unnecessary complexity

## Key Takeaways

- Polymorphism lets different objects be treated through a common interface
- JavaScript uses duck typing - objects are defined by their methods, not types
- Design around interfaces (sets of methods) rather than specific types
- Always validate that objects have the methods you need
- Use consistent method names across similar objects
- Don't over-engineer - use polymorphism where it adds value

Polymorphism is a powerful tool for writing flexible, maintainable code. Master it, and you'll write JavaScript that's easier to extend, test, and understand.

---

*Want to dive deeper? Check out the full tutorial at [rws8.tech](https://rws8.tech/tutorials/javascript/polymorphism/)*
