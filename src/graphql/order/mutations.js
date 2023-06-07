import gql from "graphql-tag";

export const createOrder = gql`
  mutation ($input: create_order_input!) {
    create_order(input: $input) {
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
        customer
        type {
          id
          name
        }
        functions {
          id
          name
        }
        description
        status
        consultation
        price_start
        price_end
        date_complete {
          date
          time
        }
      }
    }
  }
`;

export const updateOrder = gql`
  mutation ($id: String!, $input: update_order_input!) {
    update_order(input: $input, id: $id) {
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
        customer
        todos
        functions
        description
        consultation
        price_start
        price_end
        date_complete
      }
    }
  }
`;
