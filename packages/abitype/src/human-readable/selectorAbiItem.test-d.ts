import { expectTypeOf, test } from 'vitest'

import type { SelectorAbiItem } from './selectorAbiItem.js'

test('SelectorAbiItem: function', () => {
  expectTypeOf<
    SelectorAbiItem<{
      name: 'balanceOf'
      type: 'function'
      stateMutability: 'view'
      inputs: [{ type: 'address' }, { type: 'address' }]
      outputs: [{ name: 'balance'; type: 'uint256' }]
    }>
  >().toEqualTypeOf<'balanceOf(address,address)'>()
  expectTypeOf<
    SelectorAbiItem<{
      name: 'balanceOf'
      type: 'function'
      stateMutability: 'view'
      inputs: [{ type: 'address' }]
      outputs: [{ name: 'balance'; type: 'uint256' }]
    }>
  >().toEqualTypeOf<'balanceOf(address)'>()
  expectTypeOf<
    SelectorAbiItem<{
      name: 'balanceOf'
      type: 'function'
      stateMutability: 'view'
      inputs: []
      outputs: [{ name: 'balance'; type: 'uint256' }]
    }>
  >().toEqualTypeOf<'balanceOf()'>()
})

test('SelectorAbiItem: event', () => {
  expectTypeOf<
    SelectorAbiItem<{
      readonly name: 'foo'
      readonly type: 'event'
      readonly inputs: [{ type: 'uint256' }, { type: 'uint256' }]
    }>
  >().toEqualTypeOf<'foo(uint256,uint256)'>()
  expectTypeOf<
    SelectorAbiItem<{
      readonly name: 'foo'
      readonly type: 'event'
      readonly inputs: [{ type: 'uint256' }]
    }>
  >().toEqualTypeOf<'foo(uint256)'>()
  expectTypeOf<
    SelectorAbiItem<{
      readonly name: 'foo'
      readonly type: 'event'
      readonly inputs: []
    }>
  >().toEqualTypeOf<'foo()'>()
})
