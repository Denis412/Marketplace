<template>
  <q-page class="c-pa-32 relative-position">
    <section v-if="loading" class="loader loader-lg text-h1"></section>

    <section v-else>
      <div class="flex justify-between c-mb-32">
        <h3 class="text-h3">Мои команды</h3>
        <c-add-buttons v-if="currentUser.teams.length" />
      </div>

      <div>
        <c-team-card-list v-if="currentUser.teams.length" :teams="currentUser.teams" />
        <c-not-found-teams v-else />
      </div>

      <c-team-request />
    </section>
  </q-page>
</template>

<script setup>
import { inject } from "vue";
import CTeamCardList from "src/components/ClubTeamCardList.vue";
import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CTeamRequest from "src/components/ClubTeamRequest.vue";
import CAddButtons from "src/components/ClubTeamAddButtons.vue";

const currentUser = inject("currentUser");
</script>

<style lang="scss" scoped>
.btn-text {
  width: auto;

  &:hover {
    background: #eee5f4;
  }
}

.q-item {
  padding: 8px 0;
}
</style>
