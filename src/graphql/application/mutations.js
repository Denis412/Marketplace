import gql from "graphql-tag";

export const createApplication = gql`
  mutation createApplication($input: create_application_input!) {
    create_application(input: $input) {
      status
      recordId
      record {
        id
        name
        subject {
          id
        }
        team {
          id
        }
        sender
        status
      }
    }
  }
`;

export const updateApplication = gql`
  mutation updateApplication($id: String!, $input: update_application_input!) {
    update_application(id: $id, input: $input) {
      status
      recordId
      record {
        id
        name
        subject {
          id
        }
        team {
          id
        }
        sender
        status
      }
    }
  }
`;

export const deleteApplication = gql`
  mutation deleteApplication($id: String!) {
    delete_application(id: $id) {
      status
      recordId
    }
  }
`;
