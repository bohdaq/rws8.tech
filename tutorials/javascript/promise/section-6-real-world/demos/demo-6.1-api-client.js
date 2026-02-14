console.log('=== DEMO 6.1: Real-World API Client ===\n');

class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.timeout = options.timeout || 5000;
    this.retries = options.retries || 3;
    this.headers = options.headers || {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.headers,
        ...options.headers
      }
    };

    console.log(`${options.method || 'GET'} ${url}`);

    return this.withRetry(async () => {
      return this.withTimeout(
        this.makeRequest(url, config),
        this.timeout
      );
    });
  }

  async makeRequest(url, config) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.2;
        
        if (success) {
          resolve({
            ok: true,
            status: 200,
            data: { message: 'Success', url, timestamp: Date.now() }
          });
        } else {
          reject(new Error('Network error'));
        }
      }, Math.random() * 1000 + 500);
    });
  }

  async withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), ms)
      )
    ]);
  }

  async withRetry(fn, retries = this.retries) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        console.log(`  Attempt ${i + 1} failed: ${error.message}`);
        
        if (i === retries - 1) {
          throw error;
        }
        
        const delay = 1000 * Math.pow(2, i);
        console.log(`  Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  async batch(requests) {
    console.log(`\nBatch request: ${requests.length} operations`);
    return Promise.all(
      requests.map(req => this.request(req.endpoint, req.options))
    );
  }
}

async function demo() {
  console.log('--- Example 1: Basic API Client ---');
  
  const api = new APIClient('https://api.example.com', {
    timeout: 3000,
    retries: 2,
    headers: { 'Authorization': 'Bearer token123' }
  });

  try {
    const response = await api.get('/users/1');
    console.log('✅ Response:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n--- Example 2: POST Request ---');
  
  try {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const response = await api.post('/users', userData);
    console.log('✅ User created:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n--- Example 3: Batch Requests ---');
  
  try {
    const results = await api.batch([
      { endpoint: '/users/1', options: { method: 'GET' } },
      { endpoint: '/users/2', options: { method: 'GET' } },
      { endpoint: '/users/3', options: { method: 'GET' } }
    ]);
    
    console.log(`✅ Batch complete: ${results.length} responses`);
    results.forEach((r, i) => {
      console.log(`  User ${i + 1}:`, r.data.message);
    });
  } catch (error) {
    console.error('❌ Batch error:', error.message);
  }

  console.log('\n--- Example 4: Advanced API Client with Caching ---');

  class CachedAPIClient extends APIClient {
    constructor(baseURL, options = {}) {
      super(baseURL, options);
      this.cache = new Map();
      this.cacheTTL = options.cacheTTL || 60000; // 1 minute
    }

    async get(endpoint, options = {}) {
      const cacheKey = `GET:${endpoint}`;
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
        console.log(`  📦 Cache hit: ${endpoint}`);
        return cached.data;
      }

      console.log(`  🌐 Cache miss: ${endpoint}`);
      const response = await super.get(endpoint, options);
      
      this.cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });
      
      return response;
    }

    clearCache() {
      this.cache.clear();
      console.log('  🗑️  Cache cleared');
    }
  }

  const cachedApi = new CachedAPIClient('https://api.example.com', {
    cacheTTL: 5000
  });

  try {
    console.log('First request:');
    await cachedApi.get('/users/1');
    
    console.log('\nSecond request (should use cache):');
    await cachedApi.get('/users/1');
    
    console.log('\nThird request (different endpoint):');
    await cachedApi.get('/users/2');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  console.log('\n--- Example 5: Rate-Limited API Client ---');

  class RateLimitedAPIClient extends APIClient {
    constructor(baseURL, options = {}) {
      super(baseURL, options);
      this.requestsPerSecond = options.requestsPerSecond || 5;
      this.queue = [];
      this.processing = false;
    }

    async request(endpoint, options = {}) {
      return new Promise((resolve, reject) => {
        this.queue.push({ endpoint, options, resolve, reject });
        this.processQueue();
      });
    }

    async processQueue() {
      if (this.processing || this.queue.length === 0) return;
      
      this.processing = true;
      const item = this.queue.shift();
      
      try {
        const result = await super.request(item.endpoint, item.options);
        item.resolve(result);
      } catch (error) {
        item.reject(error);
      }
      
      setTimeout(() => {
        this.processing = false;
        this.processQueue();
      }, 1000 / this.requestsPerSecond);
    }
  }

  const rateLimitedApi = new RateLimitedAPIClient('https://api.example.com', {
    requestsPerSecond: 2
  });

  console.log('Sending 5 requests (rate limited to 2/second):');
  const startTime = Date.now();
  
  try {
    const promises = [1, 2, 3, 4, 5].map(id =>
      rateLimitedApi.get(`/users/${id}`)
    );
    
    await Promise.all(promises);
    const duration = Date.now() - startTime;
    console.log(`✅ All requests complete in ${duration}ms`);
    console.log('Notice: Requests were throttled!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

demo().catch(console.error);
