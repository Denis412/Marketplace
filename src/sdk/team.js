import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { teamCreate } from "src/graphql/team/mutations";

provideApolloClient(apolloClient);

const { mutate: createTeam } = useMutation(teamCreate);

const userTeamCreate = async ({ name, description }) => {
    const {data: userTeamInfo } = await createTeam({
        input: {
            name,
            description,
          },
    });

    return userTeamInfo.create_Teams.record
  };

  const userTeams = {
    userTeamCreate,
  };
  
  export default userTeams;