# JavaScript BigInt: Arbitrarily Large Integers

BigInt is a primitive type for representing integers larger than Number.MAX_SAFE_INTEGER (2^53 - 1). Perfect for cryptography, precise timestamps, and calculations requiring arbitrary precision.

## Basic Usage

```javascript
// Create BigInt
const big1 = 1234567890123456789012345678901234567890n;
const big2 = BigInt("9876543210987654321098765432109876543210");
const big3 = BigInt(123); // From number

console.log(typeof big1); // "bigint"

// Number limitations
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 (WRONG!)

// BigInt precision
const bigNum = 9007199254740991n;
console.log(bigNum + 1n); // 9007199254740992n
console.log(bigNum + 2n); // 9007199254740993n (CORRECT!)
```

## Arithmetic Operations

```javascript
const a = 100n;
const b = 50n;

console.log(a + b);  // 150n
console.log(a - b);  // 50n
console.log(a * b);  // 5000n
console.log(a / b);  // 2n (integer division)
console.log(a % b);  // 0n
console.log(a ** b); // 10n^50 (exponentiation)

// Division truncates
console.log(7n / 2n); // 3n (not 3.5)
```

## Comparisons

```javascript
console.log(1n === 1);      // false (different types)
console.log(1n == 1);       // true (coercion)
console.log(1n < 2);        // true
console.log(2n > 1);        // true
console.log(0n === 0);      // false
console.log(0n == 0);       // true
```

## Type Conversion

```javascript
// BigInt to Number (may lose precision)
const big = 123n;
const num = Number(big); // 123

// Number to BigInt (must be integer)
const bigFromNum = BigInt(456); // 456n
// BigInt(3.14); // Error: Cannot convert non-integer

// String conversion
const str = big.toString(); // "123"
const bigFromStr = BigInt("789"); // 789n
```

## Real-World Examples

### Precise Timestamps

```javascript
// Nanosecond precision
const nanoTimestamp = process.hrtime.bigint();
console.log(nanoTimestamp); // 1234567890123456789n

// Calculate duration
const start = process.hrtime.bigint();
// ... operation ...
const end = process.hrtime.bigint();
const duration = end - start;
console.log(`Duration: ${duration}ns`);
```

### Large ID Generation

```javascript
function generateLargeId() {
    return BigInt(Date.now()) * 1000000n + BigInt(Math.floor(Math.random() * 1000000));
}

const id = generateLargeId();
console.log(id); // 1234567890123456n
```

## Limitations

```javascript
// Cannot mix with Number
// 1n + 1; // Error: Cannot mix BigInt and other types

// Must convert explicitly
const result = 1n + BigInt(1); // 2n

// No Math methods
// Math.sqrt(4n); // Error
// Use custom implementations

// JSON doesn't support BigInt
const obj = { big: 123n };
// JSON.stringify(obj); // Error

// Custom serialization
JSON.stringify(obj, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
);
```

## Best Practices

- Use BigInt for integers beyond safe range
- Append 'n' suffix for BigInt literals
- Convert explicitly when mixing types
- Be aware of division truncation
- Handle JSON serialization manually
- Use for cryptography and precise calculations

## Key Takeaways

- BigInt handles arbitrarily large integers
- Created with 'n' suffix or BigInt() function
- Cannot mix with Number without conversion
- Integer division truncates decimals
- Perfect for timestamps, IDs, cryptography
- No Math library support
- Requires custom JSON serialization

## Learn More

Check out the full tutorial at [rws8.tech/tutorials/javascript/bigint](https://rws8.tech/tutorials/javascript/bigint/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript and web development.

**Tags:** #JavaScript #BigInt #ES2020 #LargeIntegers #Precision #AdvancedJS
