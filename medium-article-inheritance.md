# JavaScript Inheritance: Master Prototypal Inheritance and ES6 Classes

*3 min read*

Inheritance is one of those concepts that sounds complicated but is actually quite natural once you understand it. If you've been writing JavaScript for a while, you've probably used inheritance without even realizing it. Let me show you how it works and why it matters.

## What is Inheritance?

Inheritance is a mechanism that allows one object to acquire properties and methods from another object. It's like saying "a Dog is an Animal" - the Dog inherits all the characteristics of an Animal, plus adds its own specific behaviors.

Unlike classical languages like Java or C++ that use class-based inheritance, JavaScript uses **prototypal inheritance**. Every object in JavaScript has an internal link to another object called its prototype. When you try to access a property, JavaScript walks up this prototype chain until it finds it.

```javascript
const animal = {
    eats: true,
    walk() {
        console.log('Animal walks');
    }
};

const rabbit = {
    jumps: true
};

rabbit.__proto__ = animal;

console.log(rabbit.eats);  // true (inherited)
console.log(rabbit.jumps); // true (own property)
rabbit.walk();             // "Animal walks"
```

## ES6 Classes: The Modern Way

ES6 introduced class syntax that makes inheritance much cleaner and more intuitive:

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    speak() {
        console.log(`${this.name} barks`);
    }
    
    fetch() {
        console.log(`${this.name} fetches the ball`);
    }
}

const rex = new Dog('Rex', 'German Shepherd');
rex.speak();  // "Rex barks"
rex.fetch();  // "Rex fetches the ball"
```

The `extends` keyword sets up the inheritance, and `super()` calls the parent constructor. Much cleaner than the old constructor function approach!

## The super Keyword

The `super` keyword is your gateway to parent class functionality:

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
        const parentMessage = super.speak();
        return `${parentMessage} - specifically, a bark!`;
    }
}

const dog = new Dog('Buddy');
console.log(dog.speak()); 
// "Buddy makes a sound - specifically, a bark!"
```

**Important:** You must call `super()` before using `this` in a child constructor. The parent needs to initialize the object first.

## Real-World Example: User Roles

Here's a practical example showing inheritance in action:

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    getInfo() {
        return `${this.name} (${this.email})`;
    }
    
    canEdit() {
        return false;
    }
}

class Admin extends User {
    constructor(name, email, department) {
        super(name, email);
        this.department = department;
    }
    
    canEdit() {
        return true; // Admins can edit everything
    }
    
    getInfo() {
        return `${super.getInfo()} - Admin (${this.department})`;
    }
}

class Moderator extends User {
    constructor(name, email, permissions) {
        super(name, email);
        this.permissions = permissions;
    }
    
    canEdit() {
        return this.permissions.includes('edit');
    }
}

const admin = new Admin('Bob', 'bob@example.com', 'IT');
const moderator = new Moderator('Charlie', 'charlie@example.com', ['edit']);

console.log(admin.getInfo());    // "Bob (bob@example.com) - Admin (IT)"
console.log(admin.canEdit());    // true
console.log(moderator.canEdit()); // true
```

## Method Overriding

Child classes can override parent methods to provide specialized behavior:

```javascript
class Shape {
    constructor(color) {
        this.color = color;
    }
    
    getArea() {
        return 0; // Default
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
}

const circle = new Circle('red', 5);
const rectangle = new Rectangle('blue', 10, 20);

console.log(circle.getArea());    // 78.54...
console.log(rectangle.getArea()); // 200
```

## Common Pitfalls

**1. Forgetting super() in Constructor**

```javascript
// Bad - will throw error
class Dog extends Animal {
    constructor(name, breed) {
        this.breed = breed; // Error! Must call super() first
        super(name);
    }
}

// Good
class Dog extends Animal {
    constructor(name, breed) {
        super(name);        // Call super() first
        this.breed = breed;
    }
}
```

**2. Shared Prototype Properties**

```javascript
// Bad - array is shared across all instances
class Team {
    constructor(name) {
        this.name = name;
    }
}
Team.prototype.members = []; // Shared!

// Good - each instance gets its own array
class Team {
    constructor(name) {
        this.name = name;
        this.members = []; // Instance-specific
    }
}
```

## Best Practices

1. **Keep hierarchies shallow** - Limit inheritance to 2-3 levels maximum
2. **Favor composition over inheritance** - Don't create deep inheritance trees
3. **Use clear "is-a" relationships** - Dog is-a Animal makes sense
4. **Document your hierarchy** - Use JSDoc to document inheritance relationships
5. **Don't over-engineer** - Sometimes simple objects are better than classes

## When to Use Inheritance

**Use it when:**
- You have a clear "is-a" relationship
- Child classes are specialized versions of the parent
- You want to share common behavior
- You're modeling real-world hierarchies

**Avoid it when:**
- You have a "has-a" relationship (use composition)
- The hierarchy would be more than 3 levels deep
- Classes don't share meaningful behavior
- You're just trying to reuse code

## Key Takeaways

- JavaScript uses prototypal inheritance, not classical inheritance
- ES6 classes provide clean syntax but use prototypes under the hood
- Use `extends` to create child classes
- Always call `super()` before using `this` in child constructors
- Use `super.method()` to call parent methods
- Child classes can override parent methods
- Keep inheritance hierarchies shallow
- Favor composition over inheritance for complex relationships

Inheritance is a powerful tool when used correctly. Master it, and you'll write more organized, maintainable JavaScript code.

---

*Want to dive deeper? Check out the full tutorial at [rws8.tech](https://rws8.tech/tutorials/javascript/inheritance/)*
