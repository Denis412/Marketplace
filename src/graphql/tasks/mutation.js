import gql from 'graphql-tag'

export const createTask = gql`
  mutation($input: create_task_input!) {
    create_task(input: $input) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
      }
    }
  }
`
export const updateTask = gql`
  mutation($input: update_task_input!, $id: String!) {
    update_task(input: $input, id: $id) {
      status
      recordId
      record {
        id
        type_id
        author_id
        level
        position
        created_at
        updated_at
        name
      }
    }
  }
`
//variables
// {
// 	"id": "852770656626359628",
// 	"input": {
// 	  "name": "Task4(up)",
// 	  "dateStart": {
// 		 "date": "10.10.2023",
// 		 "time": "11:25:00"
// 	  },
// 	  "dateEnd": {
// 		 "date": "10.10.2023",
// 		 "time": "11:25:00"
// 	  },
// 	  "taskStatus": "2406017079472962662"
// 	}
//  }

export const deleteTask = gql`
  mutation($id: String!) {
    delete_task(id: $id) {
      status
      recordId
    }
  }
`
