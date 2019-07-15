/* globals atob, btoa */
'use strict'
const bytes = require('./core')

bytes.from = (_from, _encoding) => {
  if (_from instanceof ArrayBuffer) return _from
  let buffer
  if (typeof _from === 'string') {
    if (!_encoding) {
      _encoding = 'utf-8'
    } else if (_encoding === 'base64') {
      buffer = Uint8Array.from(atob(_from), c => c.charCodeAt(0)).buffer
      return buffer
    }
    if (_encoding !== 'utf-8') throw new Error('Browser support for encodings other than utf-8 not implemented')
    return (new TextEncoder()).encode(_from).buffer
  } else if (typeof _from === 'object') {
    if (ArrayBuffer.isView(_from)) {
      return _from.buffer
    }
  }
  throw new Error('Unkown type. Cannot convert to ArrayBuffer')
}

bytes.toString = (_from, encoding) => {
  _from = bytes.from(_from, encoding)
  const str = String.fromCharCode(...new Uint8Array(_from))
  if (encoding === 'base64') {
    return btoa(str)
  } else {
    return str
  }
}

bytes.native = arg => bytes.from(arg)

module.exports = bytes
