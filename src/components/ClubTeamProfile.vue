<template>
  <section>
    <header>
      <h3 class="text-h3">Профиль команды</h3>
    </header>

    <main class="club-mt-24">
      <c-team-profile-header
        :title="team.title"
        :description="team.description"
        :directions="team.directions"
      />

      <c-team-profile-projects :projects="team.projects" />
      <c-team-profile-members :team="team" />
    </main>
  </section>
</template>

<script setup>
import CTeamProfileHeader from "./ClubTeamProfileHeader.vue";
import CTeamProfileProjects from "src/components/ClubTeamProfileProjects.vue";
import CTeamProfileMembers from "./ClubTeamProfileMembers.vue";

const { team } = defineProps({
  team: Object,
});
</script>

<style scoped lang="scss"></style>
