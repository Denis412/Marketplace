import gql from 'graphql-tag'

export const getDocuments = gql`
  {
    paginate_document(page: 1, perPage: 100) {
      data {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
        content
        Owner {
          id
          fullname {
            first_name
            last_name
          }
        }
      }
      paginatorInfo {
        perPage
        currentPage
        lastPage
        total
        count
        from
        to
        hasMorePages
      }
    }
  }
`
