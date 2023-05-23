import gql from "graphql-tag";

export const getPropertyById = gql`
  query getPropertyById($id: String!) {
    property(id: $id) {
      id
      name
      meta
      created_at
      updated_at
    }
  }
`;

export const propertiesPaginate = gql`
  query properties($page: Int!, $perPage: Int!, $where: PaginatorWhere) {
    properties(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        created_at
        updated_at
      }
    }
  }
`;
