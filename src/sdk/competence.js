import { provideApolloClient, useQuery } from "@vue/apollo-composable";

import { competenciesPaginate } from "src/graphql/competence/queries";

import apolloClient from "src/apollo/apollo-client";

provideApolloClient(apolloClient);

const paginateCompetencies = ({ page, perPage, where }) => {
  return useQuery(competenciesPaginate, { page, perPage, where });
};

const refetchPaginateCompetencies = async ({ page, perPage, where }) => {
  const { refetch } = paginateCompetencies({ page, perPage, where });

  const { data: competenciesData } = await refetch();

  console.log("refetch paginate competence", competenciesData);

  return competenciesData.paginate_competence.data;
};

const competenceApi = {
  paginateCompetencies,
  refetchPaginateCompetencies,
};

export default competenceApi;
