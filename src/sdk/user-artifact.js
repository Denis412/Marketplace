import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import { spaceHeader } from "src/utils/spaceHeader";

import apolloClient from "src/apollo/apollo-client";
import { userArtifactsPaginate } from "src/graphql/user-artifact/queries";
import {
  userArtifactCreate,
  userArtifactDelete,
  userArtifactUpdate,
} from "src/graphql/user-artifact/mutations";

provideApolloClient(apolloClient);

const { mutate: creatingArtifact } = useMutation(userArtifactCreate);
const { mutate: updatingArtifact } = useMutation(userArtifactUpdate);
const { mutate: deletingArtifact } = useMutation(userArtifactDelete);

const paginateUserArtifacts = ({ page, perPage, where }) => {
  return useQuery(
    userArtifactsPaginate,
    { page, perPage, where },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateUserArtifacts = async ({ page: perPage, where }) => {
  const { refetch } = paginateUserArtifacts({ page, perPage, where });

  const { data: artifactsData } = await refetch();

  // console.log("refetch artiacts", artifactsData);

  return artifactsData.paginate_user_artifact.data;
};

const create = async ({ input, space_id }) => {
  const { data: artifactData } = await creatingArtifact(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("create artifact", artifactData);

  return artifactData.create_user_artifact.record;
};

const update = async ({ id, input, space_id }) => {
  const { data: artifactData } = await updatingArtifact(
    { id, input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("update artifact", artifactData);

  return artifactData.update_user_artifact.record;
};

const deleteById = async ({ id, space_id }) => {
  const { data: artifactData } = await deletingArtifact(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("delete artifact", artifactData);

  return artifactData.delete_user_artifact;
};

const userArtifactApi = {
  paginateUserArtifacts,
  refetchPaginateUserArtifacts,
  create,
  update,
  deleteById,
};

export default userArtifactApi;
