# JavaScript Factory Pattern: Flexible Object Creation

The Factory pattern provides an interface for creating objects without specifying their exact classes. It's perfect for when you need flexible, maintainable object creation. Let's master it.

## What is the Factory Pattern?

A Factory creates objects based on input or conditions, hiding the instantiation logic from the client code.

## Simple Factory

```javascript
class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
}

class Admin extends User {
    constructor(name) {
        super(name, 'admin');
        this.permissions = ['read', 'write', 'delete'];
    }
}

class Guest extends User {
    constructor(name) {
        super(name, 'guest');
        this.permissions = ['read'];
    }
}

class UserFactory {
    static createUser(type, name) {
        switch (type) {
            case 'admin':
                return new Admin(name);
            case 'guest':
                return new Guest(name);
            default:
                return new User(name, 'user');
        }
    }
}

// Usage
const admin = UserFactory.createUser('admin', 'John');
const guest = UserFactory.createUser('guest', 'Jane');
```

## Factory Method Pattern

```javascript
class VehicleFactory {
    createVehicle() {
        throw new Error('createVehicle must be implemented');
    }
}

class CarFactory extends VehicleFactory {
    createVehicle(model) {
        return new Car(model);
    }
}

class BikeFactory extends VehicleFactory {
    createVehicle(model) {
        return new Bike(model);
    }
}

// Usage
const carFactory = new CarFactory();
const car = carFactory.createVehicle('Tesla Model 3');
```

## Real-World Examples

### HTTP Client Factory

```javascript
class HttpClientFactory {
    static create(type) {
        switch (type) {
            case 'fetch':
                return new FetchClient();
            case 'axios':
                return new AxiosClient();
            case 'xhr':
                return new XHRClient();
            default:
                return new FetchClient();
        }
    }
}

class FetchClient {
    async get(url) {
        const response = await fetch(url);
        return response.json();
    }
}
```

### UI Component Factory

```javascript
class ComponentFactory {
    static create(type, props) {
        const components = {
            button: () => new Button(props),
            input: () => new Input(props),
            select: () => new Select(props)
        };
        
        const creator = components[type];
        return creator ? creator() : null;
    }
}

const button = ComponentFactory.create('button', { 
    text: 'Click me',
    onClick: () => console.log('Clicked!')
});
```

### Database Connection Factory

```javascript
class DatabaseFactory {
    static createConnection(type, config) {
        const connections = {
            mysql: () => new MySQLConnection(config),
            postgres: () => new PostgresConnection(config),
            mongodb: () => new MongoConnection(config)
        };
        
        const creator = connections[type];
        if (!creator) {
            throw new Error(`Unknown database type: ${type}`);
        }
        
        return creator();
    }
}

const db = DatabaseFactory.createConnection('postgres', {
    host: 'localhost',
    port: 5432
});
```

## Abstract Factory

Create families of related objects:

```javascript
class UIFactory {
    createButton() {}
    createInput() {}
}

class DarkThemeFactory extends UIFactory {
    createButton() {
        return new DarkButton();
    }
    
    createInput() {
        return new DarkInput();
    }
}

class LightThemeFactory extends UIFactory {
    createButton() {
        return new LightButton();
    }
    
    createInput() {
        return new LightInput();
    }
}

// Usage
const factory = theme === 'dark' 
    ? new DarkThemeFactory() 
    : new LightThemeFactory();

const button = factory.createButton();
const input = factory.createInput();
```

## When to Use Factory Pattern

**Good use cases:**
- Object creation is complex
- Need to decouple creation from usage
- Creating families of related objects
- Plugin systems
- Dependency injection

## Benefits

- Loose coupling
- Single Responsibility Principle
- Open/Closed Principle
- Easy to extend
- Centralized object creation

## Key Takeaways

- Factory creates objects without specifying exact classes
- Simple Factory uses switch/if statements
- Factory Method uses inheritance
- Abstract Factory creates families of objects
- Perfect for plugin systems and DI
- Promotes loose coupling

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/factory-pattern](https://rws8.tech/tutorials/javascript/factory-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #FactoryPattern #DesignPatterns #SoftwareArchitecture #WebDevelopment
