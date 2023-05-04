<template>
  <q-page class="c-pa-32">
    <c-search-team-page-header class="c-mb-32" @filter-team-list="newTeamList"/>
    <c-search-team-page-list :teams="teams" />
  </q-page>
</template>

<script setup>
import CSearchTeamPageHeader from "src/components/ClubSearchTeamPageHeader.vue";
import CSearchTeamPageList from "src/components/ClubSearchTeamPageList.vue";
import { ref } from "vue";
import teamApi from "src/sdk/team";

const teams = ref([]);
const status = ref('');


teamApi.getAll().then((allTeams) => (teams.value = allTeams));

const newTeamList = (new_status) =>{
  status.value = new_status
  teamApi.checkStatus(status.value).then((filterTeams) => (teams.value = filterTeams));
}
</script>

<style scoped lang="scss"></style>
