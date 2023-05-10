import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";

import { createGroup, inviteUser } from "src/graphql/group/mutations";
import { getGroupsWithWhere } from "src/graphql/group/queries";

import apolloClient from "src/apollo/apollo-client";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingGroup } = useMutation(createGroup);
const { mutate: invitingUser } = useMutation(inviteUser);

const paginateGroups = ({ page, perPage, where, space_id }) => {
  return useQuery(
    getGroupsWithWhere,
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

const create = async (space_id, data) => {
  const { data: groupData } = await creatingGroup(
    {
      input: data,
    },
    spaceHeader(space_id)
  );

  console.log("group create", groupData);

  return groupData.userGroupCreate;
};

const invite = async (space_id, data) => {
  const { data: inviteData } = await invitingUser(
    {
      input: data,
    },
    spaceHeader(space_id)
  );

  console.log("invite group", inviteData);

  return inviteData.userGroupInviteUser;
};

const deleteGroupBy = () => {};

const groupApi = {
  create,
  invite,
  deleteGroupBy,
  paginateGroups,
  refetchPaginateGroups,
};

export default groupApi;
