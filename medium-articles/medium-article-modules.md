# JavaScript Modules: Organize Code with ES6 import/export

ES6 modules provide a standardized way to organize and share JavaScript code across files. They're essential for building maintainable, scalable applications. Let's master them.

## Why Modules?

Before ES6 modules, JavaScript had no native module system. Developers used:
- Global variables (namespace pollution)
- IIFEs (Immediately Invoked Function Expressions)
- CommonJS (Node.js)
- AMD (RequireJS)

ES6 modules provide a clean, standardized solution.

## Named Exports and Imports

### Exporting

```javascript
// utils.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export class Calculator {
    multiply(a, b) {
        return a * b;
    }
}
```

### Importing

```javascript
// app.js
import { PI, add, Calculator } from './utils.js';

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5

const calc = new Calculator();
console.log(calc.multiply(4, 5)); // 20
```

### Import All

```javascript
import * as utils from './utils.js';

console.log(utils.PI);
console.log(utils.add(2, 3));
```

### Rename Imports

```javascript
import { add as sum, PI as pi } from './utils.js';

console.log(sum(2, 3));
console.log(pi);
```

## Default Exports

Each module can have one default export:

```javascript
// user.js
export default class User {
    constructor(name) {
        this.name = name;
    }
}

// Or
class User {
    constructor(name) {
        this.name = name;
    }
}
export default User;
```

### Importing Default

```javascript
import User from './user.js';

const user = new User('John');
```

**Note:** You can name the import anything:

```javascript
import MyUser from './user.js'; // Works!
```

## Mixing Default and Named Exports

```javascript
// api.js
export default function fetchData() {
    return fetch('/api/data');
}

export const API_URL = 'https://api.example.com';
export const timeout = 5000;
```

```javascript
// Import both
import fetchData, { API_URL, timeout } from './api.js';
```

## Re-exporting

Aggregate exports from multiple modules:

```javascript
// shapes/index.js
export { Circle } from './circle.js';
export { Square } from './square.js';
export { Triangle } from './triangle.js';

// Or re-export everything
export * from './circle.js';
export * from './square.js';
```

```javascript
// app.js
import { Circle, Square, Triangle } from './shapes/index.js';
```

## Dynamic Imports

Load modules on demand for code splitting:

```javascript
// Static import - loaded immediately
import { heavy Function } from './heavy.js';

// Dynamic import - loaded when needed
button.addEventListener('click', async () => {
    const module = await import('./heavy.js');
    module.heavyFunction();
});
```

### Conditional Loading

```javascript
if (condition) {
    const module = await import('./feature.js');
    module.init();
}
```

### Lazy Loading Routes

```javascript
const routes = {
    '/home': () => import('./pages/home.js'),
    '/about': () => import('./pages/about.js'),
    '/contact': () => import('./pages/contact.js')
};

async function loadRoute(path) {
    const module = await routes[path]();
    module.render();
}
```

## Real-World Examples

### Utility Functions

```javascript
// utils/math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// utils/string.js
export const capitalize = (str) => 
    str.charAt(0).toUpperCase() + str.slice(1);

export const slugify = (str) =>
    str.toLowerCase().replace(/\s+/g, '-');
```

### API Service

```javascript
// services/api.js
const BASE_URL = 'https://api.example.com';

export async function fetchUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
}

export async function createUser(userData) {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
    return response.json();
}
```

### Configuration

```javascript
// config/index.js
export const config = {
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    timeout: 5000,
    retries: 3
};

export default config;
```

## Module Patterns

### Singleton Pattern

```javascript
// database.js
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        this.connection = null;
        Database.instance = this;
    }
    
    connect() {
        // Connect to database
    }
}

export default new Database();
```

### Factory Pattern

```javascript
// userFactory.js
export function createUser(type, data) {
    switch (type) {
        case 'admin':
            return new AdminUser(data);
        case 'guest':
            return new GuestUser(data);
        default:
            return new RegularUser(data);
    }
}
```

## Browser Support

### In HTML

```html
<script type="module" src="app.js"></script>
```

### Module Features

- Strict mode by default
- Top-level `this` is undefined
- Deferred execution
- Same-origin policy

### Fallback for Old Browsers

```html
<script type="module" src="app.js"></script>
<script nomodule src="app-legacy.js"></script>
```

## CommonJS vs ES6 Modules

### CommonJS (Node.js)

```javascript
// Export
module.exports = { add, subtract };

// Import
const { add, subtract } = require('./math');
```

### ES6 Modules

```javascript
// Export
export { add, subtract };

// Import
import { add, subtract } from './math.js';
```

**Key Differences:**
- ES6 modules are static (analyzed at compile time)
- CommonJS is dynamic (resolved at runtime)
- ES6 has better tree-shaking support
- ES6 imports are read-only bindings

## Best Practices

**1. One module, one responsibility**

```javascript
// Good - focused module
// user.js
export class User { }

// Bad - mixed concerns
// stuff.js
export class User { }
export class Product { }
export function formatDate() { }
```

**2. Use named exports for utilities**

```javascript
// utils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

**3. Use default export for main class/function**

```javascript
// User.js
export default class User { }
```

**4. Keep imports at the top**

```javascript
// Good
import { add } from './utils.js';

function calculate() {
    return add(1, 2);
}

// Bad - import in middle of file
function calculate() {
    import { add } from './utils.js'; // Error!
}
```

## Key Takeaways

- ES6 modules provide standardized code organization
- Use named exports for multiple exports
- Use default export for main export
- Dynamic imports enable code splitting
- Modules are strict mode by default
- Imports are read-only bindings
- Better tree-shaking than CommonJS
- Essential for modern JavaScript applications

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/modules](https://rws8.tech/tutorials/javascript/modules/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and modern web development.

**Tags:** #JavaScript #ES6Modules #Import #Export #ModernJavaScript #WebDevelopment #CodeOrganization
