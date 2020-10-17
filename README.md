# @taxplot/calc

> Tax calculations and access to tax data from [tax·plot](https://taxplot.com) 

[![NPM](https://img.shields.io/npm/v/@taxplot/calc.svg)](https://www.npmjs.com/package/@taxplot/calc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## What Is This
@taxplot/calc is a plain JavaScript library used at [tax·plot](https://taxplot.com) for tax-related calculations. It pulls tax data such as
tax rates from our server and provides that data and calculation results in a format that is easy to use.

For now only US federal and some state tax data is available. This will be added to in the future.

## Install

```bash
npm install --save @taxplot/calc
```

## Usage

### Access Token
Tax data required for tax calculations (brackets, rates, standard deduction amounts, etc.) is made available to @taxplot/calc via the taxplot 
taxQL GraphQL server and requires an authentication token to access. A token is automatically assigned when you create a user account at 
taxplot.com.

As with any access token, do not store yours in a publicly discoverable place.

The taxQL endpoint can be accessed directly at taxql.taxplot.com. To explore using GraphQL Playground, open taxql.taxplot.com in a web browser
and paste your token in the HTTP HEADERS area at the lower left.

```JavaScript
{
  "authorization": "PASTE_YOUR_TOKEN_HERE"
}
```

### TaxPayer Object

Several taxplot functions require a TaxPayer object as a parameter. Create a new TaxPayer as follows.

```JavaScript
import { TaxPayer } from '@taxplot/calc'

const someTaxPayer = new TaxPayer()
```
A new TaxPayer object is initialized as a US taxpayer filing federal-only as single in 2020, as follows:

```JavaScript
      year: 2020,
      country: 'us',
      jurisdiction: 'federal',
      taxType: 'income',
      filingType: 'individual',
      filingStatus: 'single',
      deduction: null,
      income: null
```
Any of these values can be overridden on initialization or changed later.

##taxBrackets([TOKEN], [TaxPayer])
The `taxBrackets` function returns a promise that resolves to an array of tax bracket objects corresponding to a given TaxPayer.

```JavaScript
import { TaxPayer, taxBrackets } from '@taxplot/calc'

const taxPayer = new TaxPayer()

const brackets = taxBrackets(TOKEN, taxPayer)

```
`brackets` will resolve to:

```JavaScript
[
{"__typename":"TaxBracket","amountsAbove":0,"amountsNotMoreThan":9700,"plusAmount":0,"rate":0.1},
{"__typename":"TaxBracket","amountsAbove":9700,"amountsNotMoreThan":39475,"plusAmount":970,"rate":0.12},
{"__typename":"TaxBracket","amountsAbove":39475,"amountsNotMoreThan":84200,"plusAmount":4543,"rate":0.22},
{"__typename":"TaxBracket","amountsAbove":84200,"amountsNotMoreThan":160725,"plusAmount":14382.5,"rate":0.24},
{"__typename":"TaxBracket","amountsAbove":160725,"amountsNotMoreThan":204100,"plusAmount":32748.5,"rate":0.32},
{"__typename":"TaxBracket","amountsAbove":204100,"amountsNotMoreThan":510300,"plusAmount":46628.5,"rate":0.35},
{"__typename":"TaxBracket","amountsAbove":510300,"amountsNotMoreThan":null,"plusAmount":153798.5,"rate":0.37}
]
```

##standardDeduction([TOKEN], [TaxPayer])
The `standardDeduction` function returns a promise that resolves to a dollar amount corresponding to a taxpayer's standard deduction amount.

```JavaScript
import { TaxPayer, standardDeduction } from '@taxplot/calc'

const taxPayer = new TaxPayer()

const deduction = standardDeduction(TOKEN, taxPayer)


```
`deduction` will resolve to:

```JavaScript
12400
```
This value can then be assigned to `taxPayer.deduction`.

###taxValues([TOKEN OR TAX_BRACKET_OBJECT], [TaxPayer])

`taxValues` returns a promise that resolves to a three-value object containing a given taxpayer's marginal tax rate, calculated tax amount due, 
and calculated effective tax rate. In addition to the `TaxPayer` object, it requires either a `token` with which to fetch the relevant set of
tax brackets, or a tax brackets object previously fetched using the `taxBrackets` function.

```JavaScript
import { TaxPayer, taxValues } from '@taxplot/calc'

const taxPayer = new TaxPayer()

const taxResult = taxValues(TOKEN, taxPayer)

```

OR

```JavaScript
import { TaxPayer, taxValues, taxBrackets } from '@taxplot/calc'

const taxPayer = new TaxPayer({deduction: 12400})
const brackets = taxBracket(TOKEN, taxPayer)

const taxResult = taxValues(brackets, taxPayer)

```

In both cases, `taxResult` will resolve to:


```JavaScript
{"marginalRate":0.24,"taxAmount":15198.5,"effectiveRate":0.151985}
```

Where a TaxPayer object's `deduction` amount is `null`, the `taxValues` function will assume a `deduction` amount equal to the appropriate
standard deduction only when the first parameter is a `token`. When the first parameter is a tax brackets object, the function will assume 
`deduction` equals `0`. To avoid confusion, assign `TaxPayer.deduction` prior to usingg the `taxValues` function.

#### marginalRate( ), taxAmount( ), and effectiveRate( )
Where only one of the `taxValues` values is needed, one can use one of the functions above.

`marginalRate([Token or taxBrackets], [TaxPayer])` is equivalent to `taxValues([Token or taxBrackets], [TaxPayer]).marginalRate`

and

`taxAmount([Token or taxBrackets], [TaxPayer])` is equivalent to `taxValues([Token or taxBrackets], [TaxPayer]).taxAmount`

and

`effectiveRate([Token or taxBrackets], [TaxPayer])` is equivalent to `taxValues([Token or taxBrackets], [TaxPayer]).effectiveRate`


###bracketPlot([taxBracket], [deduction], [max Value])
`bracketPlot` is useful for turning a taxBracket object into something that is easily displayed visually. For example,

```JavaScript
import { TaxPayer, taxBrackets, bracketPlot } from '@taxplot/calc'

const taxPayer = new TaxPayer()

const brackets = taxBrackets(TOKEN, taxPayer)

const plotBrackets = bracketPlot(brackets, 12400, 100000)

```
`plotBrackets` will give us:

```JavaScript
[
  {"x":0,"y":0},
  {"x":12400,"y":0},
  {"x":12400,"y":0.1},
  {"x":22100,"y":0.1},
  {"x":22100,"y":0.12},
  {"x":51875,"y":0.12},
  {"x":51875,"y":0.22},
  {"x":96600,"y":0.22},
  {"x":96600,"y":0.24},
  {"x":100000,"y":0.24}
]
```
Neither the second nor third parameter (`deduction` and `maxValue`) are required. 

The second parameter, `deduction`, is the amount of a taxpayer's
income that is not taxed, thus shifting a plot of the tax bracket to the right by an amount equal to `deduction`. Where a `deduction` amount
is not supplied it is assumed to be `0`.

The third parameter `maxValue` is the rightmost income amount of the requested plot. Where `maxValue` is not supplied, it is assumed to be
twice them amount at which the top tax bracket begins.


## License

MIT © [tax·plot](https://taxplot.com)
