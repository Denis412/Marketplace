<template>
  <q-page class="c-pa-32">
    <div v-if="loading" class="loader loader-lg"></div>

    <c-team-profile v-else />
  </q-page>
</template>

<script setup>
import CTeamProfile from "src/components/ClubTeamProfile.vue";
import teamApi from "src/sdk/team";
import { computed, provide } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { result: currentTeam, loading } = teamApi.paginateTeams({
  page: 1,
  perPage: 1,
  where: {
    column: "name",
    operator: "EQ",
    value: route.params.name,
  },
});

const team = computed(() => currentTeam.value.paginate_team?.data[0]);

console.log("ClubTeamPage",team);
provide("currentTeam", team);
</script>

<style scoped lang="scss"></style>
