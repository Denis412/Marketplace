<template>
  <section class="section-mb club-carousel">
    <h3 class="text-h3 text-center c-mb-16">IT-Команды 1Т Клуба</h3>
    <p class="text-subtitle2 text-center">Найдите IT-команду и реализуйте свои идеи</p>
    <q-carousel
      v-model="slide"
      animated
      control-color="primary"
      class="team-carousel flex flex-center"
    >
      <q-carousel-slide name="1" class="flex">
        <c-team-card v-for="team in teamsList.slice(start, end)" :key="team.id" :team="team" />
      </q-carousel-slide>
    </q-carousel>

    <div class="text-center">
      <q-btn @click="prev()" unelevated dense size="xl" class="q-mr-md" :icon="'chevron_left'" />
      <q-btn @click="next()" unelevated dense size="xl" class="q-mr-md" :icon="'chevron_right'" />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CTeamCard from "components/Landing-develop/ClubTeamCard.vue";

const slide = ref("1");
const start = ref(0);
const end = ref(3);

const teamsList = [
  {
    id: 1,
    name: "ITitans",
    description:
      "Команда активных, молодых специалистов, которые готовы воплощать в жизнь все смелые идеи заказчика в условиях полного Agile.",
    chips: ["Лендинг", "Промо-сайт", "..."],
    img: "assets/images/landing-develop/teams/iTitans.png",
  },
  {
    id: 2,
    name: "Pixel Punks",
    description:
      "Pixel Punks — создаем продающие сайты на основе анализа, проводя UX/UI тесты и используя современный визуальный язык.",
    chips: ["Сайт-визитка", "Лендинг", "..."],
    img: "assets/images/landing-develop/teams/iTitans.png",
  },
  {
    id: 3,
    name: "WebWave",
    description:
      "Молодая команда разработки IT-продуктов составом в 18 активных участников, готовая покорять индустрию.",
    chips: ["Лендинг", "Сайт-визитка", "..."],
    img: "assets/images/landing-develop/teams/iTitans.png",
  },
  {
    id: 4,
    name: "BitWizArts",
    description:
      "Мы успешно разработали свои учебные проекты, показали коллективный результат и вдохновились на дальнейшую работу!",
    chips: ["Seo и Маркетинг", "Лендинг", "..."],
    img: "assets/images/landing-develop/teams/iTitans.png",
  },
  {
    id: 5,
    name: "TEAMCOD",
    description:
      "Создаем сайты различного направления и сложности. Реализуем дизайн, адаптив и кроссбраузерность.",
    chips: ["Веб-приложения", "Лендинг"],
    img: "assets/images/landing-develop/teams/iTitans.png",
  },
];

</script>

<style lang="scss" scoped>
</style>
