<template>
  <section>
    <header class="q-pb-md">
      <h3 class="text-h3">Профиль команды</h3>
    </header>

    <main v-if="team">
      <c-team-profile-header :team="team" :currentUser="currentUser" />

      <c-team-profile-projects
        class="c-pt-32"
        :projects="projects"
        :currentUser="currentUser"
      />
      <c-team-profile-members :team="team" :currentUser="currentUser" />
    </main>
  </section>
</template>

<script setup>
import { computed, provide, ref } from "vue";
import { useUserStore } from "src/stores/user";

import CTeamProfileHeader from "./ClubTeamProfileHeader.vue";
import CTeamProfileProjects from "src/components/ClubTeamProfileProjects.vue";
import CTeamProfileMembers from "./ClubTeamProfileMembers.vue";

const { team } = defineProps({
  team: Object,
});

const projects = ref([
  {
    id: 1,
    name: "Проект1",
  },
  {
    id: 2,
    name: "Проект1",
  },
  {
    id: 3,
    name: "Проект1",
  },
]);

const userStore = useUserStore();

const currentUser = computed(() => userStore.GET_CURRENT_USER);
const isOwner = computed(() => currentUser.value.subject_id === team.author_id);

provide("isOwner", isOwner);
</script>

<style scoped lang="scss"></style>
