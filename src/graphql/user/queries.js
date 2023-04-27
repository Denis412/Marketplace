import gql from "graphql-tag";

export const getUser = gql`
  query getUser($id: String!) {
    user(id: $id) {
      email
      name
      surname
      avatar
      telegram_chat_id
    }
  }
`;

export const getSubject = (user_id) => {
  console.log(user_id);
  return gql`
    query getSubject {
      paginate_subject(page: 1 perPage: 1 where: { column: "user_id", operator: EQ, value: ${user_id} }) {
        data {
          id
          fullname {
            first_name
            middle_name
            last_name
          }
          email {
            email
          }
          group {
            id
            name
            description
            icon
            system
            created_at
            updated_at
          }
        }
      }
    }
  `;
};

// export const getSubject = gql`
//   query getSubject($user_id: String!) {
//     get_subject(id: $user_id) {
//       id
//       fullname {
//         first_name
//         middle_name
//         last_name
//       }
//       email {
//         email
//       }
//       group {
//         id
//         name
//         description
//         icon
//         system
//         created_at
//         updated_at
//       }
//     }
//   }
// `;
