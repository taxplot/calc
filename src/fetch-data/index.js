import { taxBrackets } from './taxBrackets'
import { standardDeduction } from './standardDeduction'
import { taxValues } from './taxValues'

const marginalRate = (bracket, taxPayer) => {
  return taxValues(bracket, taxPayer).marginalRate
}

const taxAmount = (bracket, taxPayer) => {
  return taxValues(bracket, taxPayer).taxAmount
}

const effectiveRate = (bracket, taxPayer) => {
  return taxValues(bracket, taxPayer).effectiveRate
}

export {
  taxBrackets,
  standardDeduction,
  taxValues,
  marginalRate,
  taxAmount,
  effectiveRate
}
