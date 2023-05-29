<template>
  <section class="c-mr-24">
    <q-btn round flat icon="img:/assets/icons/notification.svg" class="c-notification-btn">
      <!-- фильтрация на бэке -->
      <q-badge floating color="red" v-if="NotificationList.filter((elem) => !elem.status).length" />

      <q-popup-proxy class="c-notification-popup">
        <h4 class="text-h4 c-mb-32">Уведомления</h4>
        <!-- передавать фильтрованный массив -->
        <c-notification-list-mini :list="NotificationList" />

        <router-link class="notification-link" :to="{ name: 'notifications' }">
          Посмотреть все уведомления
        </router-link>
      </q-popup-proxy>
    </q-btn>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CNotificationListMini from "src/components/ClubNoficationListMini.vue";

//убрать тестовый массив
const NotificationList = ref([
  {
    id: 1,
    message: "1",
    sendler: "Нетворкинг",
    data: "1 час назад",
    status: false,
  },
  {
    id: 2,
    message: "2",
    sendler: "Магазин и сделки",
    data: "3 дня назад",
    status: true,
  },
  {
    id: 3,
    message: "3",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: false,
  },
  {
    id: 4,
    message: "4",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: true,
  },
  {
    id: 5,
    message: "5",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: false,
  },
  {
    id: 6,
    message: "6",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: true,
  },
  {
    id: 7,
    message: "7",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: false,
  },
  {
    id: 8,
    message: "8",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: true,
  },
]);
</script>

<style lang="scss" scoped>
.notification-link {
  text-decoration: none;
  color: #3f3f46; //gray-8
}
</style>
