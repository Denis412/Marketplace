import gql from "graphql-tag";

export const teamCreate = gql` 
mutation TeamCreate($input: create_Teams_input!) {
  create_Teams(input: $input) {
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
    }
  }
}`;

export const teamUpdate = gql`
mutation ($id: String!, $input: update_Teams_input!) {
  update_Teams(id: $id, input: $input) {
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
      team_img
    
      }
    }
  }`