<template>
  <q-page class="c-pa-32">
    <div v-if="loading" class="loader loader-lg"></div>

    <div v-else>
      <c-teams-header
        class="c-mb-32"
        @filter-team-status="teamListByStatus"
        @filter-team-name="teamListByChar"
      />
      <c-team-card-list :teams="currentTeams" />
    </div>
  </q-page>
</template>

<script setup>
import CTeamsHeader from "src/components/ClubTeamsHeader.vue";
import CTeamCardList from "src/components/ClubTeamCardList.vue";
import { ref, watch } from "vue";
import teamApi from "src/sdk/team";

const { result: teams, loading } = teamApi.queryAllTeams();
const currentTeams = ref([]);

const teamListByStatus = async (new_status) => {
  currentTeams.value = await teamApi.checkStatus(new_status);
};

const teamListByChar = async (char) => {
  try {
    currentTeams.value =
      char !== "" ? await teamApi.checkChar(char) : await teamApi.getAllTeams();
  } catch (error) {
    console.log(error);
  }
};

watch(loading, (value) => {
  if (value) return;

  currentTeams.value = teams.value?.paginate_team.data;
});
</script>

<style scoped lang="scss"></style>
