import gql from "graphql-tag";

export const paginateApplications = gql`
  query paginateApplications($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_application(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        subject {
          id
          fullname {
            first_name
            last_name
          }
          email {
            email
          }
          major
        }
        status
        sender
        team {
          id
          name
          description
          avatar
        }
      }
    }
  }
`;
