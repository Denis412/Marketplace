import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { paginateSpecialities } from "src/graphql/speciality/queries";
import { spaceHeader } from "src/utils/spaceHeader";

import apolloClient from "src/apollo/apollo-client";

provideApolloClient(apolloClient);

const querySpecialities = (where = null) => {
  return useQuery(
    paginateSpecialities,
    {},
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const getAllSpecialities = async () => {
  const { refetch } = querySpecialities();

  const { data: specialitiesData } = await refetch();

  return specialitiesData.paginate_speciality.data;
};

const specilalityApi = { querySpecialities, getAllSpecialities };

export default specilalityApi;
