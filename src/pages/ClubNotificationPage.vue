<template>
  <main class="c-pa-32">
    <h3 class="text-h3 c-mb-24">Мои уведомления</h3>
    <c-notifications-table :list="NotificationList" />
  </main>
</template>

<script setup>
import { ref } from "vue";
import CNotificationsTable from "src/components/ClubNotificationsTable.vue";

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
</style>
