import gql from 'graphql-tag'

export const filesUpload = gql`
  mutation filesUpload($files: [Upload]!) {
    filesUpload(files: $files) {
      status
      ids
    }
  }
`

export const fileDelete = gql`
  mutation($id: String!) {
    delete_file(id: $id) {
      status
      recordId
    }
  }
`

export const fileUpdate = gql`
  mutation($id: String!, $input: update_file_input!) {
    update_file(id: $id, input: $input) {
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
