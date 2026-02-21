# JavaScript MutationObserver: Detect and Respond to DOM Changes

MutationObserver provides an efficient way to watch for changes in the DOM tree. Perfect for monitoring dynamic content, tracking modifications, and building reactive UIs.

## Basic Usage

```javascript
// Create observer
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        console.log('Type:', mutation.type);
        console.log('Target:', mutation.target);
        
        if (mutation.type === 'childList') {
            console.log('Added:', mutation.addedNodes);
            console.log('Removed:', mutation.removedNodes);
        }
        
        if (mutation.type === 'attributes') {
            console.log('Attribute:', mutation.attributeName);
            console.log('Old value:', mutation.oldValue);
        }
    });
});

// Observe element
const target = document.querySelector('#myElement');
observer.observe(target, {
    childList: true,      // Watch for child additions/removals
    attributes: true,     // Watch for attribute changes
    subtree: true,        // Watch descendants too
    attributeOldValue: true, // Record old attribute values
    characterData: true   // Watch for text changes
});

// Stop observing
observer.disconnect();
```

## Monitor Child Changes

```javascript
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
                console.log('Added element:', node.tagName);
            }
        });
        
        mutation.removedNodes.forEach(node => {
            if (node.nodeType === 1) {
                console.log('Removed element:', node.tagName);
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
```

## Track Attribute Changes

```javascript
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
            const element = mutation.target;
            const attr = mutation.attributeName;
            const newValue = element.getAttribute(attr);
            
            console.log(`${attr} changed to: ${newValue}`);
        }
    });
});

observer.observe(element, {
    attributes: true,
    attributeFilter: ['class', 'style'], // Only these attributes
    attributeOldValue: true
});
```

## Real-World Examples

### Auto-save on Content Changes

```javascript
const editor = document.querySelector('#editor');

const saveObserver = new MutationObserver(() => {
    clearTimeout(saveObserver.timeout);
    saveObserver.timeout = setTimeout(() => {
        saveContent(editor.innerHTML);
    }, 1000);
});

saveObserver.observe(editor, {
    childList: true,
    subtree: true,
    characterData: true
});
```

### Track Dynamic Content

```javascript
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.matches && node.matches('.product-card')) {
                initializeProduct(node);
            }
        });
    });
});

observer.observe(document.querySelector('#products'), {
    childList: true
});
```

## Configuration Options

```javascript
observer.observe(target, {
    childList: true,          // Child nodes added/removed
    attributes: true,         // Attribute changes
    characterData: true,      // Text content changes
    subtree: true,           // Observe descendants
    attributeOldValue: true, // Record old attribute values
    characterDataOldValue: true, // Record old text
    attributeFilter: ['class', 'id'] // Specific attributes only
});
```

## Best Practices

- Disconnect observers when done
- Use specific configuration to reduce overhead
- Batch processing for performance
- Avoid infinite loops (observer triggering changes)
- Use attributeFilter to limit scope

## Key Takeaways

- MutationObserver watches DOM changes efficiently
- Configure what to observe (children, attributes, text)
- Receives mutation records with change details
- More performant than polling or mutation events
- Always disconnect when no longer needed
- Use subtree: true to watch descendants
- Filter attributes to reduce overhead

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/mutation-observer](https://rws8.tech/tutorials/javascript/mutation-observer/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #MutationObserver #DOM #WebAPI #DOMChanges #Performance
