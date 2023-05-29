<template>
  <section class="section-mb">
    <h3 class="text-h3 text-center c-mb-16">IT-Команды 1Т Клуба</h3>
    <p class="text-subtitle2 text-center c-mb-64">Найдите IT-команду и реализуйте свои идеи</p>

    <Carousel
      :itemsToShow="3"
      :wrapAround="true"
      :transition="700"
      ref="carousel"
      class="team-carousel"
    >
      <Slide v-for="slide in teamsList" :key="slide">
        <c-team-card :team="slide" />
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

import CTeamCard from "components/Landing-develop/ClubTeamCard.vue";

const carousel = ref(null);
const teamsList = [
  {
    id: 1,
    name: "ITitans",
    description:
      "Команда активных, молодых специалистов, которые готовы воплощать в жизнь все смелые идеи заказчика в условиях полного Agile.",
    chips: ["Лендинг", "Промо-сайт", "..."],
    img: "assets/images/landing-develop/teams/i-titans.png",
  },
  {
    id: 2,
    name: "Pixel Punks",
    description:
      "Pixel Punks — создаем продающие сайты на основе анализа, проводя UX/UI тесты и используя современный визуальный язык.",
    chips: ["Сайт-визитка", "Лендинг", "..."],
    img: "assets/images/landing-develop/teams/pixel-punks.png",
  },
  {
    id: 3,
    name: "WebWave",
    description:
      "Молодая команда разработки IT-продуктов составом в 18 активных участников, готовая покорять индустрию.",
    chips: ["Лендинг", "Сайт-визитка", "..."],
    img: "assets/images/landing-develop/teams/webwave.png",
  },
  {
    id: 4,
    name: "BitWizArts",
    description:
      "Мы успешно разработали свои учебные проекты, показали коллективный результат и вдохновились на дальнейшую работу!",
    chips: ["Seo и Маркетинг", "Лендинг"],
    img: "assets/images/landing-develop/teams/bit-wiz-arts.png",
  },
  {
    id: 5,
    name: "TEAMCOD",
    description:
      "Создаем сайты различного направления и сложности. Реализуем дизайн, адаптив и кроссбраузерность.",
    chips: ["Веб-приложения", "Лендинг"],
    img: "assets/images/landing-develop/teams/team-code.png",
  },
];
</script>

<style lang="scss" scoped>
.team-carousel {
  max-width: 1120px;
  margin: 0 auto;
  text-align: left;
}
</style>
