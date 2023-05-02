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

export const getSubject = gql`
  query getSubject($perPage: Int!, $page: Int!, $where: ObjectPaginatorWhere) {
    paginate_subject(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        user_id
        fullname {
          first_name
          middle_name
          last_name
        }
        email {
          email
        }
        gender
        city
        birthday {
          date
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
