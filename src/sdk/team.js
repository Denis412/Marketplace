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
import typeApi from "./type";

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

  const createdProjectType = await typeApi.create({
    input: {
      name: "project",
      label: "Проект",
    },
    space_id: spaceData.recordId,
  });

  console.log("space", spaceData);
  console.log("groups", teamGroup[0], createdGroupMembers, createdGroupInvited);
  console.log("typeProject", createdProjectType);

  return spaceData;
};

const update = async (id, data) => {
  const { data: teamData } = await updatingTeam({
    id,
    input: data,
  });

  console.log("update", teamData);

  return teamData.update_team.status;
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

  console.log("teamData", teamData);

  await update(teamData.create_team.recordId, {
    members: {
      [process.env.SUBJECT_TYPE_ID]: [teamData.create_team.record.author_id],
    },
  });

  await userApi.refetchPaginateSubjects({
    page: 1,
    perPage: 1,
    where: {
      column: "id",
      operator: "EQ",
      value: teamData.create_team.record.author_id,
    },
    is_my_teams: true,
  });

  return teamData.create_team.record;
};

const deleteTeam = async (team, subject_id) => {
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

  await refetchPaginateTeams({ page: 1, perPage: 100 });

  await userApi.refetchPaginateSubjects({
    page: 1,
    perPage: 1,
    where: {
      column: "id",
      operator: "EQ",
      value: subject_id,
    },
    is_my_teams: true,
  });

  console.log("deletedSpace", spaceData, teamData);

  return teamData.delete_team;
};

const isMember = async (team) => {
  console.log(team);

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
        value: JSON.parse(localStorage.getItem("user-data")).user_id,
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
  const subjectApplications = await userApi.refetchSubjectById(
    data.subject[process.env.SUBJECT_TYPE_ID]
  );

  if (
    subjectApplications.applications.find(
      (application) =>
        application.team.id === data.team[process.env.TEAM_TYPE_ID]
    )
  )
    throw new Error("Уже есть заявка!");

  const applicationData = await applicationApi.create(data);

  return applicationData;
};

const addToTeam = async ({ team_id, space_id, data, group_name }) => {
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

  let inviteData;

  inviteData = await groupApi.invite(space_id, {
    name: data.name,
    surname: data.surname,
    email: data.email,
    group_id: groupData[0].id,
  });

  if (group_name === "Участники") {
    console.log("invite", inviteData);

    const teamData = await refetchPaginateTeams({
      page: 1,
      perPage: 1,
      where: {
        column: "id",
        operator: "EQ",
        value: team_id,
      },
    });

    await update(team_id, {
      members: {
        [process.env.SUBJECT_TYPE_ID]: [
          ...teamData[0].members.map((member) => member.id),
          data.id,
        ],
      },
    });

    await applicationApi.update(data.application_id, {
      status: process.env.APPLICATION_STATUS_APPROVED,
    });

    return;
  } else
    await applicationApi.create({
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

const inviteUser = async ({ team_id, space_id, data }) =>
  await addToTeam({ team_id, space_id, data, group_name: "Приглашенные" });

const acceptUser = async ({ team_id, space_id, data }) =>
  await addToTeam({ team_id, space_id, data, group_name: "Участники" });

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
