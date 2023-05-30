<template>
  <div v-if="!teams" class="text-h4 text-center">Загружаем команды...</div>

  <div v-else-if="!teams.length" class="text-h4 text-center">Команд не найдено.</div>

  <q-list v-else class="row c-mb-32 q-col-gutter-lg">
    <section class="col-6" v-for="team in teams" :key="team.id">
      <c-team-card :team="team" />
    </section>
  </q-list>
</template>

<script setup>
import CTeamCard from "src/components/ClubTeamCard.vue";

const { teams } = defineProps({
  teams: Object,
});

console.log(teams);
</script>

<style lang="sass" scoped></style>
