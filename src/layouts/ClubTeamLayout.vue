<template>
  <q-layout view="hHh LpR fff">
    <c-main-header />
    <c-main-drawer side="left" team />

    <q-page-container v-if="currentUser">
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="exclude">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, provide, ref } from "vue";
import { useUserStore } from "src/stores/user";

import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainDrawer from "src/components/ClubMainDrawer.vue";

const currentUser = computed(() => useUserStore().GET_CURRENT_USER);
const exclude = ref(["ClubTeamPage", "ClubTeamSpace"]);

provide("currentUser", currentUser);
</script>

<style scoped lang="scss"></style>
