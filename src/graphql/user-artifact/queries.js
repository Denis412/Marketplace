import gql from "graphql-tag";

export const userArtifactsPaginate = gql`
  query artifactsPaginate($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_user_artifact(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        name
        description
        image
      }
    }
  }
`;
