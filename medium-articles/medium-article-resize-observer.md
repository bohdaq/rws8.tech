# JavaScript ResizeObserver: Detect Element Size Changes

ResizeObserver provides an efficient way to detect when elements change size. Perfect for responsive components, dynamic layouts, and adaptive UIs without polling or window resize listeners.

## Basic Usage

```javascript
const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        
        console.log(`Size: ${width}x${height}`);
        
        // React to size changes
        if (width < 600) {
            entry.target.classList.add('mobile');
        } else {
            entry.target.classList.remove('mobile');
        }
    });
});

const element = document.querySelector('#myElement');
observer.observe(element);

// Stop observing
observer.unobserve(element);
observer.disconnect();
```

## Responsive Component

```javascript
class ResponsiveCard {
    constructor(element) {
        this.element = element;
        this.observer = new ResizeObserver(this.handleResize.bind(this));
        this.observer.observe(element);
    }
    
    handleResize(entries) {
        const { width } = entries[0].contentRect;
        
        if (width < 300) {
            this.element.classList.add('compact');
        } else {
            this.element.classList.remove('compact');
        }
    }
    
    destroy() {
        this.observer.disconnect();
    }
}

const card = new ResponsiveCard(document.querySelector('.card'));
```

## Chart Resizing

```javascript
const chartObserver = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        const { width, height } = entry.contentRect;
        
        // Redraw chart with new dimensions
        chart.resize(width, height);
    });
});

chartObserver.observe(chartContainer);
```

## Entry Properties

```javascript
const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
        // Element being observed
        console.log(entry.target);
        
        // Content box dimensions
        console.log(entry.contentRect);
        // { x, y, width, height, top, right, bottom, left }
        
        // Border box size
        console.log(entry.borderBoxSize);
        
        // Content box size
        console.log(entry.contentBoxSize);
    });
});
```

## Best Practices

- Disconnect observers when done
- Debounce expensive operations
- Use for element-specific sizing (not window)
- More performant than window resize + polling
- Fires before paint for smooth updates

## Key Takeaways

- ResizeObserver detects element size changes
- More efficient than window resize listeners
- Perfect for responsive components
- Provides detailed size information
- Fires before paint for smooth updates
- Always disconnect when no longer needed
- Use for container queries pattern

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/resize-observer](https://rws8.tech/tutorials/javascript/resize-observer/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #ResizeObserver #ResponsiveDesign #WebAPI #Performance
