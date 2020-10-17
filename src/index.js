import { TaxPayer } from './taxPayer'
import {
  taxBrackets,
  standardDeduction,
  taxValues,
  marginalRate,
  taxAmount,
  effectiveRate
} from './fetch-data'
import { bracketPlot } from './viz-data'

export {
  marginalRate,
  effectiveRate,
  standardDeduction,
  taxBrackets,
  taxAmount,
  taxValues,
  TaxPayer,
  bracketPlot
}
