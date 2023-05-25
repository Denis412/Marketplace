import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { pageCreate, pageDelete, pageUpdate } from "src/graphql/page/mutations";
import {
  pagesPaginate,
  getPageById,
  pagesPaginateNew,
} from "src/graphql/page/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingPage } = useMutation(pageCreate);
const { mutate: updatingPage } = useMutation(pageUpdate);
const { mutate: deletingPage } = useMutation(pageDelete);

const paginatePages = ({ page, perPage, where, orderBy, space_id }) => {
  return useQuery(
    pagesPaginate,
    { page, perPage, where, orderBy },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const paginatePagesNew = ({ where, space_id }) => {
  return useQuery(
    pagesPaginateNew,
    { where },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const queryPageById = ({ id, space_id }) => {
  return useQuery(
    getPageById,
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchQueryPageById = async ({ id, space_id }) => {
  const { refetch } = queryPageById({ id, space_id });

  const { data: pageData } = await refetch({ id });

  return pageData;
};

const refetchPaginatePages = async ({
  page,
  perPage,
  where,
  orderBy,
  space_id,
}) => {
  const { refetch } = paginatePages({
    page,
    perPage,
    where,
    orderBy,
    space_id,
  });

  const { data: pagesData } = await refetch();

  console.log("refetch paginate pages", pagesData);

  return pagesData.pages.data;
};

const refetchPaginatePagesNew = async ({ where, space_id }) => {
  const { refetch } = paginatePagesNew({ where, space_id });

  const { data: pagesData } = await refetch();

  console.log("refetch paginate pages", pagesData);

  return pagesData.rootPages.data;
};

const create = async ({ input, space_id }) => {
  const { data: pageData } = await creatingPage(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  console.log("create page", pageData);

  return pageData.pageCreate.record;
};

const update = async ({ input, id, space_id }) => {
  const { data: pageData } = await updatingPage(
    { input, id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  console.log("update page", pageData);

  return pageData.pageUpdate.record;
};

const deleteById = async (id, space_id) => {
  const { data: pageData } = await deletingPage(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  console.log("delete page", pageData);

  return pageData.pageDelete;
};

const getRootPage = async (rootPageId, space_id) => {
  let data_tree = [];
  let rootPages = await refetchPaginatePagesNew({
    where: {
      column: "id",
      operator: "EQ",
      value: rootPageId,
    },
    space_id: space_id,
  });

  for (const rootPage of rootPages) {
    const rootData = {
      title_page: rootPage.title,
      object_id: rootPage.object.id,
      page_id: rootPage.id,
      page_parent_id: rootPage.parent_id,
      children: [],
    };

    // data_tree.push(rootData);

    if (rootPage.children.data.length > 0) {
      await getChildrenPages(rootPage.children.data, rootData, data_tree);
    }
  }

  console.log("data_tree", data_tree);
  return data_tree;
};

const getChildrenPages = async (
  children,
  parent,
  data_tree,
  isTopLevel = true
) => {
  for (const child of children) {
    const childData = {
      title_page: child.title,
      object_id: child.object.id,
      page_id: child.id,
      page_parent_id: child.parent_id,
      children: [],
    };

    // Проверяем, определено ли свойство children у родительского элемента
    if (parent.children == undefined) {
      // Если свойство children не определено, добавляем данные текущего дочернего элемента в массив родительского элемента
      parent.push(childData);
    } else {
      // Если свойство children определено, добавляем данные текущего дочернего элемента в массив children родительского элемента
      parent.children.push(childData);
      if (isTopLevel) {
        data_tree.push(childData);
      }
    }

    // Проверяем, имеет ли текущий дочерний элемент свойство children и имеет ли оно дочерние элементы
    if (child.children && child.children.data.length > 0) {
      // Если текущий дочерний элемент имеет дочерние элементы, вызываем функцию getChildrenPages для обработки его дочерних элементов
      await getChildrenPages(child.children.data, childData, data_tree, false);
    }
  }
};

const pageApi = {
  paginatePages,
  paginatePagesNew,
  refetchPaginatePages,
  refetchPaginatePagesNew,
  create,
  update,
  deleteById,
  refetchQueryPageById,
  queryPageById,
  getRootPage,
  getChildrenPages,
};

export default pageApi;
