<template>
  <q-page class="bg-dark-purple h-100p no-scroll" style="overflow-x: hidden">
    <c-background-spot class="overflow-hidden" />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen />
      <c-directions class="c-mb-160" />
      <c-string />
      <c-clients class="c-mb-160" />
      <c-join-business />
      <c-best-teams class="c-mb-160" />
      <c-tasks />

      <c-faq />
    </main>
  </q-page>
</template>

<script setup>
import CBackgroundSpot from "components/Landing/ClubBackgroundSpot.vue";
import CMainScreen from "components/Landing/ClubMainScreen.vue";
import CDirections from "components/Landing/ClubDirections.vue";
import CString from "components/Landing/ClubString.vue";
import CClients from "components/Landing/ClubClients.vue";
import CJoinBusiness from "components/Landing/ClubJoinBusiness.vue";
import CBestTeams from "components/Landing/ClubBestTeams.vue";
import CTasks from "components/Landing/ClubTasks.vue";
import CFaq from "components/Landing/ClubFAQ.vue";
</script>

<style scoped lang="scss"></style>
