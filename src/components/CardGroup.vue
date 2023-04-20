<template>
  <q-list class="flex flex-center q-mt-md">
    <card v-for="card in cardsList" :key="card.id" v-bind="card" />
  </q-list>
</template>

<script setup>
import { ref } from "vue";
import Card from "src/components/Card.vue";

const cardsList = ref([
  {
    id: 1,
    title: "Для Бизнеса",
    content: ["Новые партнеры", "Специалисты для развития бизнес-проектов"],
  },
  {
    id: 2,
    title: "Для Работы",
    content: ["Новые заказы", "Стажировка в 1Т Клубе", "Участие в командах"],
  },
  {
    id: 3,
    title: "Для Развития",
    content: ["Онлайн-курсы", "База знаний", "Консультации экспертов"],
  },
]);
</script>
