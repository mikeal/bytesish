'use strict'
const fallback = require('./browser').from
const bytes = require('./core')

bytes.from = (_from, encoding) => {
  if (_from instanceof DataView) return _from
  if (_from instanceof ArrayBuffer) return new DataView(_from)
  if (typeof _from === 'string') {
    _from = Buffer.from(_from, encoding)
  }
  if (Buffer.isBuffer(_from)) {
    return new DataView(_from.buffer, _from.byteOffset, _from.byteLength)
  }
  return fallback(_from, encoding)
}
bytes.toString = (_from, encoding) => {
  _from = bytes(_from)
  return Buffer.from(_from.buffer, _from.byteOffset, _from.byteLength).toString(encoding)
}

bytes.native = arg => {
  if (Buffer.isBuffer(arg)) return arg
  arg = bytes(arg)
  return Buffer.from(arg.buffer, arg.byteOffset, arg.byteLength)
}

module.exports = bytes
