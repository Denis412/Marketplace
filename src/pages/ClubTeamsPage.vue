<template>
  <q-page class="c-pa-32">
    <!-- <pre>{{ teams }}</pre> -->
    <div v-if="loading" class="loader loader-lg"></div>

    <div v-else>
      <c-teams-header
        class="c-mb-32"
        @filter-team-status="filteringTeams"
        @filter-team-name="filteringTeams"
      />

      <c-team-card-list :teams="showTeams" />
    </div>
  </q-page>
</template>

<script setup>
import CTeamsHeader from "src/components/ClubTeamsHeader.vue";
import CTeamCardList from "src/components/ClubTeamCardList.vue";
import { computed, ref } from "vue";

import teamApi from "src/sdk/team";

const {
  result: teams,
  loading,
  refetch,
} = teamApi.paginateTeams({
  page: 1,
  perPage: 50,
});

const filteredTeams = ref(null);
const filters = ref({
  name: "",
  ready_for_orders: "",
});

const showTeams = computed(() => filteredTeams.value ?? teams.value?.paginate_team.data);

const filteringTeams = async (filter, value) => {
  filters.value[filter] = value;

  filteredTeams.value = await refetch({
    where: filters.value.name
      ? { column: "name", operator: "FTS", value: filters.value.name }
      : null,
  });

  if (filters.value.ready_for_orders)
    filteredTeams.value = filteredTeams.value?.filter(
      (team) =>
        team.ready_for_orders === filters.value.ready_for_orders.value ||
        (!filters.value.ready_for_orders.value && team.ready_for_orders === null)
    );
};
</script>

<style lang="scss" scoped></style>
