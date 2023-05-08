import { provideApolloClient, useMutation } from "@vue/apollo-composable";

import { createOrder } from "src/graphql/order/mutations";

import apolloClient from "src/apollo/apollo-client";

provideApolloClient(apolloClient);

const { mutate: Create } = useMutation(createOrder);

const orderCreate = (input) => {
  console.log(input);
  const { data: orderInfo } = Create({
    input,
  });
};

const orderApi = {
  orderCreate,
};

export default orderApi;
