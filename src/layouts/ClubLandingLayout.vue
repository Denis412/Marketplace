<template>
  <q-layout view="hHh LpR lff">
    <c-main-header />

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <c-main-footer />
  </q-layout>
</template>

<script setup>
import { computed, provide } from "vue";

import { useUserStore } from "src/stores/user";

import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainFooter from "components/Landing/ClubMainFooter.vue";

const currentUser = computed(() => useUserStore().GET_CURRENT_USER);

provide("currentUser", currentUser);
</script>

<style lang="scss"></style>
