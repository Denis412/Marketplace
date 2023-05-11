<template>
  <section>
    <header class="q-pb-md">
      <h3 class="text-h3">Профиль команды</h3>
    </header>

    <main v-if="currentTeam">
      <section v-if="checkingMember" class="loader loader-lg"></section>

      <section v-else>
        <c-team-profile-header />
        <c-team-profile-projects class="c-pt-32" :projects="projects" />
        <c-team-profile-members />
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, inject, onMounted, provide, ref } from "vue";

import CTeamProfileHeader from "./ClubTeamProfileHeader.vue";
import CTeamProfileProjects from "src/components/ClubTeamProfileProjects.vue";
import CTeamProfileMembers from "./ClubTeamProfileMembers.vue";
import teamApi from "src/sdk/team";

const currentUser = inject("currentUser");
const currentTeam = inject("currentTeam");

console.log("TEEEEEAM", currentTeam);

const projects = ref([
  {
    id: 1,
    name: "Проект1",
  },
  {
    id: 2,
    name: "Проект2",
  },
  {
    id: 3,
    name: "Проект3",
  },
]);

const isOwner = computed(
  () => currentUser.value.subject_id === currentTeam.value.author_id
);
const isMember = ref(false);
const checkingMember = ref(true);

provide("isOwner", isOwner);
provide("isMember", isMember);

onMounted(async () => {
  checkingMember.value = true;

  isMember.value = await teamApi.isMember(currentTeam.value);

  checkingMember.value = false;
});
</script>

<style scoped lang="scss"></style>
