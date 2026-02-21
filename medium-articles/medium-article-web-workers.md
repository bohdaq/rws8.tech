# JavaScript Web Workers: Background Thread Processing

Web Workers enable running JavaScript in background threads, preventing UI blocking during CPU-intensive tasks. Perfect for data processing, calculations, and maintaining responsive applications.

## Basic Usage

```javascript
// Main thread
const worker = new Worker('worker.js');

// Send message to worker
worker.postMessage({ data: [1, 2, 3, 4, 5] });

// Receive message from worker
worker.onmessage = (event) => {
    console.log('Result:', event.data);
};

// Handle errors
worker.onerror = (error) => {
    console.error('Worker error:', error);
};

// Terminate worker
worker.terminate();
```

```javascript
// worker.js
self.onmessage = (event) => {
    const { data } = event.data;
    
    // Perform heavy computation
    const result = data.reduce((sum, n) => sum + n, 0);
    
    // Send result back
    self.postMessage(result);
};
```

## Real-World Example

```javascript
// Main thread - image processing
const worker = new Worker('image-processor.js');

worker.postMessage({
    imageData: imageData,
    filter: 'blur'
});

worker.onmessage = (event) => {
    const processedImage = event.data;
    displayImage(processedImage);
};
```

```javascript
// image-processor.js
self.onmessage = (event) => {
    const { imageData, filter } = event.data;
    
    // Apply filter (CPU-intensive)
    const processed = applyFilter(imageData, filter);
    
    self.postMessage(processed);
};
```

## Transferable Objects

```javascript
// Transfer ownership for better performance
const buffer = new ArrayBuffer(1024);
worker.postMessage({ buffer }, [buffer]);
// buffer is now unusable in main thread
```

## Best Practices

- Use for CPU-intensive tasks
- Transfer large data with Transferable Objects
- Terminate workers when done
- Handle errors properly
- Limit number of workers
- Use worker pools for multiple tasks

## Key Takeaways

- Web Workers run JavaScript in background threads
- Prevent UI blocking during heavy computations
- Communicate via message passing
- Cannot access DOM directly
- Use Transferable Objects for performance
- Terminate workers to free resources
- Perfect for data processing and calculations

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/web-workers](https://rws8.tech/tutorials/javascript/web-workers/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #WebWorkers #Performance #Threading #Concurrency #WebAPI
