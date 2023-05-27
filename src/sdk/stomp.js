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

  stompClient.reconnect_delay = 5000;

  // stompClient.heartbeatIncoming = 10000;
  // stompClient.heartbeatOutgoing = 10000;

  stompClient.connect("readonly", "@3P^Lgdab)sv", onConnect, onError, "/", onClose);
};

const disconnect = () => {
  stompClient.disconnect(() => {
    console.log("disconnect");
  });
};

const stompApi = { queueCreate, connectQueue, disconnect };

export default stompApi;

// let url = 'wss://stud.druid.1t.ru/ws';
// let client = Stomp.client(url);

// let headers = {
//     login: 'readonly',
//     passcode: '@3P^Lgdab)sv',
// };

// let queue = 'user.8902688128342428537.notifications.5fad1496-0e17-4c1d-b349-aa05718bf0db';

// let onConnect = async () => {
//     console.log('connected');

//     let onMessage = (message) => {
//         console.log('Receive message:', JSON.parse(message.body));

//         message.ack();
//     };

//     client.subscribe(`/amq/queue/${queue}`, onMessage, {ack: 'client'});
// }

// let onError = (msg) => {
//     console.log('Error', msg);
// }

// let onClose = (msg) => {
//     console.log('Close', msg);
// }

// // интервал переподключения
// client.reconnect_delay = 5000;

// client.connect(headers, onConnect, onError, onClose, '/');
