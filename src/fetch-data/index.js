import { taxBrackets } from './taxBrackets'
import { standardDeduction } from './standardDeduction'
import { taxValues } from './taxValues'

const marginalRate = async (tokenOrBracket, taxPayer) => {
  return (await taxValues(tokenOrBracket, taxPayer)).marginalRate
}

const taxAmount = async (tokenOrBracket, taxPayer) => {
  return await (await taxValues(tokenOrBracket, taxPayer)).taxAmount
}

const effectiveRate = async (tokenOrBracket, taxPayer) => {
  return await (await taxValues(tokenOrBracket, taxPayer)).effectiveRate
}

export {
  taxBrackets,
  standardDeduction,
  taxValues,
  marginalRate,
  taxAmount,
  effectiveRate
}
