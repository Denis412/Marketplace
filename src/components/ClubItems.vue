<template>
  <section class="items container">
    <div class="text-center header-text-32">
      1Т Клуб - это масштабная экосистема для развития начинающих специалистов в
      сфере IT.
    </div>

    <card-group :items="cards" />
  </section>
</template>

<script setup>
import CardGroup from "./ClubCardGroup.vue";
import { ref } from "vue";

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

<style lang="scss" scoped>
.items {
  margin-top: 215px;
}
</style>
