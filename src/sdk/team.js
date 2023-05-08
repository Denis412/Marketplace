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

const paginateTeams = ({ page, perPage, where }) => {
  return useQuery(
    getTeamsWithWhere,
    { page, perPage, where },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateTeams = async ({ page, perPage, where }) => {
  const { refetch } = paginateTeams({ page, perPage, where });

  const { data: teamsData } = await refetch();

  return teamsData.paginate_team.data;
};

const createMainSpace = async ({ name, description }) => {
  const spaceData = await spaceApi.create({
    name,
    description,
  });

  const teamGroup = await groupApi.refetchPaginateGroups({
    page: 1,
    perPage: 1,
    where: {
      column: "name",
      operator: "EQ",
      value: "Команда",
    },
    space_id: spaceData.recordId,
  });

  const createdGroupMembers = await groupApi.create(spaceData.recordId, {
    name: "Участники",
    description: "Группа участников",
    parent_group_id: teamGroup[0].id,
  });

  const createdGroupInvited = await groupApi.create(spaceData.recordId, {
    name: "Приглашенные",
    description: "Группа приглашенных",
    parent_group_id: teamGroup[0].id,
  });

  console.log("space", spaceData);
  console.log("groups", teamGroup[0], createdGroupMembers, createdGroupInvited);

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

  return teamData.create_team.record;
};

const update = async (id, data) => {
  const { data: teamData } = await updatingTeam({
    id,
    input: data,
  });

  console.log("update", teamData);

  return teamData.update_team.status;
};

const deleteTeam = async (team) => {
  console.log("deletingTeam", team);

  await applicationApi.clearTeamApplications({
    page: 1,
    perPage: 1000,
    team_id: team.id,
  });

  const spaceData = await spaceApi.deleteById(team.space);

  const { data: teamData } = await deletingTeam({
    id: team.id,
  });

  // await refetchPaginateTeams({ page: 1, perPage: 100 });

  console.log("deletedSpace", spaceData, teamData);

  return teamData.delete_team;
};

const isMember = async (user_id, team) => {
  console.log(user_id, team);

  // Сделать запрос на пространства пользователя и проверить,
  //есть ли среди выведенных пространств - пространство с id,
  //как team.space. Есди нет - isExist = false и выходим из функции

  let groupData, groupData1, subjectData, isExist;

  const groupRefetch = async (name) => {
    return await groupApi.refetchPaginateGroups({
      page: 1,
      perPage: 1,
      where: {
        column: "name",
        operator: "EQ",
        value: name,
      },
      space_id: team.space,
    });
  };

  try {
    groupData = await groupRefetch("Участники");
    groupData1 = await groupRefetch("Команда");

    console.log("groudDatas", groupData, groupData1);

    subjectData = await userApi.refetchPaginateSubjects({
      page: 1,
      perPage: 1,
      where: {
        column: "user_id",
        operator: "EQ",
        value: user_id,
      },
      space_id: team.space,
      is_team: true,
    });

    console.log("subject", subjectData[0]);

    isExist =
      subjectData[0].group.find((group) => group.id === groupData[0].id) ||
      subjectData[0].group.find((group) => group.id === groupData1[0].id);
  } catch (error) {
    isExist = false;
  }

  console.log("isMember", isExist);

  return isExist;
};

const sendApplication = async (data) => {
  const applicationData = await applicationApi.create(data);

  return applicationData;
};

const addToTeam = async (space_id, data, group_name) => {
  const groupData = await groupApi.refetchPaginateGroups({
    page: 1,
    perPage: 1,
    where: {
      column: "name",
      operator: "EQ",
      value: group_name,
    },
    space_id,
  });

  const inviteData = await groupApi.invite(space_id, {
    name: data.name,
    surname: data.surname,
    email: data.email,
    group_id: groupData[0].id,
  });

  await sendApplication({
    name: data.name,
    subject: {
      [process.env.SUBJECT_TYPE_ID]: data.subject_id,
    },
    team: {
      [process.env.TEAM_TYPE_ID]: data.team_id,
    },
    status: process.env.APPLICATION_STATUS_PENDING,
    sender: data.sender,
  });

  console.log("inviteData", groupData[0], inviteData);

  return groupData[0];
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
  paginateTeams,
  refetchPaginateTeams,
  isMember,
  sendApplication,
};

export default teamApi;
