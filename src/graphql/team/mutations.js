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
        telegram_chat_id
        applications {
          id
        }
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
        telegram_chat_id
        applications {
          id
        }
        members {
          id
          fullname {
            first_name
            last_name
          }
        }
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

export const teamDelete = gql`
  mutation ($id: String!) {
    delete_team(id: $id) {
      recordId
    }
  }
`;
