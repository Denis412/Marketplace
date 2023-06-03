import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { projectCreate, projectDelete, projectUpdate } from "src/graphql/project/mutations";
import {
  getProjectById,
  projectsPaginateInMainSpace,
  projectsPaginateInTeamSpace,
} from "src/graphql/project/queries";
import { spaceHeader } from "src/utils/spaceHeader";

provideApolloClient(apolloClient);

const { mutate: creatingProject } = useMutation(projectCreate);
const { mutate: updatingProject } = useMutation(projectUpdate);
const { mutate: deletingProject } = useMutation(projectDelete);

const queryProjectById = ({ id, space_id, fetchPolicy }) => {
  return useQuery(
    getProjectById,
    { id },
    fetchPolicy
      ? { fetchPolicy, ...spaceHeader(space_id || process.env.MAIN_SPACE_ID) }
      : spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchProjectById = async ({ id, space_id, fetchPolicy }) => {
  const { refetch } = queryProjectById({ id, space_id, fetchPolicy });

  const { data: projectData } = await refetch();

  return projectData.get_project;
};

const paginateProject = ({ page, perPage, where, space_id }) => {
  const query = space_id ? projectsPaginateInTeamSpace : projectsPaginateInMainSpace;

  return useQuery(
    query,
    { page, perPage, where },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateProjects = async ({ page, perPage, where, space_id }) => {
  const { refetch } = paginateProject({
    page,
    perPage,
    where,
    space_id,
  });

  const { data: projectsData } = await refetch();

  // console.log("refetch paginate project", projectsData);

  return projectsData.paginate_project.data;
};

const create = async ({ input, space_id }) => {
  const { data: projectData } = await creatingProject(
    { input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("create project", projectData);

  return projectData.create_project.record;
};

const update = async ({ id, input, space_id }) => {
  // console.log({ id, input, space_id });
  const { data: projectData } = await updatingProject(
    { id, input },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("update project", projectData);

  return projectData.update_project.record;
};

const deleteProjectById = async ({ id, space_id }) => {
  const { data: projectData } = await deletingProject(
    { id },
    spaceHeader(space_id || process.env.MAIN_SPACE_ID)
  );

  // console.log("delete project", projectData);

  return projectData.delete_project;
};

const projectApi = {
  queryProjectById,
  refetchProjectById,
  paginateProject,
  refetchPaginateProjects,
  refetchProjectById,
  create,
  update,
  deleteProjectById,
};

export default projectApi;
