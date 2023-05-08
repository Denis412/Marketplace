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
