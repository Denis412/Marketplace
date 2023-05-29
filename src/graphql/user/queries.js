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
        created_at
        updated_at
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
        fullname {
          first_name
          middle_name
          last_name
        }
        applications {
          id
          name
          subject {
            fullname {
              first_name
              last_name
            }
          }
          project {
            id
            name
            description
            avatar
          }
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
        competencies {
          id
          name
        }
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
          id
          name
        }
        teams {
          id
          author_id
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
        avatar
        user_id
        fullname {
          first_name
          middle_name
          last_name
        }
        speciality1 {
          name
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
        email {
          email
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
