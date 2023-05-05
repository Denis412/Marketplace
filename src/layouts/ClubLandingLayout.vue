<template>
  <q-layout view="hHh LpR lff">
    <c-landing-main-header v-if="!currentUser" />
    <c-main-header v-else />

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
import CLandingMainHeader from "components/Landing/ClubLandingMainHeader.vue";
import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainFooter from "components/Landing/ClubMainFooter.vue";
import { useUserStore } from "src/stores/user";
import { computed } from "vue";

const userStore = useUserStore();

const currentUser = computed(() => userStore.GET_CURRENT_USER);
</script>

<style lang="scss"></style>
