'use strict'
const assert = require('assert')
const tsame = require('tsame')
const { it } = require('mocha')
const bytes = require('../')

const test = it

const same = (x, y) => assert.ok(tsame(x, y))

test('string conversion', done => {
  const ab = bytes('hello world')
  assert(ab instanceof DataView)
  const str = bytes.toString(ab)
  same(str, 'hello world')
  done()
})

test('compare', done => {
  const a = bytes('hello world')
  const b = bytes('hello world 2')
  assert(bytes.compare(a, a))
  assert(bytes.compare(a, 'hello world'))
  assert(!bytes.compare(a, b))
  assert(!bytes.compare(b, a))
  assert(!bytes.compare(a, '123'))
  assert(!bytes.compare('123', a))
  done()
})

test('double view', done => {
  const a = bytes('hello world')
  const b = bytes(a)
  same(a, b)
  done()
})

test('array buffer', done => {
  const a = bytes('hello world')
  const b = bytes(bytes.memcopy(a))
  same(bytes.toString(a), bytes.toString(b))
  done()
})

test('Uint8Array', done => {
  const a = bytes('hello world')
  const b = bytes(new Uint8Array(bytes.memcopy(a)))
  same(bytes.toString(a), bytes.toString(b))
  done()
})

test('native', done => {
  let n = bytes.native('hello world')
  if (process.browser) {
    assert(n instanceof Uint8Array)
    n = bytes.native(n)
    assert(n instanceof Uint8Array)
  } else {
    assert(n instanceof Buffer)
    n = bytes.native(n)
    assert(n instanceof Buffer)
  }
  done()
})
