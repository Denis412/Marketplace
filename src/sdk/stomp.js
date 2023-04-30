import { useMutation, provideApolloClient } from "@vue/apollo-composable";
import { createQueue } from "src/graphql/stomp/mutations";

import apolloClient from "src/apollo/apollo-client";
import stompClient from "src/lib/stompClient";
import { Cookies } from "quasar";

provideApolloClient(apolloClient);

const { mutate: creatingQueue } = useMutation(createQueue);

const queueCreate = async () => {
  const { data: queueData } = await creatingQueue();

  Cookies.set("queue", queueData.notificationSubscribe.hash);

  return queueData.notificationSubscribe.hash;
};

const connectQueue = (queue) => {
  console.log("queue", queue);

  const timerId = setInterval(() => {
    stompClient.send(`/amq/queue/${queue}1`, {}, "Hello, STOMP");
  }, 27_000);

  const onConnect = () => {
    const onMessage = (message) => {
      const messageBody = JSON.parse(message.body);

      console.log("Receive message:", messageBody);

      message.ack();
    };

    stompClient.subscribe(`/amq/queue/${queue}`, onMessage, { ack: "client" });
  };

  const onError = () => {
    console.log("error");
  };
  const onClose = () => {
    console.log("close");
  };

  stompClient.connect(
    "readonly",
    "@3P^Lgdab)sv",
    onConnect,
    onError,
    "/",
    onClose
  );
};

const disconnect = () => {
  stompClient.disconnect(() => {
    console.log("disconnect");
  });
};

const stompApi = { queueCreate, connectQueue, disconnect };

export default stompApi;
