console.log('=== DEMO 1.1: Blocking vs Non-Blocking Code ===\n');

console.log('--- Example 1: Blocking Code ---');
console.log('Start of blocking example');

function blockingOperation() {
  console.log('Starting blocking operation...');
  const start = Date.now();
  
  while (Date.now() - start < 3000) {
  }
  
  console.log('Blocking operation complete (3 seconds later)');
}

blockingOperation();
console.log('End of blocking example');
console.log('Notice: Everything waited for the blocking operation!\n');

setTimeout(() => {
  console.log('\n--- Example 2: Non-Blocking Code ---');
  console.log('Start of non-blocking example');

  setTimeout(() => {
    console.log('Non-blocking operation complete (2 seconds later)');
  }, 2000);

  console.log('End of non-blocking example');
  console.log('Notice: This printed immediately!\n');

  setTimeout(() => {
    console.log('\n--- Example 3: Multiple Async Operations ---');
    
    setTimeout(() => console.log('Task A (1 second)'), 1000);
    setTimeout(() => console.log('Task B (500ms)'), 500);
    setTimeout(() => console.log('Task C (1500ms)'), 1500);
    
    console.log('All tasks started!');
    console.log('Notice: They complete in order of their delays, not the order they were called!\n');

    setTimeout(() => {
      console.log('\n--- Example 4: Real-World Scenario ---');
      console.log('Simulating: User clicks button, app fetches data');
      
      console.log('User clicked button');
      console.log('UI remains responsive...');
      
      setTimeout(() => {
        console.log('Data fetched from server!');
        console.log('UI updates with new data');
      }, 1500);
      
      console.log('User can still interact with the page');
      console.log('User can scroll, click other buttons, etc.\n');
    }, 2000);
  }, 3000);
}, 3500);
