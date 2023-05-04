<template>
  <q-page class="c-pa-32 relative-position">
    <section v-if="loading" class="loader loader-lg text-h1"></section>

    <section v-else>
      <div class="flex justify-between c-mb-32">
        <h3 class="text-h3">Мои команды</h3>

        <c-add-buttons v-if="myTeams.paginate_team.data.length" />
      </div>

      <div
        v-if="myTeams.paginate_team.data.length"
        class="row c-mb-32 q-col-gutter-lg"
      >
        <section
          class="col-6"
          v-for="team in myTeams.paginate_team.data"
          :key="team.id"
        >
          <c-my-team :team="team" />
        </section>
      </div>

      <div v-else>
        <c-not-found-teams />
      </div>

      <c-team-request :title="'Входящие заявки'" :requests="requestsIn" />
      <c-team-request :title="'Исходящие заявки'" :requests="requestsOut" />
    </section>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CMyTeam from "src/components/ClubMyTeam.vue";
import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CTeamRequest from "src/components/ClubTeamRequest.vue";
import CAddButtons from "src/components/ClubTeamAddButtons.vue";
import teamApi from "src/sdk/team";
import { useUserStore } from "src/stores/user";

const userStore = useUserStore();

const { result: myTeams, loading } = teamApi.queryMyTeams(
  userStore.GET_CURRENT_USER.subject_id
);

const requestsIn = ref([]);
const requestsOut = ref([]);
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
