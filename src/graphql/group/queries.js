import gql from "graphql-tag";

export const getGroupsWithWhere = gql`
  query getGroups($where: ObjectPaginatorWhere) {
    paginate_group(page: 1, perPage: 100, where: $where) {
      data {
        id
        name
        description
      }
    }
  }
`;
