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

      <c-experts />
      <c-teams />
      <c-string />
      <c-video-reviews />
      <!-- нужны видео -->
    </main>
  </q-page>
</template>

<script setup>
import CBackgroundSpot from "components/Landing/ClubBackgroundSpot.vue";
import CString from "components/Landing/ClubString.vue";
import CMainScreen from "components/Landing/ClubMainScreen.vue";
import CExperts from "components/Landing-develop/ClubExperts.vue";
import CTeams from "components/Landing-develop/ClubTeams.vue";
import CVideoReviews from "components/Landing-develop/ClubVideoReviews.vue";
</script>
