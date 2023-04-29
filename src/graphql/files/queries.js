import gql from 'graphql-tag'

export const getFiles = gql`
  query {
    paginate_file(page: 1, perPage: 50) {
      data {
        type_id
        title
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
