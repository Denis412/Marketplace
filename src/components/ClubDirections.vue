<template>
  <card-group :directions="cardsList" />
</template>

<script setup>
import CardGroup from "src/components/ClubCardGroup.vue";
import { ref } from "vue";

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

<style lang="scss" scoped></style>
