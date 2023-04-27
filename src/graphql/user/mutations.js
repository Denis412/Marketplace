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
