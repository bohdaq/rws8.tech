console.log('=== DEMO 4.1: Async/Await ===\n');

function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

console.log('--- Example 1: Basic Async Function ---');

async function basicAsync() {
  return 'Hello from async function';
}

console.log('Calling async function...');
const result = basicAsync();
console.log('Result:', result);

result.then(value => {
  console.log('Resolved value:', value);
  console.log('');
});

setTimeout(async () => {
  console.log('--- Example 2: Using await ---');
  
  async function waitExample() {
    console.log('Before await');
    const value = await delay(1000, 'Waited 1 second');
    console.log('After await');
    console.log('Value:', value);
    console.log('');
  }

  await waitExample();

  console.log('--- Example 3: Sequential Execution ---');
  
  async function sequential() {
    console.log('Step 1: Starting...');
    const result1 = await delay(500, 'First');
    console.log('Step 2:', result1);
    
    const result2 = await delay(500, 'Second');
    console.log('Step 3:', result2);
    
    const result3 = await delay(500, 'Third');
    console.log('Step 4:', result3);
    
    return 'All done!';
  }

  const finalResult = await sequential();
  console.log(finalResult);
  console.log('');

  console.log('--- Example 4: Converting Promises to Async/Await ---');
  
  function fetchUser(id) {
    return delay(300, { id, name: `User ${id}`, email: `user${id}@example.com` });
  }

  console.log('OLD WAY (Promises):');
  fetchUser(1)
    .then(user => {
      console.log('User:', user.name);
      return user;
    })
    .then(user => {
      console.log('Email:', user.email);
    });

  await delay(500);

  console.log('\nNEW WAY (Async/Await):');
  async function getUserInfo() {
    const user = await fetchUser(2);
    console.log('User:', user.name);
    console.log('Email:', user.email);
  }

  await getUserInfo();
  console.log('');

  console.log('--- Example 5: Multiple Awaits ---');
  
  async function fetchUserProfile(userId) {
    console.log('Fetching user...');
    const user = await fetchUser(userId);
    
    console.log('Fetching posts...');
    const posts = await delay(400, ['Post 1', 'Post 2', 'Post 3']);
    
    console.log('Fetching comments...');
    const comments = await delay(300, ['Comment 1', 'Comment 2']);
    
    return {
      user,
      posts,
      comments,
      totalPosts: posts.length,
      totalComments: comments.length
    };
  }

  const profile = await fetchUserProfile(5);
  console.log('Profile loaded:');
  console.log(`  User: ${profile.user.name}`);
  console.log(`  Posts: ${profile.totalPosts}`);
  console.log(`  Comments: ${profile.totalComments}`);
  console.log('');

  console.log('--- Example 6: Async Arrow Functions ---');
  
  const asyncArrow = async () => {
    const result = await delay(300, 'From arrow function');
    return result;
  };

  const arrowResult = await asyncArrow();
  console.log(arrowResult);
  console.log('');

  console.log('--- Example 7: Async Methods ---');
  
  const obj = {
    async getData() {
      const data = await delay(300, 'Method data');
      return data;
    }
  };

  const methodResult = await obj.getData();
  console.log('Method result:', methodResult);
  console.log('');

  console.log('--- Example 8: Awaiting Non-Promise Values ---');
  
  async function awaitRegularValue() {
    const value1 = await 42;
    const value2 = await 'hello';
    const value3 = await true;
    
    console.log('Values:', value1, value2, value3);
  }

  await awaitRegularValue();
  console.log('');

  console.log('--- Example 9: Async Function Always Returns Promise ---');
  
  async function returnsValue() {
    return 'direct value';
  }

  async function returnsPromise() {
    return Promise.resolve('promise value');
  }

  async function returnsNothing() {
  }

  console.log('returnsValue():', await returnsValue());
  console.log('returnsPromise():', await returnsPromise());
  console.log('returnsNothing():', await returnsNothing());
  console.log('');

  console.log('--- Example 10: Real-World - API Call ---');
  
  async function submitForm(formData) {
    console.log('Submitting form...');
    
    await delay(500);
    
    const response = {
      ok: true,
      data: { id: 123, status: 'success', message: 'Form submitted' }
    };
    
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    
    console.log('Form submitted successfully!');
    return response.data;
  }

  const formData = { name: 'John', email: 'john@example.com' };
  const submissionResult = await submitForm(formData);
  console.log('Result:', submissionResult);
  console.log('');

  console.log('--- Example 11: Async/Await is Non-Blocking ---');
  
  async function slowOperation() {
    console.log('Starting slow operation...');
    await delay(2000);
    console.log('Slow operation complete!');
  }

  slowOperation();
  console.log('This runs immediately, not blocked by slowOperation!');
  console.log('The async function runs in the background.');

}, 1500);
