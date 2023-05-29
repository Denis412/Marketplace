<template>
  <q-page class="bg-dark-purple h-100p no-scroll" style="overflow-x: hidden">
    <c-background-spot class="overflow-hidden" />

    <main class="text-white relative-position" style="z-index: 1">
      <c-business-screen />
      <c-business-offers class="c-mb-160" />
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
import CBusinessScreen from "components/Landing/ClubBusinessScreen.vue";
import CBusinessOffers from "components/Landing/ClubBusinessOffers.vue";
import CString from "components/Landing/ClubString.vue";
import CClients from "components/Landing/ClubClients.vue";
import CJoinBusiness from "components/Landing/ClubJoinBusiness.vue";
import CBestTeams from "components/Landing/ClubBestTeams.vue";
import CTasks from "components/Landing/ClubTasks.vue";
import CFaq from "components/Landing/ClubFAQ.vue";
</script>

<style scoped lang="scss"></style>
