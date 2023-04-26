import gql from "graphql-tag";

export const spaceCreate = gql` 
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