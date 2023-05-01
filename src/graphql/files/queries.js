import gql from "graphql-tag";

export const getFile = gql`
  query objects_file(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_file(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        author_id
        position
        created_at
        updated_at
        id
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
`;
