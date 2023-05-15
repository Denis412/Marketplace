import gql from 'graphql-tag'

export const getTasks = gql`
  query paginate_task {
    paginate_task(page: 1, perPage: 100) {
      data {
        name
        dateStart {
          date
          time
        }
        dateEnd {
          date
          time
        }
        taskStatus
        id
        level
        type_id
      }
    }
  }
`
