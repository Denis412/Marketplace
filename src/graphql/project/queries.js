import gql from "graphql-tag";

export const projectsPaginate = gql`
  query projectsPaginate(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_project(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        description
        target
        avatar
        team_name
        created_at
        members {
          id
          fullname {
            first_name
            last_name
          }
          major
          group {
            id
            name
          }
        }
        delivery_date {
          date
        }
      }
    }
  }
`;

export const projectsPaginateInMainSpace = gql`
  query projectsPaginateInMainSpace(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_project(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        description
        avatar
        team {
          id
          name
        }
        delivery_date {
          date
        }
        created_at
      }
    }
  }
`;

export const getProjectById = gql`
  query getProjectById($id: String!) {
    get_project(id: $id) {
      id
      name
    }
  }
`;
