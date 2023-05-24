import gql from "graphql-tag";

export const getOrderById = gql`
  query getOrder($id: String!) {
    get_order(id: $id) {
      id
      type_id
      author_id
      level
      position
      created_at
      updated_at
      name
      customer
      description
      consultation
      files
      type {
      id
      name
      }
      functions {
      id
      name
      }
      price_end
      price_start
      date_complete
      draft
      status
      team
      date_approve
      deal
      rejection
    }
  }
`;
export const getOrders = gql`
  query {
  paginate_order( page: 1, perPage: 100) {
  data {
    id
    type_id
    author_id
    level
    position
    created_at
    updated_at
    name
    customer
    description
    consultation
    type {
    id
    name
    }
    functions {
    id
    name
    }
    price_end
    price_start
    date_complete
    draft
    status
    team
    date_approve
    deal
    rejection
  }
  paginatorInfo {
    perPage
    currentPage
    lastPage
    total
    count
    from
    to
    hasMorePages
  }
}
}
`;

export const getStatus =  gql`
query getStatus($id: String!) {
  property (id: $id) {
    meta
  }
}`
