# JavaScript Fetch API: Modern HTTP Requests

The Fetch API provides a modern interface for making HTTP requests. Learn how to fetch data, handle responses, and work with async/await for clean, readable code.

## Basic GET Request

```javascript
// Simple GET request
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// With async/await (cleaner)
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## POST Request

```javascript
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Usage
const newUser = await createUser({
    name: 'John Doe',
    email: 'john@example.com'
});
```

## Error Handling

```javascript
async function fetchWithErrorHandling(url) {
    try {
        const response = await fetch(url);
        
        // fetch doesn't reject on HTTP errors!
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error('Network error:', error);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}
```

## Request Options

```javascript
const response = await fetch(url, {
    method: 'POST',           // GET, POST, PUT, DELETE, etc.
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
    },
    body: JSON.stringify(data),
    mode: 'cors',             // cors, no-cors, same-origin
    credentials: 'include',   // include, same-origin, omit
    cache: 'no-cache',        // default, no-cache, reload, etc.
    redirect: 'follow',       // follow, error, manual
    signal: abortController.signal // For cancellation
});
```

## Response Methods

```javascript
const response = await fetch(url);

// Parse response
const json = await response.json();      // JSON
const text = await response.text();      // Plain text
const blob = await response.blob();      // Binary data
const formData = await response.formData(); // Form data
const arrayBuffer = await response.arrayBuffer(); // Raw bytes

// Response properties
response.ok;          // true if status 200-299
response.status;      // HTTP status code
response.statusText;  // Status message
response.headers;     // Response headers
response.url;         // Final URL
```

## Real-World Examples

### API Client

```javascript
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = null;
    }
    
    setToken(token) {
        this.token = token;
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        const response = await fetch(url, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        return response.json();
    }
    
    get(endpoint) {
        return this.request(endpoint);
    }
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

const api = new ApiClient('https://api.example.com');
api.setToken('my-token');
const users = await api.get('/users');
```

### Request Timeout

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }
        throw error;
    }
}
```

## Best Practices

- Always check `response.ok` before parsing
- Use async/await for cleaner code
- Handle network errors with try/catch
- Set appropriate headers
- Use AbortController for cancellation
- Implement retry logic for failed requests

## Key Takeaways

- Fetch returns Promises, use async/await
- Check `response.ok` for HTTP errors
- Parse response with `.json()`, `.text()`, etc.
- Set headers and options for custom requests
- Handle both network and HTTP errors
- Use AbortController for request cancellation

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/fetch-api](https://rws8.tech/tutorials/javascript/fetch-api/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #FetchAPI #HTTP #AsyncAwait #WebDevelopment #API
