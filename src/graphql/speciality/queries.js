import gql from "graphql-tag";

export const paginateSpecialities = gql`
  query paginateSpecialities(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_speciality(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
      }
    }
  }
`;
