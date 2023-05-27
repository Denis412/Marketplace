import gql from "graphql-tag";

export const typeCreate = gql`
  mutation ($input: TypeCreateInput!) {
    typeCreate(input: $input) {
      recordId
      record {
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
      status
    }
  }
`;

export const typeUpdate = gql`
  mutation typeUpdate($id: String!, $input: TypeUpdateInput!) {
    typeUpdate(id: $id, input: $input) {
      recordId
      record {
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
      status
    }
  }
`;

export const typeDelete = gql`
  mutation typeDelete($id: String!) {
    typeDelete(id: $id) {
      recordId
      status
    }
  }
`;
