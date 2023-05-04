import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import { data } from "autoprefixer";
import apolloClient from "src/apollo/apollo-client";
import { createSpace } from "src/graphql/space/mutations";
import { teamCreate, teamUpdate } from "src/graphql/team/mutations";
import {
  filterTeamsName,
  getMyTeams,
  getTeams,
} from "src/graphql/team/queries";

provideApolloClient(apolloClient);

const { mutate: creatingTeam } = useMutation(teamCreate, {
  context: {
    headers: {
      space: process.env.MAIN_SPACE_ID,
    },
  },
});

const { mutate: creatingSpace } = useMutation(createSpace, {
  context: {
    headres: {
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

const { refetch: refetchAllTeams } = useQuery(
  getTeams,
  {},
  {
    context: {
      headers: {
        space: process.env.MAIN_SPACE_ID,
      },
    },
  }
);

const { refetch: refetchMyTeams } = useQuery(
  getMyTeams,
  {},
  {
    context: {
      headers: {
        space: process.env.MAIN_SPACE_ID,
      },
    },
  }
);

const { refetch: refetchTeams } = useQuery(
  filterTeamsName,
  {},
  {
    where: {
      column: "name",
      operator: "EQ",
      value: "",
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

const { refetch: refetchFilterTeams } = useQuery(
  filterTeamsName,
  {
    where: {
      column: "status",
      operator: "EQ",
      value: "",
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

const { refetch: refetchFilterTeamsByChar } = useQuery(
  filterTeamsName,
  {
    where: {
      column: "name",
      operator: "FTS",
      value: "",
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

const getAll = async () => {
  const { data: teamsData } = await refetchAllTeams();
  return teamsData.paginate_team.data;
};

const create = async ({ name, description }) => {
  const { data: spaceData } = await creatingSpace({
    input: {
      name,
      description,
    },
  });

  const { data: teamData } = await creatingTeam({
    input: {
      name,
      description,
      space: `${spaceData.spaceCreate.recordId}`,
    },
  });

  return teamData.create_team.record.id;
};

const update = async (id, avatar, name) => {
  const { data: teamData } = await updatingTeam({
    id,
    input: {
      name,
      avatar,
    },
  });

  return teamData.update_team.status;
};

const checkName = async ({ name }) => {
  const { data: teamData } = await refetchTeams({
    where: {
      column: "name",
      operator: "EQ",
      value: `${name}`,
    },
  });

  return teamData.paginate_team.paginatorInfo.count == 0;
};

const checkStatus = async (status) => {
  const { data: teamData } = await refetchFilterTeams({
    where: {
      column: "status",
      operator: "EQ",
      value: `${status}`,
    },
  });

  return teamData.paginate_team.data;
};

const checkChar = async (char) => {
  const { data: teamData } = await refetchFilterTeamsByChar({
    where: {
      column: "name",
      operator: "FTS",
      value: `${char}`,
    },
  });

  return teamData.paginate_team.data;
};

const getMy = async (author_id) => {
  const { data: teamsData } = await refetchMyTeams({
    where: {
      column: "author_id",
      operator: "EQ",
      value: `${author_id}`,
    },
  });

  return teamsData.paginate_team.data;
};

const teamApi = {
  create,
  update,
  checkName,
  getAll,
  getMy,
  checkStatus,
  checkChar,
};

export default teamApi;
