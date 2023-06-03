<template>
  <q-page class="c-pa-32">
    <div v-if="!team && !currentMembers" class="loader loader-lg" />

    <section v-else>
      <header class="q-pb-md">
        <h3 class="text-h3">Командное пространство</h3>
      </header>

      <c-team-profile v-if="team" />
    </section>
  </q-page>
</template>

<script setup>
import CTeamProfile from "src/components/ClubTeamProfile.vue";
import { computed, onMounted, provide } from "vue";
import { useRoute } from "vue-router";

import TeamService from "src/sevices/TeamService";

const route = useRoute();

const { result: currentTeam } = TeamService.fetchTeamById(route.params.id);

const { result: members, loading } = TeamService.fetchSubjectsInTeamSpace(
  {},
  { space_id: route.query.space }
);

const team = computed(() => currentTeam.value);
const currentMembers = computed(() => members.value);

provide("currentTeam", team);
provide("currentMembers", currentMembers);

onMounted(() => console.log("hello space"));
</script>

<style scoped lang="scss"></style>
