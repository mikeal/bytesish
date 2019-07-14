'use strict'
const fallback = require('./browser')
const Bytes = require('./core')

// Hack
global.btoa = str => Buffer.from(str).toString('base64')

const main = (_from, encoding) => {
  if (typeof _from === 'string') {
    return new Bytes(Buffer.from(_from, encoding).buffer)
  }
  if (Buffer.isBuffer(_from)) return new Bytes(_from.buffer)
  return fallback(_from, encoding)
}

Bytes.from = main
Bytes.native = arg => new Buffer(arg)

module.exports = main
