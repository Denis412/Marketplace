<template>
  <q-page class="flex flex-center column bg-dark-purple h-100p px-160">
    <background-spot />

    <main class="text-white container" style="z-index: 1">
      <main-screen />
      <directions />
      <statistics />
      <partitians />
      <about />
      <items />
      <steps />
      <clients />
      <partners />
      <join />
      <products />
      <comments />
      <community />
      <how-join />
      <questions />
      <club-contacts />
    </main>
  </q-page>
</template>

<script setup>
import MainScreen from "src/components/ClubMainScreen.vue";
import Directions from "src/components/ClubDirections.vue";
import Statistics from "src/components/ClubStatistics.vue";
import Steps from "src/components/ClubSteps.vue";
import Items from "src/components/ClubItems.vue";
import About from "src/components/ClubAbout.vue";
import Clients from "src/components/ClubClients.vue";
import Partners from "src/components/ClubPartners.vue";
import Join from "src/components/ClubJoin.vue";
import Products from "src/components/ClubProducts.vue";
import Comments from "src/components/ClubComments.vue";
import BackgroundSpot from "src/components/BackgroundSpot.vue";
import Community from "src/components/ClubCommunity.vue";
import HowJoin from "src/components/ClubHowJoin.vue";
import Questions from "src/components/ClubQuestions.vue";
import ClubContacts from "src/components/ClubContacts.vue";
</script>

<style scoped lang="scss">
.q-page {
  overflow: hidden;
}
</style>
