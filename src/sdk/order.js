import { provideApolloClient, useMutation } from "@vue/apollo-composable";

import { createOrder, updateOrder } from "src/graphql/order/mutations";

import apolloClient from "src/apollo/apollo-client";

provideApolloClient(apolloClient);

const { mutate: Create } = useMutation(createOrder);
const { mutate: Update } = useMutation(updateOrder);

const orderCreate = (input) => {
  const { data: orderInfo } = Create({
    input,
  });
};

const orderEdit = (input, id, name) => {
  if (!Object.entries(input).length) return;

  input.name = name;
  const { data: orderInfo } = Update({
    input,
    id,
  });
};

const orderApi = {
  orderCreate,
  orderEdit,
};

export default orderApi;
