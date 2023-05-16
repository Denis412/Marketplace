import { ref } from "vue";

import projectApi from "src/sdk/project";
import pageApi from "src/sdk/page";

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

  async function createProject({ name, space_id }) {
    try {
      loading.value = true;

      const projectData = await projectApi.create({
        input: { name },
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
