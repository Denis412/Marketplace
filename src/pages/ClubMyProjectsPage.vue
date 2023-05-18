<template>
  <q-page class="c-px-32 c-py-72">
    <h3 class="text-h3">Мои проекты</h3>

    <q-toolbar class="q-pb-md q-pa-none c-mt-40">
      <q-tabs
        v-model="selectedProjectsType"
        indicator-color="black"
        class="bg-transparent c-tab-text q-mt-md"
      >
        <q-tab no-caps name="active" label="Активные проекты" />
        <q-tab no-caps name="finished" label="Завершенные проекты" />
        <q-tab no-caps name="applicated" label="Приглашения в проект" />
      </q-tabs>
    </q-toolbar>

    <q-list class="row c-mt-40">
      <section
        v-for="project in currentProjects"
        :key="project.id"
        class="col-4"
      >
        <c-card-project :current-project="project" />
      </section>
    </q-list>

    <pre>{{ currentProjects }}</pre>
  </q-page>
</template>

<script setup>
import { useUserStore } from "src/stores/user";
import { computed, ref } from "vue";

import CCardProject from "src/components/ClubCardProject.vue";

const userStore = useUserStore();

const selectedProjectsType = ref("active");
const currentProjects = computed(() => userStore.GET_CURRENT_USER.projects);
</script>

<style scoped lang="scss"></style>
