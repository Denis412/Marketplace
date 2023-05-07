import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { paginateSpecialities } from "src/graphql/speciality/queries";
import { spaceHeader } from "src/utils/spaceHeader";

import apolloClient from "src/apollo/apollo-client";

provideApolloClient(apolloClient);

const paginateSpeciality = ({ page, perPage, where }) => {
  return useQuery(
    paginateSpecialities,
    { page, perPage, where },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateSpecialities = async ({ page: perPage, where }) => {
  const { refetch } = querySpecialities({ page, perPage, where });

  const { data: specialitiesData } = await refetch();

  return specialitiesData.paginate_speciality.data;
};

const specilalityApi = { paginateSpeciality, refetchPaginateSpecialities };

export default specilalityApi;
