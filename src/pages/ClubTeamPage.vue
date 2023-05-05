<template>
  <q-page class="c-pa-32">
    <div v-if="loadingRefetch" class="loader loader-lg"></div>

    <c-team-profile v-else :team="currentTeam" />
  </q-page>
</template>

<script setup>
import { onUpdated, ref } from "vue";
import CTeamProfile from "src/components/ClubTeamProfile.vue";
import teamApi from "src/sdk/team";
import { useRoute } from "vue-router";

const route = useRoute();

const loadingRefetch = ref(true);
const currentTeam = ref(null);

onUpdated(async () => {
  loadingRefetch.value = true;

  currentTeam.value = await teamApi.refetchTeamByName(route.params.name);

  loadingRefetch.value = false;
});
</script>

<style scoped lang="scss"></style>
