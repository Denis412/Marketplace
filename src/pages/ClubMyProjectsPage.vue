<template>
  <q-page class="c-px-32 c-py-72">
    <div class="loader loader-lg" v-if="loading" />

    <div v-else>
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
          v-for="project in projects"
          :key="project.id"
          class="col-4 q-pa-md"
        >
          <c-card-project :current-project="project" />
        </section>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { useUserStore } from "src/stores/user";
import { computed, onMounted, ref } from "vue";

import CCardProject from "src/components/ClubCardProject.vue";
import projectApi from "src/sdk/project";

const userStore = useUserStore();
const currentUser = computed(() => userStore.GET_CURRENT_USER);

// const currentProjects = computed(() => currentUser.value?)

const projects = ref([]);
const loading = ref(true);
const selectedProjectsType = ref("active");

onMounted(async () => {
  let pr = [];

  loading.value = true;
  for (let team of currentUser.value.teams) {
    try {
      pr = await projectApi.refetchPaginateProjects({
        page: 1,
        perPage: 100,
        space_id: team.space,
      });

      projects.value.push(
        ...pr.map((p) => Object.assign({}, p, { space: team.space }))
      );
    } catch (error) {}
  }

  loading.value = false;
});
</script>

<style scoped lang="scss"></style>
