import gql from 'graphql-tag'

export const getFiles = gql`
  query(
    $where: ObjectPaginatorWhere
    $orderBy: ObjectPaginatorOrderBy
    $page: Int!
    $perPage: Int!
  ) {
    paginate_file(
      page: $page
      perPage: $perPage
      where: $where
      orderBy: $orderBy
    ) {
      data {
        type_id
        id
        author_id
        position
        created_at
        updated_at
        id
        disk
        hash
        path
        size
        name
        short_link
        extension
      }
      paginatorInfo {
        perPage
        count
        total
        currentPage
        from
        to
        lastPage
        hasMorePages
        __typename
      }
      __typename
    }
  }
`
