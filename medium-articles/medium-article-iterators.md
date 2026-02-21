# JavaScript Iterators: Custom Iteration Protocols

Iterators provide a standard way to traverse data structures. Master iteration protocols to create custom iterables, implement lazy evaluation, and build powerful data abstractions.

## Basic Iterator

```javascript
const range = {
    start: 1,
    end: 5,
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}
```

## Iterator with Generator

```javascript
const range = {
    start: 1,
    end: 5,
    *[Symbol.iterator]() {
        for (let i = this.start; i <= this.end; i++) {
            yield i;
        }
    }
};

console.log([...range]); // [1, 2, 3, 4, 5]
```

## Custom Collection

```javascript
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    
    append(value) {
        const node = { value, next: null };
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }
    
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);

for (const value of list) {
    console.log(value); // 1, 2, 3
}
```

## Infinite Iterator

```javascript
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
```

## Iterator Helpers

```javascript
class IteratorHelpers {
    static take(iterable, n) {
        return {
            *[Symbol.iterator]() {
                let count = 0;
                for (const item of iterable) {
                    if (count++ >= n) break;
                    yield item;
                }
            }
        };
    }
    
    static filter(iterable, predicate) {
        return {
            *[Symbol.iterator]() {
                for (const item of iterable) {
                    if (predicate(item)) {
                        yield item;
                    }
                }
            }
        };
    }
    
    static map(iterable, fn) {
        return {
            *[Symbol.iterator]() {
                for (const item of iterable) {
                    yield fn(item);
                }
            }
        };
    }
}

// Usage
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = IteratorHelpers.take(
    IteratorHelpers.filter(
        IteratorHelpers.map(numbers, x => x * 2),
        x => x > 5
    ),
    3
);

console.log([...result]); // [6, 8, 10]
```

## Best Practices

- Implement Symbol.iterator for custom collections
- Use generators for simpler iterator implementation
- Return {done: true} when iteration completes
- Consider lazy evaluation for performance
- Make iterators reusable when appropriate

## Key Takeaways

- Iterators provide standard traversal protocol
- Symbol.iterator makes objects iterable
- Generators simplify iterator creation
- Perfect for custom data structures
- Enable lazy evaluation patterns
- Work with for...of and spread operator

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/iterators](https://rws8.tech/tutorials/javascript/iterators/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #Iterators #Generators #DataStructures #LazyEvaluation
