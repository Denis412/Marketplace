<template>
  <section class="c-mt-72">
    <h4 class="text-h4">Участники проекта</h4>

    <q-toolbar class="q-pa-none q-mt-lg">
      <q-tabs v-model="selectedList" indicator-color="black" class="bg-transparent">
        <q-tab name="members" no-caps class="c-tab-text" label="Участники" />
        <q-tab name="applications" no-caps class="c-tab-text" label="Исходящие заявки" />
      </q-tabs>

      <q-space />

      <q-btn
        flat
        no-caps
        class="club-button-background text-body1"
        label="Пригласить"
        @click="redirectInvite"
      />
    </q-toolbar>

    <div v-if="selectedList === 'members'">
      <c-project-members-list class="c-mt-40" team_space roles />
    </div>

    <div v-else>
      <c-applications-list
        subjects
        project
        is_project
        :applications="currentProject.applications"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, inject, provide, ref } from "vue";

import CSpecialistItem from "src/components/ClubSpecialistItem.vue";
import CProjectMembersList from "src/components/ClubProjectMembersList.vue";
import CApplicationsList from "./ClubApplicationsList.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const currentProject = inject("currentProject");

const selectedList = ref("members");

const redirectInvite = () => {
  router.push({
    name: "projectInvite",
    params: { ...route.params },
    query: { ...route.query },
  });
};
</script>

<style scoped lang="scss"></style>
