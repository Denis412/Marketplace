import gql from "graphql-tag";

export const permissionRuleCreate = gql`
  mutation permissionRuleCreate($input: PermissionRuleCreateInput!) {
    permissionRuleCreate(input: $input) {
      recordId
      status
      record {
        id
        author_id
        level
        model_type
        model_id
        config
        owner_id
        owner_type
        created_at
        updated_at
      }
    }
  }
`;

export const permissionRuleUpdate = gql`
  mutation permissionRuleUpdate(
    $id: String!
    $input: PermissionRuleUpdateInput!
  ) {
    permissionRuleUpdate(input: $input, id: $id) {
      recordId
      status
      record {
        id
        author_id
        level
        model_type
        model_id
        config
        owner_id
        owner_type
        created_at
        updated_at
      }
    }
  }
`;

export const permissionRuleDelete = gql`
  mutation permissionRuleDelete($id: String!) {
    permissionRuleDelete(id: $id) {
      recordId
      status
    }
  }
`;
