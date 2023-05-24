import gql from "graphql-tag";

export const userSignUp = gql`
  mutation UserSignUp($input: UserSignUpInput!) {
    userSignUp(input: $input) {
      recordId
      record {
        id
        email
        registration_passed
        name
        surname
      }
      status
    }
  }
`;

export const userSignUpSetPassword = gql`
  mutation UserSignUpSetPassword($input: UserSignUpSetPasswordInput!) {
    userSignUpSetPassword(input: $input) {
      status
    }
  }
`;

export const userResetPasswordSendCode = gql`
  mutation UserResetPasswordSendCode($input: UserResetPasswordSendCodeInput!) {
    userResetPasswordSendCode(input: $input) {
      record {
        user_id
      }
      status
    }
  }
`;

export const userResetPasswordConfirmCodeSetPassword = gql`
  mutation UserResetPasswordConfirmCodeSetPassword(
    $input: UserResetPasswordConfirmCodeSetPasswordInput!
  ) {
    userResetPasswordConfirmCodeSetPassword(input: $input) {
      record {
        email
      }
      status
    }
  }
`;

export const userSignIn = gql`
  mutation UserSignIn($input: UserSignInInput!) {
    userSignIn(input: $input) {
      recordId
      record {
        token_type
        expires_in
        access_token
        refresh_token
      }
      status
    }
  }
`;

export const userGroupInviteUser = gql`
  mutation userGroupInviteUser($input: UserGroupInviteUserInput!) {
    userGroupInviteUser(input: $input) {
      status
    }
  }
`;

export const updateSubject = gql`
  mutation subjectUpdate($id: String!, $input: update_subject_input!) {
    update_subject(id: $id, input: $input) {
      recordId
      record {
        fullname {
          first_name
          middle_name
          last_name
        }
        gender
        city
        birthday {
          date
        }
        email {
          email
        }
      }
    }
  }
`;

export const updateSubjectInTeam = gql`
  mutation updateSubjectInTeam($id: String!, $input: update_subject_input!) {
    update_subject(id: $id, input: $input) {
      recordId
      record {
        fullname {
          first_name
          middle_name
          last_name
        }
        speciality1
        email {
          email
        }
      }
    }
  }
`;
