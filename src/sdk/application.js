import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";

import apolloClient from "src/apollo/apollo-client";
import {
  createApplication,
  deleteApplication,
  updateApplication,
} from "src/graphql/application/mutations";
import { paginateApplications } from "src/graphql/application/queries";

import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingApplication } = useMutation(
  createApplication,
  spaceHeader(process.env.MAIN_SPACE_ID)
);

const { mutate: updatingApplication } = useMutation(
  updateApplication,
  spaceHeader(process.env.MAIN_SPACE_ID)
);

const { mutate: deletingApplication } = useMutation(
  deleteApplication,
  spaceHeader(process.env.MAIN_SPACE_ID)
);

const paginateApplication = ({ page, perPage, where, space_id }) => {
  return useQuery(
    paginateApplications,
    { page, perPage, where },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateApplications = async ({
  page,
  perPage,
  where,
  space_id,
}) => {
  const { refetch } = paginateApplication({ page, perPage, where, space_id });

  const { data: applicationsData } = await refetch();

  return applicationsData.paginate_application.data;
};

const create = async (data) => {
  const { data: applicationData } = await creatingApplication({
    input: data,
  });

  console.log("createApplication", applicationData);

  return applicationData.create_application;
};

const update = async (data) => {
  const { data: applicationData } = await updatingApplication({
    input: data,
  });

  console.log("updateApplication", applicationData);

  return applicationData.update_application;
};

const deleteById = async (id) => {
  const { data: applicationData } = await deletingApplication({
    id,
  });

  console.log("deleteApplication", applicationData);

  return applicationData.delete_application;
};

const applicationApi = {
  paginateApplication,
  refetchPaginateApplications,
  create,
  update,
  deleteById,
};

export default applicationApi;
