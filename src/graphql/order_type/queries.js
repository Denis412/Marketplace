import gql from "graphql-tag";

export const getOrderTypes = gql`
  query getOrderTypes {
    paginate_order_type(page: 1, perPage: 100) {
      data {
        id
        type_id
        author_id
        level
        position
        name
        all_functions {
          name
          id
        }
        created_at
        updated_at
        name
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
