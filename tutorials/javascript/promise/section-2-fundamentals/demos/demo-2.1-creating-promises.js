console.log('=== DEMO 2.1: Creating Promises ===\n');

console.log('--- Example 1: Basic Promise Creation ---');
const basicPromise = new Promise((resolve, reject) => {
  console.log('Executor runs immediately!');
  resolve('Success value');
});

console.log('Promise created');
basicPromise.then(value => console.log('Resolved with:', value));
console.log('');

setTimeout(() => {
  console.log('--- Example 2: Async Promise ---');
  
  const asyncPromise = new Promise((resolve, reject) => {
    console.log('Starting async operation...');
    setTimeout(() => {
      resolve('Completed after 1 second');
    }, 1000);
  });

  asyncPromise.then(value => {
    console.log('Result:', value);
    console.log('');
  });

  setTimeout(() => {
    console.log('--- Example 3: Promise with Rejection ---');
    
    const rejectPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Something went wrong!'));
      }, 500);
    });

    rejectPromise
      .then(value => console.log('Success:', value))
      .catch(error => console.error('Caught error:', error.message));

    setTimeout(() => {
      console.log('\n--- Example 4: Conditional Promise ---');
      
      function checkAge(age) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (age >= 18) {
              resolve({ status: 'approved', age });
            } else {
              reject(new Error(`Age ${age} is below minimum`));
            }
          }, 500);
        });
      }

      checkAge(25)
        .then(result => console.log('✅ Approved:', result))
        .catch(error => console.error('❌ Rejected:', error.message));

      checkAge(15)
        .then(result => console.log('✅ Approved:', result))
        .catch(error => console.error('❌ Rejected:', error.message));

      setTimeout(() => {
        console.log('\n--- Example 5: Wrapping setTimeout ---');
        
        function delay(ms) {
          return new Promise(resolve => {
            setTimeout(resolve, ms);
          });
        }

        console.log('Starting delay...');
        delay(1000).then(() => {
          console.log('1 second passed!');
          return delay(1000);
        }).then(() => {
          console.log('2 seconds passed!');
        });

        setTimeout(() => {
          console.log('\n--- Example 6: Simulating API Call ---');
          
          function fetchUser(userId) {
            return new Promise((resolve, reject) => {
              console.log(`Fetching user ${userId}...`);
              
              setTimeout(() => {
                if (userId <= 0) {
                  reject(new Error('Invalid user ID'));
                  return;
                }
                
                const user = {
                  id: userId,
                  name: `User ${userId}`,
                  email: `user${userId}@example.com`,
                  createdAt: new Date().toISOString()
                };
                
                resolve(user);
              }, 1000);
            });
          }

          fetchUser(42)
            .then(user => {
              console.log('User fetched successfully:');
              console.log(user);
            })
            .catch(error => console.error('Error:', error.message));

          fetchUser(-1)
            .then(user => console.log('User:', user))
            .catch(error => console.error('Error:', error.message));

          setTimeout(() => {
            console.log('\n--- Example 7: Promise.resolve() and Promise.reject() ---');
            
            const immediateSuccess = Promise.resolve('Instant success');
            const immediateFailure = Promise.reject(new Error('Instant failure'));

            immediateSuccess.then(value => console.log('✅', value));
            immediateFailure.catch(error => console.error('❌', error.message));

            setTimeout(() => {
              console.log('\n--- Example 8: Executor Error Handling ---');
              
              const errorPromise = new Promise((resolve, reject) => {
                throw new Error('Error in executor!');
              });

              errorPromise.catch(error => {
                console.log('Caught executor error:', error.message);
              });

              setTimeout(() => {
                console.log('\n--- Example 9: Only First Call Matters ---');
                
                const multiCallPromise = new Promise((resolve, reject) => {
                  resolve('First resolve');
                  resolve('Second resolve');
                  reject(new Error('This reject is ignored'));
                  console.log('All calls made, but only first counts');
                });

                multiCallPromise.then(value => {
                  console.log('Promise resolved with:', value);
                });

                setTimeout(() => {
                  console.log('\n--- Example 10: Real-World - Database Query Simulation ---');
                  
                  function queryDatabase(table, id) {
                    return new Promise((resolve, reject) => {
                      console.log(`Querying ${table} for id ${id}...`);
                      
                      setTimeout(() => {
                        const success = Math.random() > 0.3;
                        
                        if (success) {
                          resolve({
                            id,
                            data: `Data from ${table}`,
                            timestamp: Date.now()
                          });
                        } else {
                          reject(new Error('Database connection timeout'));
                        }
                      }, 800);
                    });
                  }

                  queryDatabase('users', 123)
                    .then(result => {
                      console.log('Query successful:');
                      console.log(result);
                    })
                    .catch(error => {
                      console.error('Query failed:', error.message);
                    });
                }, 1000);
              }, 500);
            }, 1000);
          }, 1500);
        }, 2500);
      }, 1000);
    }, 1000);
  }, 500);
}, 100);
