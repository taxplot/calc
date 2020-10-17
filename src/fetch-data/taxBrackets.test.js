import { TaxPayer } from '../taxPayer'
import { taxBrackets } from './taxBrackets'
import { US_SINGLE_2020_BRACKETS } from '../test-data/brackets'

const token = require('../../src/TestToken')
const taxPayer = new TaxPayer({ year: 2020 })

test('returns a tax bracket given server token and taxpayer object', async () => {
  await expect(taxBrackets(token.TestToken, taxPayer)).resolves.toEqual(
    US_SINGLE_2020_BRACKETS
  )
})
