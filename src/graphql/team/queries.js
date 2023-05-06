import gql from "graphql-tag";

export const getTeams = gql`
  query getTeams {
    paginate_team(page: 1, perPage: 100) {
      data {
        id
        type_id
        author_id
        telegram_chat_id
        applications {
          id
        }
        space
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

export const getTeamsWithWhere = gql`
  query getTeamsWithWhere($where: ObjectPaginatorWhere) {
    paginate_team(page: 1, perPage: 100, where: $where) {
      data {
        id
        type_id
        author_id
        telegram_chat_id
        applications {
          id
        }
        space
        level
        position
        created_at
        updated_at
        ready_for_orders
        name
        description
        status
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
