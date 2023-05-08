import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { getPropertyById } from "src/graphql/property/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const queryPropertyById = ({ id, space_id }) => {
  return useQuery(
    getPropertyById,
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPropertyById = async ({ id, space_id }) => {
  const { refetch } = queryPropertyById({ id, space_id });

  const { data: propertyData } = await refetch();

  return propertyData.property;
};

const propertyApi = { queryPropertyById, refetchPropertyById };

export default propertyApi;
