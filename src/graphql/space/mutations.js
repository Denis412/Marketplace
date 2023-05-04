import gql from "graphql-tag";

export const createSpace = gql`
  mutation SpaceCreate($input: SpaceCreateInput!) {
    spaceCreate(input: $input) {
      recordId
      record {
        author_id
        name
        description
        config
        created_at
        updated_at
      }
      status
    }
  }
`;

export const updateSpace = gql`
  mutation SpaceUpdate($id: String!, $input: SpaceUpdateInput!) {
    spaceUpdate(id: $id, input: $input) {
      recordId
      record {
        author_id
        name
        description
        config
        created_at
        updated_at
      }
      status
    }
  }
`;
