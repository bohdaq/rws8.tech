console.log('=== DEMO 2.2: Consuming Promises ===\n');

console.log('--- Example 1: Basic .then() ---');
Promise.resolve('Hello, World!')
  .then(value => {
    console.log('Received:', value);
  });

setTimeout(() => {
  console.log('\n--- Example 2: Chaining .then() ---');
  
  Promise.resolve(5)
    .then(x => {
      console.log('Step 1:', x);
      return x * 2;
    })
    .then(x => {
      console.log('Step 2:', x);
      return x + 10;
    })
    .then(x => {
      console.log('Step 3:', x);
      return x / 3;
    })
    .then(x => {
      console.log('Final result:', x);
    });

  setTimeout(() => {
    console.log('\n--- Example 3: .catch() for Error Handling ---');
    
    Promise.reject(new Error('Something went wrong!'))
      .then(value => {
        console.log('This will not run');
      })
      .catch(error => {
        console.error('Caught error:', error.message);
      });

    setTimeout(() => {
      console.log('\n--- Example 4: Error Propagation ---');
      
      Promise.resolve(1)
        .then(x => {
          console.log('Step 1:', x);
          return x + 1;
        })
        .then(x => {
          console.log('Step 2:', x);
          throw new Error('Error in step 2!');
        })
        .then(x => {
          console.log('Step 3 (skipped):', x);
        })
        .then(x => {
          console.log('Step 4 (skipped):', x);
        })
        .catch(error => {
          console.error('Caught at the end:', error.message);
        });

      setTimeout(() => {
        console.log('\n--- Example 5: .finally() ---');
        
        let isLoading = true;
        console.log('Loading:', isLoading);

        Promise.resolve('Data loaded')
          .then(data => {
            console.log(data);
            return data;
          })
          .catch(error => {
            console.error('Error:', error);
          })
          .finally(() => {
            isLoading = false;
            console.log('Loading:', isLoading);
            console.log('Cleanup complete!');
          });

        setTimeout(() => {
          console.log('\n--- Example 6: Returning Promises in .then() ---');
          
          function delay(ms, value) {
            return new Promise(resolve => {
              setTimeout(() => resolve(value), ms);
            });
          }

          console.log('Starting chain...');
          Promise.resolve('Start')
            .then(value => {
              console.log(value);
              return delay(500, 'After 500ms');
            })
            .then(value => {
              console.log(value);
              return delay(500, 'After 1000ms');
            })
            .then(value => {
              console.log(value);
              return delay(500, 'After 1500ms');
            })
            .then(value => {
              console.log(value);
            });

          setTimeout(() => {
            console.log('\n--- Example 7: Recovering from Errors ---');
            
            function fetchPrimaryAPI() {
              return Promise.reject(new Error('Primary API failed'));
            }

            function fetchBackupAPI() {
              return Promise.resolve('Data from backup API');
            }

            fetchPrimaryAPI()
              .catch(error => {
                console.log('Primary failed:', error.message);
                console.log('Trying backup...');
                return fetchBackupAPI();
              })
              .then(data => {
                console.log('Success! Got:', data);
              });

            setTimeout(() => {
              console.log('\n--- Example 8: Multiple .catch() Handlers ---');
              
              function step1() {
                return Promise.resolve('Step 1 done');
              }

              function step2() {
                return Promise.reject(new Error('Step 2 failed'));
              }

              function step3() {
                return Promise.resolve('Step 3 done');
              }

              step1()
                .then(result => {
                  console.log(result);
                  return step2();
                })
                .catch(error => {
                  console.error('Caught:', error.message);
                  return 'Recovered with fallback';
                })
                .then(result => {
                  console.log('Continuing with:', result);
                  return step3();
                })
                .then(result => {
                  console.log(result);
                });

              setTimeout(() => {
                console.log('\n--- Example 9: Real-World - API Call Simulation ---');
                
                function fetchUserData(userId) {
                  console.log(`Fetching user ${userId}...`);
                  
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      if (userId > 0) {
                        resolve({ id: userId, name: 'John Doe', email: 'john@example.com' });
                      } else {
                        reject(new Error('Invalid user ID'));
                      }
                    }, 1000);
                  });
                }

                console.log('Loading: true');
                
                fetchUserData(42)
                  .then(user => {
                    console.log('User loaded:', user);
                    return user;
                  })
                  .catch(error => {
                    console.error('Error loading user:', error.message);
                    return null;
                  })
                  .finally(() => {
                    console.log('Loading: false');
                  });

                setTimeout(() => {
                  console.log('\n--- Example 10: Common Mistake - Forgetting to Return ---');
                  
                  console.log('BAD - Not returning:');
                  Promise.resolve(1)
                    .then(x => {
                      Promise.resolve(x * 2);
                    })
                    .then(x => {
                      console.log('Result:', x);
                    });

                  setTimeout(() => {
                    console.log('\nGOOD - Returning properly:');
                    Promise.resolve(1)
                      .then(x => {
                        return Promise.resolve(x * 2);
                      })
                      .then(x => {
                        console.log('Result:', x);
                      });
                  }, 100);
                }, 1500);
              }, 1000);
            }, 1000);
          }, 2000);
        }, 1000);
      }, 1000);
    }, 500);
  }, 500);
}, 100);
