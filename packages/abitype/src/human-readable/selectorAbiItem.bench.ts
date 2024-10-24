import { Fragment as FragmentV5 } from '@ethersproject/abi'
import { Fragment as FragmentV6 } from 'ethers'
import { bench, describe } from 'vitest'

import { selectorAbiItem } from './selectorAbiItem.js'

describe('Generate Function ABI selector', () => {
  const basic = {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ type: 'address' }, { type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  } as const

  bench('abitype', () => {
    selectorAbiItem(basic)
  })

  bench('ethers@6', () => {
    FragmentV6.from(basic).format('sighash')
  })

  bench('ethers@5', () => {
    FragmentV5.fromObject(basic).format('sighash')
  })
})

describe('Generate Event ABI selector', () => {
  const basic = {
    name: 'foo',
    type: 'event',
    inputs: [{ type: 'uint256' }, { type: 'uint256' }],
  } as const

  bench('abitype', () => {
    selectorAbiItem(basic)
  })

  bench('ethers@6', () => {
    FragmentV6.from(basic).format('sighash')
  })

  bench('ethers@5', () => {
    FragmentV5.fromObject(basic).format('sighash')
  })
})
