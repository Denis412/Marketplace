import { provideApolloClient } from '@vue/apollo-composable'
import apolloClient from 'src/apollo/apollo-client'
import { useQuery } from '@vue/apollo-composable'
import { getTasks } from 'src/graphql/tasks/queries'

provideApolloClient(apolloClient)

const { onResult: taskResult, refetch: taskRefetch } = useQuery(getTasks)

export { taskResult, taskRefetch }
