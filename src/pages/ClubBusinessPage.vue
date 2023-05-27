<template>
  <q-page class="bg-dark-purple h-100p no-scroll" style="overflow-x: hidden">
    <c-background-spot class="overflow-hidden" />

    <main class="text-white relative-position" style="z-index: 1">
      <c-main-screen />
      <c-string />
    </main>
  </q-page>
</template>

<script setup>
import CBackgroundSpot from "components/Landing/ClubBackgroundSpot.vue";
import CMainScreen from "components/Landing/ClubMainScreen.vue";
import CString from "components/Landing/ClubString.vue";
</script>
