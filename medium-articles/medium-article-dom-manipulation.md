# JavaScript DOM Manipulation: Dynamic Web Page Control

The Document Object Model (DOM) is your gateway to creating dynamic, interactive web pages. Master DOM manipulation to select, create, modify, and remove HTML elements with JavaScript. Let's dive in.

## Selecting Elements

```javascript
// By ID
const header = document.getElementById('header');

// By CSS selector (first match)
const button = document.querySelector('.btn-primary');

// By CSS selector (all matches)
const items = document.querySelectorAll('.list-item');

// By class name
const cards = document.getElementsByClassName('card');

// By tag name
const paragraphs = document.getElementsByTagName('p');
```

## Creating Elements

```javascript
// Create element
const div = document.createElement('div');
div.className = 'container';
div.id = 'main-container';

// Set content
div.textContent = 'Hello World';
div.innerHTML = '<p>Hello <strong>World</strong></p>';

// Append to DOM
document.body.appendChild(div);
```

## Modifying Elements

```javascript
const element = document.querySelector('#myElement');

// Change content
element.textContent = 'New text';
element.innerHTML = '<span>New HTML</span>';

// Change attributes
element.setAttribute('data-id', '123');
element.id = 'newId';
element.className = 'new-class';

// Change styles
element.style.color = 'blue';
element.style.backgroundColor = '#f0f0f0';

// Add/remove classes
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('visible');
```

## Removing Elements

```javascript
// Remove element
const element = document.querySelector('#myElement');
element.remove();

// Remove child
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');
parent.removeChild(child);

// Clear all children
parent.innerHTML = '';
```

## Real-World Example

```javascript
// Create todo list item
function addTodo(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    const span = document.createElement('span');
    span.textContent = text;
    
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = () => li.remove();
    
    li.appendChild(span);
    li.appendChild(button);
    
    document.querySelector('#todoList').appendChild(li);
}

addTodo('Learn DOM manipulation');
```

## Best Practices

- Use `querySelector` for modern selector-based selection
- Cache DOM references to avoid repeated queries
- Use `textContent` for text, `innerHTML` for HTML
- Batch DOM updates to minimize reflows
- Use `classList` instead of direct `className` manipulation

## Key Takeaways

- DOM manipulation enables dynamic web pages
- `querySelector` is the modern way to select elements
- Create elements with `createElement`
- Modify content with `textContent` or `innerHTML`
- Remove elements with `remove()` or `removeChild()`
- Cache DOM references for better performance

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/dom-manipulation](https://rws8.tech/tutorials/javascript/dom-manipulation/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #DOM #WebDevelopment #Frontend #DOMManipulation
