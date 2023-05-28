<template>
  <q-page class="bg-dark-purple h-100p" style="overflow-x: hidden">
    <c-background-spot />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen
        :title="'1Т Клуб'"
        :subtitle="'1Т Клуб - сообщество единомышленников, которых объединяет страсть к работе и саморазвитию.'"
        :img="'/assets/images/amico.svg'"
      />
      <c-directions />
      <c-statistics />
      <c-about />
      <c-clients />
      <c-how-join />
      <c-eco-system />
      <c-steps />
      <c-partners />
      <c-products />
      <c-string />
      <c-comments />
      <c-community />
      <c-questions />
      <c-contacts />
    </main>
  </q-page>
</template>

<script setup>
import CString from "components/Landing/ClubString.vue";
import CMainScreen from "components/Landing/ClubMainScreen.vue";
import CDirections from "components/Landing/ClubDirections.vue";
import CStatistics from "components/Landing/ClubStatistics.vue";
import CSteps from "components/Landing/ClubSteps.vue";
import CAbout from "components/Landing/ClubAbout.vue";
import CClients from "components/Landing/ClubClients.vue";
import CPartners from "components/Landing/ClubPartners.vue";
import CProducts from "components/Landing/ClubProducts.vue";
import CComments from "components/Landing/ClubComments.vue";
import CBackgroundSpot from "components/Landing/ClubBackgroundSpot.vue";
import CCommunity from "components/Landing/ClubCommunity.vue";
import CHowJoin from "components/Landing/ClubHowJoin.vue";
import CQuestions from "components/Landing/ClubQuestions.vue";
import CContacts from "components/Landing/ClubContacts.vue";
import CEcoSystem from "components/Landing/ClubEcoSystem.vue";
</script>
