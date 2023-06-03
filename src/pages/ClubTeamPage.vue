<template>
  <q-page class="c-pa-32">
    <div v-if="!team" class="loader loader-lg" />

    <section v-else>
      <header class="q-pb-md">
        <h3 class="text-h3">Профиль команды</h3>
      </header>

      <c-team-profile is-profile v-if="!loading && team" />
    </section>
  </q-page>
</template>

<script setup>
import CTeamProfile from "src/components/ClubTeamProfile.vue";
// import userApi from "src/sdk/user";
import { computed, provide } from "vue";
import { useRoute } from "vue-router";

import TeamService from "src/sevices/TeamService";

const route = useRoute();

const { result: currentTeam } = TeamService.fetchTeamById(route.params.id);

const { result: members, loading } = TeamService.fetchSubjectsInTeamSpace(
  {},
  {
    space_id: route.query.space,
  }
);

// const { result: members, loading } = userApi.paginateSubjects({
//   page: 1,
//   perPage: 100,
//   is_team: true,
//   space_id: route.query.space,
// });

const team = computed(() => currentTeam.value);
const currentMembers = computed(() => members.value);

provide("currentTeam", team);
provide("currentMembers", currentMembers);
</script>

<style scoped lang="scss"></style>
