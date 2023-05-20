import gql from "graphql-tag";

export const userStatusesPaginate = gql`
  query paginate($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_user_status(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
      }
    }
  }
`;
