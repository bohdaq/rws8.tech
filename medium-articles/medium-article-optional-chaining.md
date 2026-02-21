# JavaScript Optional Chaining and Nullish Coalescing: Safe Property Access

Optional chaining (?.) and nullish coalescing (??) are game-changing JavaScript operators that make working with potentially null or undefined values safer and cleaner. Let's master both.

## The Problem

Accessing nested properties can crash your app:

```javascript
const user = { name: 'Jane' };
console.log(user.address.city); // TypeError!
```

**Old solution:** Verbose manual checks

```javascript
const city = user && user.address && user.address.city;
```

## Optional Chaining (?.)

Short-circuits and returns `undefined` if any part is null/undefined:

```javascript
const city = user?.address?.city;
console.log(city); // undefined (no error!)
```

### Property Access

```javascript
const user = {
    name: 'John',
    address: { city: 'New York' }
};

console.log(user?.address?.city); // 'New York'
console.log(user?.phone?.number); // undefined
```

### Method Calls

```javascript
const user = {
    greet() {
        return 'Hello!';
    }
};

console.log(user.greet?.()); // "Hello!"
console.log(user.farewell?.()); // undefined (no error!)
```

### Array Access

```javascript
const users = [{ name: 'John' }, { name: 'Jane' }];

console.log(users?.[0]?.name); // 'John'
console.log(users?.[5]?.name); // undefined
```

## Nullish Coalescing (??)

Returns the right operand when the left is `null` or `undefined`:

```javascript
const value = null ?? 'default';
console.log(value); // 'default'

const value2 = undefined ?? 'default';
console.log(value2); // 'default'
```

### ?? vs ||

**Critical difference:** `??` only checks null/undefined, not all falsy values:

```javascript
const count = 0;
console.log(count || 10); // 10 (wrong!)
console.log(count ?? 10); // 0 (correct!)

const name = '';
console.log(name || 'Guest'); // 'Guest'
console.log(name ?? 'Guest'); // '' (keeps empty string)
```

## Combining ?. and ??

Perfect for safe access with defaults:

```javascript
const user = { name: 'John' };

const city = user?.address?.city ?? 'Unknown';
console.log(city); // 'Unknown'

const hobby = user?.hobbies?.[0] ?? 'No hobbies';
console.log(hobby); // 'No hobbies'
```

## Real-World Examples

### API Response Handling

```javascript
async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    
    const userName = data?.user?.name;
    const avatar = data?.user?.profile?.avatar;
    const firstHobby = data?.user?.hobbies?.[0];
    
    return { userName, avatar, firstHobby };
}
```

### Configuration with Defaults

```javascript
function createServer(config) {
    const port = config?.server?.port ?? 3000;
    const host = config?.server?.host ?? 'localhost';
    const timeout = config?.timeout ?? 5000;
    
    return { port, host, timeout };
}

createServer(); // All defaults
createServer({ server: { port: 8080 } }); // Partial config
```

### Optional Callbacks

```javascript
function processData(data, callback) {
    const result = transform(data);
    callback?.(result); // Only calls if callback exists
}

processData(data); // No error without callback
processData(data, console.log); // Calls callback
```

### DOM Manipulation

```javascript
const button = document.querySelector('#submit-btn');
button?.addEventListener('click', handleClick);

const text = document
    .querySelector('.container')
    ?.querySelector('.text')
    ?.textContent;
```

### Form Validation

```javascript
function validateForm(form) {
    const email = form?.elements?.email?.value ?? '';
    const password = form?.elements?.password?.value ?? '';
    
    return email && password;
}
```

### localStorage with Fallback

```javascript
const theme = localStorage.getItem('theme') ?? 'light';
const user = JSON.parse(localStorage.getItem('user') ?? '{}');
```

## Common Pitfalls

### 1. Overusing Optional Chaining

```javascript
// Too defensive
function greet(user) {
    return `Hello, ${user?.name}!`; // Unnecessary if user is required
}

// Better - fail fast
function greet(user) {
    return `Hello, ${user.name}!`;
}
```

### 2. Hiding Bugs

```javascript
// Silently returns undefined - hard to debug
const result = calculateTotal?.();

// Better - be explicit
if (typeof calculateTotal === 'function') {
    const result = calculateTotal();
}
```

### 3. Confusing ?? with ||

```javascript
const count = 0;

// Wrong - treats 0 as falsy
const value = count || 10; // 10

// Right - only null/undefined
const value = count ?? 10; // 0
```

## Best Practices

**1. Use for external data**

Perfect for API responses and user input:

```javascript
const userName = apiResponse?.data?.user?.name ?? 'Guest';
```

**2. Don't hide required properties**

If a property should always exist, don't use optional chaining:

```javascript
// Bad - hides bugs
function processUser(user) {
    return user?.id;
}

// Good - fails fast
function processUser(user) {
    return user.id;
}
```

**3. Combine with destructuring**

```javascript
const { name, email } = user?.profile ?? {};
```

## Browser Support

- Chrome 80+
- Firefox 74+
- Safari 13.1+
- Edge 80+
- Node.js 14+

For older browsers, use Babel to transpile.

## Key Takeaways

- Optional chaining (?.) safely accesses nested properties
- Returns undefined instead of throwing errors
- Works with properties, methods, and arrays
- Nullish coalescing (??) provides defaults for null/undefined
- ?? only checks null/undefined, not all falsy values
- Combine ?. and ?? for safe access with defaults
- Don't overuse - let required properties fail fast
- Perfect for external data and optional callbacks

## Learn More

Want to dive deeper? Check out the full tutorial at [rws8.tech/tutorials/javascript/optional-chaining](https://rws8.tech/tutorials/javascript/optional-chaining/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and modern web development.

**Tags:** #JavaScript #OptionalChaining #NullishCoalescing #ES2020 #ModernJavaScript #WebDevelopment
