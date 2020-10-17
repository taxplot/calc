const bracketPlot = (brackets, deduction, maxValue) => {
  // const numBrackets = brackets.length

  if (!maxValue) {
    maxValue = brackets[brackets.length - 1].amountsAbove * 2
  }

  if (!deduction) {
    deduction = 0
  }

  // first plot line from origin to beginning of first bracket (or maxValue if it's tiny)
  var plottableBrackets = [
    { x: 0, y: 0 },
    { x: Math.min(maxValue, brackets[0].amountsAbove + deduction), y: 0 }
  ]

  brackets.forEach((bracket) => {
    // if maxValue is above this bracket's floor, then we'll calculate something
    if (maxValue >= bracket.amountsAbove + deduction) {
      // if we're in the top bracket and the maxValue is above the floor, plot two points from floor to maxValue
      if (!bracket.amountsNotMoreThan) {
        plottableBrackets.push(
          {
            x: bracket.amountsAbove + deduction,
            y: bracket.rate
          },
          {
            x: maxValue,
            y: bracket.rate
          }
        )
      }

      // if maxValue is greater than this bracket's ceiling, then we'll calc two x/y data points corresponding to the floor and ceiling
      else if (maxValue >= bracket.amountsNotMoreThan + deduction) {
        plottableBrackets.push(
          {
            x: bracket.amountsAbove + deduction,
            y: bracket.rate
          },
          {
            x: bracket.amountsNotMoreThan + deduction,
            y: bracket.rate
          }
        )
      } else {
        plottableBrackets.push(
          {
            x: bracket.amountsAbove + deduction,
            y: bracket.rate
          },
          {
            x: maxValue,
            y: bracket.rate
          }
        )
      }
      //   if (maxVale < (bracket.amountsNotMoreThan + deduction)) {
      //     plottableBrackets.push({x: maxValue, y:bracket.rate})
      //   } else if (!bracket.) {

      //   }
    }
  })

  return plottableBrackets
}

export { bracketPlot }
