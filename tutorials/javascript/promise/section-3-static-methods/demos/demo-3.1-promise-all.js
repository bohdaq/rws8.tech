console.log('=== DEMO 3.1: Promise.all() ===\n');

function delay(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

console.log('--- Example 1: Basic Promise.all() ---');
Promise.all([
  delay(500, 'First'),
  delay(300, 'Second'),
  delay(700, 'Third')
])
.then(results => {
  console.log('All resolved:', results);
  console.log('Notice: Order matches input, not completion time!\n');
});

setTimeout(() => {
  console.log('--- Example 2: Sequential vs Parallel ---');
  
  console.log('Sequential execution:');
  const sequentialStart = Date.now();
  
  delay(500, 'A')
    .then(result => {
      console.log(result);
      return delay(500, 'B');
    })
    .then(result => {
      console.log(result);
      return delay(500, 'C');
    })
    .then(result => {
      console.log(result);
      console.log(`Sequential took: ${Date.now() - sequentialStart}ms`);
    });

  setTimeout(() => {
    console.log('\nParallel execution:');
    const parallelStart = Date.now();
    
    Promise.all([
      delay(500, 'A'),
      delay(500, 'B'),
      delay(500, 'C')
    ])
    .then(results => {
      console.log(results);
      console.log(`Parallel took: ${Date.now() - parallelStart}ms`);
      console.log('3x faster! 🚀\n');
    });
  }, 1600);

  setTimeout(() => {
    console.log('--- Example 3: Fail-Fast Behavior ---');
    
    Promise.all([
      delay(500, 'Success 1'),
      Promise.reject(new Error('Failed!')),
      delay(1000, 'Success 2')
    ])
    .then(results => {
      console.log('All succeeded:', results);
    })
    .catch(error => {
      console.error('Promise.all rejected:', error.message);
      console.log('Rejects immediately on first failure!\n');
    });

    setTimeout(() => {
      console.log('--- Example 4: Fetching Multiple Resources ---');
      
      function fetchUser(id) {
        return delay(300, { id, name: `User ${id}`, email: `user${id}@example.com` });
      }

      console.log('Fetching users 1, 2, 3...');
      Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
      ])
      .then(users => {
        console.log('All users fetched:');
        users.forEach(user => console.log(`  - ${user.name}`));
        console.log('');
      });

      setTimeout(() => {
        console.log('--- Example 5: Batch Processing ---');
        
        const userIds = [10, 20, 30, 40, 50];
        
        console.log(`Processing ${userIds.length} users...`);
        Promise.all(
          userIds.map(id => fetchUser(id))
        )
        .then(users => {
          console.log(`Processed ${users.length} users successfully`);
          console.log('');
        });

        setTimeout(() => {
          console.log('--- Example 6: Mixed Values ---');
          
          Promise.all([
            Promise.resolve(1),
            2,
            delay(300, 3),
            'hello',
            Promise.resolve(5)
          ])
          .then(results => {
            console.log('Results:', results);
            console.log('Promise.all accepts non-Promise values too!\n');
          });

          setTimeout(() => {
            console.log('--- Example 7: Handling Individual Failures ---');
            
            function wrapPromise(promise) {
              return promise
                .then(value => ({ status: 'fulfilled', value }))
                .catch(reason => ({ status: 'rejected', reason }));
            }

            const promises = [
              delay(200, 'Success 1'),
              Promise.reject(new Error('Failed!')),
              delay(300, 'Success 2')
            ].map(wrapPromise);

            Promise.all(promises)
              .then(results => {
                console.log('All promises settled:');
                results.forEach((result, index) => {
                  if (result.status === 'fulfilled') {
                    console.log(`  ${index + 1}. ✅ ${result.value}`);
                  } else {
                    console.log(`  ${index + 1}. ❌ ${result.reason.message}`);
                  }
                });
                console.log('');
              });

            setTimeout(() => {
              console.log('--- Example 8: Real-World - Dashboard Data ---');
              
              function fetchNotifications() {
                return delay(400, [
                  { id: 1, message: 'New message' },
                  { id: 2, message: 'Friend request' }
                ]);
              }

              function fetchSettings() {
                return delay(300, { theme: 'dark', language: 'en' });
              }

              function fetchActivity() {
                return delay(500, { lastLogin: '2024-02-14', posts: 42 });
              }

              console.log('Loading dashboard...');
              const start = Date.now();
              
              Promise.all([
                fetchUser(1),
                fetchNotifications(),
                fetchSettings(),
                fetchActivity()
              ])
              .then(([user, notifications, settings, activity]) => {
                console.log('Dashboard loaded in', Date.now() - start, 'ms');
                console.log('User:', user.name);
                console.log('Notifications:', notifications.length);
                console.log('Theme:', settings.theme);
                console.log('Last login:', activity.lastLogin);
                console.log('');
              });

              setTimeout(() => {
                console.log('--- Example 9: Image Preloader Simulation ---');
                
                function loadImage(url) {
                  return new Promise((resolve, reject) => {
                    const loadTime = Math.random() * 500 + 200;
                    setTimeout(() => {
                      if (Math.random() > 0.1) {
                        resolve({ url, width: 800, height: 600 });
                      } else {
                        reject(new Error(`Failed to load ${url}`));
                      }
                    }, loadTime);
                  });
                }

                const imageUrls = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
                
                console.log('Preloading images...');
                Promise.all(imageUrls.map(loadImage))
                  .then(images => {
                    console.log(`✅ All ${images.length} images loaded`);
                    images.forEach(img => console.log(`  - ${img.url}`));
                  })
                  .catch(error => {
                    console.error('❌ Failed to load images:', error.message);
                  });
              }, 1000);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }, 2200);
}, 1000);
