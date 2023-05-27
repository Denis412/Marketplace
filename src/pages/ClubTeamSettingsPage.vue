<template>
  <q-page class="c-pt-32 c-pl-32 c-pr-32">
    <c-team-settings v-if="team" />
  </q-page>
</template>

<script setup>
import CTeamSettings from "src/components/ClubTeamSettings.vue";
import teamApi from "src/sdk/team";
import { computed, provide } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { result: currentTeam } = teamApi.paginateTeams({
  page: 1,
  perPage: 1,
  where: {
    column: "id",
    operator: "EQ",
    value: route.params.id,
  },
});

const team = computed(() => currentTeam.value?.paginate_team?.data[0]);

provide("currentTeam", team);
</script>

<style scoped lang="scss"></style>
