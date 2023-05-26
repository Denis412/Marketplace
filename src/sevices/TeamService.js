import projectApi from "src/sdk/project";
import BaseService from "./BaseService";
import teamApi from "src/sdk/team";
import { ref } from "vue";
import spaceApi from "src/sdk/space";
import groupApi from "src/sdk/group";
import typeApi from "src/sdk/type";

export default class TeamService {
  static fetchTeamsPaginate(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(teamApi.paginateProject, variables, options);
  }

  static fetchTeamProjectsPaginate(variables = {}, options = {}) {
    return BaseService.fetchApiPaginate(projectApi.paginateProject, variables, options);
  }

  static async createTeam(variables) {
    const result = ref(null);
    const loading = ref(false);
    const error = ref(null);

    await BaseService.apiMutation(teamApi.create, variables);

    const teamSpace = await BaseService.apiMutation(spaceApi.create, {
      name: variables.name,
      description: variables.description,
    });

    // const teamSpace = await spaceApi.create({
    //   name: variables.name,
    //   description: variables.description,
    // });

    //Создание групп

    const rootGroup = await BaseService.fetchApiPaginate(groupApi.paginateGroups).refetch(
      {
        where: {
          column: "name",
          operator: "EQ",
          value: "Команда",
        },
      },
      { only_one: true, space_id: teamSpace.id }
    );

    await BaseService.apiMutation(
      groupApi.create,
      {
        name: "Участник",
        description: "Группа участников",
        parent_group_id: rootGroup.id,
      },
      { space_id: teamSpace.id },
      [
        { name: "Участник", description: "Группа участников", parent_group_id: rootGroup.id },
        { name: "Заказчик", description: "Группа заказчиков", parent_group_id: rootGroup.id },
        { name: "Приглашенный", description: "Группа приглашенных", parent_group_id: rootGroup.id },
      ]
    );

    //Создание типа проекта

    const projectType = await BaseService.apiMutation(
      typeApi.create,
      { name: "project", label: "Проект" },
      { space_id: teamSpace.id }
    );

    return { result, loading, error };
  }
}
