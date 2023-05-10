import projectApi from "src/sdk/project";

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
