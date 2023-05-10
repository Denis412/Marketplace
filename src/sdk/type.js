import {
  useMutation,
  provideApolloClient,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import {
  typeCreate,
  typeDelete,
  typeUpdate,
} from "src/graphql/types/mutations";
import { paginateTypes } from "src/graphql/types/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingType } = useMutation(typeCreate);
const { mutate: updatingType } = useMutation(typeUpdate);
const { mutate: deletingType } = useMutation(typeDelete);

const paginateType = ({ page, perPage, where, space_id }) => {
  return useQuery(
    paginateTypes,
    { page, perPage, where },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateType = async ({ page: perPage, where, space_id }) => {
  const { refetch } = paginateType({ page, perPage, where, space_id });

  const { data: typesData } = await refetch();

  return typesData.types;
};

const create = async ({ input, space_id }) => {
  const { data: typeData } = await creatingType(
    {
      input,
    },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  return typeData.typeCreate.recordId;
};

const update = async ({ id, input, space_id }) => {
  const { data: typeData } = await updatingType(
    {
      id,
      input,
    },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  return typeData.typeUpdate;
};

const deleteTypeById = async ({ id, space_id }) => {
  await deletingType(
    {
      id: id,
    },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const typeApi = {
  paginateType,
  refetchPaginateType,
  create,
  update,
  deleteTypeById,
};

export default typeApi;
