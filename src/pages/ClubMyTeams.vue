<template>
  <q-page class="c-pa-32">
    <div class="flex justify-between">
      <h3 class="text-h3">Мои команды</h3>

      <div class="flex flex-start">
        <!-- доработать верстку кнопок -->
        <c-button
          class="text-body1"
          :label="'Создать команду'"
          :outline="true"
        />

        <c-button class="text-body1" :label="'Найти команду'" :outline="true" />
      </div>
    </div>

    <div>
      <div v-if="teams.length" class="flex club-mb-32">
        <c-my-team v-for="team in teams" :key="team.id" :team="team" />
      </div>

      <div v-else>
        <c-not-found-teams />
        <!-- изменить верстку -->
      </div>
    </div>

    <c-team-request :title="'Входящие заявки'" />
    <!-- доработать верстку внутри компонента - если есть заявки -->
    <c-team-request :title="'Исходящие заявки'" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CButton from "src/components/ClubButton.vue";
import CMyTeam from "src/components/ClubMyTeam.vue";
import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CCreateTeamForm from "src/components/ClubCreateTeamForm.vue";
import CTeamRequest from "src/components/ClubTeamRequest.vue";

const teams = ref([
  {
    id: 1,
    img: "",
    title: "Dream Team",
    content:
      "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!",
  },
]); // доработать верстку для 2 карточек
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
