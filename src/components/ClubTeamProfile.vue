<template>
  <section>
    <header class="q-pb-md">
      <h3 class="text-h3">Профиль команды</h3>
    </header>

    <main v-if="team">
      <section v-if="checkingMember" class="loader loader-lg"></section>

      <section v-else>
        <c-team-profile-header :team="team" :currentUser="currentUser" />

        <c-team-profile-projects
          class="c-pt-32"
          :projects="projects"
          :currentUser="currentUser"
        />
        <c-team-profile-members :team="team" :currentUser="currentUser" />
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, onMounted, provide, ref } from "vue";
import { useUserStore } from "src/stores/user";

import CTeamProfileHeader from "./ClubTeamProfileHeader.vue";
import CTeamProfileProjects from "src/components/ClubTeamProfileProjects.vue";
import CTeamProfileMembers from "./ClubTeamProfileMembers.vue";
import teamApi from "src/sdk/team";

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
    name: "Проект2",
  },
  {
    id: 3,
    name: "Проект3",
  },
]);

const userStore = useUserStore();

const currentUser = computed(() => userStore.GET_CURRENT_USER);
const isOwner = computed(() => currentUser.value.subject_id === team.author_id);
const isMember = ref(false);
const checkingMember = ref(true);

provide("isOwner", isOwner);
provide("isMember", isMember);

onMounted(async () => {
  checkingMember.value = true;

  isMember.value = await teamApi.isMember(currentUser.value.user_id, team);

  checkingMember.value = false;
});
</script>

<style scoped lang="scss"></style>
