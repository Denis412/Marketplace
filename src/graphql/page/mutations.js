import gql from 'graphql-tag'

export const pageCreate = gql`
  mutation($input: PageCreateInput!) {
    pageCreate(input: $input) {
      status
      record {
        id
        parent_id
        page_type
        title
        content
        icon
        level
        is_public
        position
        config
        created_at
        updated_at
      }
    }
  }
`

export const pageUpdate = gql`
  mutation($id: String!, $input: PageUpdateInput!) {
    pageUpdate(id: $id, input: $input) {
      record {
        id
        parent_id
        page_type
        title
        content
        icon
        level
        is_public
        is_block
        position
        config
        created_at
        updated_at
      }
      status
    }
  }
`

export const pageDelete = gql`
  mutation($id: String!) {
    pageDelete(id: $id) {
      status
      recordId
    }
  }
`
