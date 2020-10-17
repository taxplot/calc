import { TaxPayer } from '../taxPayer'
import { standardDeduction } from './standardDeduction'
const token = require('../../src/TestToken')
const taxPayer = new TaxPayer({ income: 100000 })

test('returns standard deduction given server token and taxpayer object', async () => {
  await expect(standardDeduction(token.TestToken, taxPayer)).resolves.toBe(
    12400
  )
})

const taxPayer2 = new TaxPayer({ year: 2010 })

test('returns standard deduction given server token and old taxpayer object', async () => {
  await expect(standardDeduction(token.TestToken, taxPayer2)).resolves.toBe(
    5700
  )
})

test('rejects when bad token given', async () => {
  await expect(standardDeduction('xxxx', taxPayer)).rejects.toThrow(
    'Response not successful: Received status code 400'
  )
})
