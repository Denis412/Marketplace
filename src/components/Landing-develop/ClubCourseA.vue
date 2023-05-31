<template>
  <section class="section-mb">
    <h3 class="text-h3 text-center c-mb-64">Онлайн-курсы по искусственному интеллекту</h3>
    <section class="flex justify-center card-list">
      <c-course-card v-for="card in coursesList" :key="card.id" :card="card" />
    </section>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CCourseCard from "components/Landing-develop/ClubCourseCard.vue";

const coursesList = [
  {
    id: 1,
    name: "Инженер данных",
    period: "3 месяца обучения",
    description: "Старт курса 23.05",
    img: "assets/images/landing-develop/courses/de.png",
    url: "https://data.1t.ru/c/leo.html",
  },
  {
    id: 2,
    name: "Архитектор ИИ",
    period: "3 месяца обучения",
    description: "Старт курса 23.05",
    img: "assets/images/landing-develop/courses/ds.png",
    url: "https://data.1t.ru/c/orion.html",
  },

  {
    id: 3,
    name: "Аналитик данных",
    period: "3 месяца обучения",
    description: "Старт курса 23.05",
    img: "assets/images/landing-develop/courses/da.png",
    url: "https://data.1t.ru/c/libra.html",
  },
];
</script>

<style lang="scss" scoped>
.card-list {
  margin: 0 auto;
  max-width: 1220px;
  flex-flow: wrap-reverse;
}
</style>
