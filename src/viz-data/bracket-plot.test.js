import { bracketPlot } from './bracket-plot'
import {
  US_SINGLE_2020_BRACKETS,
  PLOT_US_SINGLE_2020_BRACKETS_PLOT_500_10000,
  PLOT_US_SINGLE_2020_BRACKETS_PLOT_12400_XXX
} from '../test-data/brackets'

test('returns an x/y array from a bracket object', () => {
  expect(bracketPlot(US_SINGLE_2020_BRACKETS, 500, 10000)).toEqual(
    PLOT_US_SINGLE_2020_BRACKETS_PLOT_500_10000
  )
})

test('returns an x/y array from a bracket object', () => {
  expect(bracketPlot(US_SINGLE_2020_BRACKETS, 12400)).toEqual(
    PLOT_US_SINGLE_2020_BRACKETS_PLOT_12400_XXX
  )
})
