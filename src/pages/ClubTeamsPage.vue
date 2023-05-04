<template>
  <q-page class="c-pa-32">
    <c-teams-header class="c-mb-32" />
    <c-team-card-list :teams="teams" />
  </q-page>
</template>

<script setup>
import CTeamsHeader from "src/components/ClubTeamsHeader.vue";
import CTeamCardList from "src/components/ClubTeamCardList.vue";
import { ref } from "vue";
import userTeams from "src/sdk/team";

const teams = ref([]);

userTeams.getAllTeams().then((allTeams) => (teams.value = allTeams));
</script>

<style scoped lang="scss"></style>
