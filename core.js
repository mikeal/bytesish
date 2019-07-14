/* globals btoa */
'use strict'
class Bytes {
  constructor (buffer) {
    this.buffer = buffer
  }

  toString (encoding) {
    const str = String.fromCharCode(...new Uint8Array(this.buffer))
    if (encoding === 'base64') {
      return btoa(str)
    } else {
      return str
    }
  }

  compare (_from) {
    // const a = this.buffer
    // const b = Bytes.from(_from).buffer
  }

  native () {
    return Bytes.native(this.buffer)
  }
}

module.exports = Bytes
