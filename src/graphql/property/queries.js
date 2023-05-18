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
