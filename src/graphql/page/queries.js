import gql from "graphql-tag";

export const pagesPaginate = gql`
  query pagesPaginate(
    $page: Int!
    $perPage: Int!
    $where: PaginatorWhere
    $orderBy: PaginatorOrderBy
  ) {
    pages(page: $page, perPage: $perPage, where: $where, orderBy: $orderBy) {
      data {
        id
        parent_id
        page_type
        title
        content
        children {
          data {
            id
            parent_id
            page_type
            title
            content
            icon
            level
            is_public
            position
            config
            created_at
            updated_at
            object {
              id
              type_id
            }
          }
        }
        icon
        level
        is_public
        is_block
        position
        config
        created_at
        updated_at
      }
      paginatorInfo {
        perPage
        count
        total
        currentPage
        from
        to
        lastPage
        hasMorePages
      }
    }
  }
`;

export const getPageById = gql`
  query getPageById($id: String!) {
    page(id: $id) {
      id
      parent_id
      page_type
      title
      content
      icon
      level
      is_public
      position
      config
      is_block
      created_at
      updated_at
    }
  }
`;
