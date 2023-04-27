import gql from "graphql-tag";

export const filesUpload = gql`
  mutation filesUpload($files: [Upload]!) {
    filesUpload(files: $files) {
      status
      ids
    }
  }
`;
