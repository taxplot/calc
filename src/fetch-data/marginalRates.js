import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const marginalRates = async (token, taxPayer) => {
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
  console.log('token: ', token)
  const taxQLResult = await client
    .query({
      query: gql`
        query GetRates {
          taxbrackets(year: 2021) {
            taxRate {
              amountsAbove
              amountsNotMoreThan
              plusAmount
              rate
            }
          }
        }
      `
    })
    .then((result) => result.data.taxbrackets[0])
  console.log(taxQLResult)
  return taxQLResult
}

export { marginalRates }
