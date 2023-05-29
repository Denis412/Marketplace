<template>
  <q-page class="bg-dark-purple h-100p no-scroll" style="overflow-x: hidden">
    <c-background-spot />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen
        :title="'Для Работы'"
        :subtitle="'1Т Клуб — работа и стажировка для IT-специалистов  от джуна до сеньора. С нами вы найдете подходящий IT-проект и построите карьеру сразу после обучения'"
        :img="'assets/images/landing-work/amico.svg'"
        :video="false"
      />
      <c-directions
        :title="'Присоединяйтесь к экосистеме 1Т клуба, если вы'"
        :cards-list="cardsList"
        :btn-content="'Вступить в 1Т Клуб'"
      />
      <c-space />
      <c-experts />
      <c-teams />
      <c-string />
      <c-video-reviews />
      <!-- нужны видео -->
    </main>
  </q-page>
</template>

<script setup>
import CSpace from "components/Landing/ClubSpace.vue";
import CBackgroundSpot from "components/Landing/ClubBackgroundSpot.vue";
import CString from "components/Landing/ClubString.vue";
import CMainScreen from "components/Landing/ClubMainScreen.vue";
import CExperts from "components/Landing-develop/ClubExperts.vue";
import CTeams from "components/Landing-develop/ClubTeams.vue";
import CVideoReviews from "components/Landing-develop/ClubVideoReviews.vue";
import CDirections from "components/Landing/ClubDirections.vue";

const cardsList = [
  {
    id: 1,
    title: "Фрилансер",
    content: [
      "Хотите сами выбирать, с кем работать в IT-проекте",
      "Желаете быстрее расти профессионально в IT",
      "Нужны IT-специалисты для совместного решения сложных задач",
    ],
    to: "registration",
  },
  {
    id: 2,
    title: "Эксперт",
    content: [
      "Не знаете, как повысить квалификацию в сфере IT",
      "У вас большой опыт в IT, и вы готовы им делиться",
      "Хотите стать IT-ментором",
    ],
    to: "registration",
  },
  {
    id: 3,
    title: "Новичок",
    content: [
      "Прошли IT-курсы, но для работы нужен опыт",
      "Работаете самостоятельно, но нужна поддержка ментора",
      "Хотите сделать IT-проект проект для портфолио",
    ],
    to: "registration",
  },
];
</script>
