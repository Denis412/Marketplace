<template>
  <q-page class="c-pa-32">
    <div class="flex justify-between c-mb-32">
      <h3 class="text-h3">Мои команды</h3>

      <c-add-buttons v-if="teams.length" />
    </div>

    <div>
      <div v-if="teams.length" class="flex club-mb-32 q-gutter-lg">
        <c-my-team v-for="team in myTeams" :key="team.id" :team="team" />
      </div>

      <div v-else>
        <c-not-found-teams />
      </div>
    </div>

    <c-team-request :title="'Входящие заявки'" :requests="requestsIn" />
    <c-team-request :title="'Исходящие заявки'" :requests="requestsOut" />
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CButton from "src/components/ClubButton.vue";
import CMyTeam from "src/components/ClubMyTeam.vue";
import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CCreateTeamForm from "src/components/ClubCreateTeamForm.vue";
import CTeamRequest from "src/components/ClubTeamRequest.vue";
import CAddButtons from "src/components/ClubTeamAddButtons.vue";
import teamApi from "src/sdk/team";
import { useUserStore } from "src/stores/user";

const userStore = useUserStore();

const myTeams = ref([]);

const teams = ref([
  {
    id: 1,
    img: "",
    title: "Dream Team",
    content:
      "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
  },
]);

//массивы заявок
const requestsIn = ref([]);
const requestsOut = ref([]);

onMounted(async () => {
  myTeams.value = await teamApi.getMy(userStore.GET_CURRENT_USER.subject_id);
});
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
