<template>
  <q-page class="c-pa-32">
    <c-search-team-page-header class="c-mb-32" @filter-team-status="teamListByStatus" @filter-team-name="teamListByChar"/>
    <c-search-team-page-list :teams="teams" />
  </q-page>
</template>

<script setup>
import CSearchTeamPageHeader from "src/components/ClubSearchTeamPageHeader.vue";
import CSearchTeamPageList from "src/components/ClubSearchTeamPageList.vue";
import { ref } from "vue";
import teamApi from "src/sdk/team";

const teams = ref([]);

teamApi.getAll().then((allTeams) => (teams.value = allTeams));

const teamListByStatus = async (new_status) => {
  teams.value = await teamApi.checkStatus(new_status)
}

const teamListByChar = async (char) => {
  if (char!=""){
    teams.value = await teamApi.checkChar(char)
  }
  else{
    teams.value = await teamApi.getAll()
  }

}


</script>

<style scoped lang="scss"></style>
