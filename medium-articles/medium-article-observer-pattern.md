# JavaScript Observer Pattern: React to State Changes

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically. It's the foundation of reactive programming. Let's master it.

## What is the Observer Pattern?

An Observer (subscriber) registers with a Subject (publisher) to receive notifications when the subject's state changes.

## Basic Implementation

```javascript
class Subject {
    constructor() {
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(data) {
        console.log(`${this.name} received:`, data);
    }
}

// Usage
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello observers!');
// Observer 1 received: Hello observers!
// Observer 2 received: Hello observers!
```

## Event Emitter Pattern

```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    
    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }
    
    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(data));
    }
    
    once(event, listener) {
        const onceWrapper = (data) => {
            listener(data);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }
}

// Usage
const emitter = new EventEmitter();

emitter.on('data', (data) => console.log('Received:', data));
emitter.on('data', (data) => console.log('Also received:', data));

emitter.emit('data', { message: 'Hello' });
```

## Real-World Examples

### State Management

```javascript
class Store {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }
    
    getState() {
        return this.state;
    }
    
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.unsubscribe(listener);
    }
    
    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

const store = new Store({ count: 0 });

const unsubscribe = store.subscribe(state => {
    console.log('State changed:', state);
});

store.setState({ count: 1 });
store.setState({ count: 2 });
```

### DOM Observer

```javascript
class DOMObserver {
    constructor(element) {
        this.element = element;
        this.observers = [];
    }
    
    observe(event) {
        this.element.addEventListener(event, (e) => {
            this.notify(event, e);
        });
    }
    
    subscribe(callback) {
        this.observers.push(callback);
    }
    
    notify(event, data) {
        this.observers.forEach(observer => observer(event, data));
    }
}

const button = document.querySelector('#myButton');
const domObserver = new DOMObserver(button);

domObserver.observe('click');
domObserver.subscribe((event, data) => {
    console.log(`Button ${event}ed`);
});
```

## When to Use

**Good use cases:**
- Event systems
- State management
- Real-time updates
- Reactive programming
- Pub-sub systems

## Benefits

- Loose coupling
- Dynamic relationships
- Broadcast communication
- Easy to extend

## Key Takeaways

- Observer pattern enables reactive systems
- Subject notifies observers of changes
- Event emitters are observers
- Perfect for state management
- Foundation of reactive programming

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/observer-pattern](https://rws8.tech/tutorials/javascript/observer-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #ObserverPattern #DesignPatterns #ReactiveProgramming #WebDevelopment
