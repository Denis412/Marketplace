import Stomp from "stompjs";
import { Cookies } from "quasar";

// const socket = new WebSocket("wss://stud.druid.1t.ru/ws");
// const client = Stomp.over(socket);

let url = "wss://stud.druid.1t.ru/ws";
let client = Stomp.client(url);

let onConnect = async () => {
  console.log("connected");

  let queue = Cookies.get("queue");
  let onMessage = (message) => {
    console.log("Receive message:", JSON.parse(message.body));

    message.ack();
  };

  client.subscribe(`/amq/queue/${queue}`, onMessage, { ack: "client" });
};

let onError = (msg) => {
  console.log("Error", msg);
};

let onClose = (msg) => {
  console.log("Close", msg);
};

// интервал переподключения
client.reconnect_delay = 5000;

const connect = () => {
  client.connect("readonly", "@3P^Lgdab)sv", onConnect, onError, "/", onClose);
};
export { client, connect };
