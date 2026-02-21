# Understanding JavaScript Immutability and Pure Functions: Write Predictable, Bug-Free Code

Immutability and pure functions are foundational concepts in functional programming that help you write more predictable, testable, and maintainable code. Let's explore how to apply these principles in JavaScript.

## What is Immutability?

Immutability means that once data is created, it cannot be changed. Instead of modifying existing data, you create new data with the desired changes.

### Mutable vs Immutable

```javascript
// Mutable - modifies original array
const numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers); // [1, 2, 3, 4] - original changed!

// Immutable - creates new array
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];
console.log(numbers);    // [1, 2, 3] - original unchanged
console.log(newNumbers); // [1, 2, 3, 4] - new array
```

## What are Pure Functions?

A pure function is a function that:
- Always returns the same output for the same input
- Has no side effects (doesn't modify external state)

### Impure vs Pure Functions

```javascript
// Impure - modifies external state
let total = 0;
function addToTotal(value) {
    total += value; // Side effect!
    return total;
}

// Pure - no side effects
function add(a, b) {
    return a + b; // Always returns same result for same inputs
}

console.log(add(5, 3)); // 8
console.log(add(5, 3)); // 8 - always the same!
```

## Immutable Array Operations

JavaScript provides many non-mutating array methods:

### Adding Elements

```javascript
const arr = [1, 2, 3];

// Mutable (BAD)
arr.push(4);

// Immutable (GOOD)
const newArr = [...arr, 4];
const newArr2 = arr.concat(4);

// Add to beginning
const withStart = [0, ...arr];

// Add in middle
const withMiddle = [...arr.slice(0, 2), 2.5, ...arr.slice(2)];
console.log(withMiddle); // [1, 2, 2.5, 3]
```

### Removing Elements

```javascript
const arr = [1, 2, 3, 4, 5];

// Mutable (BAD)
arr.pop();
arr.shift();
arr.splice(1, 1);

// Immutable (GOOD)
const withoutLast = arr.slice(0, -1);
const withoutFirst = arr.slice(1);
const withoutIndex = arr.filter((_, i) => i !== 2);

console.log(withoutLast);  // [1, 2, 3, 4]
console.log(withoutFirst); // [2, 3, 4, 5]
console.log(withoutIndex); // [1, 2, 4, 5]
```

### Updating Elements

```javascript
const arr = [1, 2, 3, 4, 5];

// Mutable (BAD)
arr[2] = 99;

// Immutable (GOOD)
const updated = arr.map((val, i) => i === 2 ? 99 : val);
const updated2 = [...arr.slice(0, 2), 99, ...arr.slice(3)];

console.log(updated); // [1, 2, 99, 4, 5]
```

## Immutable Object Operations

### Updating Object Properties

```javascript
const user = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
};

// Mutable (BAD)
user.age = 31;

// Immutable (GOOD)
const updatedUser = {
    ...user,
    age: 31
};

// Update multiple properties
const updatedUser2 = {
    ...user,
    age: 31,
    email: 'newemail@example.com'
};

console.log(user);         // { name: 'John', age: 30, ... }
console.log(updatedUser);  // { name: 'John', age: 31, ... }
```

### Adding and Removing Properties

```javascript
const user = { name: 'John', age: 30 };

// Add property
const withPhone = {
    ...user,
    phone: '555-1234'
};

// Remove property
const { age, ...withoutAge } = user;

console.log(withPhone);     // { name: 'John', age: 30, phone: '555-1234' }
console.log(withoutAge);    // { name: 'John' }
console.log(user);          // { name: 'John', age: 30 } - unchanged
```

### Nested Object Updates

```javascript
const user = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};

// Update nested property
const updated = {
    ...user,
    address: {
        ...user.address,
        city: 'Boston'
    }
};

console.log(user.address.city);    // 'New York' - unchanged
console.log(updated.address.city); // 'Boston'
```

## Object.freeze()

`Object.freeze()` makes an object immutable (shallow freeze only):

```javascript
const user = Object.freeze({
    name: 'John',
    age: 30
});

// These will fail silently (or throw in strict mode)
user.age = 31;
user.email = 'test@example.com';
delete user.name;

console.log(user); // { name: 'John', age: 30 } - unchanged
```

### Deep Freeze

```javascript
function deepFreeze(obj) {
    Object.freeze(obj);
    
    Object.values(obj).forEach(value => {
        if (typeof value === 'object' && value !== null) {
            deepFreeze(value);
        }
    });
    
    return obj;
}

const data = deepFreeze({
    user: { name: 'John', address: { city: 'NYC' } }
});

// All levels are frozen
data.user.name = 'Jane';           // Fails
data.user.address.city = 'Boston'; // Fails
```

## Real-World Example: Redux Reducer

```javascript
// Initial state
const initialState = {
    todos: [],
    filter: 'all'
};

// Pure reducer function
function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: Date.now(),
                        text: action.text,
                        completed: false
                    }
                ]
            };
        
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };
        
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        
        default:
            return state;
    }
}
```

## Real-World Example: React State Updates

```javascript
// React component with immutable state updates
function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        // Immutable - create new array
        setTodos([...todos, { id: Date.now(), text, done: false }]);
    };

    const toggleTodo = (id) => {
        // Immutable - map to new array
        setTodos(todos.map(todo =>
            todo.id === id
                ? { ...todo, done: !todo.done }
                : todo
        ));
    };

    const deleteTodo = (id) => {
        // Immutable - filter to new array
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        // JSX here
    );
}
```

## Performance Considerations

**When Immutability Helps Performance:**
- React's shouldComponentUpdate and React.memo
- Redux's shallow equality checks
- Easier change detection

**When Immutability May Hurt Performance:**
- Very large arrays/objects (lots of copying)
- Frequent updates to large data structures
- Deep cloning complex nested structures

**Solution:** Use libraries like Immer or Immutable.js for better performance with large data.

## Using Immer for Easier Immutability

```javascript
import produce from 'immer';

const state = {
    todos: [
        { id: 1, text: 'Learn Immer', done: false }
    ]
};

// With Immer, write "mutable" code that produces immutable results
const nextState = produce(state, draft => {
    draft.todos.push({ id: 2, text: 'Use Immer', done: false });
    draft.todos[0].done = true;
});

console.log(state === nextState);           // false (new object)
console.log(state.todos === nextState.todos); // false (new array)
console.log(state.todos[0]);                // { id: 1, text: '...', done: false }
console.log(nextState.todos[0]);            // { id: 1, text: '...', done: true }
```

## Common Pitfalls

### Pitfall 1: Shallow copying nested objects

```javascript
// Wrong - nested objects are still shared
const copy = { ...original };
copy.nested.value = 'changed'; // Mutates original!

// Right - deep copy nested objects
const copy = {
    ...original,
    nested: { ...original.nested }
};
```

### Pitfall 2: Forgetting to return new state

```javascript
// Wrong - modifies and returns original
function reducer(state, action) {
    state.count++;
    return state;
}

// Right - returns new state
function reducer(state, action) {
    return { ...state, count: state.count + 1 };
}
```

### Pitfall 3: Using mutating array methods

```javascript
// Mutating methods (avoid):
push, pop, shift, unshift, splice, sort, reverse

// Non-mutating alternatives:
concat, slice, map, filter, reduce, spread operator
```

## Key Takeaways

- Immutability means data cannot be changed after creation
- Pure functions have no side effects and always return the same output for the same input
- Use spread operator (...) for immutable updates
- Array methods like map, filter, reduce are immutable
- Avoid push, pop, splice, and direct property assignment
- Object.freeze() provides shallow immutability
- Deep updates require spreading at each level
- Immutability makes code more predictable and easier to debug
- Use Immer for complex immutable updates

## Learn More

Want to dive deeper into JavaScript Immutability? Check out the full tutorial with detailed examples and implementations at [rws8.tech/tutorials/javascript/immutability](https://rws8.tech/tutorials/javascript/immutability/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and functional programming. Follow for more tutorials on modern JavaScript, functional patterns, and web technologies.

**Tags:** #JavaScript #Immutability #PureFunctions #FunctionalProgramming #WebDevelopment #React #Redux #Programming #CodingTutorial
