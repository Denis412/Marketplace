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

const queryGroups = (space_id, where) => {
  return useQuery(
    getGroupsWithWhere,
    {
      where,
    },
    spaceHeader(space_id)
  );
};

const getGroupByName = async (space_id, name) => {
  const { refetch } = queryGroups(space_id, {
    column: "name",
    operator: "EQ",
    value: `${name}`,
  });

  const { data: groupData } = await refetch();

  console.log("group", groupData);

  return groupData.paginate_group.data[0];
};

const create = async (space_id, data) => {
  // name, description, parent_group_id, with_page, icon,

  const { data: groupData } = await creatingGroup(
    {
      input: data,
    },
    spaceHeader(space_id)
  );

  return groupData.userGroupCreate;
};

const invite = async (space_id, data) => {
  const { data: inviteData } = await invitingUser(
    {
      input: data,
    },
    spaceHeader(space_id)
  );

  return inviteData.userGroupInviteUser;
};

const deleteGroupBy = () => {};

const groupApi = { create, invite, deleteGroupBy, getGroupByName };

export default groupApi;
