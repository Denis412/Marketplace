import { useMutation, provideApolloClient, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { typeCreate, typeDelete, typeUpdate } from "src/graphql/types/mutations";
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

const refetchPaginateType = async ({ page, perPage, where, space_id }) => {
  const { refetch } = paginateType({ page, perPage, where, space_id });

  const { data: typesData } = await refetch();

  // console.log("refetch paginate types", typesData);

  return typesData.types.data;
};

const create = async ({ input, space_id }) => {
  const { data: typeData } = await creatingType(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("create type", typeData);

  return typeData.typeCreate.record;
};

const update = async ({ id, input, space_id }) => {
  const { data: typeData } = await updatingType(
    { id, input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("update type", typeData);

  return typeData.typeUpdate;
};

const deleteTypeById = async ({ id, space_id }) => {
  const { data: typeData } = await deletingType(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("delete type", typeData);

  return typeData.typeDelete;
};

const typeApi = {
  paginateType,
  refetchPaginateType,
  create,
  update,
  deleteTypeById,
};

export default typeApi;
