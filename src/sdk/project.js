import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import {
  projectCreate,
  projectDelete,
  projectUpdate,
} from "src/graphql/project/mutations";
import { getProjectById, paginateProjects } from "src/graphql/project/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingProject } = useMutation(projectCreate);
const { mutate: updatingProject } = useMutation(projectUpdate);
const { mutate: deletingProject } = useMutation(projectDelete);

const paginateProject = ({ page, perPage, where, space_id }) => {
  return useQuery(
    paginateProjects,
    { page, perPage, where },
    spaceHeader(space_id)
  );
};

const gueryProjectById = ({ id, space_id }) => {
  return useQuery(getProjectById, { id }, spaceHeader(space_id));
};

const refetchPaginateProjects = async ({ page, perPage, where, space_id }) => {
  const { refetch } = paginateProject({ page, perPage, where, space_id });

  const { data: projectsData } = await refetch();

  console.log("refetch paginate project", projectsData);

  return projectsData.paginate_project.data;
};

const refetchProjectById = async ({ id, space_id }) => {
  const { refetch } = gueryProjectById({ id, space_id });

  const { data: projectData } = await refetch();

  console.log("refetch project", projectData);

  return projectData.get_project;
};

const create = async ({ input, space_id }) => {
  const { data: projectData } = await creatingProject(
    { input },
    spaceHeader(space_id)
  );

  console.log("create project", projectData);

  return projectData.create_project;
};

const update = async ({ id, input, space_id }) => {
  const { data: projectData } = await updatingProject(
    { id, input },
    spaceHeader(space_id)
  );

  console.log("update project", projectData);

  return projectData.update_project;
};

const deleteProjectById = async (id) => {
  await deletingProject({ id });
};

const projectApi = {
  paginateProject,
  refetchPaginateProjects,
  gueryProjectById,
  refetchProjectById,
  create,
  update,
  deleteProjectById,
};

export default projectApi;