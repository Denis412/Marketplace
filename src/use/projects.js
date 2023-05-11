import { ref } from "vue";

import projectApi from "src/sdk/project";
import spaceApi from "src/sdk/space";
import propertyApi from "src/sdk/property";
import teamApi from "src/sdk/team";

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

      await projectApi.refetchPaginateProjects({
        page: 1,
        perPage: 50,
        space_id,
      });

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

export const useProject = () => {
  const create = async ({ input, space_id }) => {
    await projectApi.create({ input, space_id });

    await projectApi.refetchPaginateProjects({ page: 100, perPage: 50 });
  };

  const update = async ({ id, input, space_id }) => {
    await projectApi.update({ id, input, space_id });

    await projectApi.refetchPaginateProjects({ page: 100, perPage: 50 });
  };

  const deleteById = async (id) => {
    await projectApi.deleteProjectById(id);

    await refetchPaginateProjects({ page: 100, perPage: 50 });
  };

  return {
    create,
    update,
    deleteById,
  };
};
