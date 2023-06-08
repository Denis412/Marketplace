<template>
  <q-layout view="hHh LpR fff" v-if="currentUser">
    <c-main-header />
    <c-main-drawer
      side="left"
      :projects="route.name === 'my-projects' || route.name === 'project'"
      :orders="route.name.includes('order')"
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
import { computed, ref, provide, onMounted, onUnmounted } from "vue";
import CMainHeader from "src/components/ClubMainHeader.vue";
import CMainDrawer from "src/components/ClubMainDrawer.vue";
import CMainFooter from "src/components/Landing/ClubMainFooter.vue";
import { useUserStore } from "src/stores/user";
import { useRoute } from "vue-router";
import userApi from "src/sdk/user";
import { connect } from "src/lib/stompClient";

const route = useRoute();

const exclude = ref([
  "ClubTeamPage",
  "ClubTeamSettingsPage",
  "ClubProjectInformationPage",
  "ClubTeamProfileProjects",
  "ClubTeamInvitePage",
  "ClubCreateTeamPage",
  "ClubOrderCreatePage",
  "ClubOrdersPage",
  "ClubUserProfilePage",
  "ClubTeamsPage",
  "ClubOrderInformationPage",
]);

const currentUser = computed(() => useUserStore().GET_CURRENT_USER);
const isModerator = computed(() => userApi.isModerator(currentUser.value));

provide("currentUser", currentUser);
provide("isModerator", isModerator);

onMounted(async () => {
  await fetch(currentUser.value?.avatar, { mode: "no-cors" });

  connect();
});

onUnmounted(() => useUserStore().RESET_CURRENT_SUBJECT());
</script>

<style lang="scss"></style>
