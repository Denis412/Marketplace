import {
  provideApolloClient,
  useMutation,
  useQuery,
} from '@vue/apollo-composable'
import apolloClient from 'src/apollo/apollo-client'
import { pageCreate, pageDelete, pageUpdate } from 'src/graphql/page/mutations'
import { pagesPaginate, getPageById } from 'src/graphql/page/queries'
import { spaceHeader } from 'src/utils/spaceHeader'

provideApolloClient(apolloClient)

const { mutate: creatingPage } = useMutation(pageCreate)
const { mutate: updatingPage } = useMutation(pageUpdate)
const { mutate: deletingPage } = useMutation(pageDelete)

const paginatePages = ({ page, perPage, where, orderBy, space_id }) => {
  return useQuery(
    pagesPaginate,
    { page, perPage, where, orderBy },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID),
  )
}

const queryPageById = ({ id, space_id }) => {
  return useQuery(
    getPageById,
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID),
  )
}

const refetchQueryPageById = async ({ id, space_id }) => {
  const { refetch } = queryPageById({ id, space_id })

  const { data: pageData } = await refetch({ id })

  return pageData
}

const refetchPaginatePages = async ({
  page,
  perPage,
  where,
  orderBy,
  space_id,
}) => {
  const { refetch } = paginatePages({
    page,
    perPage,
    where,
    orderBy,
    space_id,
  })

  const { data: pagesData } = await refetch()

  console.log('refetch paginate pages', pagesData)

  return pagesData.pages.data
}

const create = async ({ input, space_id }) => {
  const { data: pageData } = await creatingPage(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID),
  )

  console.log('create page', pageData)

  return pageData.pageCreate.record
}

const update = async ({ input, id, space_id }) => {
  const { data: pageData } = await updatingPage(
    { input, id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID),
  )

  console.log('update page', pageData)

  return pageData.pageUpdate.record
}

const deleteById = async (id, space_id) => {
  const { data: pageData } = await deletingPage(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID),
  )

  console.log('delete page', pageData)

  return pageData.pageDelete
}

const pageApi = {
  paginatePages,
  refetchPaginatePages,
  create,
  update,
  deleteById,
  refetchQueryPageById,
  queryPageById,
}

export default pageApi
