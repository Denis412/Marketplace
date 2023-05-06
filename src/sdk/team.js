import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { createSpace } from "src/graphql/space/mutations";
import { teamCreate, teamDelete, teamUpdate } from "src/graphql/team/mutations";
import { getTeamsWithWhere } from "src/graphql/team/queries";
import groupApi from "./group";
import spaceApi from "./space";

provideApolloClient(apolloClient);

const { mutate: creatingTeam } = useMutation(teamCreate, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});

const { mutate: updatingTeam } = useMutation(teamUpdate, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});

const { mutate: deletingTeam } = useMutation(teamDelete, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});

const { refetch: refetchingTeams } = useQuery(
  getTeamsWithWhere,
  {},
  {
    context: {
      headers: {
        space: process.env.MAIN_SPACE_ID,
      },
    },
  }
);

const queryMyTeams = (author_id) => {
  return useQuery(
    getTeamsWithWhere,
    {
      where: {
        column: "author_id",
        operator: "EQ",
        value: `${author_id}`,
      },
    },
    {
      context: {
        headers: {
          space: process.env.MAIN_SPACE_ID,
        },
      },
    }
  );
};

const refetchTeamByName = async (name) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "name",
      operator: "EQ",
      value: `${name}`,
    },
  });

  return teamData.paginate_team.data[0];
};

const checkStatus = async (status) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "ready_for_orders",
      operator: "EQ",
      value: status.value,
    },
  });

  return teamData.paginate_team.data;
};

const checkChar = async (char) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "name",
      operator: "FTS",
      value: `${char}`,
    },
  });

  return teamData.paginate_team.data;
};

const queryAllTeams = () => {
  return useQuery(
    getTeamsWithWhere,
    {},
    {
      context: {
        headers: {
          space: process.env.MAIN_SPACE_ID,
        },
      },
    }
  );
};

const queryTeamByName = (name) => {
  return useQuery(
    getTeamsWithWhere,
    {
      where: {
        column: "name",
        operator: "EQ",
        value: `${name}`,
      },
    },
    {
      context: {
        headers: {
          space: process.env.MAIN_SPACE_ID,
        },
      },
    }
  );
};

const refetchAllTeams = async () => {
  const { data: teamsData } = await refetchingTeams();

  return teamsData.paginate_team.data;
};

const refetchMyTeams = async (author_id) => {
  const { data: teamsData } = await refetchingTeams({
    where: {
      column: "author_id",
      operator: "EQ",
      value: `${author_id}`,
    },
  });

  return teamsData.paginate_team.data;
};

const createMainSpace = async ({ name, description }) => {
  const spaceData = await spaceApi.create({
    name,
    description,
  });

  const teamGroup = await groupApi.getGroupByName(
    spaceData.recordId,
    "Команда"
  );

  const createdGroupMembers = await groupApi.create(spaceData.recordId, {
    name: "Участники",
    description: "Группа участников",
    parent_group_id: teamGroup.id,
  });

  const createdGroupInvited = await groupApi.create(spaceData.recordId, {
    name: "Приглашенные",
    description: "Группа приглашенных",
    parent_group_id: teamGroup.id,
  });

  console.log("space", spaceData);
  console.log("groups", teamGroup, createdGroupMembers, createdGroupInvited);

  return spaceData;
};

const create = async ({ name, description }) => {
  const spaceData = await createMainSpace({ name, description });

  const { data: teamData } = await creatingTeam({
    input: {
      name,
      description,
      space: `${spaceData.recordId}`,
    },
  });

  refetchMyTeams(teamData.create_team.record.author_id);

  return teamData.create_team.record.id;
};

const update = async (id, data) => {
  const { data: teamData } = await updatingTeam({
    id,
    input: data,
  });

  return teamData.update_team.status;
};

const deleteTeam = async (team) => {
  console.log(team);

  const spaceData = await spaceApi.deleteById(team.space);

  const { data: teamData } = await deletingTeam({
    id: team.id,
  });

  await refetchAllTeams();

  console.log("deletedSpace", spaceData, teamData);

  return teamData.delete_team;
};

const checkName = async ({ name }) => {
  const { data: teamData } = await refetchingTeams({
    where: {
      column: "name",
      operator: "EQ",
      value: `${name}`,
    },
  });

  return teamData.paginate_team.paginatorInfo.count == 0;
};

const teamApi = {
  create,
  update,
  deleteTeam,
  checkName,
  refetchAllTeams,
  queryMyTeams,
  queryAllTeams,
  checkStatus,
  queryTeamByName,
  refetchMyTeams,
  refetchAllTeams,
  refetchTeamByName,
  checkChar,
};

export default teamApi;
