'use strict'

const length = (a, b) => {
  if (a.byteLength === b.byteLength) return a.byteLength
  else if (a.byteLength > b.byteLength) return a.byteLength
  return b.byteLength
}

const bytes = (_from, encoding) => bytes.from(_from, encoding)

bytes.sort = (a, b) => {
  a = new DataView(bytes(a))
  b = new DataView(bytes(b))
  const len = length(a, b)
  let i = 0
  while (i < len) {
    if (i > a.byteLength) return 1
    else if (i > b.byteLength) return -1

    if (a.getUint8(i) < b.getUint8(i)) return -1
    else if (a.getUint8(i) > b.getUint8(i)) return 1
    i++
  }
  return 0
}

bytes.compare = (a, b) => !bytes.sort(a, b)

module.exports = bytes
