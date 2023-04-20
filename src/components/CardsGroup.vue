<template>
  <q-list class="flex flex-center" style="margin-top: 44px; margin-left: -16px">
    <card-2 v-for="card in cards" :key="card.title" v-bind="card" />
  </q-list>
</template>

<script setup>
import { ref } from "vue";
import Card2 from "./Card2.vue";

const cards = ref([
  {
    id: 1,
    imageUrl: "src/assets/images/Colloboration.svg",
    title: "Сообщества",
  },
  { id: 2, imageUrl: "src/assets/images/Comand.svg", title: "Команды" },
  { id: 3, imageUrl: "src/assets/images/Projects.svg", title: "Проекты" },
  {
    id: 4,
    imageUrl: "src/assets/images/Accelerator.svg",
    title: "Акселератор",
  },
  { id: 5, imageUrl: "src/assets/images/Mentor.svg", title: "Менторство" },
  {
    id: 6,
    imageUrl: "src/assets/images/Consultation.svg",
    title: "Консультация",
  },
  { id: 7, imageUrl: "src/assets/images/Tools.svg", title: "Инструменты" },
  { id: 8, imageUrl: "src/assets/images/Cubok.svg", title: "Привелегии" },
]);
</script>
