import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { createSpace, deleteSpace } from "src/graphql/space/mutations";
import { getSpaceById, paginateSpaces } from "src/graphql/space/queries";

provideApolloClient(apolloClient);

const { mutate: creatingSpace } = useMutation(createSpace);
const { mutate: deletingSpace } = useMutation(deleteSpace);

const querySpaces = () => {
  return useQuery(paginateSpaces);
};

const querySpace = (space_id) => {
  return useQuery(getSpaceById, {
    id: space_id,
  });
};

const getById = async (space_id) => {
  const { refetch } = querySpace(space_id);

  const { data: spaceData } = await refetch();

  return spaceData.space;
};

const paginate = async (where) => {
  const { refetch } = querySpaces();

  const { data: spacesData } = await refetch({
    where,
  });

  return spacesData.spaces;
};

const create = async (data) => {
  const { data: spaceData } = await creatingSpace({
    input: data,
  });

  console.log("create space", spaceData);

  return spaceData.spaceCreate.record;
};

const deleteById = async (space_id) => {
  const { data: spaceData } = await deletingSpace({
    id: space_id,
  });

  console.log("delete space", spaceData);

  return spaceData.spaceForceDelete;
};

const spaceApi = { getById, paginate, create, deleteById };

export default spaceApi;
