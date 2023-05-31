import gql from "graphql-tag";

export const createCompetence = gql`
  mutation createCompetence($input: create_competence_input!) {
    create_competence(input: $input) {
      status
      recordId
      record {
        id
        name
      }
    }
  }
`;

export const updateCompetence = gql`
  mutation updateCompetence($id: String!, $input: update_competence_input!) {
    update_competence(id: $id, input: $input) {
      recordId
      record {
        id
      }
    }
  }
`;

export const deleteCompetence = gql`
  mutation deleteCompetence($id: String!) {
    delete_competence(id: $id) {
      status
      recordId
    }
  }
`;
