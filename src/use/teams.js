import { ref } from "vue";

import applicationApi from "src/sdk/application";
import groupApi from "src/sdk/group";
import spaceApi from "src/sdk/space";
import teamApi from "src/sdk/team";
import typeApi from "src/sdk/type";
import userApi from "src/sdk/user";
import propertyApi from "src/sdk/property";
import pageApi from "src/sdk/page";
import projectApi from "src/sdk/project";

export const useTeamCreate = () => {
  const createTeamResult = ref(null);
  const creatingTeam = ref(false);
  const createTeamError = ref("");

  async function createTeam({ name, description }) {
    let team, space;

    try {
      creatingTeam.value = true;

      space = await spaceApi.create({
        name,
        description,
      });

      const subjectType = await typeApi.refetchPaginateType({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "subject",
        },
        space_id: space.id,
      });

      await propertyApi.createMany({
        input: [
          {
            name: "major",
            label: "Специальность",
            data_type: "text",
            type_id: subjectType[0].id,
            order: 2,
          },
          {
            name: "avatar",
            label: "Аватар",
            data_type: "text",
            type_id: subjectType[0].id,
            order: 3,
          },
        ],
        space_id: space.id,
      });

      const teamGroup = await groupApi.refetchPaginateGroups({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "Команда",
        },
        space_id: space.id,
      });

      await groupApi.create(space.id, {
        name: "Участники",
        description: "Группа участников",
        parent_group_id: teamGroup[0].id,
      });

      await groupApi.create(space.id, {
        name: "Приглашенные",
        description: "Группа приглашенных",
        parent_group_id: teamGroup[0].id,
      });

      const projectTypeData = await typeApi.create({
        input: {
          name: "project",
          label: "Проект",
        },
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          name: "space",
          label: "Проектное пространство",
          data_type: "text",
          type_id: projectTypeData.id,
          order: 2,
        },
        space_id: space.id,
      });

      team = await teamApi.create({ name, description, space: space.id });

      await teamApi.update(team.id, {
        members: {
          [process.env.SUBJECT_TYPE_ID]: [team.author_id],
        },
      });

      const rootPageData = await pageApi.create({
        input: {
          title: team.name,
        },
        space_id: space.id,
      });

      await pageApi.create({
        input: {
          title: "Профиль команды",
          parent_id: rootPageData.id,
        },
        space_id: space.id,
      });

      await pageApi.create({
        input: {
          title: "Командное пространство",
          parent_id: rootPageData.id,
        },
        space_id: space.id,
      });

      const mainSpaceSubject = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: team.author_id,
        },
        is_my_teams: true,
      });

      await userApi.update(
        projectTypeData.author_id,
        {
          major: mainSpaceSubject[0].major,
          avatar: mainSpaceSubject[0].avatar,
        },
        true,
        space.id
      );

      createTeamResult.value = { team, space };

      creatingTeam.value = false;
    } catch (e) {
      createTeamError.value = e;

      console.log(e);
    }
  }

  return { createTeamResult, creatingTeam, createTeamError, createTeam };
};

export const useTeamUpdate = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref("");

  async function updateTeam(id, data) {
    try {
      loading.value = true;

      const teamData = await teamApi.update(id, data);

      await teamApi.refetchPaginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: id,
        },
      });

      result.value = teamData;

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, updateTeam };
};

export const useTeamDelete = () => {
  const deleteTeamResult = ref(null);
  const deletingTeam = ref(false);
  const deleteTeamError = ref("");

  async function deleteTeam(team, subject_id) {
    try {
      deletingTeam.value = true;

      await applicationApi.clearTeamApplications({
        page: 1,
        perPage: 1000,
        team_id: team.id,
      });

      await spaceApi.deleteById(team.space);

      const teamData = await teamApi.deleteById(team.id);

      await teamApi.refetchPaginateTeams({ page: 1, perPage: 100 });

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

      deleteTeamResult.value = teamData;

      deletingTeam.value = false;
    } catch (e) {
      deleteTeamError.value = e;

      console.log(e);
    }
  }

  return { deleteTeamResult, deletingTeam, deleteTeamError, deleteTeam };
};

export const useTeamIsMember = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function checkIsMember(team) {
    try {
      loading.value = true;

      const groupData = await groupApi.refetchPaginateGroups({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "Участники",
        },
        space_id: team.space,
      });

      const subjectData = await userApi.refetchPaginateSubjects({
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

      result.value = subjectData[0].group.find(
        (group) => group.id === groupData[0].id
      );

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return {
    result,
    loading,
    error,
    checkIsMember,
  };
};

export const useTeamAcceptUser = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function acceptUser({ team_id, space_id, data }) {
    try {
      const groupData = await groupApi.refetchPaginateGroups({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "Участники",
        },
        space_id,
      });

      await groupApi.invite(space_id, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        group_id: groupData[0].id,
      });

      const teamData = await teamApi.refetchPaginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: team_id,
        },
      });

      await teamApi.update(team_id, {
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
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, acceptUser };
};

export const useTeamApplication = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function sendApplication(data) {
    try {
      loading.value = true;

      const [property_id, type_id] =
        data.sender === "team"
          ? [process.env.APPLICATION_TEAM_PROPERTY, process.env.TEAM_TYPE_ID]
          : [
              process.env.APPLICATION_SUBJECT_PROPERTY,
              process.env.SUBJECT_TYPE_ID,
            ];

      const target_str = data.sender === "team" ? "subject" : "team";

      const applications = await applicationApi.refetchPaginateApplications({
        page: 1,
        perPage: 100,
        where: {
          column: `${property_id}->${type_id}`,
          operator: "EQ",
          value: data.sender_id,
        },
      });

      if (
        applications.find(
          (application) => application[target_str].id === data.target.id
        )
      )
        throw new Error("Уже есть заявка!");

      result.value = await applicationApi.create(data);

      if (data.sender === "team")
        await teamApi.refetchPaginateTeams({
          page: 1,
          perPage: 1,
          where: {
            column: "id",
            operator: "EQ",
            value: data.sender_id,
          },
        });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  async function acceptApplication({ application, is_team }) {
    try {
      loading.value = true;

      const { acceptUser } = useTeamAcceptUser();

      if (is_team) {
        await acceptUser({
          team_id: application.team.id,
          space_id: application.team.space,
          data: {
            name: application.subject.fullname.first_name,
            surname: application.subject.fullname.last_name,
            email: application.subject.email.email,
            id: application.subject.id,
            application_id: application.id,
          },
        });

        const subjectData = await userApi.refetchPaginateSubjects({
          page: 1,
          perPage: 100,
          is_team: true,
          space_id: application.team.space,
        });

        const subject = subjectData.find(
          (sub) => sub.email.email === application.subject.email.email
        );

        await userApi.update(
          subject.id,
          {
            major: application.subject.major,
          },
          true,
          application.team.space
        );

        await applicationApi.deleteById(application.id);
      } else
        await applicationApi.update(application.id, {
          status: process.env.APPLICATION_STATUS_APPROVED,
        });

      await teamApi.refetchPaginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: application.team.name,
        },
      });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  async function cancelApplication({ application, is_team }) {
    try {
      loading.value = true;

      if (
        (is_team && application.sender === "team") ||
        (!is_team && application.sender === "subject")
      )
        await applicationApi.deleteById(application.id);
      else
        await applicationApi.update(application.id, {
          status: process.env.APPLICATION_STATUS_REJECTED,
        });

      await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "user_id",
          operator: "EQ",
          value: JSON.parse(localStorage.getItem("user-data")).user_id,
        },
        is_my_teams: true,
      });

      await teamApi.refetchPaginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: application.team.name,
        },
      });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return {
    result,
    loading,
    error,
    sendApplication,
    acceptApplication,
    cancelApplication,
  };
};
