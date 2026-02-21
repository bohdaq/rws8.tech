# JavaScript Proxies: Metaprogramming with Interceptors

Proxies enable intercepting and customizing fundamental object operations. Perfect for validation, logging, data binding, and building reactive frameworks.

## Basic Proxy

```javascript
const target = { name: 'John', age: 30 };

const handler = {
    get(target, property) {
        console.log(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        console.log(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Logs: Getting name, Returns: 'John'
proxy.age = 31; // Logs: Setting age to 31
```

## Validation

```javascript
const validator = {
    set(target, property, value) {
        if (property === 'age') {
            if (typeof value !== 'number') {
                throw new TypeError('Age must be a number');
            }
            if (value < 0 || value > 150) {
                throw new RangeError('Age must be between 0 and 150');
            }
        }
        target[property] = value;
        return true;
    }
};

const person = new Proxy({}, validator);
person.age = 30; // OK
// person.age = 'thirty'; // TypeError
// person.age = 200; // RangeError
```

## Default Values

```javascript
const withDefaults = (target, defaults) => {
    return new Proxy(target, {
        get(target, property) {
            return property in target 
                ? target[property] 
                : defaults[property];
        }
    });
};

const config = withDefaults(
    { host: 'localhost' },
    { host: '0.0.0.0', port: 3000, debug: false }
);

console.log(config.host); // 'localhost'
console.log(config.port); // 3000 (from defaults)
console.log(config.debug); // false (from defaults)
```

## Reactive Data

```javascript
function reactive(target, callback) {
    return new Proxy(target, {
        set(target, property, value) {
            const oldValue = target[property];
            target[property] = value;
            callback(property, value, oldValue);
            return true;
        }
    });
}

const state = reactive({ count: 0 }, (prop, newVal, oldVal) => {
    console.log(`${prop} changed from ${oldVal} to ${newVal}`);
    updateUI();
});

state.count++; // Logs change and updates UI
```

## Negative Array Indices

```javascript
function negativeArray(array) {
    return new Proxy(array, {
        get(target, property) {
            const index = Number(property);
            if (index < 0) {
                return target[target.length + index];
            }
            return target[property];
        }
    });
}

const arr = negativeArray([1, 2, 3, 4, 5]);
console.log(arr[-1]); // 5
console.log(arr[-2]); // 4
```

## Method Tracing

```javascript
function trace(target) {
    return new Proxy(target, {
        get(target, property) {
            const value = target[property];
            if (typeof value === 'function') {
                return function(...args) {
                    console.log(`Calling ${property} with`, args);
                    const result = value.apply(this, args);
                    console.log(`${property} returned`, result);
                    return result;
                };
            }
            return value;
        }
    });
}

const math = trace({
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
});

math.add(2, 3); // Logs call and result
```

## Best Practices

- Use proxies for cross-cutting concerns
- Keep trap logic simple and fast
- Return appropriate values from traps
- Be aware of performance implications
- Use Reflect for default behavior
- Consider revocable proxies for security

## Key Takeaways

- Proxies intercept object operations
- Traps customize fundamental operations
- Perfect for validation and logging
- Enable reactive data structures
- Power metaprogramming patterns
- Use Reflect for default behavior
- Consider performance impact

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/proxies](https://rws8.tech/tutorials/javascript/proxies/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #Proxies #Metaprogramming #Reactive #Validation #ES6
