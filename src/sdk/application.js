import { provideApolloClient, useMutation } from "@vue/apollo-composable";

import apolloClient from "src/apollo/apollo-client";
import {
  createApplication,
  deleteApplication,
  updateApplication,
} from "src/graphql/application/mutations";

provideApolloClient(apolloClient);

const { mutate: creatingApplication } = useMutation(createApplication, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});

const { mutate: updatingApplication } = useMutation(updateApplication, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});

const { mutate: deletingApplication } = useMutation(deleteApplication, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});

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

const applicationApi = { create, update, deleteById };

export default applicationApi;
