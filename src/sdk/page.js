import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { pageCreate, pageDelete, pageUpdate } from "src/graphql/page/mutations";
import { pagesPaginate, rootPagesPaginate } from "src/graphql/page/queries";
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

const refetchPaginatePages = async ({ page, perPage, where, orderBy, space_id }) => {
  const { refetch } = paginatePages({
    page,
    perPage,
    where,
    orderBy,
    space_id,
  });

  const { data: pagesData } = await refetch();

  // console.log("refetch paginate pages", pagesData);

  return pagesData.pages.data;
};

const paginateRootPages = ({ page, perPage, where, orderBy, space_id }) => {
  return useQuery(
    rootPagesPaginate,
    { page, perPage, where, orderBy },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateRootPages = async ({ page, perPage, where, orderBy, space_id }) => {
  const { refetch } = paginateRootPages({
    page,
    perPage,
    where,
    orderBy,
    space_id,
  });

  const { data: pagesData } = await refetch();

  // console.log("refetch paginate root pages", pagesData);

  return pagesData.rootPages.data;
};

const create = async ({ input, space_id }) => {
  const { data: pageData } = await creatingPage(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("create page", pageData);

  return pageData.pageCreate.record;
};

const update = async ({ input, space_id }) => {
  const { data: pageData } = await updatingPage(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("update page", pageData);

  return pageData.pageUpdate.record;
};

const deleteById = async (id, space_id) => {
  const { data: pageData } = await deletingPage(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("delete page", pageData);

  return pageData.pageDelete;
};

const pageApi = {
  paginatePages,
  paginateRootPages,
  refetchPaginatePages,
  refetchPaginateRootPages,
  create,
  update,
  deleteById,
};

export default pageApi;
