import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";

import { spaceCreate } from "src/graphql/team/mutations";

provideApolloClient(apolloClient);

const { mutate: createSpace } = useMutation(spaceCreate);

const userSpaceCreate = async ({ name, description }) => {
    const {data: userSpaceInfo } = await createSpace({
        input: {
            name,
            description,
          },
    });

    return userSpaceInfo.spaceCreate
  };

  const userSpace = {
    userSpaceCreate,
  };
  
  export default userSpace;