import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { teamCreate, teamDelete, teamUpdate } from "src/graphql/team/mutations";
import { getTeamsWithWhere } from "src/graphql/team/queries";
import groupApi from "./group";
import spaceApi from "./space";
import applicationApi from "./application";
import userApi from "./user";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingTeam } = useMutation(
  teamCreate,
  spaceHeader(process.env.MAIN_SPACE_ID)
);

const { mutate: updatingTeam } = useMutation(
  teamUpdate,
  spaceHeader(process.env.MAIN_SPACE_ID)
);

const { mutate: deletingTeam } = useMutation(
  teamDelete,
  spaceHeader(process.env.MAIN_SPACE_ID)
);

const { refetch: refetchingTeams } = useQuery(
  getTeamsWithWhere,
  {},

  spaceHeader(process.env.MAIN_SPACE_ID)
);

const queryMyTeams = (author_id) => {
  return useQuery(
    getTeamsWithWhere,
    {
      where: {
        column: "author_id",
        operator: "EQ",
        value: `${author_id}`,
      },
    },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const queryAllTeams = () => {
  return useQuery(
    getTeamsWithWhere,
    {},
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const queryTeamByName = (name) => {
  return useQuery(
    getTeamsWithWhere,
    {
      where: {
        column: "name",
        operator: "EQ",
        value: `${name}`,
      },
    },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const refetchTeamByName = async (name) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "name",
      operator: "EQ",
      value: `${name}`,
    },
  });

  return teamData.paginate_team.data[0];
};

const refetchAllTeams = async () => {
  const { data: teamsData } = await refetchingTeams();

  return teamsData.paginate_team.data;
};

const refetchMyTeams = async (author_id) => {
  const { data: teamsData } = await refetchingTeams({
    where: {
      column: "author_id",
      operator: "EQ",
      value: `${author_id}`,
    },
  });

  return teamsData.paginate_team.data;
};

const checkStatus = async (status) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "ready_for_orders",
      operator: "EQ",
      value: status.value,
    },
  });

  return teamData.paginate_team.data;
};

const checkChar = async (char) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "name",
      operator: "FTS",
      value: `${char}`,
    },
  });

  return teamData.paginate_team.data;
};

const checkName = async ({ name }) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "name",
      operator: "EQ",
      value: `${name}`,
    },
  });

  return teamData.paginate_team.paginatorInfo.count == 0;
};

const createMainSpace = async ({ name, description }) => {
  const spaceData = await spaceApi.create({
    name,
    description,
  });

  const teamGroup = await groupApi.getGroupByName(
    spaceData.recordId,
    "Команда"
  );

  const createdGroupMembers = await groupApi.create(spaceData.recordId, {
    name: "Участники",
    description: "Группа участников",
    parent_group_id: teamGroup.id,
  });

  const createdGroupInvited = await groupApi.create(spaceData.recordId, {
    name: "Приглашенные",
    description: "Группа приглашенных",
    parent_group_id: teamGroup.id,
  });

  console.log("space", spaceData);
  console.log("groups", teamGroup, createdGroupMembers, createdGroupInvited);

  return spaceData;
};

const create = async ({ name, description }) => {
  const spaceData = await createMainSpace({ name, description });

  const { data: teamData } = await creatingTeam({
    input: {
      name,
      description,
      space: `${spaceData.recordId}`,
    },
  });

  refetchMyTeams(teamData.create_team.record.author_id);

  return teamData.create_team.record.id;
};

const update = async (id, data) => {
  const { data: teamData } = await updatingTeam({
    id,
    input: data,
  });

  return teamData.update_team.status;
};

const deleteTeam = async (team) => {
  console.log("deletingTeam", team);

  const spaceData = await spaceApi.deleteById(team.space);

  const { data: teamData } = await deletingTeam({
    id: team.id,
  });

  await refetchAllTeams();

  console.log("deletedSpace", spaceData, teamData);

  return teamData.delete_team;
};

const isMember = async (user_id, team) => {
  console.log(user_id, team);

  // Сделать запрос на пространства пользователя и проверить,
  //есть ли среди выведенных пространств - пространство с id,
  //как team.space. Есди нет - isExist = false и выходим из функции

  let groupData, groupData1, subjectData, isExist;

  try {
    groupData = await groupApi.getGroupByName(team.space, "Участники");
    groupData1 = await groupApi.getGroupByName(team.space, "Команда");

    subjectData = await userApi.getPaginateSubject(team.space, {
      column: "user_id",
      operator: "EQ",
      value: user_id,
    });

    isExist =
      subjectData[0].group.find((group) => group.id === groupData.id) ||
      subjectData[0].group.find((group) => group.id === groupData1.id);
  } catch (error) {
    isExist = false;
  }

  console.log("isMember", isExist);

  return isExist;
};

const addToTeam = async (space_id, data, group_name) => {
  const groupData = await groupApi.getGroupByName(space_id, group_name);

  const inviteData = await groupApi.invite(space_id, {
    name: data.name,
    surname: data.surname,
    email: data.email,
    group_id: groupData.id,
  });

  console.log("inviteData", groupData, inviteData);

  return groupData;
};

const sendApplication = async (data) => {
  const applicationData = await applicationApi.create(data);

  return applicationData;
};

const inviteUser = async (space_id, data) =>
  await addToTeam(space_id, data, "Приглашенные");

const acceptUser = async (space_id, data) =>
  await addToTeam(space_id, data, "Участники");

const teamApi = {
  create,
  update,
  inviteUser,
  acceptUser,
  deleteTeam,
  checkName,
  isMember,
  sendApplication,
  refetchAllTeams,
  queryMyTeams,
  queryAllTeams,
  checkStatus,
  queryTeamByName,
  refetchMyTeams,
  refetchAllTeams,
  refetchTeamByName,
  checkChar,
};

export default teamApi;
