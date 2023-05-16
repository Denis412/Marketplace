import gql from "graphql-tag";

export const getTeamsWithWhere = gql`
  query getTeamsWithWhere(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
    paginate_team(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        type_id
        author_id
        telegram_chat_id
        directions
        applications {
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
            avatar
            major
          }
          team {
            id
            space
            name
          }
          status
          sender
        }
        members {
          id
          fullname {
            first_name
            last_name
          }
          avatar
          major
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
