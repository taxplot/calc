const US_SINGLE_2020_BRACKETS = [
  {
    __typename: 'TaxBracket',
    amountsAbove: 0,
    amountsNotMoreThan: 9700,
    plusAmount: 0,
    rate: 0.1
  },
  {
    __typename: 'TaxBracket',
    amountsAbove: 9700,
    amountsNotMoreThan: 39475,
    plusAmount: 970,
    rate: 0.12
  },
  {
    __typename: 'TaxBracket',
    amountsAbove: 39475,
    amountsNotMoreThan: 84200,
    plusAmount: 4543,
    rate: 0.22
  },
  {
    __typename: 'TaxBracket',
    amountsAbove: 84200,
    amountsNotMoreThan: 160725,
    plusAmount: 14382.5,
    rate: 0.24
  },
  {
    __typename: 'TaxBracket',
    amountsAbove: 160725,
    amountsNotMoreThan: 204100,
    plusAmount: 32748.5,
    rate: 0.32
  },
  {
    __typename: 'TaxBracket',
    amountsAbove: 204100,
    amountsNotMoreThan: 510300,
    plusAmount: 46628.5,
    rate: 0.35
  },
  {
    __typename: 'TaxBracket',
    amountsAbove: 510300,
    amountsNotMoreThan: null,
    plusAmount: 153798.5,
    rate: 0.37
  }
]

const PLOT_US_SINGLE_2020_BRACKETS_PLOT_500_10000 = [
  { x: 0, y: 0 },
  { x: 500, y: 0 },
  { x: 500, y: 0.1 },
  { x: 10000, y: 0.1 }
]

const PLOT_US_SINGLE_2020_BRACKETS_PLOT_12400_XXX = [
  { x: 0, y: 0 },
  { x: 12400, y: 0 },
  { x: 12400, y: 0.1 },
  { x: 22100, y: 0.1 },
  { x: 22100, y: 0.12 },
  { x: 51875, y: 0.12 },
  { x: 51875, y: 0.22 },
  { x: 96600, y: 0.22 },
  { x: 96600, y: 0.24 },
  { x: 173125, y: 0.24 },
  { x: 173125, y: 0.32 },
  { x: 216500, y: 0.32 },
  { x: 216500, y: 0.35 },
  { x: 522700, y: 0.35 },
  { x: 522700, y: 0.37 },
  { x: 1020600, y: 0.37 }
]

export {
  US_SINGLE_2020_BRACKETS,
  PLOT_US_SINGLE_2020_BRACKETS_PLOT_500_10000,
  PLOT_US_SINGLE_2020_BRACKETS_PLOT_12400_XXX
}
