<template>
  <section class="items container">
    <div class="text-center text-h3">
      1Т Клуб - это масштабная экосистема для развития начинающих специалистов в
      сфере IT.
    </div>

    <c-card-group :items="cards" />
  </section>
</template>

<script setup>
import CCardGroup from "./ClubCardGroup.vue";
import { ref } from "vue";

const cards = ref([
  {
    id: 1,
    imageUrl: "/assets/images/landing/colloboration.svg",
    title: "Сообщества",
  },
  { id: 2, imageUrl: "/assets/images/landing/comand.svg", title: "Команды" },
  { id: 3, imageUrl: "/assets/images/landing/projects.svg", title: "Проекты" },
  {
    id: 4,
    imageUrl: "/assets/images/landing/accelerator.svg",
    title: "Акселератор",
  },
  { id: 5, imageUrl: "/assets/images/landing/mentor.svg", title: "Менторство" },
  {
    id: 6,
    imageUrl: "/assets/images/landing/consultation.svg",
    title: "Консультация",
  },
  { id: 7, imageUrl: "/assets/images/landing/tools.svg", title: "Инструменты" },
  { id: 8, imageUrl: "/assets/images/landing/cubok.svg", title: "Привелегии" },
]);
</script>

<style lang="scss" scoped>
.items {
  margin-top: 215px;
}
</style>
