# JavaScript Integration Testing: Test Component Interactions

Integration testing verifies that components work together correctly. Test API endpoints, database interactions, and system integration to catch issues unit tests miss.

## API Testing with Supertest

```javascript
import request from 'supertest';
import app from './app';

describe('User API', () => {
    test('GET /users returns user list', async () => {
        const response = await request(app)
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(response.body).toBeInstanceOf(Array);
    });
    
    test('POST /users creates user', async () => {
        const newUser = { name: 'John', email: 'john@example.com' };
        
        const response = await request(app)
            .post('/users')
            .send(newUser)
            .expect(201);
        
        expect(response.body).toMatchObject(newUser);
        expect(response.body.id).toBeDefined();
    });
});
```

## Database Integration

```javascript
describe('User Repository', () => {
    beforeAll(async () => {
        await db.connect();
    });
    
    afterAll(async () => {
        await db.disconnect();
    });
    
    beforeEach(async () => {
        await db.clear();
    });
    
    test('creates and retrieves user', async () => {
        const user = await userRepo.create({
            name: 'John',
            email: 'john@example.com'
        });
        
        const found = await userRepo.findById(user.id);
        expect(found.name).toBe('John');
    });
});
```

## Testing External APIs

```javascript
import nock from 'nock';

test('fetches weather data', async () => {
    nock('https://api.weather.com')
        .get('/forecast')
        .query({ city: 'London' })
        .reply(200, { temp: 20, condition: 'sunny' });
    
    const weather = await getWeather('London');
    expect(weather.temp).toBe(20);
});
```

## Best Practices

- Use test databases
- Clean up after tests
- Test happy and error paths
- Mock external services
- Keep tests independent
- Use realistic test data

## Key Takeaways

- Integration tests verify component interactions
- Test APIs with supertest
- Use test databases for isolation
- Mock external dependencies
- Clean up between tests
- Catch issues unit tests miss

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/integration-testing](https://rws8.tech/tutorials/javascript/integration-testing/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #IntegrationTesting #API #Testing #Supertest #QA
