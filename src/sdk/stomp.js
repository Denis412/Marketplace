import { useMutation, provideApolloClient } from "@vue/apollo-composable";
import { createQueue } from "src/graphql/stomp/mutations";

import apolloClient from "src/apollo/apollo-client";
import { Cookies } from "quasar";

provideApolloClient(apolloClient);

const { mutate: creatingQueue } = useMutation(createQueue);

const queueCreate = async () => {
  const { data: queueData } = await creatingQueue();

  Cookies.set("queue", queueData.notificationSubscribe.hash);

  return queueData.notificationSubscribe.hash;
};

const stompApi = { queueCreate };

export default stompApi;
