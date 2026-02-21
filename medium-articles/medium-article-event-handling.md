# JavaScript Event Handling: Respond to User Interactions

Event handling is the foundation of interactive web applications. Master event listeners, delegation, and the event flow to create responsive user experiences.

## Adding Event Listeners

```javascript
const button = document.querySelector('#myButton');

// Modern way
button.addEventListener('click', (event) => {
    console.log('Button clicked!');
    console.log('Event:', event);
});

// Multiple listeners
button.addEventListener('click', handler1);
button.addEventListener('click', handler2);

// Remove listener
button.removeEventListener('click', handler1);
```

## Event Object

```javascript
button.addEventListener('click', (event) => {
    event.target;        // Element that triggered event
    event.currentTarget; // Element with listener
    event.type;          // Event type ('click')
    event.preventDefault(); // Prevent default action
    event.stopPropagation(); // Stop bubbling
});
```

## Event Delegation

```javascript
// Instead of adding listeners to many items
const list = document.querySelector('#list');

list.addEventListener('click', (event) => {
    if (event.target.matches('.list-item')) {
        console.log('Item clicked:', event.target.textContent);
    }
});

// Works for dynamically added items!
```

## Common Events

```javascript
// Click events
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);

// Input events
input.addEventListener('input', handler);  // Every change
input.addEventListener('change', handler); // After blur
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);

// Form events
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop form submission
    // Handle form data
});

// Keyboard events
document.addEventListener('keydown', (e) => {
    console.log('Key:', e.key);
    if (e.key === 'Enter') {
        // Handle Enter key
    }
});

// Mouse events
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
element.addEventListener('mousemove', handler);
```

## Event Bubbling

```javascript
// Events bubble up from target to root
document.querySelector('#child').addEventListener('click', () => {
    console.log('Child clicked');
});

document.querySelector('#parent').addEventListener('click', () => {
    console.log('Parent clicked'); // Also fires!
});

// Stop bubbling
child.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Only child fires');
});
```

## Best Practices

```javascript
// 1. Use event delegation for lists
list.addEventListener('click', (e) => {
    if (e.target.matches('.item')) {
        // Handle item click
    }
});

// 2. Remove listeners when done
const cleanup = () => {
    element.removeEventListener('click', handler);
};

// 3. Prevent default when needed
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Custom handling
});

// 4. Debounce expensive operations
const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

input.addEventListener('input', debounce((e) => {
    // Expensive operation
}, 300));
```

## Key Takeaways

- Use `addEventListener` for modern event handling
- Event delegation improves performance
- Events bubble up from target to root
- Use `preventDefault()` to stop default behavior
- Use `stopPropagation()` to stop bubbling
- Debounce expensive event handlers
- Remove listeners to prevent memory leaks

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/event-handling](https://rws8.tech/tutorials/javascript/event-handling/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #Events #EventHandling #WebDevelopment #Frontend
