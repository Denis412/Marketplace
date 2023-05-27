import { ref } from "vue";

import applicationApi from "src/sdk/application";
import groupApi from "src/sdk/group";
import spaceApi from "src/sdk/space";
import teamApi from "src/sdk/team";
import typeApi from "src/sdk/type";
import userApi from "src/sdk/user";
import propertyApi from "src/sdk/property";
import pageApi from "src/sdk/page";
import permissionApi from "src/sdk/permission";

export const useTeamCreate = () => {
  const createTeamResult = ref(null);
  const creatingTeam = ref(false);
  const createTeamError = ref("");

  async function createTeam({ name, description, avatar, author }) {
    let team, space;

    try {
      creatingTeam.value = true;

      space = await spaceApi.create({
        input: {
          name,
          description,
        },
      });

      //**************************Свойства субъекта*********************************

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

      // await propertyApi.createMany({
      //   input: [
      //     {
      //       name: "speciality1",
      //       label: "Специальность",
      //       data_type: "text",
      //       type_id: subjectType[0].id,
      //       order: 2,
      //     },
      //     {
      //       name: "avatar",
      //       label: "Аватар",
      //       data_type: "text",
      //       type_id: subjectType[0].id,
      //       order: 4,
      //     },
      //   ],
      //   space_id: space.id,
      // });

      //*******************************************************************************

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

      await groupApi.update({
        id: teamGroup[0].id,
        input: {
          name: "Лидер",
          description: "Группа лидеров",
        },
        space_id: space.id,
      });

      await groupApi.create({
        input: {
          name: "Участник",
          description: "Группа участников",
          parent_group_id: teamGroup[0].id,
        },
        space_id: space.id,
      });

      await groupApi.create({
        input: {
          name: "Заказчик",
          description: "Группа заказчиков",
          parent_group_id: teamGroup[0].id,
        },
        space_id: space.id,
      });

      await groupApi.create({
        input: {
          name: "Приглашенный",
          description: "Группа приглашенных",
          parent_group_id: teamGroup[0].id,
        },
        space_id: space.id,
      });

      //**************************Свойства проекта*********************************

      const projectTypeData = await typeApi.create({
        input: {
          name: "project",
          label: "Проект",
        },
        space_id: space.id,
      });

      await propertyApi.createMany({
        input: [
          {
            name: "avatar",
            label: "Фотография",
            data_type: "text",
            type_id: projectTypeData.id,
            order: 2,
          },
          {
            name: "team_name",
            label: "Название команды",
            data_type: "text",
            type_id: projectTypeData.id,
            order: 3,
          },
          {
            name: "description",
            label: "Описание проекта",
            data_type: "text",
            type_id: projectTypeData.id,
            order: 4,
          },
          {
            name: "target",
            label: "Цель проекта",
            data_type: "text",
            type_id: projectTypeData.id,
            order: 5,
          },
          {
            name: "space",
            label: "Пространство",
            data_type: "text",
            type_id: projectTypeData.id,
            order: 6,
          },
        ],
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          label: "Участники",
          name: "members",
          type_id: projectTypeData.id,
          data_type: "object",
          order: 7,
          multiple: {
            status: true,
            max_number: 50,
          },
          meta: {
            related_types: [
              {
                type_id: subjectType[0].id,
                inverse_relation: true,
                inverse_relation_label: "Проекты",
                inverse_relation_name: "projects_member",
              },
            ],
          },
        },
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          label: "Заказчики",
          name: "customers",
          type_id: projectTypeData.id,
          data_type: "object",
          order: 8,
          multiple: {
            status: true,
            max_number: 3,
          },
          meta: {
            related_types: [
              {
                type_id: subjectType[0].id,
                inverse_relation: true,
                inverse_relation_label: "Проекты",
                inverse_relation_name: "projects_customer",
              },
            ],
          },
        },
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          name: "delivery_date",
          label: "Дата сдачи",
          data_type: "datetime",
          type_id: projectTypeData.id,
          order: 9,
          meta: {
            properties: [
              {
                order: 1,
                data_type: "date",
                name: "date",
                meta: {
                  min: null,
                  consider_time_zones: false,
                  max: "31.12.2050",
                  mask: "DD.MM.YYYY",
                },
                default: {
                  value: "01.12.2023",
                },
                required: false,
                multiple: {
                  status: false,
                },
              },
            ],
          },
        },
        space_id: space.id,
      });

      //*******************************************************************************

      //**************************Свойства заявки*********************************

      const applicationProjectType = await typeApi.create({
        input: {
          name: "application",
          label: "Заявка",
        },
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          data_type: "toggle",
          name: "is_customer",
          label: "Заказчик",
          type_id: applicationProjectType.id,
          default: {
            value: false,
          },
          order: 10,
          required: false,
          multiple: {
            status: false,
            button_text: "Добавить",
          },
        },
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          label: "Проект",
          name: "project",
          type_id: applicationProjectType.id,
          data_type: "object",
          order: 6,
          multiple: {
            status: false,
          },
          meta: {
            related_types: [
              {
                type_id: projectTypeData.id,
                inverse_relation: true,
                inverse_relation_label: "Заявки",
                inverse_relation_name: "applications",
              },
            ],
          },
        },
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          label: "Субъект",
          name: "subject",
          type_id: applicationProjectType.id,
          data_type: "object",
          order: 2,
          multiple: {
            status: false,
          },
          meta: {
            related_types: [
              {
                type_id: subjectType[0].id,
                inverse_relation: true,
                inverse_relation_label: "Заявки",
                inverse_relation_name: "applications",
              },
            ],
          },
        },
        space_id: space.id,
      });

      await propertyApi.create({
        input: {
          type_id: applicationProjectType.id,
          data_type: "list",
          name: "status",
          label: "Статус",
          meta: {
            options: [
              {
                label: "В ожидании",
                order: 0,
                color: "#f2c037",
              },
              {
                label: "Отклонена",
                order: 1,
                color: "#c10015",
              },
              {
                label: "Одобрена",
                order: 2,
                color: "#21ba45",
              },
            ],
            placeholder: null,
            mask: null,
            is_allow_custom_option: false,
          },
          default: {
            value: {
              id: 1,
            },
          },
          order: 4,
          required: false,
          multiple: {
            status: false,
            button_text: "Добавить",
          },
        },
        space_id: space.id,
      });

      //*******************************************************************************

      team = await teamApi.create({
        input: {
          name,
          avatar,
          description,
          leader_telegram_chat_id: author.telegram_chat_id,
        },
        space_id: space.id,
      });

      await teamApi.update({
        id: team.id,
        input: {
          members: {
            [process.env.SUBJECT_TYPE_ID]: [team.author_id],
          },
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

      await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: team.author_id,
        },
      });

      // await userApi.update(
      //   projectTypeData.author_id,
      //   {
      //     speciality1: mainSpaceSubject[0].speciality1.name,
      //     avatar: mainSpaceSubject[0].avatar,
      //   },
      //   true,
      //   space.id
      // );

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

      console.log("team update", id, data);

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

      console.log("team", team);

      const groupData = await groupApi.refetchPaginateGroups({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "Участник",
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

      result.value = subjectData[0].group.find((group) => group.id === groupData[0].id);

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
          value: "Участник",
        },
        space_id,
      });

      await groupApi.invite(space_id, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        group_id: groupData[0].id,
      });

      const rootPage = await pageApi.refetchPaginateRootPages({
        page: 1,
        perPage: 1,
        where: {
          column: "title",
          operator: "EQ",
          value: data.team_name,
        },
        space_id,
      });

      const newSubjectData = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "email",
          operator: "FTS",
          value: data.email,
        },
        is_team: true,
        space_id,
      });

      await permissionApi.create({
        input: {
          model_type: "page",
          model_id: rootPage[0].id,
          owner_type: "subject",
          owner_id: newSubjectData[0].id,
          level: 4,
        },
        space_id,
      });

      await permissionApi.create({
        input: {
          model_type: "page",
          model_id: rootPage[0].children.data[0].id,
          owner_type: "subject",
          owner_id: newSubjectData[0].id,
          level: 4,
        },
        space_id,
      });

      await permissionApi.create({
        input: {
          model_type: "page",
          model_id: rootPage[0].children.data[1].id,
          owner_type: "subject",
          owner_id: newSubjectData[0].id,
          level: 4,
        },
        space_id,
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

      await teamApi.update({
        id: team_id,
        input: {
          members: {
            [process.env.SUBJECT_TYPE_ID]: [
              ...teamData[0].members.map((member) => member.id),
              data.id,
            ],
          },
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
          : [process.env.APPLICATION_SUBJECT_PROPERTY, process.env.SUBJECT_TYPE_ID];

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

      if (applications.find((application) => application[target_str].id === data.target.id))
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
            team_name: application.team.name,
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
            speciality1: application.subject.speciality1.name,
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
