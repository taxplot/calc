import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const payrollRates = async (token, taxPayer, payerType) => {
  const client = new ApolloClient({
    uri: 'https://taxql.taxplot.com',
    cache: new InMemoryCache(),
    headers: {
      authorization: token
    },
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    }
  })

  const query = gql`
    query GetPayrollRates(
      $year: Int
      $payerType: PayrollPayerType
      $filingStatus: String
      $country: String
      $jurisdiction: String
      $income: Float
    ) {
      payrolltax(
        year: $year
        payerType: $payerType
        filingStatus: $filingStatus
        country: $country
        jurisdiction: $jurisdiction
        income: $income
      ) {
        wageBase
        additionalHIThreshold
        payrollTax {
          name
          payer
          rate
          amount
        }
      }
    }
  `
  const taxQLResult = await client
    .query({
      query: query,
      variables: {
        year: taxPayer.year,
        payerType: payerType ? payerType.toUpperCase() : 'BOTH',
        filingStatus: taxPayer.filingStatus,
        country: taxPayer.country,
        jurisdiction: taxPayer.jurisdiction,
        income: taxPayer.income
      }
    })
    .then((result) => result.data.payrolltax)
  return await taxQLResult
}

export { payrollRates }
