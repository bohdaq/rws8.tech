console.log('=== SOLUTIONS: Basic Promises ===\n');

console.log('--- Solution 1.1: Create Your First Promise ---');

function createGreeting() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello, Promises!');
    }, 1000);
  });
}

createGreeting().then(message => {
  console.log(message);
  console.log('');
});

setTimeout(() => {
  console.log('--- Solution 1.2: Promise with Condition ---');

  function checkNumber(num) {
    return new Promise((resolve, reject) => {
      if (num % 2 === 0) {
        resolve('Even');
      } else {
        reject(new Error('Odd number'));
      }
    });
  }

  checkNumber(4)
    .then(result => console.log('4 is:', result))
    .catch(error => console.error('Error:', error.message));

  checkNumber(5)
    .then(result => console.log('5 is:', result))
    .catch(error => console.error('Error:', error.message));

  setTimeout(() => {
    console.log('\n--- Solution 1.3: Promise Chain ---');

    Promise.resolve(5)
      .then(x => {
        console.log('Start:', x);
        return x * 2;
      })
      .then(x => {
        console.log('After multiply:', x);
        return x + 10;
      })
      .then(x => {
        console.log('After add:', x);
        return x / 4;
      })
      .then(result => {
        console.log('Final result:', result);
      });

    setTimeout(() => {
      console.log('\n--- Solution 1.4: Error Handling ---');

      function divide(a, b) {
        return new Promise((resolve, reject) => {
          if (b === 0) {
            reject(new Error('Cannot divide by zero'));
          } else {
            resolve(a / b);
          }
        });
      }

      divide(10, 2)
        .then(result => console.log('10 / 2 =', result))
        .catch(error => console.error('Error:', error.message));

      divide(10, 0)
        .then(result => console.log('10 / 0 =', result))
        .catch(error => console.error('Error:', error.message));

      setTimeout(() => {
        console.log('\n--- Solution 1.5: Sequential Operations ---');

        function fetchUser() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({ id: 1, name: 'John Doe' });
            }, 500);
          });
        }

        function fetchPosts(userId) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve([
                { id: 101, userId, title: 'First Post' },
                { id: 102, userId, title: 'Second Post' }
              ]);
            }, 500);
          });
        }

        function fetchComments(postId) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve([
                { id: 1001, postId, text: 'Great post!' },
                { id: 1002, postId, text: 'Thanks for sharing' }
              ]);
            }, 500);
          });
        }

        console.log('Fetching data...');
        fetchUser()
          .then(user => {
            console.log('User:', user.name);
            return fetchPosts(user.id);
          })
          .then(posts => {
            console.log('Posts:', posts.length);
            return fetchComments(posts[0].id);
          })
          .then(comments => {
            console.log('Comments:', comments);
          })
          .catch(error => console.error('Error:', error));

        setTimeout(() => {
          console.log('\n--- Bonus Solution: Retry Function ---');

          async function retry(fn, maxAttempts) {
            let lastError;
            
            for (let i = 0; i < maxAttempts; i++) {
              try {
                console.log(`Attempt ${i + 1}...`);
                const result = await fn();
                return result;
              } catch (error) {
                lastError = error;
                console.log(`Attempt ${i + 1} failed:`, error.message);
              }
            }
            
            throw lastError;
          }

          let attempts = 0;
          function unreliableFunction() {
            return new Promise((resolve, reject) => {
              attempts++;
              if (attempts < 3) {
                reject(new Error('Failed'));
              } else {
                resolve('Success!');
              }
            });
          }

          retry(unreliableFunction, 5)
            .then(result => {
              console.log('Final result:', result);
              console.log(`Succeeded after ${attempts} attempts`);
            })
            .catch(error => console.error('All attempts failed:', error));
        }, 2000);
      }, 500);
    }, 500);
  }, 500);
}, 1500);
