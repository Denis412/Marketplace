import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import {
  propertyCreate,
  propertyCreateMany,
  propertyDelete,
  propertyUpdate,
} from "src/graphql/property/mutations";
import { getPropertyById, propertiesPaginate } from "src/graphql/property/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingProperty } = useMutation(propertyCreate);
const { mutate: creatingPropertyMany } = useMutation(propertyCreateMany);
const { mutate: updatingProperty } = useMutation(propertyUpdate);
const { mutate: deletingProperty } = useMutation(propertyDelete);

const queryPropertyById = ({ id, space_id }) => {
  return useQuery(getPropertyById, { id }, spaceHeader(space_id || process.env.MAIN_SPACE_ID));
};

const paginateProperties = ({ page, perPage, where, space_id }) => {
  // console.log({ page, perPage, where, space_id });
  return useQuery(
    propertiesPaginate,
    { page, perPage, where },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPropertyById = async ({ id, space_id }) => {
  const { refetch } = queryPropertyById({ id, space_id });

  const { data: propertyData } = await refetch();

  // console.log("get property", propertyData);

  return propertyData.property;
};

const refetchPaginateProperties = async ({ page, perPage, where, space_id }) => {
  const { refetch } = paginateProperties({ page, perPage, where, space_id });

  const { data: propertyData } = await refetch();

  // console.log("refetch paginate property", propertyData);

  return propertyData.properties.data;
};

const create = async ({ input, space_id }) => {
  const { data: propertyData } = await creatingProperty(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("create property", propertyData);

  return propertyData.propertyCreate.record;
};

const createMany = async ({ input, space_id }) => {
  // console.log(input);
  const { data: propertiesData } = await creatingPropertyMany(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("create many properties", propertiesData);

  return propertiesData.propertyCreateMany.records;
};

const update = async ({ id, input, space_id }) => {
  const { data: propertyData } = await updatingProperty(
    { id, input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("update property", propertyData);

  return propertyData.propertyUpdate.record;
};

const deleteById = async ({ id, space_id }) => {
  const { data: propertyData } = await deletingProperty(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("delete property", propertyData);

  return propertyData.propertyDelete;
};

const propertyApi = {
  queryPropertyById,
  refetchPropertyById,
  paginateProperties,
  refetchPaginateProperties,
  create,
  createMany,
  update,
  deleteById,
};

export default propertyApi;
