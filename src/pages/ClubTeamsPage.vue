<template>
  <q-page class="c-pa-32">
    <div v-if="loading" class="loader loader-lg"></div>

    <div v-else>
      <c-teams-header
        class="c-mb-32"
        @filter-team-status="teamListByStatus"
        @filter-team-name="teamListByChar"
      />

      <c-team-card-list :teams="filteredTeams ?? teams.paginate_team.data" />
    </div>
  </q-page>
</template>

<script setup>
import CTeamsHeader from "src/components/ClubTeamsHeader.vue";
import CTeamCardList from "src/components/ClubTeamCardList.vue";
import { ref, watch } from "vue";
import teamApi from "src/sdk/team";

const { result: teams, loading } = teamApi.paginateTeams({
  page: 1,
  perPage: 100,
});
const filteredTeams = ref(null);

const teamListByStatus = async (new_status) => {
  console.log(new_status.value);

  filteredTeams.value = await teamApi.refetchPaginateTeams({
    page: 1,
    perPage: 100,
    where: {
      column: "ready_for_orders",
      operator: "EQ",
      value: new_status.value,
    },
  });
};

const teamListByChar = async (char) => {
  try {
    filteredTeams.value =
      char !== ""
        ? await teamApi.refetchPaginateTeams({
            page: 1,
            perPage: 100,
            where: {
              column: "name",
              operator: "FTS",
              value: char,
            },
          })
        : await teamApi.refetchPaginateTeams({ page: 1, perPage: 100 });
  } catch (error) {
    console.log(error);
  }
};

watch(loading, (value) => {
  if (value) return;

  filteredTeams.value = teams.value?.paginate_team.data;
});
</script>

<style scoped lang="scss"></style>
