<template>
  <q-page class="c-pa-32">
    <div v-if="!team" class="loader loader-lg" />

    <section v-else>
      <header class="q-pb-md">
        <h3 class="text-h3">Профиль команды</h3>
      </header>

      <c-team-profile is-profile />
    </section>
  </q-page>
</template>

<script setup>
import CTeamProfile from "src/components/ClubTeamProfile.vue";
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

const team = computed(() => currentTeam.value?.paginate_team.data[0]);

provide("currentTeam", team);
</script>

<style scoped lang="scss"></style>
