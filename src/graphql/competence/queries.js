import gql from "graphql-tag";

export const competenciesPaginate = gql`
  query competenciesPaginate($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_competence(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
      }
    }
  }
`;
