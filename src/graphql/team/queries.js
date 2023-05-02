import gql from "graphql-tag";

export const getTeams = gql`
  query getTeams {
    paginate_Teams(page: 1, perPage: 100) {
      data {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
        description
      }
      paginatorInfo {
        perPage
        currentPage
        lastPage
        total
        count
        from
        to
        hasMorePages
      }
    }
  }
`;

export const filterTeamsName = gql`
  query filterTeamsName($where: ObjectPaginatorWhere) {
    paginate_Teams(page: 1, perPage: 100, where: $where) {
      data {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
        description
      }
      paginatorInfo {
        perPage
        currentPage
        lastPage
        total
        count
        from
        to
        hasMorePages
      }
    }
  }
`;
