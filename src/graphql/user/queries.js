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

export const getSubjectById = gql`
  query getSubject($id: String!) {
    get_subject(id: $id) {
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
      applications {
        id
      }
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
`;

export const paginateSubjectInAnotherSpace = gql`
  query getOtherSpaceSubjectPaginate(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
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

export const paginateSubjectsInMainSpace = gql`
  query getSubjects($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
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
        applications {
          id
        }
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

export const paginateSubjectsForInvite = gql`
  query paginateSubjectsForInvite(
    $page: Int!
    $perPage: Int!
    $where: ObjectPaginatorWhere
  ) {
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
      }
    }
  }
`;
