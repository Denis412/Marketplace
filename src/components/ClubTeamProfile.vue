<template>
  <section>
    <header class="q-pb-md">
      <h3 class="text-h3">Профиль команды</h3>
    </header>

    <main v-if="currentTeam">
      <section v-if="loading" class="loader loader-lg"></section>

      <section v-else>
        <c-team-profile-header />
        <c-team-profile-projects class="c-pt-32" :projects="projects" />
        <c-team-profile-members />
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, inject, onMounted, provide, ref } from "vue";

import CTeamProfileHeader from "./ClubTeamProfileHeader.vue";
import CTeamProfileProjects from "src/components/ClubTeamProfileProjects.vue";
import CTeamProfileMembers from "./ClubTeamProfileMembers.vue";

import { useTeamIsMember } from "src/use/teams";

const { result, loading, checkIsMember } = useTeamIsMember();

const currentUser = inject("currentUser");
const currentTeam = inject("currentTeam");

console.log("TEEEEEAM", currentTeam);

const projects = ref([
  {
    id: 1,
    name: "Проект1",
  },
  {
    id: 2,
    name: "Проект2",
  },
  {
    id: 3,
    name: "Проект3",
  },
]);

const isOwner = computed(
  () => currentUser.value.subject_id === currentTeam?.value.author_id
);

provide("isOwner", isOwner);
provide("isMember", result);

onMounted(async () => await checkIsMember(currentTeam?.value));
</script>

<style scoped lang="scss"></style>
