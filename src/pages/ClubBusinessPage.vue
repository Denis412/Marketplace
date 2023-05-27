<template>
  <q-page class="bg-dark-purple h-100p no-scroll" style="overflow-x: hidden">
    <c-background-spot class="overflow-hidden" />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen />
      <c-directions />
      <c-string />
      <c-clients />
      <c-join-business />

      <section>
        <h3 class="text-h3">Лучшие it-команды 1т клуба</h3>
        <div>слайдер</div>
      </section>

      <section>
        <h3 class="text-h3">Задачи, которые решили участинки в 1т клубе</h3>
        <div>слайдер</div>
      </section>

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
import CFaq from "components/Landing/ClubFAQ.vue";
</script>
