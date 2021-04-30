const payrollTax = (payrollInfo, taxPayer) => {
  const payrollObject = {}
  let payrollTaxAmount
  payrollInfo.payrollTax.forEach((payrollItem) => {
    if (payrollItem.name) {
      let taxName = payrollItem.name
      // calculate tax amount
      if (taxName === 'OASDI') {
        payrollTaxAmount =
          payrollItem.rate * Math.min(payrollInfo.wageBase, taxPayer.income)
      } else if (taxName === 'HI') {
        payrollTaxAmount = payrollItem.rate * taxPayer.income
      } else {
        payrollTaxAmount =
          payrollObject.HI[payrollItem.payer] +
          payrollItem.rate *
            Math.max(0, taxPayer.income - payrollInfo.additionalHIThreshold)
        taxName = 'HI'
      }

      // put amount in right place(s) in object
      // note we're "unnecessarily" doubling the size of the object
      // so we can refer to Object.tax.payer and Object.payer.tax equally easily
      if (payrollObject[taxName]) {
        payrollObject[taxName][payrollItem.payer] = payrollTaxAmount
      } else {
        payrollObject[taxName] = {
          [payrollItem.payer]: payrollTaxAmount
        }
      }
      if (payrollObject[payrollItem.payer]) {
        payrollObject[payrollItem.payer][taxName] = payrollTaxAmount
      } else {
        payrollObject[payrollItem.payer] = {
          [taxName]: payrollTaxAmount
        }
      }
    }
  })

  // add totals
  for (const [key, value] of Object.entries(payrollObject)) {
    let subtotal = 0
    for (const [key2, value2] of Object.entries(payrollObject[key])) {
      subtotal = subtotal + value2
    }
    payrollObject[key].total = subtotal
  }
  payrollObject.total = payrollObject.OASDI.total + payrollObject.HI.total

  return payrollObject
}

export { payrollTax }
