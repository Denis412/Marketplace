import { ref } from "vue";

import projectApi from "src/sdk/project";
import BaseService from "./BaseService";
import teamApi from "src/sdk/team";
import spaceApi from "src/sdk/space";
import groupApi from "src/sdk/group";
import typeApi from "src/sdk/type";
import propertyApi from "src/sdk/property";
import userApi from "src/sdk/user";
import pageApi from "src/sdk/page";

export default class TeamService {
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

    const { result: teamSpace } = await BaseService.apiMutation(spaceApi.create, {
      name: variables.name,
      description: variables.description,
    });

    const { result: createdTeam, error: err } = await BaseService.apiMutation(
      teamApi.create,
      variables,
      { space_id: teamSpace.value.id }
    );

    console.log("team", createdTeam.value);

    if (err.value) console.log("error", err.value);

    await BaseService.apiMutation(
      teamApi.update,
      { members: { [process.env.SUBJECT_TYPE_ID]: [createdTeam.value.author_id] } },
      { id: createdTeam.value.id }
    );

    //Создание страниц

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

    //Создание групп

    const subjectType = await BaseService.fetchApiPaginate(typeApi.paginateType).refetch(
      {
        where: {
          column: "name",
          operator: "EQ",
          value: "subject",
        },
      },
      { only_one: true, space_id: teamSpace.value.id }
    );

    const rootGroup = await BaseService.fetchApiPaginate(groupApi.paginateGroups).refetch(
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

    //Создание типа проекта

    const { result: createdTypes } = await BaseService.apiMutation(
      typeApi.create,
      { name: "project", label: "Проект" },
      { space_id: teamSpace.value.id },
      [{ variables: { name: "application", label: "Заявка" } }]
    );

    console.log("types", createdTypes.value[0]);

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

    console.log("subject type", subjectType);

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

    await this.fetchTeamsPaginate().refetch();

    console.log("refetch teams");

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
}
