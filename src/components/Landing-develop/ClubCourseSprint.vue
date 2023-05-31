<template>
  <section class="section-mb">
    <h3 class="text-h3 text-center c-mb-64">Онлайн-курсы цифровых профессий 1Т Спринт</h3>
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
    name: "Web-разработчик",
    period: "3 месяца обучения",
    description: "1243 студентов обучено",
    img: "assets/images/landing-develop/courses/developer.png",
  },
  {
    id: 2,
    name: "UI/UX Дизайнер",
    period: "3 месяца обучения",
    description: "732 студентов обучено",
    img: "assets/images/landing-develop/courses/designer.png",
  },
  {
    id: 3,
    name: "Системный аналитик",
    period: "3 месяца обучения",
    description: "672 студентов обучено",
    img: "assets/images/landing-develop/courses/analysis.png",
  },
  {
    id: 4,
    name: "Менеджер IT-проектов",
    period: "3 месяца обучения",
    description: "567 студентов обучено",
    img: "assets/images/landing-develop/courses/manager.png",
  },
  {
    id: 5,
    name: "Digital маркетолог",
    period: "3 месяца обучения",
    description: "324 студентов обучено",
    img: "assets/images/landing-develop/courses/marketer.png",
  },
  {
    id: 6,
    name: "Тестировщик",
    period: "3 месяца обучения",
    description: "324 студентов обучено",
    img: "assets/images/landing-develop/courses/tester.png",
  },
];
</script>

<style lang="scss" scoped>
.card-list {
  margin: 0 auto;
  max-width: 1220px;
}

</style>
