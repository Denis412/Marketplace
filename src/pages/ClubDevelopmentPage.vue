<template>
  <q-page class="bg-dark-purple h-100p no-scroll" style="overflow-x: hidden">
    <c-background-spot />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen
        :title="'Для Развития'"
        :subtitle="'1Т Клуб — это площадка, на которой IT-специалисты находят работу и профессионально развиваются'"
        :img="'/assets/images/landing-develop/develop-main.svg'"
      />

      <c-suggestion />
      <c-experts />
      <c-work />
      <c-teams />
      <c-banner />
      <c-course-sprint />
      <c-course-ai />
      <c-networking />
      <c-partners />
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
import CSuggestion from "components/Landing-develop/ClubSuggestion.vue";
import CPartners from "components/Landing/ClubPartners.vue";
import CExperts from "components/Landing-develop/ClubExperts.vue";
import CWork from "components/Landing-develop/ClubWork.vue";
import CTeams from "components/Landing-develop/ClubTeams.vue";
import CBanner from "components/Landing-develop/ClubBanner.vue";
import CCourseSprint from "components/Landing-develop/ClubCourseSprint.vue";
import CCourseAi from "components/Landing-develop/ClubCourseA.vue";
import CNetworking from "components/Landing-develop/ClubNetworking.vue";
import CVideoReviews from "components/Landing-develop/ClubVideoReviews.vue";
</script>
