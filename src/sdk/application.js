import { provideApolloClient, useMutation, useQuery} from "@vue/apollo-composable";

import apolloClient from "src/apollo/apollo-client";
import {
  createApplication,
  deleteApplication,
  updateApplication,
} from "src/graphql/application/mutations";

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

const create = async (data) => {
  const { data: applicationData } = await creatingApplication({
    input: data,
  });

  console.log("createApplication", applicationData);

  return applicationData.create_application;
};

const update = async (data) => {
  const { data: applicationData } = await updatingApplication({
    id: data.id,
    input: data.input,
  });

  console.log("updateApplication", applicationData);

  return applicationData.update_application;
};

const deleteById = async (id) => {
  console.log("Mayahi", id)
  const { data: applicationData } = await deletingApplication({
    id:id,
  });

  console.log("deleteApplication", applicationData);

  return applicationData.delete_application;
};

const applicationApi = { create, update, deleteById };

export default applicationApi;
