<template>
  <q-layout view="hHh LpR fff">
    <c-main-header />
    <c-main-drawer
      side="left"
      :projects="route.name === 'my-projects' || route.name === 'project'"
    />

    <q-page-container v-if="currentUser">
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
import { computed, ref, provide, onMounted } from "vue";
import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainDrawer from "src/components/ClubMainDrawer.vue";
import CMainFooter from "src/components/Landing/ClubMainFooter.vue";
import { useUserStore } from "src/stores/user";
import { useRoute } from "vue-router";

const f = computed(() => result.value);

const route = useRoute();

const exclude = ref([
  "ClubTeamPage",
  "ClubTeamSettingsPage",
  "ClubProjectInformationPage",
  "ClubTeamProfileProjects",
  "ClubTeamInvitePage",
  "ClubCreateTeamPage",
  "ClubUserProfilePage",
  "ClubTeamsPage",
]);

const currentUser = computed(() => useUserStore().GET_CURRENT_USER);

provide("currentUser", currentUser);

onMounted(async () => {
  await fetch(currentUser.value?.avatar, { mode: "no-cors" });
});
</script>

<style lang="scss"></style>
