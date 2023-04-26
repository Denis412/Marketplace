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
export const teamCreate = gql` 
  mutation TeamCreate($input: create_type3_input!) {
    create_type3(input: $input) {
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