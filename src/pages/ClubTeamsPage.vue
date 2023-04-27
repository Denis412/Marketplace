<template>
  <q-page class="c-pa-32 page-background" style="z-index: 0">
    <div>
      <div v-if="teams.length" class="flex club-mb-32">
        <c-team-card v-for="team in teams" :key="team.id" :team="team" />
      </div>

      <div v-else>
        <c-not-found-teams />
      </div>
    </div>

    <c-team-request />
    <c-team-request />

    <!-- <section class="flex flex-center"> -->
    <!-- <c-create-team-form /> -->
    <!-- </section> -->
    <!-- <c-team-profile :team="team" /> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import {
  useQuery,
  useMutation,
  provideApolloClient,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { getTeams } from "src/graphql/team/queries";

import CNotFoundTeams from "src/components/ClubNotFoundTeams.vue";
import CCreateTeamForm from "src/components/ClubCreateTeamForm.vue";
import CTeamProfile from "src/components/ClubTeamProfile.vue";
import CTeamCard from "src/components/ClubTeamCard.vue";
import CTeamRequest from "src/components/ClubTeamRequest.vue";

provideApolloClient(apolloClient);

// const teams = ref([]);

// const {
//   result: teamsResult,
//   onResult: teamsIsOk,
//   refetch: refetchTeams,
// } = useQuery(getTeams);

// teamsIsOk(() => {
//   teams.value = teamsResult.value;
//   console.log(teams.value);
// });

//тестовый массив
const teams = ref([
  {
    id: 1,
    name: "Dream Team",
    description: "Testing space Dream Team",
  },
  {
    id: 4,
    name: "Nigina",
    description: "Testing space Nigina",
  },
]);
</script>

<style scoped lang="scss"></style>
