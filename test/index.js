import Future from 'fluture'
import { fetchF } from '../src'
import { assert } from 'chai'

const fetch = fetchF(Future)

// const _ = () => expect(true).toNotBe(false)
// const eventuallyEqual = (expected, done) => res => {
//   expect(res).toEqual(expected)
//   done()
// }

describe('#fetchF', () => {
  'use strict'

  // function delay (text, cb) {
  //   setTimeout(() => cb(null, text), 100)
  // }
  //
  // function errored (text, cb) {
  //   setTimeout(() => cb(text), 100)
  // }

  it('should be a function', () => {
    assert.typeOf(fetch, 'function')
  })
})
