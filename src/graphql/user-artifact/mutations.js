import gql from "graphql-tag";

export const userArtifactCreate = gql`
  mutation artifactCreate($input: create_user_artifact_input!) {
    create_user_artifact(input: $input) {
      record {
        id
        name
        description
        image
      }
    }
  }
`;

export const userArtifactUpdate = gql`
  mutation artifactUpdate($id: String!, $input: update_user_artifact_input!) {
    update_user_artifact(id: $id, input: $input) {
      record {
        id
        name
        description
        image
      }
    }
  }
`;

export const userArtifactDelete = gql`
  mutation artifactDelete($id: String!) {
    delete_user_artifact(id: $id) {
      recordId
      status
    }
  }
`;
