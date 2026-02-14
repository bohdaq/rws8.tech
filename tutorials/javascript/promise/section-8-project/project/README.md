# Multi-Source Data Aggregator - Course Project

A production-ready data aggregation system demonstrating advanced Promise patterns and async best practices.

## Features

- 🌐 Multi-API data fetching
- 🔄 Automatic retry with exponential backoff
- ⏱️ Request timeout handling
- 💾 Smart caching with TTL
- 🚦 Rate limiting
- ✅ Comprehensive error handling
- 🧪 Full test coverage

## Quick Start

```bash
# Install dependencies
npm install

# Run the aggregator
npm start

# Run tests
npm test

# Run with watch mode
npm run dev
```

## Usage

```javascript
const { DataAggregator } = require('./src/aggregator');

const aggregator = new DataAggregator({
  timeout: 5000,
  retries: 3,
  cacheTTL: 60000,
  rateLimit: 10
});

// Fetch all data sources
const data = await aggregator.fetchAll({
  weather: { city: 'London' },
  news: { category: 'tech' },
  stocks: { symbol: 'AAPL' }
});

console.log(data);
```

## Project Structure

```
src/
├── api/              # API clients
├── utils/            # Utility functions
├── aggregator/       # Main aggregator logic
└── index.js          # Entry point

tests/
├── unit/             # Unit tests
└── integration/      # Integration tests
```

## Configuration

Edit `config/default.js` to customize:
- API endpoints
- Timeout values
- Retry settings
- Cache TTL
- Rate limits

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- retry.test.js
```

## Performance

- Average aggregation time: < 2 seconds
- Cache hit rate: > 70%
- Success rate: > 95%
- Max concurrent requests: 10

## License

MIT
