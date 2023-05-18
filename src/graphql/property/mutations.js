import gql from "graphql-tag";

export const propertyCreate = gql`
  mutation ($input: PropertyCreateInput!) {
    propertyCreate(input: $input) {
      recordId
      record {
        id
        type_id
        author_id
        property_group_id
        data_type
        name
        hint
        description
        label
        order
        required
        system
        unique
        multiple {
          status
          max_number
          button_text
        }
        guarded
        default
        meta
        created_at
        updated_at
      }
      status
    }
  }
`;

export const propertyCreateMany = gql`
  mutation ($input: [PropertyCreateInput!]) {
    propertyCreateMany(input: $input) {
      records {
        id
        type_id
        author_id
        property_group_id
        data_type
        name
        hint
        description
        label
        order
        required
        system
        unique
        multiple {
          status
          max_number
          button_text
        }
        guarded
        default
        meta
        created_at
        updated_at
      }
      status
    }
  }
`;

export const propertyUpdate = gql`
  mutation ($id: String!, $input: PropertyUpdateInput!) {
    propertyUpdate(id: $id, input: $input) {
      recordId
      record {
        id
        type_id
        author_id
        property_group_id
        data_type
        name
        hint
        description
        label
        order
        required
        system
        unique
        multiple {
          status
          max_number
          button_text
        }
        guarded
        default
        meta
        created_at
        updated_at
      }
      status
    }
  }
`;

export const propertyDelete = gql`
  mutation propertyDelete($id: String!) {
    propertyDelete(id: $id) {
      recordId
      status
    }
  }
`;
