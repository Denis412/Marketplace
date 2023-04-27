import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { teamCreate, teamUpdate } from "src/graphql/team/mutations";

provideApolloClient(apolloClient);

const { mutate: createTeam } = useMutation(teamCreate);
const { mutate: updateTeam } = useMutation(teamUpdate);

const userTeamCreate = async ({ name, description }) => {
    const {data: userTeamInfo } = await createTeam({
        input: {
            name,
            description,
          },
    });

    return userTeamInfo.create_Teams.record.id
  };

  const userTeamUpdate = async (id, team_img, name) => {
    console.log(id, typeof(team_img))
    const {data: userUpdateTeamInfo } = await updateTeam({
      id,
        input: {
          name,
            team_img,
          },
    });
    console.log(userUpdateTeamInfo.update_Teams.status)
    return userUpdateTeamInfo.update_Teams.status
  };

  const userTeams = {
    userTeamCreate, userTeamUpdate
  };
  
  export default userTeams;