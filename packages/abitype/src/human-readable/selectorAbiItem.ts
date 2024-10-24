import type {
  AbiEvent,
  AbiEventParameter,
  AbiFunction,
  AbiParameter,
} from '../abi.js'
import type { AssertName } from '../human-readable/types/signatures.js'

export type TypesToCSV<
  T extends readonly (AbiParameter | AbiEventParameter)[],
> = T extends readonly [
  infer First extends AbiParameter | AbiEventParameter,
  ...infer Rest extends readonly (AbiParameter | AbiEventParameter)[],
]
  ? `${First['type']}${Rest['length'] extends 0 ? '' : `,${TypesToCSV<Rest>}`}`
  : ''

/**
 * Formats an ABI item into a selector
 *
 * @param abiItem - ABI item
 * @returns A selector
 */
export type SelectorAbiItem<abiItem extends AbiFunction | AbiEvent> =
  | AbiFunction
  | AbiEvent extends abiItem
  ? string
  : `${AssertName<abiItem['name']>}(${TypesToCSV<abiItem['inputs']>})`

/**
 * Formats an ABI function into a selector
 * Function: https://docs.soliditylang.org/en/develop/abi-spec.html#function-selector
 * Event: https://docs.soliditylang.org/en/develop/abi-spec.html#events
 *
 * @param abiItem - ABI item
 * @returns A selector
 */
export function selectorAbiItem<const abiItem extends AbiFunction | AbiEvent>(
  abiItem: abiItem,
): SelectorAbiItem<abiItem> {
  return `${abiItem.name}(${abiItem.inputs.map(({ type }) => type).join(',')})` as SelectorAbiItem<abiItem>
}
