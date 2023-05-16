import gql from "graphql-tag";

export const createGroup = gql`
  mutation UserGroupCreate($input: UserGroupCreateInput!) {
    userGroupCreate(input: $input) {
      recordId
      record {
        id
        type_id
        name
        description
        icon
        system
        page_id
        created_at
        updated_at
      }
      status
    }
  }
`;

export const inviteUser = gql`
  mutation userGroupInviteUser($input: UserGroupInviteUserInput!) {
    userGroupInviteUser(input: $input) {
      status
    }
  }
`;

export const deleteGroup = gql`
  mutation UserGroupDelete($input: UserGroupDeleteInput!) {
    userGroupDelete(input: $input) {
      recordId
      status
    }
  }
`;
