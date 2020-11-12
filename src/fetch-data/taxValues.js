const taxValues = (brackets, taxPayer) => {
  var marginalRate = 0
  var taxAmount = 0
  var effectiveRate = 0

  if (!taxPayer.deduction) {
    taxPayer.deduction = 0
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
