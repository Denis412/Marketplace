<template>
  <div class="c-team-card flex c-pa-32 q-ma-sm">
    <q-avatar class="c-team-avatar">
      <q-img src="/src/assets/teams/avatarDefault.png" />
    </q-avatar>

    <div class="c-ml-24">
      <h4 class="text-h4 club-mb-16">{{ team.name }}</h4>
      <h6 class="text-body2">{{ team.description }}</h6>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { team } = defineProps({
  team: Object,
});

console.log(team);
</script>

<style lang="scss" scoped>
.c-team {
  &-card {
    background-color: white;
    width: 544px;
  }

  &-avatar {
    width: 108px;
    height: 108px;
  }
}
</style>