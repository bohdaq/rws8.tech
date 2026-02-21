# JavaScript LocalStorage: Browser Data Persistence

LocalStorage provides a simple way to persist data in the browser. Learn how to store, retrieve, and manage data with the Web Storage API.

## Basic Usage

```javascript
// Store data
localStorage.setItem('username', 'John');
localStorage.setItem('theme', 'dark');

// Retrieve data
const username = localStorage.getItem('username'); // 'John'
const theme = localStorage.getItem('theme'); // 'dark'

// Remove data
localStorage.removeItem('username');

// Clear all data
localStorage.clear();

// Check if key exists
if (localStorage.getItem('theme')) {
    console.log('Theme is set');
}
```

## Storing Objects

```javascript
// Store object as JSON
const user = {
    name: 'John Doe',
    email: 'john@example.com',
    preferences: { theme: 'dark' }
};

localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 'John Doe'
```

## Storage Helper Class

```javascript
class Storage {
    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
    
    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    }
    
    static remove(key) {
        localStorage.removeItem(key);
    }
    
    static clear() {
        localStorage.clear();
    }
}

// Usage
Storage.set('user', { name: 'John' });
const user = Storage.get('user');
```

## Storage with Expiration

```javascript
function setWithExpiry(key, value, ttl) {
    const item = {
        value: value,
        expiry: Date.now() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    
    return item.value;
}

// Store for 1 hour
setWithExpiry('token', 'abc123', 3600000);
const token = getWithExpiry('token');
```

## Storage Events

```javascript
// Listen for storage changes (from other tabs)
window.addEventListener('storage', (e) => {
    console.log('Key:', e.key);
    console.log('Old value:', e.oldValue);
    console.log('New value:', e.newValue);
    console.log('URL:', e.url);
});
```

## Important Considerations

**Storage Limits:**
- ~5-10MB per origin
- Synchronous API (blocks main thread)
- String-only storage (use JSON)

**Security:**
- Not encrypted
- Accessible via JavaScript
- Don't store sensitive data
- Vulnerable to XSS attacks

**Best Practices:**
- Always use try/catch
- Validate data before storing
- Handle quota exceeded errors
- Use sessionStorage for temporary data
- Consider IndexedDB for large data

## Key Takeaways

- LocalStorage persists data across sessions
- Store only strings (use JSON for objects)
- ~5-10MB storage limit
- Synchronous API
- Not secure - don't store sensitive data
- Use try/catch for error handling
- Storage events sync across tabs

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/local-storage](https://rws8.tech/tutorials/javascript/local-storage/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #LocalStorage #WebStorage #BrowserAPI #DataPersistence
