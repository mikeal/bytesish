# `bytesish`

If you're writing a library that needs to work in Node.js and in Browsers,
it's quite difficult to figure out what "the right thing" to do with binary
is.

If you want to be compatible with Node.js libraries you'll need to accept
and return `Buffer` instances. If you want to be compatible with Browser API's
you'll need to accept and return a number of types, the browser is sort of a mess
when it comes to binary with many different "views" of binary data.

The moment you use the Node.js `Buffer` API in a library that is bundled for
use in Browsers the bundler will inject a rather large polyfill for the entire
`Buffer` API. It's quite difficult to accept and return `Buffer` instances while
avoiding this penalty.

However, there is some good news. No matter what the binary type there's an underlying
`ArrayBuffer` associated with the instance. This means that you can *mostly* do **zero copy**
conversions of any of these types to `ArrayBuffer` and back.

`bytesish` is here to help. This library helps you accept and convert different binary types
into a consistent type without loading any polyfills or other dependencies, then
convert back into an ideal type for the platform your library is running in.

What `bytesish` does:

* Returns an array buffer from any known binary type (*mostly* zero copy).
* Creates an ArrayBuffer from a string with any encoding.
* Converts an ArrayBuffer to a string of any encoding.
* Converts an ArrayBuffer to an ideal native object (`Buffer` or `ArrayBuffer`).

`bytesish` does not create a new Binary API or interface for accessing and manipulating
binary data, because you can just use `ArrayBuffer` for that. `bytesish` tries to be a
small piece of code that does not contribute any more than necessary to your bundle size.
It does this by containing only the binary operations you need that are difficult to
do cross-platform (Node.js and Browsers).

```javascript
let bytes = require('bytesish')
let arrayBuffer = bytes('hello world')

/* zero copy conversions */
arrayBuffer = bytes(Buffer.from('hello world')) // Buffer instance
arrayBuffer = bytes((new TextEncoder()).encode('hello world')) // Uint8Array

/* base64 conversions */
let base64String = bytes.toString(arrayBuffer, 'base64')
let arrayBufferCopy = bytes(base64String, 'base64')
```

## Gotchas

All Browser binary types are either ArrayBuffer's or views of a single ArrayBuffer, so
all of them can be converted to an ArrayBuffer without a memcopy. However, the Node.js
Buffer API is *sometimes* a view of a single ArrayBuffer and *sometimes* a view of a
larger ArrayBuffer. When one is used and not the other has a lot to do with the size
of the buffer (this only happens with small buffers) and how the buffer was created.

Since `bytesish` always created clean `Buffer` instances over a discreet `ArrayBuffer`,
you'll only ever suffer a memcopy **once** if you encounter one of these `Buffer` 
instances in Node.js. From that point on, not matter how many calls and conversions
happen, you should never suffer another memcopy since `bytesish` can always tell
that the native `Buffer` objects being sent are for a single `ArrayBuffer`.

