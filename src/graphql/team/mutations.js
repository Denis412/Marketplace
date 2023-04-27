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

  export default {
    mutation: gql`
      mutation filesUpload($files: [Upload]!) {
        filesUpload(files: $files) {
          status
          ids
        }
      }
    `,
    variables: {
      files: null,
    },
  }