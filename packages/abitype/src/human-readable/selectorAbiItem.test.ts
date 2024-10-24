import { expect, test } from 'vitest'
import { selectorAbiItem } from './selectorAbiItem.js'

test.each([
  {
    selector: selectorAbiItem({
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'address' }, { type: 'address' }],
      outputs: [{ name: 'balance', type: 'uint256' }],
    }),
    expected: 'balanceOf(address,address)',
  },
  {
    selector: selectorAbiItem({
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ type: 'address' }],
      outputs: [{ name: 'balance', type: 'uint256' }],
    }),
    expected: 'balanceOf(address)',
  },
  {
    selector: selectorAbiItem({
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: 'balance', type: 'uint256' }],
    }),
    expected: 'balanceOf()',
  },
])('selectorAbiItem: function', (t) => {
  expect(t.selector).toEqual(t.expected)
})

test.each([
  {
    selector: selectorAbiItem({
      name: 'foo',
      type: 'event',
      inputs: [{ type: 'uint256' }, { type: 'uint256' }],
    }),
    expected: 'foo(uint256,uint256)',
  },
  {
    selector: selectorAbiItem({
      name: 'foo',
      type: 'event',
      inputs: [{ type: 'uint256' }],
    }),
    expected: 'foo(uint256)',
  },
  {
    selector: selectorAbiItem({
      name: 'foo',
      type: 'event',
      inputs: [],
    }),
    expected: 'foo()',
  },
])('selectorAbiItem: event', (t) => {
  expect(t.selector).toEqual(t.expected)
})
