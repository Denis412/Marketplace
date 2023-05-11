import { provideApolloClient, useMutation } from '@vue/apollo-composable'
import apolloClient from 'src/apollo/apollo-client'
import { useQuery } from '@vue/apollo-composable'
import { getFiles } from 'src/graphql/files/queries'

provideApolloClient(apolloClient)

const { onResult, refetch } = useQuery(getFiles, {
  page: 1,
  perPage: 50,
  where: {
    or: [
      {
        column: 'extension',
        operator: 'EQ',
        value: 'html',
      },
    ],
  },
  orderBy: null,
})

export { onResult, refetch }
