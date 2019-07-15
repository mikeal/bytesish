'use strict'
const fallback = require('./browser').from
const bytes = require('./core')

bytes.from = (_from, encoding) => {
  if (_from instanceof ArrayBuffer) return _from
  if (typeof _from === 'string') {
    return Buffer.alloc(Buffer.byteLength(_from), _from, encoding).buffer
  }
  if (Buffer.isBuffer(_from)) {
    // This Buffer is not a view of a larger ArrayBuffer
    if (_from.buffer.byteLength === _from.length) return _from.buffer
    // This Buffer *is* a view of a larger ArrayBuffer so we have to copy it
    else return _from.buffer.slice(_from.byteOffset, _from.byteOffset + _from.byteLength)
  }
  return fallback(_from, encoding)
}
bytes.toString = (_from, encoding) => {
  return Buffer.from(bytes.from(_from)).toString(encoding)
}

bytes.native = arg => Buffer.from(bytes.from(arg))

module.exports = bytes
