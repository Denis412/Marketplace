import gql from "graphql-tag";

export const getSpaceById = gql`
  query getSpaceById($id: String!) {
    space(id: $id) {
      id
      author_id
      name
      description
      config
      created_at
      updated_at
    }
  }
`;

export const paginateSpaces = gql`
  query paginateSpaces($where: PaginatorWhere) {
    spaces(page: 1, perPage: 100000, where: $where) {
      data {
        id
        author_id
        name
        description
        config
        created_at
        updated_at
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
      }
    }
  }
`;
