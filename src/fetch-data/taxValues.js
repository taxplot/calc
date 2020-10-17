import { standardDeduction } from './standardDeduction'
import { taxBrackets } from './taxBrackets'
const taxValues = async (tokenOrBrackets, taxPayer) => {
  var token, brackets, marginalRate, taxAmount, effectiveRate

  if (typeof tokenOrBrackets === 'string') {
    token = tokenOrBrackets
  } else {
    brackets = tokenOrBrackets
  }

  if (token) {
    brackets = await taxBrackets(token, taxPayer)
  }

  if (!taxPayer.deduction) {
    if (token) {
      taxPayer.deduction = await standardDeduction(token, taxPayer)
    } else {
      taxPayer.deduction = 0
    }
  }

  const taxableIncome = Math.max(0, taxPayer.income - taxPayer.deduction)
  brackets.forEach((bracket) => {
    if (
      taxableIncome > bracket.amountsAbove &&
      (taxableIncome <= bracket.amountsNotMoreThan ||
        !bracket.amountsNotMoreThan)
    ) {
      marginalRate = bracket.rate
      taxAmount =
        (taxableIncome - bracket.amountsAbove) * bracket.rate +
        bracket.plusAmount
      effectiveRate = taxAmount / taxPayer.income
    }
  })

  return {
    marginalRate: marginalRate,
    taxAmount: taxAmount,
    effectiveRate: effectiveRate
  }
}

export { taxValues }
