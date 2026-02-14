// Demo 7.1: Testing Async Code with Jest
// Run with: npm test

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 100);
  });
}

async function retry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}

describe('Async Testing Examples', () => {
  describe('fetchUser', () => {
    test('fetches user successfully with .then()', () => {
      return fetchUser(1).then(user => {
        expect(user.id).toBe(1);
        expect(user.name).toBe('User 1');
        expect(user.email).toBe('user1@example.com');
      });
    });

    test('fetches user successfully with async/await', async () => {
      const user = await fetchUser(1);
      
      expect(user.id).toBe(1);
      expect(user.name).toBe('User 1');
      expect(user.email).toBe('user1@example.com');
    });

    test('rejects with invalid ID using .catch()', () => {
      return fetchUser(-1).catch(error => {
        expect(error.message).toBe('Invalid user ID');
      });
    });

    test('rejects with invalid ID using expect().rejects', () => {
      return expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
    });

    test('rejects with invalid ID using async/await', async () => {
      await expect(fetchUser(-1)).rejects.toThrow('Invalid user ID');
    });

    test('rejects with invalid ID using try/catch', async () => {
      try {
        await fetchUser(-1);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toBe('Invalid user ID');
      }
    });
  });

  describe('Promise.all()', () => {
    test('fetches multiple users', async () => {
      const users = await Promise.all([
        fetchUser(1),
        fetchUser(2),
        fetchUser(3)
      ]);

      expect(users).toHaveLength(3);
      expect(users[0].id).toBe(1);
      expect(users[1].id).toBe(2);
      expect(users[2].id).toBe(3);
    });
  });

  describe('retry function', () => {
    test('succeeds on first try', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      
      const result = await retry(mockFn, 3);
      
      expect(result).toBe('success');
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    test('retries and eventually succeeds', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Fail 1'))
        .mockRejectedValueOnce(new Error('Fail 2'))
        .mockResolvedValue('Success');
      
      const result = await retry(mockFn, 3);
      
      expect(mockFn).toHaveBeenCalledTimes(3);
      expect(result).toBe('Success');
    });

    test('throws after max retries', async () => {
      const mockFn = jest.fn().mockRejectedValue(new Error('Always fails'));
      
      await expect(retry(mockFn, 3)).rejects.toThrow('Always fails');
      expect(mockFn).toHaveBeenCalledTimes(3);
    });
  });

  describe('Mocking async functions', () => {
    test('mocks resolved value', async () => {
      const mockFetch = jest.fn().mockResolvedValue({ data: 'test' });
      
      const result = await mockFetch('/api/users');
      
      expect(mockFetch).toHaveBeenCalledWith('/api/users');
      expect(result.data).toBe('test');
    });

    test('mocks rejected value', async () => {
      const mockFetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
      await expect(mockFetch('/api/users')).rejects.toThrow('Network error');
    });

    test('mocks multiple calls with different values', async () => {
      const mockFn = jest.fn()
        .mockResolvedValueOnce('first')
        .mockResolvedValueOnce('second')
        .mockResolvedValueOnce('third');
      
      expect(await mockFn()).toBe('first');
      expect(await mockFn()).toBe('second');
      expect(await mockFn()).toBe('third');
    });
  });
});
