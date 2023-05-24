import Stomp from "stompjs";

const socket = new WebSocket("wss://stud.druid.1t.ru/ws");
const stompClient = Stomp.over(socket);

export default stompClient;
