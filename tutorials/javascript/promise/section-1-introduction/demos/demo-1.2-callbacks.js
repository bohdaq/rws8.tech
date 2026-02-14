console.log('=== DEMO 1.2: Callback Functions ===\n');

console.log('--- Example 1: Basic Callback ---');
function doSomething(callback) {
  console.log('Doing something...');
  callback();
}

doSomething(() => {
  console.log('Callback executed!\n');
});

console.log('--- Example 2: Async Callback ---');
function fetchData(callback) {
  console.log('Fetching data...');
  setTimeout(() => {
    const data = { id: 1, name: 'John Doe' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log('Data received:', data);
  console.log('');
});

setTimeout(() => {
  console.log('--- Example 3: Error-First Callback Pattern ---');
  
  function getUserById(id, callback) {
    setTimeout(() => {
      if (id < 0) {
        callback(new Error('Invalid user ID'), null);
      } else {
        callback(null, { id: id, name: 'User ' + id, email: 'user' + id + '@example.com' });
      }
    }, 500);
  }

  getUserById(5, (error, user) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    console.log('Success! User:', user);
  });

  getUserById(-1, (error, user) => {
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    console.log('Success! User:', user);
  });

  setTimeout(() => {
    console.log('\n--- Example 4: CALLBACK HELL (Pyramid of Doom) ---');
    
    function step1(callback) {
      setTimeout(() => {
        console.log('Step 1 complete');
        callback(null, 'data1');
      }, 300);
    }

    function step2(data, callback) {
      setTimeout(() => {
        console.log('Step 2 complete, received:', data);
        callback(null, 'data2');
      }, 300);
    }

    function step3(data, callback) {
      setTimeout(() => {
        console.log('Step 3 complete, received:', data);
        callback(null, 'data3');
      }, 300);
    }

    function step4(data, callback) {
      setTimeout(() => {
        console.log('Step 4 complete, received:', data);
        callback(null, 'final result');
      }, 300);
    }

    step1((error, result1) => {
      if (error) {
        console.error('Error in step 1:', error);
        return;
      }
      
      step2(result1, (error, result2) => {
        if (error) {
          console.error('Error in step 2:', error);
          return;
        }
        
        step3(result2, (error, result3) => {
          if (error) {
            console.error('Error in step 3:', error);
            return;
          }
          
          step4(result3, (error, finalResult) => {
            if (error) {
              console.error('Error in step 4:', error);
              return;
            }
            
            console.log('All steps complete! Final result:', finalResult);
            console.log('Notice: The code keeps nesting deeper and deeper!\n');
          });
        });
      });
    });

    setTimeout(() => {
      console.log('--- Example 5: Real-World Scenario (E-commerce) ---');
      
      function getUser(userId, callback) {
        setTimeout(() => {
          console.log('1. Fetched user');
          callback(null, { id: userId, name: 'Alice' });
        }, 200);
      }

      function getCart(userId, callback) {
        setTimeout(() => {
          console.log('2. Fetched cart');
          callback(null, { items: ['item1', 'item2'] });
        }, 200);
      }

      function calculateTotal(cart, callback) {
        setTimeout(() => {
          console.log('3. Calculated total');
          callback(null, 99.99);
        }, 200);
      }

      function processPayment(total, callback) {
        setTimeout(() => {
          console.log('4. Processed payment');
          callback(null, { transactionId: 'TXN123', status: 'success' });
        }, 200);
      }

      getUser(1, (error, user) => {
        if (error) return console.error(error);
        
        getCart(user.id, (error, cart) => {
          if (error) return console.error(error);
          
          calculateTotal(cart, (error, total) => {
            if (error) return console.error(error);
            
            processPayment(total, (error, payment) => {
              if (error) return console.error(error);
              
              console.log('Order complete!', payment);
              console.log('\nThis is callback hell - hard to read and maintain!');
            });
          });
        });
      });
    }, 1500);
  }, 1000);
}, 1500);
