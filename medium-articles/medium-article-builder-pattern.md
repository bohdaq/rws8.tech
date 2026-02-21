# JavaScript Builder Pattern: Construct Complex Objects Step by Step

The Builder pattern separates the construction of a complex object from its representation. It's perfect for creating objects with many optional parameters using fluent interfaces. Let's master it.

## What is the Builder Pattern?

Builder allows you to construct complex objects step by step, using method chaining for a clean, readable API.

## Basic Implementation

```javascript
class User {
    constructor(builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
        this.address = builder.address;
    }
}

class UserBuilder {
    constructor(name) {
        this.name = name;
    }
    
    setEmail(email) {
        this.email = email;
        return this;
    }
    
    setAge(age) {
        this.age = age;
        return this;
    }
    
    setAddress(address) {
        this.address = address;
        return this;
    }
    
    build() {
        return new User(this);
    }
}

// Usage
const user = new UserBuilder('John')
    .setEmail('john@example.com')
    .setAge(30)
    .setAddress('123 Main St')
    .build();
```

## Fluent Interface

```javascript
class QueryBuilder {
    constructor() {
        this.query = '';
        this.params = [];
    }
    
    select(...fields) {
        this.query = `SELECT ${fields.join(', ')}`;
        return this;
    }
    
    from(table) {
        this.query += ` FROM ${table}`;
        return this;
    }
    
    where(condition, value) {
        this.query += ` WHERE ${condition}`;
        this.params.push(value);
        return this;
    }
    
    orderBy(field, direction = 'ASC') {
        this.query += ` ORDER BY ${field} ${direction}`;
        return this;
    }
    
    build() {
        return { query: this.query, params: this.params };
    }
}

// Usage
const query = new QueryBuilder()
    .select('id', 'name', 'email')
    .from('users')
    .where('age > ?', 18)
    .orderBy('name')
    .build();
```

## Real-World Examples

### HTTP Request Builder

```javascript
class RequestBuilder {
    constructor(url) {
        this.url = url;
        this.method = 'GET';
        this.headers = {};
        this.body = null;
    }
    
    setMethod(method) {
        this.method = method;
        return this;
    }
    
    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }
    
    setBody(body) {
        this.body = body;
        return this;
    }
    
    async execute() {
        return await fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body: this.body ? JSON.stringify(this.body) : null
        });
    }
}

const response = await new RequestBuilder('/api/users')
    .setMethod('POST')
    .setHeader('Content-Type', 'application/json')
    .setBody({ name: 'John' })
    .execute();
```

## When to Use

**Good use cases:**
- Complex object construction
- Many optional parameters
- Immutable objects
- Fluent APIs
- Query builders

## Benefits

- Readable code
- Flexible construction
- Immutability support
- Method chaining
- Clear API

## Key Takeaways

- Builder constructs complex objects step by step
- Method chaining creates fluent interfaces
- Perfect for objects with many parameters
- Returns `this` for chaining
- Call `build()` to create final object

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/builder-pattern](https://rws8.tech/tutorials/javascript/builder-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #BuilderPattern #DesignPatterns #FluentInterface #WebDevelopment
