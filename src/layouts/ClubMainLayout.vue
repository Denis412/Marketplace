<template>
  <q-layout view="hHh LpR fff">
    <c-main-header />
    <c-main-drawer side="left" />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="exclude">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <!-- <c-main-footer /> -->
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainDrawer from "src/components/ClubMainDrawer.vue";
import CMainFooter from "src/components/Landing/ClubMainFooter.vue";

const exclude = ref(["ClubTeamPage"]);
</script>

<style lang="scss"></style>
