console.log('=== DEMO 1.3: Your First Promise ===\n');

console.log('--- Example 1: Creating a Simple Promise ---');
const simplePromise = new Promise((resolve, reject) => {
  console.log('Promise executor runs immediately!');
  resolve('Success!');
});

console.log('Promise created:', simplePromise);
console.log('');

console.log('--- Example 2: Promise States ---');

const pendingPromise = new Promise((resolve) => {
  console.log('This promise will stay pending...');
});
console.log('Pending:', pendingPromise);

const fulfilledPromise = Promise.resolve('Fulfilled value');
console.log('Fulfilled:', fulfilledPromise);

const rejectedPromise = Promise.reject(new Error('Rejected reason'));
console.log('Rejected:', rejectedPromise);
console.log('');

rejectedPromise.catch(() => {});

setTimeout(() => {
  console.log('--- Example 3: Async Promise ---');
  
  const asyncPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Resolved after 1 second');
    }, 1000);
  });

  console.log('Async promise (pending):', asyncPromise);

  asyncPromise.then(value => {
    console.log('Async promise (fulfilled):', value);
    console.log('');
  });

  setTimeout(() => {
    console.log('--- Example 4: Promise with Condition ---');
    
    function checkAge(age) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (age >= 18) {
            resolve('Access granted');
          } else {
            reject(new Error('Access denied: Must be 18 or older'));
          }
        }, 500);
      });
    }

    checkAge(25)
      .then(message => console.log('✅', message))
      .catch(error => console.error('❌', error.message));

    checkAge(15)
      .then(message => console.log('✅', message))
      .catch(error => console.error('❌', error.message));

    setTimeout(() => {
      console.log('\n--- Example 5: Simulating API Call ---');
      
      function fetchUserData(userId) {
        return new Promise((resolve, reject) => {
          console.log(`Fetching user ${userId}...`);
          
          setTimeout(() => {
            if (userId > 0) {
              resolve({
                id: userId,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'admin'
              });
            } else {
              reject(new Error('Invalid user ID'));
            }
          }, 1500);
        });
      }

      fetchUserData(42)
        .then(user => {
          console.log('User data received:');
          console.log(user);
        })
        .catch(error => {
          console.error('Failed to fetch user:', error.message);
        });

      setTimeout(() => {
        console.log('\n--- Example 6: Callback Hell vs Promise ---');
        
        console.log('OLD WAY (Callbacks):');
        console.log(`
function oldWay(callback) {
  step1((err, result1) => {
    if (err) return callback(err);
    step2(result1, (err, result2) => {
      if (err) return callback(err);
      step3(result2, (err, result3) => {
        if (err) return callback(err);
        callback(null, result3);
      });
    });
  });
}
        `);

        console.log('NEW WAY (Promises):');
        console.log(`
function newWay() {
  return step1()
    .then(result1 => step2(result1))
    .then(result2 => step3(result2))
    .catch(err => console.error(err));
}
        `);

        function step1() {
          return new Promise(resolve => {
            setTimeout(() => {
              console.log('Step 1 complete');
              resolve('data1');
            }, 300);
          });
        }

        function step2(data) {
          return new Promise(resolve => {
            setTimeout(() => {
              console.log('Step 2 complete, received:', data);
              resolve('data2');
            }, 300);
          });
        }

        function step3(data) {
          return new Promise(resolve => {
            setTimeout(() => {
              console.log('Step 3 complete, received:', data);
              resolve('final result');
            }, 300);
          });
        }

        step1()
          .then(result1 => step2(result1))
          .then(result2 => step3(result2))
          .then(finalResult => {
            console.log('All steps complete!', finalResult);
            console.log('Notice: Much cleaner and easier to read!');
          })
          .catch(error => console.error('Error:', error));
      }, 2000);
    }, 1000);
  }, 1000);
}, 500);
