import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { getFileById } from "src/graphql/files/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const getFileHtmlByUrl = async (path, id, name, extension) => {
  //mode: no-cores
  const response = await fetch(
    // `${process.env.FILE_STORAGE_URI}${path}/${id}.${extension}?n=${name}`,
    `https://cdn.stud.druid.1t.ru/${path}/${id}.${extension}?n=${name}`,
    {
      mode: "cors",
    }
  );
  const html = await response.text();

  let res = await Promise.resolve(html);

  return res;
};

const setTimeoutFunc = ({ minutes, func }) => {
  setTimeout(func, minutes * 60);
};

const updateRouteId = (id_route, routeParamsId) => {
  id_route = routeParamsId;
};

const queryFileById = ({ id, space_id }) => {
  return useQuery(
    getFileById,
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchQueryFileById = async ({ id, space_id }) => {
  const { refetch } = queryFileById({ id, space_id });

  const { data: fileData } = await refetch({ id });

  return fileData;
};

const filesApi = {
  getFileHtmlByUrl,
  // upload,
  setTimeoutFunc,
  updateRouteId,
  refetchQueryFileById,
  queryFileById,
};

export { filesApi };
