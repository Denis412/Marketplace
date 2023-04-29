<template>
  <q-page class="c-pa-32 page-background flex flex-center" style="z-index: 0">
    <!-- <c-not-found-teams /> -->

    <!-- <section class="flex flex-center"> -->
    <!-- <c-create-team-form /> -->
    <!-- </section> -->
    <!-- <c-team-profile :team="team" /> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CCreateTeamForm from "src/components/ClubCreateTeamForm.vue";
import CTeamProfile from "src/components/ClubTeamProfile.vue";
</script>

<style scoped lang="scss"></style>
