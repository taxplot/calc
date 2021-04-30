export class TaxPayer {
  constructor(scenario) {
    const defaults = {
      year: 2021,
      country: 'us',
      jurisdiction: 'federal',
      taxType: 'income',
      filingType: 'individual',
      filingStatus: 'single',
      deduction: null,
      income: null
    }
    const populated = Object.assign(defaults, scenario)
    for (const key in populated) {
      // eslint-disable-next-line no-prototype-builtins
      if (populated.hasOwnProperty(key)) {
        this[key] = populated[key]
      }
    }
  }
}
