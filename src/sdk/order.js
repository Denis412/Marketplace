import { provideApolloClient, useMutation, useQuery } from "@vue/apollo-composable";

import { createOrder, updateOrder } from "src/graphql/order/mutations";

import apolloClient from "src/apollo/apollo-client";
import { getOrderById, getOrders } from "src/graphql/order/queries";

provideApolloClient(apolloClient);

const { mutate: creatingOrder } = useMutation(createOrder);
const { mutate: updatingOrder } = useMutation(updateOrder);

const ordersPaginate = ({ page, perPage, where, orderBy, fetchPolicy }) => {
  return useQuery(getOrders, { page, perPage, where }, { fetchPolicy });
};

const queryOrderById = ({ id, fetchPolicy }) => {
  return useQuery(getOrderById, { id }, { fetchPolicy });
};

const orderCreate = async ({ input }) => {
  const { data: orderInfo } = await creatingOrder({ input });

  return orderInfo.create_order;
};

const update = async ({ input, id, name }) => {
  if (!Object.entries(input).length) return;

  input.name = name;
  const { data: orderInfo } = await updatingOrder({ input, id });

  return orderInfo.update_order;
};

const orderApi = {
  orderCreate,
  update,
  ordersPaginate,
  queryOrderById,
};

export default orderApi;
