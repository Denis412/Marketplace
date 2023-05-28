<template>
  <section class="section-mb club-carousel">
    <h3 class="text-h3 text-center c-mb-64">Эксперты 1Т Клуба</h3>
    <q-carousel v-model="slide" swipeable animated class="text-white flex flex-center">
      <q-carousel-slide v-for="card in expertsList" :name="card.name" :key="card.id">
        <c-experts-card :card="card" />
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <q-btn-toggle
        glossy
        v-model="slide"
        :options="[
          { label: 1, value: 'one' },
          { label: 2, value: 'two' },
          { label: 3, value: 'three' },
        ]"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CExpertsCard from "components/Landing-develop/ClubExpertsCard.vue";

const slide = ref("one");

const expertsList = [
  {
    id: 1,
    name: "one",
    person: "Александр Иванов",
    description:
      "Главный эксперт 1T Клуба, также известный как основатель банка «Ivanoff». Основатель ряда проектов в реальном секторе, криптоинвестор.",
    img: "assets/images/landing-develop/experts/Alexander.png",
  },
  {
    id: 2,
    name: "two",
    person: "Александр Иванов",
    description:
      "Главный эксперт 1T Клуба, также известный как основатель банка «Ivanoff». Основатель ряда проектов в реальном секторе, криптоинвестор.",
    img: "assets/images/landing-develop/experts/Alexander.png",
  },
  {
    id: 3,
    name: "three",
    person: "Александр Иванов",
    description:
      "Главный эксперт 1T Клуба, также известный как основатель банка «Ivanoff». Основатель ряда проектов в реальном секторе, криптоинвестор.",
    img: "assets/images/landing-develop/experts/Alexander.png",
  },
];
</script>

<style lang="scss" scoped>
</style>
