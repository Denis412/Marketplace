import gql from "graphql-tag";

export const getApplications = gql`query getApplication {
    paginate_application(page: 1, perPage: 100) {
          data {
            id
            name
            subject{
              id
              fullname{
                first_name
                last_name
              }
            }
            team{
              id
              name
              description
              avatar
            }
            sender
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
    }`
    
    export const getApplicationsByTeam = gql`query getApplication($where: ObjectPaginatorWhere) {
      paginate_team(page: 1, perPage: 100, where: $where) {
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
          avatar  
          status
          applications{
            id
            name
            status
          }
  
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
  `
      