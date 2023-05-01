import gql from "graphql-tag"

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