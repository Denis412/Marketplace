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

export const updateGroup = gql`
  mutation updateGroup($id: String!, $input: update_group_input!) {
    update_group(id: $id, input: $input) {
      record {
        id
      }
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
