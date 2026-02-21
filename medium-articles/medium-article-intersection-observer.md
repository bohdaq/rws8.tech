# JavaScript IntersectionObserver: Efficient Visibility Detection

IntersectionObserver provides an efficient way to detect when elements enter or leave the viewport. Perfect for lazy loading, infinite scroll, and scroll animations.

## Basic Usage

```javascript
// Create observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('Element is visible!');
            console.log('Intersection ratio:', entry.intersectionRatio);
        }
    });
});

// Observe element
const element = document.querySelector('#myElement');
observer.observe(element);

// Stop observing
observer.unobserve(element);

// Disconnect all
observer.disconnect();
```

## Lazy Loading Images

```javascript
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

## Infinite Scroll

```javascript
const sentinel = document.querySelector('#sentinel');

const infiniteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadMoreContent();
        }
    });
}, {
    rootMargin: '100px' // Load before reaching bottom
});

infiniteObserver.observe(sentinel);

async function loadMoreContent() {
    const data = await fetchMoreData();
    renderContent(data);
}
```

## Scroll Animations

```javascript
const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // 50% visible
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateObserver.observe(el);
});
```

## Options

```javascript
const observer = new IntersectionObserver(callback, {
    root: null,           // viewport (default)
    rootMargin: '0px',    // margin around root
    threshold: 0.5        // 0-1 or array [0, 0.5, 1]
});
```

## Entry Properties

```javascript
entry.target              // The observed element
entry.isIntersecting      // Is element intersecting?
entry.intersectionRatio   // 0-1, how much is visible
entry.intersectionRect    // Visible portion rectangle
entry.boundingClientRect  // Element's bounding box
entry.rootBounds          // Root's bounding box
entry.time                // Timestamp
```

## Best Practices

- Unobserve elements after loading
- Use rootMargin for early loading
- Set appropriate threshold values
- Disconnect observer when done
- Handle browser compatibility
- Use polyfill for older browsers

## Key Takeaways

- IntersectionObserver detects element visibility efficiently
- Perfect for lazy loading and infinite scroll
- More performant than scroll event listeners
- Configure with root, rootMargin, threshold
- Unobserve elements when done
- Check isIntersecting for visibility
- Use rootMargin for early/late triggers

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/intersection-observer](https://rws8.tech/tutorials/javascript/intersection-observer/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #IntersectionObserver #LazyLoading #InfiniteScroll #Performance #WebAPI
