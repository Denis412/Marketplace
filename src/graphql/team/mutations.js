import gql from "graphql-tag";

export const teamCreate = gql`
  mutation TeamCreate($input: create_team_input!) {
    create_team(input: $input) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
        description
        space
      }
    }
  }
`;

export const teamUpdate = gql`
  mutation ($id: String!, $input: update_team_input!) {
    update_team(id: $id, input: $input) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
        description
        avatar
      }
    }
  }
`;
