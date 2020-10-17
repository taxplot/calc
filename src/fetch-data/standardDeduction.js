import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const standardDeduction = async (token, taxPayer) => {
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
    query GetDeduction(
      $year: Int
      $country: String
      $jurisdiction: String
      $filingStatus: String
      $taxType: String
    ) {
      standarddeduction(
        year: $year
        country: $country
        jurisdiction: $jurisdiction
        filingStatus: $filingStatus
        taxType: $taxType
      ) {
        amount
      }
    }
  `
  const taxQLResult = await client
    .query({
      query: query,
      variables: {
        year: taxPayer.year,
        country: taxPayer.country,
        jurisdiction: taxPayer.jurisdiction,
        filingStatus: taxPayer.filingStatus,
        taxType: taxPayer.taxType
      }
    })
    .then((result) => result.data.standarddeduction.amount)
  return await taxQLResult
}

export { standardDeduction }
