# JavaScript Classes: Modern Object-Oriented Programming

ES6 classes provide a cleaner, more intuitive syntax for object-oriented programming in JavaScript. They're syntactic sugar over prototypes but make OOP much more accessible. Let's master them.

## Basic Class Syntax

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
}

const user = new User('John', 30);
console.log(user.greet()); // "Hello, I'm John"
```

## Constructor

The `constructor` method is called when creating a new instance:

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
}

const user = new User('John', 'john@example.com');
```

## Methods

Define methods directly in the class:

```javascript
class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
    
    multiply(a, b) {
        return a * b;
    }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
```

## Static Methods

Called on the class itself, not instances:

```javascript
class MathUtils {
    static add(a, b) {
        return a + b;
    }
    
    static max(...numbers) {
        return Math.max(...numbers);
    }
}

// Call on class, not instance
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.max(1, 5, 3, 9)); // 9
```

## Getters and Setters

```javascript
class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
    
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
}

const user = new User('John', 'Doe');
console.log(user.fullName); // "John Doe"

user.fullName = 'Jane Smith';
console.log(user.firstName); // "Jane"
```

## Inheritance with extends

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
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    speak() {
        return `${this.name} barks`;
    }
}

const dog = new Dog('Rex', 'German Shepherd');
console.log(dog.speak()); // "Rex barks"
```

## super Keyword

Call parent class methods:

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Cat extends Animal {
    speak() {
        const parentSpeak = super.speak();
        return `${parentSpeak} and meows`;
    }
}

const cat = new Cat('Whiskers');
console.log(cat.speak());
// "Whiskers makes a sound and meows"
```

## Private Fields

Use `#` for private fields (ES2022):

```javascript
class BankAccount {
    #balance = 0;
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // SyntaxError!
```

## Private Methods

```javascript
class User {
    #password;
    
    constructor(name, password) {
        this.name = name;
        this.#password = this.#hashPassword(password);
    }
    
    #hashPassword(password) {
        // Private method
        return btoa(password);
    }
    
    verifyPassword(password) {
        return this.#hashPassword(password) === this.#password;
    }
}
```

## Static Properties

```javascript
class Config {
    static apiUrl = 'https://api.example.com';
    static timeout = 5000;
    
    static getConfig() {
        return {
            apiUrl: this.apiUrl,
            timeout: this.timeout
        };
    }
}

console.log(Config.apiUrl); // "https://api.example.com"
```

## Real-World Examples

### User Management

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    
    static fromJSON(json) {
        return new User(json.name, json.email);
    }
    
    toJSON() {
        return {
            name: this.name,
            email: this.email,
            createdAt: this.createdAt
        };
    }
}

const user = User.fromJSON({ name: 'John', email: 'john@example.com' });
```

### Todo List

```javascript
class TodoList {
    #todos = [];
    
    add(text) {
        this.#todos.push({
            id: Date.now(),
            text,
            done: false
        });
    }
    
    toggle(id) {
        const todo = this.#todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
        }
    }
    
    get completed() {
        return this.#todos.filter(t => t.done);
    }
    
    get pending() {
        return this.#todos.filter(t => !t.done);
    }
}
```

### API Client

```javascript
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    
    async get(endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        return response.json();
    }
    
    async post(endpoint, data) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }
}

const api = new ApiClient('https://api.example.com');
const users = await api.get('/users');
```

## Class vs Function Constructor

### Old Way (Function Constructor)

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
}

User.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

const user = new User('John', 30);
```

### Modern Way (Class)

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
}

const user = new User('John', 30);
```

Classes are cleaner and more intuitive!

## Best Practices

**1. Use PascalCase for class names**

```javascript
class UserAccount { } // Good
class userAccount { } // Bad
```

**2. Initialize properties in constructor**

```javascript
class User {
    constructor(name) {
        this.name = name;
        this.posts = []; // Initialize
    }
}
```

**3. Use static methods for utilities**

```javascript
class DateUtils {
    static format(date) {
        return date.toISOString();
    }
}
```

**4. Use private fields for encapsulation**

```javascript
class Counter {
    #count = 0;
    
    increment() {
        this.#count++;
    }
}
```

## Key Takeaways

- Classes provide clean OOP syntax
- Constructor initializes instances
- Methods define behavior
- Static methods/properties belong to class
- Getters/setters provide computed properties
- extends enables inheritance
- super calls parent class
- Private fields (#) enforce encapsulation
- Classes are syntactic sugar over prototypes

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/classes](https://rws8.tech/tutorials/javascript/classes/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and modern web development.

**Tags:** #JavaScript #ES6Classes #OOP #ObjectOrientedProgramming #ModernJavaScript #WebDevelopment
