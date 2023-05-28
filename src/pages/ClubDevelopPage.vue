<template>
  <q-page class="bg-dark-purple h-100p" style="overflow-x: hidden">
    <c-background-spot />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen
        :title="'Для Развития'"
        :subtitle="'1Т Клуб — работа и стажировка для специалистов от джуна до сеньора. С нами вы найдете подходящий проект и построите карьеру сразу после обучения'"
        :img="'/assets/images/landing-develop/develop-main.svg'"
      />

      <c-suggestion />
      <c-experts />
      <!-- слайдер -->
      <c-work />
      <c-teams />
      <!-- слайдер -->
      <c-banner />
      <c-course-sprint />
      <c-course-ai />
      <c-networking />
      <c-partners />
      <!-- лента(Никита) -->
      <!-- видеоотзывы(Олег) -->
    </main>
  </q-page>
</template>

<script setup>
import CBackgroundSpot from "components/Landing/ClubBackgroundSpot.vue";
import CMainScreen from "components/Landing/ClubMainScreen.vue";
import CSuggestion from "components/Landing-develop/ClubSuggestion.vue";
import CPartners from "components/Landing/ClubPartners.vue";
import CExperts from "components/Landing-develop/ClubExperts.vue";
import CWork from "components/Landing-develop/ClubWork.vue";
import CTeams from "components/Landing-develop/ClubTeams.vue";
import CBanner from "components/Landing-develop/ClubBanner.vue";
import CCourseSprint from "components/Landing-develop/ClubCourseSprint.vue";
import CCourseAi from "components/Landing-develop/ClubCourseA.vue";
import CNetworking from "components/Landing-develop/ClubNetworking.vue";
</script>
