import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";

import { spaceCreate, teamCreate } from "src/graphql/team/mutations";

provideApolloClient(apolloClient);

const { mutate: createSpace } = useMutation(spaceCreate);
const { mutate: createTeam } = useMutation(teamCreate);

const userSpaceCreate = async ({ name, description }) => {
    const {data: userSpaceInfo } = await createSpace({
        input: {
            name,
            description,
          },
    });

    return userSpaceInfo.spaceCreate
  };

const userTeamCreate = async ({ name, description }) => {
    const {data: userTeamInfo } = await createTeam({
        input: {
            name,
            description,
          },
    });

    return userTeamInfo.create_type3.record
  };

  const userSpace = {
    userSpaceCreate,
    userTeamCreate,
  };
  
  export default userSpace;