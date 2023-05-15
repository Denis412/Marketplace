import gql from "graphql-tag";

export const projectCreate = gql`
  mutation createProject($input: create_project_input!) {
    create_project(input: $input) {
      record {
        id
        name
        type_id
        author_id
      }
    }
  }
`;

export const projectUpdate = gql`
  mutation updateRopject($id: String!, $input: update_project_input!) {
    update_project(id: $id, input: $input) {
      record {
        id
        name
        type_id
      }
    }
  }
`;

export const projectDelete = gql`
  mutation deleteProject($id: String!) {
    delete_project(id: $id) {
      recordId
      status
    }
  }
`;
