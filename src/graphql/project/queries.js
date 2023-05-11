import gql from "graphql-tag";

export const paginateProjects = gql`
  query paginateProjects(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_project(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
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