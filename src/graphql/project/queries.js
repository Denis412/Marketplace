import gql from "graphql-tag";

export const projectsPaginate = gql`
  query projectsPaginate($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_project(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        author_id
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
          speciality1 {
            id
            name
          }
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

export const projectsPaginateInTeamSpace = gql`
  query projectsPaginate($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_project(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        author_id
        description
        target
        avatar
        team_name
        created_at
        space
        members {
          id
          fullname {
            first_name
            last_name
          }
          email {
            email
          }
          speciality1
          group {
            id
            name
          }
        }
        customers {
          id
          fullname {
            first_name
            last_name
          }
          email {
            email
          }
          speciality1
          group {
            id
            name
          }
        }
        applications {
          id
          name
          type_id
          subject {
            id
            fullname {
              first_name
              last_name
            }
            email {
              email
            }
          }
          is_customer
          project {
            id
            name
            space
          }
          status
        }
        delivery_date {
          date
        }
      }
    }
  }
`;

export const projectsPaginateInMainSpace = gql`
  query projectsPaginateInMainSpace($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
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
