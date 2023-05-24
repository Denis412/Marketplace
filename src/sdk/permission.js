import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import {
  permissionRuleCreate,
  permissionRuleDelete,
  permissionRuleUpdate,
} from "src/graphql/permission/mutations";
import { permissionTreeGroups, permissionTreeSubjects } from "src/graphql/permission/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingPermissionRule } = useMutation(permissionRuleCreate);
const { mutate: updatingPermissionRule } = useMutation(permissionRuleUpdate);
const { mutate: deletingPermissionRule } = useMutation(permissionRuleDelete);

const paginatePermissionTreeGroups = ({ page, perPage, modelId, parentId, space_id }) => {
  return useQuery(
    permissionTreeGroups,
    { page, perPage, modelId, parentId },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const paginatePermissionTreeSubjects = ({ page, perPage, modelId, groupId, space_id }) => {
  return useQuery(
    permissionTreeSubjects,
    { page, perPage, modelId, groupId },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginatePermissionTreeGroups = async ({
  page,
  perPage,
  modelId,
  parentId,
  space_id,
}) => {
  const { refetch } = paginatePermissionTreeGroups({ page, perPage, modelId, parentId, space_id });

  const { data: permissionsData } = await refetch();

  console.log("refetch paginate permission groups", permissionsData);

  return permissionsData.permissionTreeGroups.data;
};

const refetchPaginatePermissionTreeSubjects = async ({
  page,
  perPage,
  modelId,
  groupId,
  space_id,
}) => {
  const { refetch } = paginatePermissionTreeSubjects({ page, perPage, modelId, groupId, space_id });

  const { data: permissionsData } = await refetch();

  console.log("refetch paginate permission subjects", permissionsData);

  return permissionsData.permissionTreeSubjects.data;
};

const create = async ({ input, space_id }) => {
  const { data: permissionData } = await creatingPermissionRule(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  console.log("create permission", permissionData);

  return permissionData.permissionRuleCreate.record;
};

const update = async ({ id, input, space_id }) => {
  const { data: permissionData } = await updatingPermissionRule(
    { id, input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  console.log("update permission", permissionData);

  return permissionData.permissionRuleUpdate.record;
};

const deleteById = async ({ id, space_id }) => {
  const { data: permissionData } = await deletingPermissionRule(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  console.log("delete permission", permissionData);

  return permissionData.permissionRuleDelete;
};

const permissionApi = {
  paginatePermissionTreeGroups,
  paginatePermissionTreeSubjects,
  refetchPaginatePermissionTreeGroups,
  refetchPaginatePermissionTreeSubjects,
  create,
  update,
  deleteById,
};

export default permissionApi;
