# JavaScript Typed Arrays: Efficient Binary Data Handling

Typed Arrays provide efficient handling of binary data in JavaScript. Perfect for WebGL, file processing, network protocols, and performance-critical operations requiring direct memory access.

## Basic Concepts

```javascript
// ArrayBuffer - raw binary data
const buffer = new ArrayBuffer(16); // 16 bytes
console.log(buffer.byteLength); // 16

// Typed Array views
const int8 = new Int8Array(buffer);
const uint16 = new Uint16Array(buffer);
const float32 = new Float32Array(buffer);

// All views share the same underlying buffer
int8[0] = 42;
console.log(uint16[0]); // Reads same memory
```

## Typed Array Types

```javascript
// Signed integers
const int8 = new Int8Array(4);    // -128 to 127
const int16 = new Int16Array(4);  // -32768 to 32767
const int32 = new Int32Array(4);  // -2^31 to 2^31-1

// Unsigned integers
const uint8 = new Uint8Array(4);   // 0 to 255
const uint16 = new Uint16Array(4); // 0 to 65535
const uint32 = new Uint32Array(4); // 0 to 2^32-1

// Floating point
const float32 = new Float32Array(4); // 32-bit float
const float64 = new Float64Array(4); // 64-bit float

// Special
const uint8Clamped = new Uint8ClampedArray(4); // 0-255, clamped
```

## Creating Typed Arrays

```javascript
// From length
const arr1 = new Uint8Array(10);

// From array
const arr2 = new Uint8Array([1, 2, 3, 4]);

// From buffer
const buffer = new ArrayBuffer(16);
const arr3 = new Uint8Array(buffer);

// From buffer with offset and length
const arr4 = new Uint8Array(buffer, 4, 4);
```

## DataView for Flexibility

```javascript
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);

// Write different types
view.setInt8(0, 127);
view.setUint16(1, 65535);
view.setFloat32(4, 3.14);

// Read with endianness control
const value = view.getUint16(1, true); // little-endian
```

## Real-World Examples

### Image Processing

```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixels = imageData.data; // Uint8ClampedArray

// Grayscale filter
for (let i = 0; i < pixels.length; i += 4) {
    const avg = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
    pixels[i] = pixels[i+1] = pixels[i+2] = avg;
}

ctx.putImageData(imageData, 0, 0);
```

## Best Practices

- Use appropriate type for data range
- Share buffers between views when possible
- Use DataView for mixed-type data
- Consider endianness for network protocols
- Typed arrays are faster than regular arrays
- Perfect for WebGL, audio, file I/O

## Key Takeaways

- Typed Arrays provide efficient binary data access
- ArrayBuffer stores raw bytes
- Views interpret buffer data as specific types
- DataView offers flexible multi-type access
- Much faster than regular arrays for numeric data
- Essential for WebGL, audio, file processing
- Support all standard array methods

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/typed-arrays](https://rws8.tech/tutorials/javascript/typed-arrays/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #TypedArrays #BinaryData #Performance #WebGL #ArrayBuffer
