import { ref } from "vue";

import projectApi from "src/sdk/project";
import pageApi from "src/sdk/page";
import teamApi from "src/sdk/team";
import userApi from "src/sdk/user";

export const useProjectsQuery = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  function getWithWere({ page, perPage, where, space_id }) {
    try {
      loading.value = true;

      const parameters = {
        page: page || 1,
        perPage: perPage || 50,
        where,
        space_id,
      };

      console.log(parameters);

      const {
        result: projects,
        loading: projectsLoading,
        error: projectsError,
      } = projectApi.paginateProject(parameters);

      async function refetch({ only_one }) {
        try {
          loading.value = true;

          const projects = await projectApi.refetchPaginateProjects(parameters);

          result.value = only_one ? projects[0] : projects;

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
        projectsLoading,
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

  async function createProject({ name, team, user, space_id }) {
    try {
      loading.value = true;

      const projectInMainSpace = await projectApi.create({
        input: {
          name,
          team: {
            [process.env.TEAM_TYPE_ID]: team.id,
          },
        },
      });

      const subject = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "user_id",
          operator: "EQ",
          value: user.user_id,
        },
        is_team: true,
        space_id,
      });

      const subjectInMainSpace = await userApi.refetchPaginateSubjects({
        page: 1,
        perPage: 1,
        where: {
          column: "user_id",
          operator: "EQ",
          value: user.user_id,
        },
      });

      console.log("hi", [
        ...subjectInMainSpace[0].projects,
        projectInMainSpace.id,
      ]);

      await userApi.update(subjectInMainSpace[0].id, {
        projects: {
          [process.env.PROJECT_TYPE_ID]: [
            ...subjectInMainSpace[0].projects.map((project) => project.id),
            projectInMainSpace.id,
          ],
        },
      });

      console.log("subject", subject);

      const projectData = await projectApi.create({
        input: {
          name,
          team_name: team.name,
          members: {
            [subject[0].type_id]: [subject[0].id],
          },
        },
        space_id,
      });

      const rootProjectPageData = await pageApi.create({
        input: {
          title: projectData.name,
        },
        space_id,
      });

      await pageApi.create({
        input: {
          title: "О проекте",
          parent_id: rootProjectPageData.id,
        },
        space_id,
      });

      await pageApi.create({
        input: {
          title: "Список задач",
          parent_id: rootProjectPageData.id,
        },
        space_id,
      });

      await pageApi.create({
        input: {
          title: "Документы",
          parent_id: rootProjectPageData.id,
        },
        space_id,
      });

      await useProjectsQuery()
        .getWithWere({
          space_id,
        })
        .refetch({});

      await teamApi.refetchPaginateTeams({
        page: 1,
        perPage: 1,
        where: {
          column: "id",
          operator: "EQ",
          value: team.id,
        },
      });

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

export const useProjectUpdate = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function updateProject({ id, input, space_id }) {
    try {
      loading.value = true;

      console.log("space", { id, input, space_id });

      result.value = await projectApi.update({ id, input, space_id });

      await projectApi.refetchPaginateProjects({
        page: 1,
        perPage: 100,
        space_id,
      });

      await useProjectsQuery()
        .getWithWere({
          page: 1,
          perPage: 1,
          where: {
            column: "name",
            operator: "EQ",
            value: result.value.name,
          },
          space_id,
          project_space: true,
        })
        .refetch({});

      loading.value = false;
    } catch (e) {
      error.value = e;
      loading.value = false;

      console.log(e);
    }
  }

  return { result, loading, error, updateProject };
};
