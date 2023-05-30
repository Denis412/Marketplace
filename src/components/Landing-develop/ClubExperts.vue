<template>
  <section class="section-mb section-margin">
    <h3 class="text-h3 text-center c-mb-64">Эксперты 1Т Клуба</h3>
    <Carousel
      :itemsToShow="3"
      :wrapAround="true"
      :transition="700"
      ref="carousel"
      class="c-mb-32 club-carousel experts-carousel"
    >
      <Slide v-for="slide in expertsList" :key="slide">
        <c-experts-card :card="slide" />
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

import CExpertsCard from "src/components/Landing-develop/ClubExpertsCard.vue";

const carousel = ref(null);
const expertsList = [
  {
    id: 1,
    person: "Роман Ищенко",
    description:
      "18 лет в создании систем продаж и маркетинга. Руководил интернет-университетом, выстраивал обучение образовательных стартапов.",
    img: "/assets/images/landing-develop/experts/Ischenko.png",
  },
  {
    id: 2,
    person: "Алексей Костин",
    description:
      "Более 15 лет опыт в ИТ, из них 10 лет в аутсорсинговых компаний на проектах по веб-разработке. Построение продуктовых команд с нуля.",
    img: "assets/images/landing-develop/experts/Kostin.png",
  },
  {
    id: 3,
    person: "Ирина Никонович",
    description:
      "Работала в области информационной безопасности в крупных компаниях, таких как Disco и Synimatic, где занимала должность разработчика.",
    img: "assets/images/landing-develop/experts/Nikonovich.png",
  },
  {
    id: 4,
    person: "Михаил Решин",
    description:
      "Опыт более 20 лет в управлении IT проектами. Digital директор, аналитика, дизайн и разработка сайтов и приложений. Экспертиза в UX/UI.",
    img: "assets/images/landing-develop/experts/Reshin.png",
  },
  {
    id: 5,
    person: "Иван Никаноров",
    description:
      "Опыт веб-разработки более 10 лет.  Разработка продуктов для таких компаний как:  KJO, Toyota Аэропорты Регионов, РФРИТ, London Bridge и др.",
    img: "assets/images/landing-develop/experts/Nikanorov.png",
  },
  {
    id: 6,
    person: "Карина Шушунова",
    description:
      "Опыт работы более 10 лет   в Digital-маркетинге. Специализируется в  разработке комплексных performance-стратегий и медиа-стратегий. Эксперт  в веб-аналитике.",
    img: "assets/images/landing-develop/experts/Shushunova.png",
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

.experts-carousel {
  text-align: left;
}
</style>
