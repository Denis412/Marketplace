import gql from 'graphql-tag'

export const createDocument = gql`
  mutation($input: create_document_input!) {
    create_document(input: $input) {
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
      }
    }
  }
`

export const deleteDocument = gql`
  mutation($id: String!) {
    delete_document(id: $id) {
      status
      recordId
    }
  }
`

export const updateDocument = gql`
  mutation($id: String!, $input: update_document_input!) {
    update_document(id: $id, input: $input) {
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
      }
    }
  }
`
