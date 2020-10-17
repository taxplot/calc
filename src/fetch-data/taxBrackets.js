import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const taxBrackets = async (token, taxPayer) => {
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
    query GetRates(
      $year: Int
      $country: String
      $filingType: String
      $jurisdiction: String
      $filingStatus: String
      $taxType: String
    ) {
      taxbrackets(
        year: $year
        country: $country
        filingType: $filingType
        jurisdiction: $jurisdiction
        filingStatus: $filingStatus
        taxType: $taxType
      ) {
        taxRate {
          amountsAbove
          amountsNotMoreThan
          plusAmount
          rate
        }
      }
    }
  `
  const taxQLResult = await client
    .query({
      query: query,
      variables: {
        year: taxPayer.year,
        country: taxPayer.country,
        filingType: taxPayer.filingType,
        jurisdiction: taxPayer.jurisdiction,
        filingStatus: taxPayer.filingStatus,
        taxType: taxPayer.taxType
      }
    })
    .then((result) => result.data.taxbrackets[0].taxRate)
  // console.log(taxQLResult)
  return await taxQLResult
}

export { taxBrackets }
