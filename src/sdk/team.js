import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";
import { data } from "autoprefixer";
import apolloClient from "src/apollo/apollo-client";
import { teamCreate, teamUpdate } from "src/graphql/team/mutations";
import { filterTeamsName, getTeams } from "src/graphql/team/queries";

provideApolloClient(apolloClient);

const { mutate: createTeam } = useMutation(teamCreate);
const { mutate: updateTeam } = useMutation(teamUpdate);

const { refetch: refetchAllTeams } = useQuery(getTeams);
const { refetch: refetchTeams } = useQuery(filterTeamsName, {
  where: {
    column: "name",
    operator: "EQ",
    value: ""
  }
}
);

const getAllTeams = async () => {
  const { data: allTeams } = await refetchAllTeams();
  return allTeams.paginate_Teams.data
};

const userTeamCreate = async ({ name, description }) => {
  const { data: userTeamInfo } = await createTeam({
    input: {
      name,
      description,
    },
  });

  return userTeamInfo.create_Teams.record.id
};

const userTeamUpdate = async (id, team_img, name) => {
  console.log(id, typeof (team_img))
  const { data: userUpdateTeamInfo } = await updateTeam({
    id,
    input: {
      name,
      team_img,
    },
  });
  console.log(userUpdateTeamInfo.update_Teams.status)
  return userUpdateTeamInfo.update_Teams.status
};

const checkName = async ({ name }) => {
  const { data: filteredTeam } = await refetchTeams(
    {
      where: {
        column: "name",
        operator: "EQ",
        value: `${name}`
      }
    })
  return (filteredTeam.paginate_Teams.paginatorInfo.count == 0)
}

const userTeams = {
  userTeamCreate, userTeamUpdate, checkName, getAllTeams
};

export default userTeams;