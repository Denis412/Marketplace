<template>
  <q-page class="c-pt-32 c-pl-32 c-pr-32">
    <c-team-settings />
  </q-page>
</template>

<script setup>
import CTeamSettings from "src/components/ClubTeamSettings.vue";

import { useRouter } from "vue-router";

const router = useRouter();

console.log(router.currentRoute.value.params);
</script>

<style scoped lang="scss"></style>
