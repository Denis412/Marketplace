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
        sender
        id
        status
        subject {
          id
        }
        team {
          id
          author_id
          name
          description
          avatar
        }
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
  query getOtherSpaceSubjectPaginate($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_subject(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        type_id
        user_id
        avatar
        fullname {
          first_name
          middle_name
          last_name
        }
        email {
          email
        }
        major
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
        avatar
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
        projects {
          id
          name
          avatar
          description
          team {
            id
            name
            space
          }
          delivery_date {
            date
          }
        }
        applications {
          id
        }
        birthday {
          date
        }
        nickname
        telegram_chat_id
        about
        resume_link
        status {
          name
        }
        speciality1 {
          name
        }
        major
        teams {
          id
          avatar
          space
          description
          name
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
  query paginateSubjectsForInvite($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_subject(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        user_id
        avatar
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

export const paginateSubjectsForMyTeams = gql`
  query getMyTeams($page: Int!, $perPage: Int!, $where: ObjectPaginatorWhere) {
    paginate_subject(page: $page, perPage: $perPage, where: $where) {
      data {
        id
        fullname {
          first_name
        }
        teams {
          id
          name
          space
          description
          avatar
        }
        created_at
        updated_at
      }
    }
  }
`;
