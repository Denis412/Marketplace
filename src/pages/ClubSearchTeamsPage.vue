<template>
  <q-page class="c-pa-32">
    <c-search-team-page-header class="c-mb-32" />
    <c-search-team-page-list :teams="teams" />
  </q-page>
</template>

<script setup>
import CSearchTeamPageHeader from "src/components/ClubSearchTeamPageHeader.vue";
import CSearchTeamPageList from "src/components/ClubSearchTeamPageList.vue";
import { ref } from "vue";
import userTeams from "src/sdk/team";

const teams = ref([]);

userTeams.getAll().then((allTeams) => (teams.value = allTeams));
</script>

<style scoped lang="scss"></style>
