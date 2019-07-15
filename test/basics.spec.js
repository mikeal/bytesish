'use strict'
const assert = require('assert')
const tsame = require('tsame')
const { it } = require('mocha')
const bytes = require('../')

const test = it

const same = (x, y) => assert.ok(tsame(x, y))

test('string conversion', done => {
  const ab = bytes('hello world')
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
  assert(!bytes.compare(a, '123'))
  done()
})
