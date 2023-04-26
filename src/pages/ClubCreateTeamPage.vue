<template>
  <q-page class="c-pa-32 page-background flex flex-center" style="z-index: 0">
    <c-create-team-form />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CCreateTeamForm from "src/components/ClubCreateTeamForm.vue";
import CTeamProfile from "src/components/ClubTeamProfile.vue";
</script>

<style scoped lang="scss"></style>
