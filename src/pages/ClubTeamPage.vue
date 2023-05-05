<template>
  <q-page class="c-pa-32">
    <div v-if="loading" class="loader loader-lg"></div>

    <c-team-profile v-else :team="currentTeam.paginate_team.data[0]" />
  </q-page>
</template>

<script setup>
import CTeamProfile from "src/components/ClubTeamProfile.vue";
import teamApi from "src/sdk/team";
import { useRoute } from "vue-router";

const route = useRoute();

const { result: currentTeam, loading } = teamApi.queryTeamByName(
  route.params.name
);
</script>

<style scoped lang="scss"></style>
