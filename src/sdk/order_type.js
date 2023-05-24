import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { getOrderTypes } from "src/graphql/order_type/queries";

import apolloClient from "src/apollo/apollo-client";

provideApolloClient(apolloClient);

const paginateOrderTypes = ({ page, perPage, where }) => {
  return useQuery(getOrderTypes, { page, perPage, where });
};

const orderTypeApi = {
  paginateOrderTypes,
};

export default orderTypeApi;
