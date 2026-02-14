# Quick Start Guide

Get started with the JavaScript Promises course in 5 minutes!

## 🚀 Setup

```bash
# Navigate to the course directory
cd promise

# No installation needed - just Node.js!
```

## 📖 Learning Path

### Day 1: Foundations (2 hours)
1. Read `section-1-introduction/lesson-1.1-sync-vs-async.md`
2. Run `npm run demo:1.1`
3. Read `section-1-introduction/lesson-1.2-callbacks.md`
4. Run `npm run demo:1.2`
5. Read `section-1-introduction/lesson-1.3-intro-to-promises.md`
6. Run `npm run demo:1.3`

### Day 2: Promise Fundamentals (2 hours)
1. Read `section-2-fundamentals/lesson-2.1-creating-promises.md`
2. Run `npm run demo:2.1`
3. Read `section-2-fundamentals/lesson-2.2-consuming-promises.md`
4. Run `npm run demo:2.2`
5. Complete exercises in `exercises/beginner/`

### Day 3: Promise Methods (2 hours)
1. Read `section-3-static-methods/lesson-3.1-promise-all.md`
2. Run `npm run demo:3.1`
3. Practice with Promise.all(), race(), allSettled(), any()

### Day 4: Async/Await (2 hours)
1. Read `section-4-async-await/lesson-4.1-intro-async-await.md`
2. Run `npm run demo:4.1`
3. Convert Promise chains to async/await

### Day 5: Advanced Patterns (3 hours)
1. Read `section-5-advanced/lesson-5.1-promise-utilities.md`
2. Build your own utility library
3. Implement retry logic and rate limiting

### Day 6-7: Real-World Projects (4 hours)
1. Build an API client
2. Create a data pipeline
3. Complete the course project

## 🎯 First Exercise

Try this right now in Node.js:

```javascript
// Create a simple Promise
const myFirstPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Hello, Promises!');
  }, 1000);
});

myFirstPromise.then(message => {
  console.log(message);
});
```

Save this as `test.js` and run:
```bash
node test.js
```

## 📝 Available Commands

```bash
# Run demos
npm run demo:1.1    # Blocking vs non-blocking
npm run demo:1.2    # Callbacks
npm run demo:1.3    # First Promise
npm run demo:2.1    # Creating Promises
npm run demo:2.2    # Consuming Promises
npm run demo:3.1    # Promise.all()
npm run demo:4.1    # Async/Await
npm run demo:6.1    # API Client

# Run solutions
npm run solution:1  # Basic Promises solutions
```

## 🎓 Learning Tips

1. **Code along** - Don't just read, type the code yourself
2. **Experiment** - Modify the demos and see what happens
3. **Practice daily** - 30 minutes a day is better than 3 hours once
4. **Use the cheat sheet** - Keep `resources/cheat-sheets/promises-cheatsheet.md` handy
5. **Do the exercises** - They reinforce what you've learned

## 📚 Key Resources

- **Cheat Sheet**: `resources/cheat-sheets/promises-cheatsheet.md`
- **Course Structure**: `COURSE_STRUCTURE.md`
- **Exercises**: `exercises/` folder
- **Solutions**: `solutions/` folder

## 🆘 Need Help?

1. Check the cheat sheet first
2. Review the relevant lesson
3. Run the demo to see it in action
4. Try the exercises with solutions

## ✅ Quick Wins

Master these 5 concepts first:

1. **Creating a Promise**
   ```javascript
   new Promise((resolve, reject) => {
     resolve(value);
   });
   ```

2. **Using .then()**
   ```javascript
   promise.then(value => console.log(value));
   ```

3. **Error handling with .catch()**
   ```javascript
   promise.catch(error => console.error(error));
   ```

4. **Async/await**
   ```javascript
   async function example() {
     const result = await promise;
   }
   ```

5. **Promise.all()**
   ```javascript
   const results = await Promise.all([p1, p2, p3]);
   ```

## 🎉 Ready to Start?

Begin with Section 1, Lesson 1.1:
```bash
cat section-1-introduction/lesson-1.1-sync-vs-async.md
npm run demo:1.1
```

Happy learning! 🚀
