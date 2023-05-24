import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { spaceHeader } from "src/utils/spaceHeader";

import apolloClient from "src/apollo/apollo-client";
import { userStatusesPaginate } from "src/graphql/user-status/queries";

provideApolloClient(apolloClient);

const paginateUserStatuses = ({ page, perPage, where }) => {
  return useQuery(
    userStatusesPaginate,
    { page, perPage, where },
    spaceHeader(process.env.MAIN_SPACE_ID)
  );
};

const refetchPaginateUserStatuses = async ({ page: perPage, where }) => {
  const { refetch } = paginateUserStatuses({ page, perPage, where });

  const { data: statusesData } = await refetch();

  return statusesData.paginate_user_status.data;
};

const userStatusApi = { paginateUserStatuses, refetchPaginateUserStatuses };

export default userStatusApi;
