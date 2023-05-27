import gql from "graphql-tag";

export const permissionTreeGroups = gql`
  query permissionTreeGroups(
    $perPage: Int
    $page: Int
    $modelId: String!
    $parentId: String
  ) {
    permissionTreeGroups(
      perPage: $perPage
      page: $page
      modelId: $modelId
      parentId: $parentId
    ) {
      data {
        group_id
        name
        icon
        has_child_groups
        has_users
        level
        permission_rule_id
      }
      paginatorInfo {
        perPage
        total
        count
        currentPage
        from
        to
        lastPage
        hasMorePages
      }
    }
  }
`;

export const permissionTreeSubjects = gql`
  query permissionTreeSubjects(
    $perPage: Int
    $page: Int
    $modelId: String!
    $groupId: String!
  ) {
    permissionTreeSubjects(
      perPage: $perPage
      page: $page
      modelId: $modelId
      groupId: $groupId
    ) {
      data {
        subject_id
        level
        permission_rule_id
      }
      paginatorInfo {
        perPage
        total
        count
        currentPage
        from
        to
        lastPage
        hasMorePages
      }
    }
  }
`;
