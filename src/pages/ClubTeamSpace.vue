<template>
  <q-page class="c-pa-32">
    <div v-if="!team && !currentMembers" class="loader loader-lg" />

    <section v-else>
      <header class="q-pb-md">
        <h3 class="text-h3">Командное пространство</h3>
      </header>

      <c-team-profile v-if="team" />
    </section>
  </q-page>
</template>

<script setup>
import CTeamProfile from "src/components/ClubTeamProfile.vue";
import teamApi from "src/sdk/team";
import userApi from "src/sdk/user";
import { computed, onMounted, provide } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { result: currentTeam } = teamApi.queryTeamById({
  id: route.params.id,
});

const { result: members, loading } = userApi.paginateSubjects({
  page: 1,
  perPage: 100,
  is_team: true,
  space_id: route.query.space,
});

const team = computed(() => currentTeam.value?.get_team);
const currentMembers = computed(() => members.value?.paginate_subject.data);

provide("currentTeam", team);
provide("currentMembers", currentMembers);

onMounted(() => console.log("hello space"));
</script>

<style scoped lang="scss"></style>
