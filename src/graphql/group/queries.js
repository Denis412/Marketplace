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

export const paginateGroupsIdsWithWhere = gql`
  query paginateGroupsIdsWithWhere(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_group(page: $page, perPage: $perPage, where: $where) {
      data {
        id
      }
    }
  }
`;

export const paginateGroupsSubjects = gql`
  query paginateGroupsIdsWithWhere(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_group(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        subject {
          id
          fullname {
            first_name
            last_name
          }
          avatar
          major
        }
      }
    }
  }
`;
