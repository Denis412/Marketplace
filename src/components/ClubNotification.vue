<template>
  <section>
    <q-btn
      round
      flat
      icon="img:/assets/icons/notification.svg"
      class="c-notification-btn"
    >
      <q-badge floating color="red" v-if="newNotificationList.length" />

      <q-popup-proxy class="c-notification-popup">
        <h4 class="text-h4 c-mb-32">Уведомления</h4>
        <c-new-notification-list :list="newNotificationList" />

        <router-link class="notification-link" :to="{ name: 'notifications' }">
          Посмотреть все уведомления
        </router-link>
      </q-popup-proxy>
    </q-btn>
  </section>
</template>

<script setup>
import { ref } from "vue";
import router from "src/router";
import CNewNotificationList from "src/components/ClubNewNoficationList.vue";

const newNotificationList = ref([
  {
    id: 1,
    message: "1",
    sendler: "Нетворкинг",
    data: "1 час назад",
    status: "status",
  },
  {
    id: 2,
    message: "2",
    sendler: "Магазин и сделки",
    data: "3 дня назад",
    status: "status",
  },
  {
    id: 3,
    message: "3",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: "status",
  },
  {
    id: 4,
    message: "4",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: "status",
  },
  {
    id: 5,
    message: "5",
    sendler: "Соцсети",
    data: "5 дней назад",
    status: "status",
  },
]);
</script>

<style lang="scss" scoped>
.notification-link {
  text-decoration: none;
  color: #3f3f46; //gray-8
}
</style>