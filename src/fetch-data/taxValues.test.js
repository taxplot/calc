import { TaxPayer } from '../taxPayer'
import { taxValues } from './taxValues'
import {
  US_SINGLE_2020_VALUES,
  US_SINGLE_2020_VALUES_DED_20000
} from '../test-data/tax-values'
import { US_SINGLE_2020_BRACKETS } from '../test-data/brackets'

const token = require('../../src/TestToken')

// manually define deduction amount to standard deduction amount since no way to calc if not given token.
const taxPayerSTD = new TaxPayer({
  year: 2020,
  income: 100000,
  deduction: 12400
})
const taxPayerItemize = new TaxPayer({
  year: 2020,
  income: 100000,
  deduction: 20000
})

test('returns three-value object given server token and taxpayer object (std ded)', async () => {
  await expect(taxValues(token.TestToken, taxPayerSTD)).resolves.toEqual(
    US_SINGLE_2020_VALUES
  )
})

test('returns three-value object given brackets array and taxpayer object (std ded)', async () => {
  await expect(
    taxValues(US_SINGLE_2020_BRACKETS, taxPayerSTD)
  ).resolves.toEqual(US_SINGLE_2020_VALUES)
})

test('returns three-value object given server token and taxpayer object (itemize ded)', async () => {
  await expect(taxValues(token.TestToken, taxPayerItemize)).resolves.toEqual(
    US_SINGLE_2020_VALUES_DED_20000
  )
})

test('returns three-value object given brackets array and taxpayer object (itemize ded)', async () => {
  await expect(
    taxValues(US_SINGLE_2020_BRACKETS, taxPayerItemize)
  ).resolves.toEqual(US_SINGLE_2020_VALUES_DED_20000)
})
