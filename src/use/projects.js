import { ref } from "vue";

import projectApi from "src/sdk/project";
import spaceApi from "src/sdk/space";
import groupApi from "src/sdk/group";
import pageApi from "src/sdk/page";
import typeApi from "src/sdk/type";
import propertyApi from "src/sdk/property";
import userApi from "src/sdk/user";

export const useProjectsQuery = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  function getWithWere({
    page,
    perPage,
    where,
    team,
    space_id,
    project_space,
  }) {
    try {
      loading.value = true;

      const parameters = {
        page: page || 1,
        perPage: perPage || 50,
        where,
        space_id: space_id || team.value.space,
        project_space,
      };

      const subjectParameters = {
        page: 1,
        perPage: 100,
        is_team: true,
        space_id,
      };

      const {
        result: projects,
        loading: projectsLoading,
        error: projectsError,
      } = projectApi.paginateProject(parameters);

      const { result: subjects, loading: subjectsLoading } =
        groupApi.paginateGroups({
          page: 1,
          perPage: 100,
          is_subjects: true,
          space_id,
        });

      async function refetch({ only_one }) {
        try {
          loading.value = true;

          const projects = await projectApi.refetchPaginateProjects(parameters);
          const subjects = await groupApi.refetchPaginateGroups({
            page: 1,
            perPage: 100,
            space_id,
            is_subjects: true,
          });

          result.value = {
            projects: only_one ? projects[0] : projects,
            subjects: subjects,
          };

          loading.value = false;
        } catch (e) {
          error.value = e;
          loading.value = false;

          console.log(e);
        }
      }

      loading.value = false;

      return {
        projects,
        subjects,
        projectsLoading,
        subjectsLoading,
        projectsError,
        refetch,
      };
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  async function getById({ id, team }) {
    try {
      loading.value = true;

      result.value = await projectApi.refetchProjectById({
        id,
        space_id: team.value.space,
      });

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, getWithWere, getById };
};

export const useProjectCreate = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function createProject({ name, team_name, space_id }) {
    try {
      loading.value = true;

      const spaceData = await spaceApi.create({
        name: name,
        description: "Проектное пространство",
      });

      await projectApi.create({
        input: { name, space: spaceData.id },
        space_id,
      });

      const projectTypeData = await typeApi.create({
        input: {
          name: "project",
          label: "Проект",
        },
        space_id: spaceData.id,
      });

      const subjectType = await typeApi.refetchPaginateType({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "subject",
        },
        space_id: spaceData.id,
      });

      await propertyApi.create({
        input: {
          name: "major",
          label: "Специальность",
          data_type: "text",
          type_id: subjectType[0].id,
          order: 2,
        },
        space_id: spaceData.id,
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
            order: 6,
          },
        ],
        space_id: spaceData.id,
      });

      await propertyApi.create({
        input: {
          name: "delivery_date",
          label: "Дата сдачи",
          data_type: "datetime",
          type_id: projectTypeData.id,
          order: 4,
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
        space_id: spaceData.id,
      });

      const projectData = await projectApi.create({
        input: { name, team_name },
        space_id: spaceData.id,
      });

      const rootPageData = await pageApi.create({
        input: {
          title: projectData.name,
        },
        space_id: spaceData.id,
      });

      await pageApi.create({
        input: {
          title: "О проекте",
          parent_id: rootPageData.id,
        },
        space_id: spaceData.id,
      });

      await pageApi.create({
        input: {
          title: "Список задач",
          parent_id: rootPageData.id,
        },
        space_id: spaceData.id,
      });

      await pageApi.create({
        input: {
          title: "Документы",
          parent_id: rootPageData.id,
        },
        space_id: spaceData.id,
      });

      const teamGroup = await groupApi.refetchPaginateGroups({
        page: 1,
        perPage: 1,
        where: {
          column: "name",
          operator: "EQ",
          value: "Команда",
        },
        space_id: spaceData.id,
      });

      await groupApi.create(spaceData.id, {
        name: "Заказчики",
        description: "Группа заказчиков",
        parent_group_id: teamGroup[0].id,
      });

      await groupApi.create(spaceData.id, {
        name: "Участники",
        description: "Группа участников",
        parent_group_id: teamGroup[0].id,
      });

      await useProjectsQuery()
        .getWithWere({
          space_id,
        })
        .refetch({});

      result.value = projectData;

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, createProject };
};

// export const useProject = () => {
//   const create = async ({ input, space_id }) => {
//     await projectApi.create({ input, space_id });

//     await projectApi.refetchPaginateProjects({ page: 100, perPage: 50 });
//   };

//   const update = async ({ id, input, space_id }) => {
//     await projectApi.update({ id, input, space_id });

//     await projectApi.refetchPaginateProjects({ page: 100, perPage: 50 });
//   };

//   const deleteById = async (id) => {
//     await projectApi.deleteProjectById(id);

//     await refetchPaginateProjects({ page: 100, perPage: 50 });
//   };

//   return {
//     create,
//     update,
//     deleteById,
//   };
// };
