import gql from "graphql-tag";

export const pagesPaginateNew = gql`
  query paginate($where: PaginatorWhere) {
    rootPages(page: 1, perPage: 10, where: $where) {
      data {
        id
        title
        page_type
        parent_id
        created_at
        object {
          id
          type_id
        }
        children {
          data {
            id
            title
            page_type
            parent_id
            created_at
            object {
              id
              type_id
            }
            children {
              data {
                id
                title
                page_type
                parent_id
                created_at
                object {
                  id
                  type_id
                }
                children {
                  data {
                    id
                    page_type
                    parent_id
                    created_at
                    title
                    object {
                      id
                      type_id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

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
      object {
        id
        type_id
      }
      children {
        data {
          id
          title
        }
      }
    }
  }
`;
