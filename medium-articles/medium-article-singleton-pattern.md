# JavaScript Singleton Pattern: One Instance to Rule Them All

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. It's one of the most commonly used design patterns in JavaScript. Let's master it.

## What is the Singleton Pattern?

A Singleton restricts instantiation of a class to a single object. No matter how many times you try to create an instance, you always get the same one.

## Basic Implementation

```javascript
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        
        this.connection = null;
        Database.instance = this;
    }
    
    connect(url) {
        if (!this.connection) {
            this.connection = { url, connected: true };
            console.log(`Connected to ${url}`);
        }
    }
    
    query(sql) {
        if (!this.connection) {
            throw new Error('Not connected');
        }
        return `Executing: ${sql}`;
    }
}

// Always returns the same instance
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true
```

## ES6 Module Singleton

The simplest way - export a single instance:

```javascript
// database.js
class Database {
    constructor() {
        this.connection = null;
    }
    
    connect(url) {
        this.connection = { url, connected: true };
    }
}

export default new Database();
```

```javascript
// app.js
import db from './database.js';

db.connect('mongodb://localhost');
```

Every import gets the same instance!

## Configuration Singleton

```javascript
class Config {
    constructor() {
        if (Config.instance) {
            return Config.instance;
        }
        
        this.settings = {
            apiUrl: 'https://api.example.com',
            timeout: 5000,
            debug: false
        };
        
        Config.instance = this;
    }
    
    get(key) {
        return this.settings[key];
    }
    
    set(key, value) {
        this.settings[key] = value;
    }
}

const config = new Config();
export default config;
```

## Logger Singleton

```javascript
class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        
        this.logs = [];
        Logger.instance = this;
    }
    
    log(message) {
        const entry = {
            message,
            timestamp: new Date(),
            level: 'INFO'
        };
        this.logs.push(entry);
        console.log(`[${entry.timestamp.toISOString()}] ${message}`);
    }
    
    error(message) {
        const entry = {
            message,
            timestamp: new Date(),
            level: 'ERROR'
        };
        this.logs.push(entry);
        console.error(`[${entry.timestamp.toISOString()}] ERROR: ${message}`);
    }
    
    getLogs() {
        return [...this.logs];
    }
}

export default new Logger();
```

## State Management Singleton

```javascript
class Store {
    constructor() {
        if (Store.instance) {
            return Store.instance;
        }
        
        this.state = {};
        this.listeners = [];
        Store.instance = this;
    }
    
    getState() {
        return { ...this.state };
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

const store = new Store();
export default store;
```

## Lazy Initialization

Create instance only when needed:

```javascript
class HeavyResource {
    constructor() {
        console.log('Initializing heavy resource...');
        this.data = this.loadHeavyData();
    }
    
    loadHeavyData() {
        // Expensive operation
        return { /* large data */ };
    }
    
    static getInstance() {
        if (!HeavyResource.instance) {
            HeavyResource.instance = new HeavyResource();
        }
        return HeavyResource.instance;
    }
}

// Not created until first use
const resource = HeavyResource.getInstance();
```

## Thread-Safe Singleton (Node.js)

```javascript
let instance = null;
let isCreating = false;

class AsyncSingleton {
    constructor() {
        if (instance) {
            return instance;
        }
        
        if (isCreating) {
            throw new Error('Singleton is being created');
        }
        
        isCreating = true;
        this.data = null;
        instance = this;
        isCreating = false;
    }
    
    async initialize() {
        if (!this.data) {
            this.data = await this.loadData();
        }
    }
    
    async loadData() {
        // Async initialization
        return { /* data */ };
    }
}
```

## When to Use Singletons

**Good use cases:**
- Configuration management
- Logging
- Database connections
- Caching
- Thread pools
- Device drivers

**Bad use cases:**
- When you need multiple instances
- Testing (hard to mock)
- When state should be isolated

## Pros and Cons

**Pros:**
- Controlled access to single instance
- Reduced memory footprint
- Global access point
- Lazy initialization possible

**Cons:**
- Global state (can cause issues)
- Hard to test (tight coupling)
- Violates Single Responsibility Principle
- Can hide dependencies

## Testing Singletons

```javascript
class TestableDatabase {
    constructor() {
        if (TestableDatabase.instance && !TestableDatabase.testing) {
            return TestableDatabase.instance;
        }
        
        this.connection = null;
        if (!TestableDatabase.testing) {
            TestableDatabase.instance = this;
        }
    }
    
    static reset() {
        TestableDatabase.instance = null;
    }
    
    static enableTesting() {
        TestableDatabase.testing = true;
    }
}

// In tests
beforeEach(() => {
    TestableDatabase.enableTesting();
    TestableDatabase.reset();
});
```

## Alternatives to Singleton

### Dependency Injection

```javascript
class UserService {
    constructor(database) {
        this.db = database;
    }
    
    async getUser(id) {
        return await this.db.query(`SELECT * FROM users WHERE id = ${id}`);
    }
}

// Inject dependency
const db = new Database();
const userService = new UserService(db);
```

### Factory Pattern

```javascript
class DatabaseFactory {
    static create() {
        return new Database();
    }
}
```

## Best Practices

**1. Use ES6 modules for simple singletons**

```javascript
// config.js
export default {
    apiUrl: 'https://api.example.com',
    timeout: 5000
};
```

**2. Make it clear it's a singleton**

```javascript
class DatabaseSingleton {
    // Clear naming
}
```

**3. Provide a way to reset for testing**

```javascript
class Logger {
    static reset() {
        Logger.instance = null;
    }
}
```

**4. Consider lazy initialization**

```javascript
static getInstance() {
    if (!this.instance) {
        this.instance = new this();
    }
    return this.instance;
}
```

## Key Takeaways

- Singleton ensures only one instance exists
- Use ES6 modules for simple singletons
- Good for configuration, logging, caching
- Can make testing difficult
- Consider alternatives like dependency injection
- Provide reset mechanism for tests
- Use lazy initialization when appropriate

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/singleton-pattern](https://rws8.tech/tutorials/javascript/singleton-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #SingletonPattern #DesignPatterns #SoftwareArchitecture #WebDevelopment #Programming
