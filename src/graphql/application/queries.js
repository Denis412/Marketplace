import gql from "graphql-tag";

export const paginateApplications = gql`
  query paginateApplications(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_application(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        sender
        status
        subject {
          fullname {
            first_name
          }
        }
        team {
          id
          name
        }
      }
    }
  }
`;
