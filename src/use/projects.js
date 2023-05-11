import { ref } from "vue";

import projectApi from "src/sdk/project";
import spaceApi from "src/sdk/space";

export const useProjectsQuery = () => {
  const result = ref(null);
  const loading = ref(false);
  const error = ref(null);

  function getWithWere({ where, team, space_id }) {
    try {
      loading.value = true;

      const {
        result: paginateResult,
        loading: paginateLoading,
        error: paginateError,
      } = projectApi.paginateProject({
        page: 1,
        perPage: 50,
        where,
        space_id: space_id || team.value.space,
      });

      async function refetch({ only_one }) {
        try {
          loading.value = true;

          const projects = await projectApi.refetchPaginateProjects({
            page: 1,
            perPage: 50,
            where,
            space_id: space_id || team.value.space,
          });

          loading.value = false;

          return only_one ? projects[0] : projects;
        } catch (e) {
          error.value = e;
          loading.value = false;

          console.log(e);
        }
      }

      loading.value = false;

      return { paginateResult, paginateLoading, paginateError, refetch };
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

      const spaceData = await spaceApi.create({
        name: name,
        description: "Проектное пространство",
      });

      const projectData = await projectApi.create({
        input: { name },
        space_id,
      });

      const projectUpdateData = await projectApi.update({
        id: projectData.id,
        input: {
          name: projectData.name,
          space: spaceData.id,
        },
        space_id,
      });

      await useProjectsQuery()
        .getWithWere({
          space_id,
        })
        .refetch({});

      result.value = projectUpdateData;

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
