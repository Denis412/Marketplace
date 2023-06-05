import { ref } from "vue";

import BaseService from "./BaseService";

import projectApi from "src/sdk/project";
import teamApi from "src/sdk/team";
import spaceApi from "src/sdk/space";
import groupApi from "src/sdk/group";
import typeApi from "src/sdk/type";
import propertyApi from "src/sdk/property";
import userApi from "src/sdk/user";
import pageApi from "src/sdk/page";
import filesApi from "src/sdk/file";
import applicationApi from "src/sdk/application";
import permissionApi from "src/sdk/permission";
import { reobserveCacheFirst } from "@apollo/client/core/ObservableQuery";

export default class TeamService {
  static fetchTeamById(id) {
    return BaseService.fetchApiById(teamApi.queryTeamById, { id });
  }

  static fetchTeamByName(name, options = {}) {
    return BaseService.fetchApiPaginate(
      teamApi.paginateTeams,
      {
        where: {
          column: "name",
          operator: options.fts ? "FTS" : "EQ",
          value: name,
        },
      },
      { only_one: true }
    );
  }

  static fetchProjectByName(name, options = {}) {
    return BaseService.fetchApiPaginate(
      projectApi.paginateProject,
      {
        where: {
          column: "name",
          operator: options.fts ? "FTS" : "EQ",
          value: name,
        },
      },
      { only_one: true }
    );
  }

  static fetchProjectById(id, space_id) {
    return BaseService.fetchApiById(projectApi.queryProjectById, { id }, { space_id });
  }

  static fetchSubjectsInTeamSpace(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(userApi.paginateSubjects, variables, {
      ...options,
      is_team: true,
    });
  }

  static fetchTeamsPaginate(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(teamApi.paginateTeams, variables, options);
  }

  static fetchTeamProjectsPaginate(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(projectApi.paginateProject, variables, options);
  }

  static async createTeam(variables) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    loading.value = true;

    let file = null;

    if (variables.avatar) {
      const ids = await filesApi.uploadFiles(variables.avatar);

      file = await filesApi.refetchQueryFileById({
        id: ids[0],
      });
    }

    const { result: teamSpace } = await BaseService.apiMutation(spaceApi.create, {
      name: variables.name,
      description: variables.description,
    });

    const { result: createdTeam, error: err } = await BaseService.apiMutation(
      teamApi.create,
      file ? { ...variables, avatar: filesApi.getUrl(file) } : variables,
      { space_id: teamSpace.value.id }
    );

    await BaseService.apiMutation(
      teamApi.update,
      { members: { [process.env.SUBJECT_TYPE_ID]: [createdTeam.value.author_id] } },
      { id: createdTeam.value.id }
    );

    const { result: rootPage, mutate } = await BaseService.apiMutation(
      pageApi.create,
      { title: createdTeam.value.name },
      { space_id: teamSpace.value.id }
    );

    await mutate({
      title: "Командное пространство",
      parent_id: rootPage.value.id,
    });

    await mutate({
      title: "Профиль команды",
      parent_id: rootPage.value.id,
    });

    const { data: subjectType } = await BaseService.fetchApiPaginate(typeApi.paginateType).refetch(
      {
        where: {
          column: "name",
          operator: "EQ",
          value: "subject",
        },
      },
      { only_one: true, space_id: teamSpace.value.id }
    );

    const { data: rootGroup } = await BaseService.fetchApiPaginate(groupApi.paginateGroups).refetch(
      {
        where: {
          column: "name",
          operator: "EQ",
          value: "Команда",
        },
      },
      { only_one: true, space_id: teamSpace.value.id }
    );

    await BaseService.apiMutation(
      groupApi.create,
      {
        name: "Участник",
        description: "Группа участников",
        parent_group_id: rootGroup.id,
      },
      { space_id: teamSpace.value.id },
      [
        {
          variables: {
            name: "Участник",
            description: "Группа участников",
            parent_group_id: rootGroup.id,
          },
        },
        {
          variables: {
            name: "Заказчик",
            description: "Группа заказчиков",
            parent_group_id: rootGroup.id,
          },
        },
        {
          variables: {
            name: "Приглашенный",
            description: "Группа приглашенных",
            parent_group_id: rootGroup.id,
          },
        },
      ]
    );

    const { result: createdTypes } = await BaseService.apiMutation(
      typeApi.create,
      { name: "project", label: "Проект" },
      { space_id: teamSpace.value.id },
      [{ variables: { name: "application", label: "Заявка" } }]
    );

    await BaseService.apiMutation(
      propertyApi.createMany,
      [
        {
          name: "avatar",
          label: "Фотография",
          data_type: "text",
          type_id: createdTypes.value[0].id,
          order: 2,
        },
        {
          name: "team_name",
          label: "Название команды",
          data_type: "text",
          type_id: createdTypes.value[0].id,
          order: 3,
        },
        {
          name: "description",
          label: "Описание проекта",
          data_type: "text",
          type_id: createdTypes.value[0].id,
          order: 4,
        },
        {
          name: "target",
          label: "Цель проекта",
          data_type: "text",
          type_id: createdTypes.value[0].id,
          order: 5,
        },
        {
          name: "space",
          label: "Пространство",
          data_type: "text",
          type_id: createdTypes.value[0].id,
          order: 6,
        },
      ],
      { space_id: teamSpace.value.id }
    );

    await BaseService.apiMutation(
      propertyApi.create,
      {
        label: "Участники",
        name: "members",
        type_id: createdTypes.value[0].id,
        data_type: "object",
        order: 7,
        multiple: {
          status: true,
          max_number: 50,
        },
        meta: {
          related_types: [
            {
              type_id: subjectType.id,
              inverse_relation: true,
              inverse_relation_label: "Проекты",
              inverse_relation_name: "projects_member",
            },
          ],
        },
      },
      { space_id: teamSpace.value.id },
      [
        {
          variables: {
            label: "Заказчики",
            name: "customers",
            type_id: createdTypes.value[0].id,
            data_type: "object",
            order: 8,
            multiple: {
              status: true,
              max_number: 3,
            },
            meta: {
              related_types: [
                {
                  type_id: subjectType.id,
                  inverse_relation: true,
                  inverse_relation_label: "Проекты",
                  inverse_relation_name: "projects_customer",
                },
              ],
            },
          },
        },
        {
          variables: {
            name: "delivery_date",
            label: "Дата сдачи",
            data_type: "datetime",
            type_id: createdTypes.value[0].id,
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
        },
        {
          variables: {
            label: "Руководитель проекта",
            name: "leader",
            type_id: createdTypes.value[0].id,
            data_type: "object",
            order: 8,
            multiple: {
              status: false,
            },
            meta: {
              related_types: [
                {
                  type_id: subjectType.id,
                  inverse_relation: true,
                  inverse_relation_label: "Проекты",
                  inverse_relation_name: "projects_leader",
                },
              ],
            },
          },
        },
        {
          variables: {
            data_type: "toggle",
            name: "is_customer",
            label: "Заказчик",
            type_id: createdTypes.value[1].id,
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
        },
        {
          variables: {
            label: "Проект",
            name: "project",
            type_id: createdTypes.value[1].id,
            data_type: "object",
            order: 6,
            multiple: {
              status: false,
            },
            meta: {
              related_types: [
                {
                  type_id: createdTypes.value[0].id,
                  inverse_relation: true,
                  inverse_relation_label: "Заявки",
                  inverse_relation_name: "applications",
                },
              ],
            },
          },
        },
        {
          variables: {
            label: "Субъект",
            name: "subject",
            type_id: createdTypes.value[1].id,
            data_type: "object",
            order: 2,
            multiple: {
              status: false,
            },
            meta: {
              related_types: [
                {
                  type_id: subjectType.id,
                  inverse_relation: true,
                  inverse_relation_label: "Заявки",
                  inverse_relation_name: "applications",
                },
              ],
            },
          },
        },
        {
          variables: {
            type_id: createdTypes.value[1].id,
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
        },
      ]
    );

    await BaseService.fetchApiPaginate(teamApi.paginateTeams).refetch({
      page: 1,
      perPage: 50,
    });

    loading.value = false;

    return { result, loading, error };
  }

  static async updateTeam(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    loading.value = true;

    const { result: mutateResult } = await BaseService.apiMutation(
      teamApi.update,
      variables,
      options
    );

    result.value = mutateResult.value;

    loading.value = false;

    return { result, loading, error };
  }

  static async sendTeamApplication(variables) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      const [property_id, type_id] =
        variables.sender === "team"
          ? [process.env.APPLICATION_TEAM_PROPERTY, process.env.TEAM_TYPE_ID]
          : [process.env.APPLICATION_SUBJECT_PROPERTY, process.env.SUBJECT_TYPE_ID];

      const target_str = variables.sender === "team" ? "subject" : "team";

      const { data: applications } = await BaseService.fetchApiPaginate(
        applicationApi.paginateApplication
      ).refetch({
        where: {
          column: `${property_id}->${type_id}`,
          operator: "EQ",
          value: variables.sender_id,
        },
      });

      if (applications.find((application) => application[target_str].id === variables.target.id))
        throw new Error("Уже есть заявка!");

      const { result: createdApplication } = await BaseService.apiMutation(applicationApi.create, {
        name: variables.name,
        subject: variables.subject,
        team: variables.team,
        status: variables.status,
        sender: variables.sender,
      });
      result.value = createdApplication.value;

      await this.fetchTeamById(
        variables.sender === "team" ? variables.sender_id : variables.target.id
      ).refetch();

      console.log("end");
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async acceptTeamApplication(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      if (options?.is_team) {
        const { data: groupData } = await BaseService.fetchApiPaginate(
          groupApi.paginateGroups,
          {},
          {
            only_one: true,
            space_id: options.space_id,
          }
        ).refetch({
          where: {
            column: "name",
            operator: "EQ",
            value: "Участник",
          },
        });

        await groupApi.invite({
          input: {
            name: variables.application.subject.fullname.first_name,
            surname: variables.application.subject.fullname.last_name,
            email: variables.application.subject.email.email,
            group_id: groupData.id,
          },
          space_id: options.space_id,
        });

        const { data: rootPage } = await BaseService.fetchApiPaginate(
          pageApi.paginateRootPages,
          {},
          {
            only_one: true,
            space_id: options.space_id,
          }
        ).refetch({
          where: {
            column: "title",
            operator: "EQ",
            value: variables.application.team.name,
          },
        });

        const { data: newSubjectData } = await BaseService.fetchApiPaginate(
          userApi.paginateSubjects,
          {},
          { only_one: true, is_team: true, space_id: options.space_id }
        ).refetch({
          where: {
            column: "email",
            operator: "FTS",
            value: variables.application.subject.email.email,
          },
        });

        await BaseService.apiMutation(
          permissionApi.create,
          {
            model_type: "page",
            model_id: rootPage.id,
            owner_type: "subject",
            owner_id: newSubjectData.id,
            level: 4,
          },
          { space_id: options.space_id },
          [
            {
              variables: {
                model_type: "page",
                model_id: rootPage.children.data[0].id,
                owner_type: "subject",
                owner_id: newSubjectData.id,
                level: 4,
              },
            },
            {
              variables: {
                model_type: "page",
                model_id: rootPage.children.data[1].id,
                owner_type: "subject",
                owner_id: newSubjectData.id,
                level: 4,
              },
            },
          ]
        );

        const { data: teamData } = await this.fetchTeamById(
          variables.application.team.id
        ).refetch();

        await this.updateTeam(
          {
            members: {
              [process.env.SUBJECT_TYPE_ID]: [
                ...teamData.members.map((member) => member.id),
                variables.application.subject.id,
              ],
            },
          },
          { id: variables.application.team.id }
        );

        await BaseService.apiMutation(
          applicationApi.update,
          { status: process.env.APPLICATION_STATUS_APPROVED },
          { id: variables.application.id }
        );

        await applicationApi.deleteById(variables.application.id);
      } else
        await BaseService.apiMutation(
          applicationApi.update,
          { status: process.env.APPLICATION_STATUS_APPROVED },
          { id: variables.application.id }
        );

      await BaseService.fetchApiPaginate(teamApi.paginateTeams).refetch({
        where: {
          column: "name",
          operator: "EQ",
          value: variables.application.team.name,
        },
      });
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async cancelTeamApplication(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      if (
        (options.is_team && variables.application.sender === "team") ||
        (!options.is_team && variables.application.sender === "subject")
      )
        await applicationApi.deleteById(variables.application.id);
      else
        await applicationApi.update({
          id: variables.application.id,
          input: {
            status: process.env.APPLICATION_STATUS_REJECTED,
          },
        });

      await BaseService.fetchApiPaginate(
        userApi.paginateSubjects,
        {
          where: {
            column: "user_id",
            operator: "EQ",
            value: JSON.parse(localStorage.getItem("user-data")).user_id,
          },
        },
        { only_one: true, is_my_teams: true }
      );

      await this.fetchTeamByName(variables.application.team.name).refetch();
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async sendProjectApplication(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      const { data: subjectType } = await BaseService.fetchApiPaginate(
        typeApi.paginateType
      ).refetch(
        {
          where: {
            column: "name",
            operator: "EQ",
            value: "subject",
          },
        },
        { only_one: true, space_id: options.space_id }
      );

      const { data: applicationType } = await BaseService.fetchApiPaginate(
        typeApi.paginateType
      ).refetch(
        {
          where: {
            column: "name",
            operator: "EQ",
            value: "application",
          },
        },
        { only_one: true, space_id: options.space_id }
      );

      const { data: projectType } = await BaseService.fetchApiPaginate(
        typeApi.paginateType
      ).refetch(
        {
          where: {
            column: "name",
            operator: "EQ",
            value: "project",
          },
        },
        { only_one: true, space_id: options.space_id }
      );

      const { data: subjectInTeamSpace } = await BaseService.fetchApiPaginate(
        userApi.paginateSubjects
      ).refetch(
        {
          where: {
            column: "email",
            operator: "FTS",
            value: variables.subject.email.email,
          },
        },
        { is_team: true, only_one: true, space_id: options.space_id }
      );

      const { data: subjectProperty } = await BaseService.fetchApiPaginate(
        propertyApi.paginateProperties
      ).refetch(
        {
          where: {
            and: [
              {
                column: "name",
                operator: "EQ",
                value: "subject",
              },
              {
                column: "type_id",
                operator: "EQ",
                value: applicationType.id,
              },
            ],
          },
        },
        { only_one: true, space_id: options.space_id }
      );

      const { data: statusProperty } = await BaseService.fetchApiPaginate(
        propertyApi.paginateProperties
      ).refetch(
        {
          where: {
            and: [
              {
                column: "name",
                operator: "EQ",
                value: "status",
              },
              {
                column: "type_id",
                operator: "EQ",
                value: applicationType.id,
              },
            ],
          },
        },
        { only_one: true, space_id: options.space_id }
      );

      const applications = await applicationApi.refetchPaginateApplications({
        page: 1,
        perPage: 100,
        where: {
          column: `${subjectProperty.id}->${subjectType.id}`,
          operator: "EQ",
          value: subjectInTeamSpace.id,
        },
      });

      if (applications.find((application) => application.project.id === variables.project_id))
        throw new Error("Уже есть заявка!");

      const { result: createdApplication } = await BaseService.apiMutation(
        applicationApi.create,
        {
          name: variables.project_name,
          subject: {
            [subjectType.id]: subjectInTeamSpace.id,
          },
          project: {
            [projectType.id]: variables.project_id,
          },
          status: statusProperty.meta.options[0].id,
          is_customer: options.is_customer === "false" || !options.is_customer ? false : true,
        },
        { space_id: options.space_id }
      );

      result.value = createdApplication.value;

      await BaseService.apiMutation(
        permissionApi.create,
        {
          model_type: "object",
          model_id: result.value.id,
          owner_type: "subject",
          owner_id: subjectInTeamSpace.id,
          level: 5,
        },
        { space_id: options.space_id }
      );

      await this.fetchProjectById(variables.project_id, options.space_id).refetch();
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async acceptProjectApplication(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      if (options.is_project) {
        const { data: subjectType } = await BaseService.fetchApiPaginate(
          typeApi.paginateType,
          {
            where: {
              column: "name",
              operator: "EQ",
              value: "subject",
            },
          },
          { space_id: options.space_id, only_one: true }
        ).refetch();

        const { data: project } = await this.fetchProjectById(
          variables.application.project.id,
          options.space_id
        ).refetch();

        await BaseService.apiMutation(
          permissionApi.create,
          {
            model_type: "object",
            model_id: variables.application.project.id,
            owner_type: "subject",
            owner_id: variables.application.subject.id,
            level: 4,
          },
          { space_id: options.space_id }
        );

        const prop = variables.application.is_customer
          ? {
              customers: {
                [subjectType.id]: [
                  ...project.customers.map((customer) => customer.id),
                  variables.application.subject.id,
                ],
              },
            }
          : {
              members: {
                [subjectType.id]: [
                  ...project.members.map((member) => member.id),
                  variables.application.subject.id,
                ],
              },
            };

        await projectApi.update({
          id: variables.application.project.id,
          input: {
            name: variables.application.name,
            ...prop,
          },
          space_id: variables.application.project.space,
        });

        await applicationApi.deleteById(
          variables.application.id,
          variables.application.project.space
        );
      } else {
        const { data: applicationType } = await BaseService.fetchApiPaginate(
          typeApi.paginateType,
          {
            where: {
              column: "name",
              operator: "EQ",
              value: "application",
            },
          },
          { space_id: options.space_id, only_one: true }
        ).refetch();

        const { data: statusProperty } = await BaseService.fetchApiPaginate(
          propertyApi.paginateProperties,
          {
            where: {
              and: [
                {
                  column: "name",
                  operator: "EQ",
                  value: "status",
                },
                {
                  column: "type_id",
                  operator: "EQ",
                  value: applicationType.id,
                },
              ],
            },
          },
          { space_id: options.space_id, only_one: true }
        ).refetch();

        await applicationApi.update({
          id: variables.application.id,
          input: {
            name: variables.application.name,
            status: statusProperty.meta.options[2].id,
          },
          space_id: options.space_id,
        });
      }

      await this.fetchProjectById(
        variables.application.project.id,
        variables.application.project.space
      ).refetch();
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async cancelProjectApplication(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      if (options.is_project)
        await applicationApi.deleteById(variables.application.id, options.space_id);
      else {
        // console.log(application, is_project, options.space_id);

        const { data: statusProperty } = await BaseService.fetchApiPaginate(
          propertyApi.paginateProperties,
          {
            where: {
              and: [
                {
                  column: "name",
                  operator: "EQ",
                  value: "status",
                },
                {
                  column: "type_id",
                  operator: "EQ",
                  value: variables.application.type_id,
                },
              ],
            },
          },
          { space_id: options.space_id, only_one: true }
        ).refetch();

        await applicationApi.update({
          id: variables.application.id,
          input: {
            name: variables.application.name,
            status: statusProperty.meta.options[1].id,
          },
          space_id: options.space_id,
        });
      }

      await this.fetchProjectById(
        variables.application.project.id,
        variables.application.project.space
      ).refetch();
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async deleteSpecialistFromTeam(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const { project, subject } = variables;

    try {
      loading.value = true;
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }

  static async deleteSpecialistFromProject(variables, options) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const { project, subject } = variables;

    try {
      loading.value = true;

      console.log("pr su", project, subject, subject.email.email);

      const { data: subjectType } = await BaseService.fetchApiPaginate(
        typeApi.paginateType,
        {
          where: {
            column: "name",
            operator: "EQ",
            value: "subject",
          },
        },
        { space_id: options.space_id, only_one: true }
      ).refetch();

      const { data: subjectInTeamSpace } = await BaseService.fetchApiPaginate(
        userApi.paginateSubjects
      ).refetch(
        {
          where: {
            column: "email",
            operator: "FTS",
            value: subject.email?.email,
          },
        },
        { is_team: true, only_one: true, space_id: options.space_id }
      );

      console.log("subject type", subjectType, subjectInTeamSpace, options);

      const { data: membersGroup } = await BaseService.fetchApiPaginate(
        groupApi.paginateGroups
      ).refetch(
        {
          where: {
            column: "name",
            operator: "EQ",
            value: "Участник",
          },
        },
        { only_one: true, space_id: options.space_id }
      );

      const collection = options.is_customer ? "customers" : "members";

      console.log("membersGroup", membersGroup);

      const { data: targetPermission } = await BaseService.fetchApiPaginate(
        permissionApi.paginatePermissionTreeSubjects,
        {
          modelId: project.id,
          groupId: membersGroup.id,
          where: {
            column: "subject_id",
            operator: "EQ",
            value: subjectInTeamSpace.id,
          },
        },
        { only_one: true, space_id: options.space_id }
      ).refetch();

      console.log("targetPermission", targetPermission);

      await BaseService.apiMutation(
        permissionApi.deleteById,
        {},
        { id: targetPermission.permission_rule_id, space_id: options.space_id }
      );

      const del = await projectApi.update({
        id: project.id,
        input: {
          name: project.name,
          [collection]: {
            [subjectType.id]: project[collection]
              .filter((sb) => sb.email.email !== subject.email.email)
              .map((subject) => subject.id),
          },
        },
        space_id: options.space_id,
      });

      await this.fetchProjectById(project.id, options.space_id).refetch();

      console.log("del", del);
    } catch (e) {
      error.value = e;

      console.log(e);
    }

    loading.value = false;

    return { result, loading, error };
  }
}
