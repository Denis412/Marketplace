import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import { createGroup, inviteUser, updateGroup } from "src/graphql/group/mutations";
import { getGroupsWithWhere, paginateGroupsSubjects } from "src/graphql/group/queries";

import apolloClient from "src/apollo/apollo-client";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingGroup } = useMutation(createGroup);
const { mutate: updatingGroup } = useMutation(updateGroup);
const { mutate: invitingUser } = useMutation(inviteUser);

const paginateGroups = ({ page, perPage, where, space_id, is_subjects }) => {
  const query = is_subjects ? paginateGroupsSubjects : getGroupsWithWhere;

  return useQuery(
    query,
    { page, perPage, where },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateGroups = async ({ page, perPage, where, space_id }) => {
  const { refetch } = paginateGroups({ page, perPage, where, space_id });

  const { data: groupData } = await refetch();

  console.log("refetch group", groupData);

  return groupData.paginate_group.data;
};

const create = async ({ space_id, input }) => {
  const { data: groupData } = await creatingGroup({ input }, spaceHeader(space_id));

  console.log("group create", groupData);

  return groupData.userGroupCreate;
};

const update = async ({ id, input, space_id }) => {
  const { data: groupData } = await updatingGroup({ id, input }, spaceHeader(space_id));

  console.log("group update", groupData);

  return groupData.record;
};

const invite = async (space_id, data) => {
  const { data: inviteData } = await invitingUser({ input: data }, spaceHeader(space_id));

  console.log("invite group", inviteData);

  return inviteData.userGroupInviteUser;
};

const deleteGroupBy = () => {};

const groupApi = {
  create,
  update,
  invite,
  deleteGroupBy,
  paginateGroups,
  refetchPaginateGroups,
};

export default groupApi;
