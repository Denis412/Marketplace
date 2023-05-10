import gql from "graphql-tag";

export const paginateTypes = gql`
  query paginateTypes(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    types(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        label
        description
        system
        searchable
        id_ai
        author_id
        meta {
          headline
          icon
        }
        created_at
        updated_at
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
`;
