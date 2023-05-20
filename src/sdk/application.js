import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";

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

const refetchPaginateApplications = async ({ page, perPage, where, space_id }) => {
  const { refetch } = paginateApplication({ page, perPage, where, space_id });

  const { data: applicationsData } = await refetch();

  console.log("refetch paginate application", applicationsData);

  return applicationsData.paginate_application.data;
};

const create = async ({ name, subject, team, status, sender }) => {
  const { data: applicationData } = await creatingApplication({
    input: {
      name,
      subject,
      team,
      status,
      sender,
    },
  });

  console.log("create application", applicationData);

  return applicationData.create_application;
};

const update = async (id, data) => {
  const { data: applicationData } = await updatingApplication({
    id,
    input: data,
  });

  console.log("update application", applicationData);

  return applicationData.update_application;
};

const deleteById = async (id) => {
  const { data: applicationData } = await deletingApplication({
    id: id,
  });

  console.log("delete application", applicationData);

  return applicationData.delete_application;
};

const clearTeamApplications = async ({ page, perPage, team_id, space_id }) => {
  const applications = await refetchPaginateApplications({
    page,
    perPage,
    where: {
      column: `${process.env.APPLICATION_TEAM_PROPERTY}->${process.env.TEAM_TYPE_ID}`,
      operator: "EQ",
      value: team_id,
    },
    space_id,
  });

  for (let application of applications) await deleteById(application.id);
};

const applicationApi = {
  paginateApplication,
  refetchPaginateApplications,
  create,
  update,
  deleteById,
  clearTeamApplications,
};

export default applicationApi;
