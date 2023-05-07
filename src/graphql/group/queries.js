import gql from "graphql-tag";

export const getGroupsWithWhere = gql`
  query getGroups($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_group(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        description
      }
    }
  }
`;
