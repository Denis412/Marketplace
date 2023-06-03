import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";

import { teamCreate, teamDelete, teamUpdate } from "src/graphql/team/mutations";
import { getTeamById, getTeamsWithWhere } from "src/graphql/team/queries";
import { spaceHeader } from "src/utils/spaceHeader";

import apolloClient from "src/apollo/apollo-client";

provideApolloClient(apolloClient);

const { mutate: creatingTeam } = useMutation(teamCreate, spaceHeader(process.env.MAIN_SPACE_ID));
const { mutate: updatingTeam } = useMutation(teamUpdate, spaceHeader(process.env.MAIN_SPACE_ID));
const { mutate: deletingTeam } = useMutation(teamDelete, spaceHeader(process.env.MAIN_SPACE_ID));

const queryTeamById = ({ id }) => {
  return useQuery(getTeamById, { id }, spaceHeader(process.env.MAIN_SPACE_ID));
};

const refetchQueryTeamById = async ({ id }) => {
  const { refetch } = paginateTeams({ id });

  const { data: teamData } = await refetch();

  return teamData.get_team;
};

const paginateTeams = ({ page, perPage, where }) => {
  return useQuery(
    getTeamsWithWhere,
    { page, perPage, where },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateTeams = async ({ page, perPage, where }) => {
  const { refetch } = paginateTeams({ page, perPage, where });

  const { data: teamsData } = await refetch();

  // console.log("refetch paginate teams", teamsData);

  return teamsData.paginate_team.data;
};

const create = async ({ input, space_id }) => {
  // name, description, leader_telegram_chat_id
  const { data: teamData } = await creatingTeam({
    input: { ...input, space: space_id },
  });

  // console.log("create team", teamData);

  return teamData.create_team.record;
};

const update = async ({ id, input }) => {
  const { data: teamData } = await updatingTeam({
    id,
    input,
  });

  // console.log("update team", teamData);

  return teamData.update_team.record;
};

const deleteById = async (id) => {
  const { data: teamData } = await deletingTeam({
    id: id,
  });

  // console.log("delete team", teamData);

  return teamData.delete_team;
};

const teamApi = {
  create,
  update,
  deleteById,
  queryTeamById,
  refetchQueryTeamById,
  paginateTeams,
  refetchPaginateTeams,
};

export default teamApi;
