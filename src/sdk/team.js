import {
  provideApolloClient,
  useMutation,
  useQuery,
} from "@vue/apollo-composable";
import { data } from "autoprefixer";
import apolloClient from "src/apollo/apollo-client";
import { createSpace } from "src/graphql/space/mutations";
import { teamCreate, teamUpdate } from "src/graphql/team/mutations";
import { filterTeamsName, getTeams } from "src/graphql/team/queries";

provideApolloClient(apolloClient);

const { mutate: createTeam } = useMutation(teamCreate, {
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
const { mutate: updateTeam } = useMutation(teamUpdate, {
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
const { refetch: refetchTeams } = useQuery(
  filterTeamsName,
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

const getAllTeams = async () => {
  const { data: allTeams } = await refetchAllTeams();
  return allTeams.paginate_team.data;
};

const userTeamCreate = async ({ name, description }) => {
  const { data: spaceData } = await creatingSpace({
    input: {
      name,
      description,
    },
  });

  const { data: userTeamInfo } = await createTeam({
    input: {
      name,
      description,
      space: `${spaceData.spaceCreate.recordId}`,
    },
  });

  return userTeamInfo.create_team.record.id;
};

const userTeamUpdate = async (id, avatar, name) => {
  const { data: userUpdateTeamInfo } = await updateTeam({
    id,
    input: {
      name,
      avatar,
    },
  });

  return userUpdateTeamInfo.update_team.status;
};

const checkName = async ({ name }) => {
  const { data: filteredTeam } = await refetchTeams({
    where: {
      column: "name",
      operator: "EQ",
      value: `${name}`,
    },
  });

  return filteredTeam.paginate_team.paginatorInfo.count == 0;
};

const userTeams = {
  userTeamCreate,
  userTeamUpdate,
  checkName,
  getAllTeams,
};

export default userTeams;
