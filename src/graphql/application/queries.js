import gql from "graphql-tag";

export const paginateApplicationsInMainSpace = gql`
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
          speciality1 {
            id
            name
          }
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

export const paginateApplicationsInTeamSpace = gql`
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
          speciality1
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
