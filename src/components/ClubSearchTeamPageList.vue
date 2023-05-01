<template>
  <q-list class="row justify-between club-mb-32">
    <slot name="list-item" :teams="teams">
      <c-search-team-page-item
        v-for="team in teams"
        :key="team.id"
        :team="team"
      />
    </slot>
  </q-list>
</template>

<script setup>
import CSearchTeamPageItem from "src/components/ClubSearchTeamPageItem.vue";

const { teams } = defineProps({
  teams: Array,
});

</script>

<style scoped lang="scss"></style>