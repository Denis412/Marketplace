import gql from "graphql-tag";

export const paginateSpecialities = gql`
  query paginateSpecialities($where: ObjectPaginatorWhere) {
    paginate_speciality(page: 1, perPage: 100, where: $where) {
      data {
        id
        name
      }
    }
  }
`;
