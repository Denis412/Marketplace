<template>
  <q-page class="bg-dark-purple h-100p">
    <background-spot />

    <main class="text-white" style="z-index: 1">
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
import MainScreen from "components/Landing/ClubMainScreen.vue";
import Directions from "components/Landing/ClubDirections.vue";
import Statistics from "components/Landing/ClubStatistics.vue";
import Steps from "components/Landing/ClubSteps.vue";
import Items from "components/Landing/ClubItems.vue";
import About from "components/Landing/ClubAbout.vue";
import Clients from "components/Landing/ClubClients.vue";
import Partners from "components/Landing/ClubPartners.vue";
import Join from "components/Landing/ClubJoin.vue";
import Products from "components/Landing/ClubProducts.vue";
import Comments from "components/Landing/ClubComments.vue";
import BackgroundSpot from "components/Landing/BackgroundSpot.vue";
import Community from "components/Landing/ClubCommunity.vue";
import HowJoin from "components/Landing/ClubHowJoin.vue";
import Questions from "components/Landing/ClubQuestions.vue";
import ClubContacts from "components/Landing/ClubContacts.vue";
</script>

<style scoped lang="scss">
.q-page {
  overflow: hidden;
}

.partitians {
  &-faces {
    margin-top: 58px;
    height: 338px;
  }
}

.video {
  width: 640px;
  height: 457px;
  border-radius: 10px;
}

.join {
  max-width: 816px;
  min-height: 192px;

  padding: 32px;

  background: rgba(135, 32, 148, 0.197);
  box-shadow: inset 8px -8px 32px rgba(103, 24, 112, 0.2),
    inset -12px 12px 32px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(53.01px);

  border-radius: 12px;
  margin-top: 124px;
}

.comments-list {
  margin-top: 50px;
  overflow-x: auto;
  width: 100%;
}

.comments-list,
.comments-list .card {
  transform: rotateX(180deg);
}

.club-mw-474 {
  max-width: 474px;
}

.club-px-96 {
  padding: 0 96px;
}
</style>
