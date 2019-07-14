/* globals atob */
'use strict'
const Bytes = require('./core')

const toArrayBuffer = (_from, _encoding) => {
  let buffer
  if (typeof _from === 'string') {
    if (!_encoding) {
      _encoding = 'utf-8'
    } else if (_encoding === 'base64') {
      buffer = Uint8Array.from(atob(_from), c => c.charCodeAt(0)).buffer
      return new Bytes(buffer)
    }
    if (_encoding !== 'utf-8') throw new Error('Browser support for encodings other than utf-8 not implemented')
    return new Bytes((new TextEncoder()).encode(_from).buffer)
  } else if (typeof _from === 'object') {
    if (_from instanceof ArrayBuffer) {
      return new Bytes(_from)
    } else if (ArrayBuffer.isView(_from)) {
      return new Bytes(_from.buffer)
    }
  }
  throw new Error('Unkown type. Cannot convert to ArrayBuffer')
}

const main = (...args) => new Bytes(toArrayBuffer(...args))

Bytes.from = main

module.exports = main
