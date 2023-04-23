<template>
  <q-page class="flex flex-center no-wrap page-background" style="z-index: 0">
    <!-- <c-not-found-teams /> -->
    <c-create-team-form />
  </q-page>
</template>

<script setup>
import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CCreateTeamForm from "src/components/ClubCreateTeamForm.vue";
</script>

<style scoped lang="scss"></style>
