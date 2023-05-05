<template>
  <q-page v-if="teams.length" class="c-pa-32">

    <c-my-teams/>

  </q-page>

  <q-page v-else class="c-pa-32 page-background flex flex-center" style="z-index: 0">
    <c-not-found-teams />

    <!-- <section class="flex flex-center"> -->
    <c-create-team-form />
    <!-- </section> -->
    <!-- <c-team-profile :team="team" /> -->
  </q-page>

</template>

<script setup>
import { ref } from "vue";
import CMyTeams from "src/components/ClubMyTeams.vue";
import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CCreateTeamForm from "src/components/ClubCreateTeamForm.vue";
import CTeamProfile from "src/components/ClubTeamProfile.vue";

const teams = ref([
  {
    id: 1,
    img: "",
    title: "Dream Team",
    content: "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни. Мы ждем иммено тебя!"
  }
])
</script>

<style lang="scss" scoped></style>
