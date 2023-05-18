<template>
  <main v-if="currentTeam">
    <section v-if="loading" class="loader loader-lg"></section>

    <section v-else>
      <c-team-profile-header :is-profile="isProfile" />
      <c-team-profile-projects :is-profile="isProfile" class="c-pt-32" />
      <c-team-profile-members :is-profile="isProfile" />
    </section>
  </main>
</template>

<script setup>
import { computed, inject, onMounted, provide } from "vue";

import CTeamProfileHeader from "./ClubTeamProfileHeader.vue";
import CTeamProfileProjects from "src/components/ClubTeamProfileProjects.vue";
import CTeamProfileMembers from "./ClubTeamProfileMembers.vue";

import { useTeamIsMember } from "src/use/teams";

const { isProfile } = defineProps({
  isProfile: Boolean,
});

const { result, loading, checkIsMember } = useTeamIsMember();

const currentUser = inject("currentUser");
const currentTeam = inject("currentTeam");

const isOwner = computed(
  () => currentUser.value.subject_id === currentTeam?.value.author_id
);

provide("isOwner", isOwner);
provide("isMember", result);

onMounted(async () => await checkIsMember(currentTeam?.value));
</script>

<style scoped lang="scss"></style>
