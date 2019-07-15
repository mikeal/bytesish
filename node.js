'use strict'
const fallback = require('./browser').from
const bytes = require('./core')

bytes.from = (_from, encoding) => {
  if (_from instanceof ArrayBuffer) return _from
  if (typeof _from === 'string') {
    return Buffer.from(_from, encoding).buffer
  }
  if (Buffer.isBuffer(_from)) return _from.buffer
  return fallback(_from, encoding)
}
bytes.toString = (_from, encoding) => {
  return Buffer.from(bytes.from(_from)).toString(encoding)
}

bytes.native = arg => Buffer.from(bytes.from(arg))

module.exports = bytes
