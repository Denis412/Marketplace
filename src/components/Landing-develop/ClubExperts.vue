<template>
  <section class="section-mb">
    <h3 class="text-h3 text-center c-mb-64">Эксперты 1Т Клуба</h3>
    <Carousel
      :itemsToShow="4"
      :wrapAround="true"
      :transition="700"
      ref="carousel"
      class="c-mb-32 club-carousel"
    >
      <Slide v-for="slide in expertsList" :key="slide">
        <q-card class="carousel__item" flat bordered>
          <q-card-section horizontal>
            <q-img class="col-5 img" :src="slide.img" />

            <q-card-section class="c-pa-20 experts-card-section">
              <p class="text-body2 c-mb-24">{{ slide.description }}</p>
              <p class="text-subtitle4" style="padding: 0">{{ slide.person }}</p>
            </q-card-section>
          </q-card-section>
        </q-card>
      </Slide>
    </Carousel>

    <div class="text-center">
      <q-btn
        @click="carousel.prev()"
        unelevated
        dense
        size="xl"
        class="q-mr-md"
        :icon="'chevron_left'"
      />
      <q-btn
        @click="carousel.next()"
        unelevated
        dense
        size="xl"
        class="q-mr-md"
        :icon="'chevron_right'"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const carousel = ref(null);
const expertsList = [
  {
    id: 1,
    person: "Иван Никаноров",
    description:
      "Главный эксперт 1T Клуба, также известный как основатель банка «Ivanoff». Основатель ряда проектов в реальном секторе, криптоинвестор.",
    img: "assets/images/landing-develop/experts/Alexander.png",
  },
  {
    id: 2,
    person: "Алексей Костин",
    description:
      "Имеет опыт работы в компаниях Doodle и Likerosoft, где занимал должности программиста и технического менеджера.",
    img: "assets/images/landing-develop/experts/Kostin.png",
  },
  {
    id: 3,
    person: "Ирина Никонович",
    description:
      "Работала в области информационной безопасности в крупных компаниях, таких как Disco и Synimatic, где занимала должность разработчика.",
    img: "assets/images/landing-develop/experts/Alexander.png",
  },
];
</script>

<style scoped>
.carousel__item {
  max-width: 448px;
  background: linear-gradient(
    101.5deg,
    rgba(16, 5, 34, 0.15) 37.03%,
    rgba(255, 255, 255, 0.1) 80.19%,
    rgba(16, 5, 34, 0.15) 100%
  );
  border-radius: 12px;
  border: 2px solid rgba(63, 63, 70, 0.7);
}
.carousel__slide {
  width: 448px;
}
.experts-card-section {
  text-align: left;
  padding-left: 38px;
}
</style>

