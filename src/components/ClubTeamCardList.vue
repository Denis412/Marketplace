<template>
  <div v-if="teams" class="row c-mb-32 q-col-gutter-lg">
    <section class="col-6" v-for="team in teams" :key="team.id">
      <c-team-card :team="team" />
    </section>
  </div>
</template>

<script setup>
import CTeamCard from "src/components/ClubTeamCard.vue";

const { teams } = defineProps({
  teams: Object,
});

console.log(teams);
</script>

<style lang="sass" scoped>
</style>
