# JavaScript Command Pattern: Encapsulate Requests as Objects

The Command pattern encapsulates requests as objects, allowing you to parameterize clients with queues, requests, and operations. It's perfect for undo/redo functionality. Let's master it.

## What is the Command Pattern?

Command turns requests into stand-alone objects containing all information about the request, enabling undo/redo, queuing, and logging.

## Basic Example

```javascript
class Command {
    execute() {}
    undo() {}
}

class AddCommand extends Command {
    constructor(receiver, value) {
        super();
        this.receiver = receiver;
        this.value = value;
    }
    
    execute() {
        this.receiver.add(this.value);
    }
    
    undo() {
        this.receiver.subtract(this.value);
    }
}

class Calculator {
    constructor() {
        this.value = 0;
    }
    
    add(val) {
        this.value += val;
    }
    
    subtract(val) {
        this.value -= val;
    }
}

// Usage
const calc = new Calculator();
const addCmd = new AddCommand(calc, 10);

addCmd.execute(); // calc.value = 10
addCmd.undo();    // calc.value = 0
```

## Undo/Redo Manager

```javascript
class CommandManager {
    constructor() {
        this.history = [];
        this.current = -1;
    }
    
    execute(command) {
        this.history = this.history.slice(0, this.current + 1);
        command.execute();
        this.history.push(command);
        this.current++;
    }
    
    undo() {
        if (this.current >= 0) {
            this.history[this.current].undo();
            this.current--;
        }
    }
    
    redo() {
        if (this.current < this.history.length - 1) {
            this.current++;
            this.history[this.current].execute();
        }
    }
}

const manager = new CommandManager();
manager.execute(new AddCommand(calc, 5));
manager.undo();
manager.redo();
```

## When to Use

**Good use cases:**
- Undo/redo functionality
- Command queuing
- Transaction systems
- Macro recording
- Job scheduling

## Benefits

- Decouples sender/receiver
- Supports undo/redo
- Command queuing
- Logging/auditing

## Key Takeaways

- Command encapsulates requests as objects
- Perfect for undo/redo
- Supports queuing and logging
- Decouples invoker from receiver
- Easy to add new commands

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/command-pattern](https://rws8.tech/tutorials/javascript/command-pattern/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and design patterns.

**Tags:** #JavaScript #CommandPattern #DesignPatterns #UndoRedo #WebDevelopment
