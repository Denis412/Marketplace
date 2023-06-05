<template>
  <q-page class="c-pt-32 c-pl-32 c-pr-32">
    <c-team-settings v-if="currentTeam" />
  </q-page>
</template>

<script setup>
import CTeamSettings from "src/components/ClubTeamSettings.vue";
import TeamService from "src/sevices/TeamService";
import { provide } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { result: currentTeam } = TeamService.fetchTeamById(route.params.id);

provide("currentTeam", currentTeam);
</script>

<style scoped lang="scss"></style>
