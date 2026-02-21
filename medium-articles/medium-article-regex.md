# JavaScript Regular Expressions: Pattern Matching Mastery

Regular Expressions (regex) provide powerful pattern matching for validation, searching, and text manipulation. Essential for form validation, data parsing, and string processing.

## Basic Syntax

```javascript
// Literal notation
const regex1 = /pattern/flags;

// Constructor
const regex2 = new RegExp('pattern', 'flags');

// Test if pattern matches
console.log(/hello/.test('hello world')); // true
console.log(/goodbye/.test('hello world')); // false
```

## Common Patterns

```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test('user@example.com')); // true

// Phone number (US)
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
console.log(phoneRegex.test('555-123-4567')); // true

// URL
const urlRegex = /^https?:\/\/.+/;
console.log(urlRegex.test('https://example.com')); // true

// Password (8+ chars, letter, number)
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
console.log(passwordRegex.test('Pass1234')); // true
```

## Character Classes

```javascript
// \d - digit [0-9]
/\d+/.test('123'); // true

// \w - word character [A-Za-z0-9_]
/\w+/.test('hello_123'); // true

// \s - whitespace
/\s/.test(' '); // true

// . - any character except newline
/.+/.test('anything'); // true

// [abc] - any of a, b, or c
/[aeiou]/.test('hello'); // true

// [^abc] - not a, b, or c
/[^0-9]/.test('abc'); // true
```

## Quantifiers

```javascript
// * - 0 or more
/ab*c/.test('ac'); // true (0 b's)
/ab*c/.test('abbc'); // true (2 b's)

// + - 1 or more
/ab+c/.test('abc'); // true
/ab+c/.test('ac'); // false

// ? - 0 or 1
/colou?r/.test('color'); // true
/colou?r/.test('colour'); // true

// {n} - exactly n
/\d{3}/.test('123'); // true

// {n,} - n or more
/\d{3,}/.test('12345'); // true

// {n,m} - between n and m
/\d{3,5}/.test('1234'); // true
```

## Groups and Capturing

```javascript
// Capturing groups
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
const match = '2024-02-21'.match(dateRegex);
console.log(match[1]); // '2024' (year)
console.log(match[2]); // '02' (month)
console.log(match[3]); // '21' (day)

// Non-capturing groups
const regex = /(?:Mr|Mrs|Ms)\. (\w+)/;
const result = 'Mr. Smith'.match(regex);
console.log(result[1]); // 'Smith'
```

## Methods

```javascript
const text = 'The quick brown fox';

// test() - returns boolean
/quick/.test(text); // true

// match() - returns matches
text.match(/\w+/g); // ['The', 'quick', 'brown', 'fox']

// replace() - replaces matches
text.replace(/fox/, 'dog'); // 'The quick brown dog'

// search() - returns index
text.search(/brown/); // 10

// split() - splits string
text.split(/\s+/); // ['The', 'quick', 'brown', 'fox']
```

## Flags

```javascript
// g - global (all matches)
'aaa'.match(/a/g); // ['a', 'a', 'a']

// i - case insensitive
/hello/i.test('HELLO'); // true

// m - multiline
/^test/m.test('line1\ntest'); // true

// s - dotAll (. matches newline)
/a.b/s.test('a\nb'); // true
```

## Best Practices

- Test regex patterns thoroughly
- Use online regex testers for complex patterns
- Comment complex regex for maintainability
- Escape special characters when needed
- Consider performance for large texts
- Use non-capturing groups when capture not needed

## Key Takeaways

- Regex provides powerful pattern matching
- Use character classes for common patterns
- Quantifiers control repetition
- Groups capture matched portions
- Flags modify matching behavior
- Essential for validation and parsing
- Test patterns thoroughly

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/regex](https://rws8.tech/tutorials/javascript/regex/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #RegEx #PatternMatching #Validation #TextProcessing
