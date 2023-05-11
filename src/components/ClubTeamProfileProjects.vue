<template>
  <section>
    <q-toolbar class="flex items-center">
      <q-toolbar-title style="max-width: min-content">
        <h4 class="text-h4">Проекты</h4>
      </q-toolbar-title>

      <q-btn-toggle
        v-model="selectProjectsList"
        flat
        stretch
        class="text-body1"
        toggle-color="purple-7"
        :options="typesProjectsList"
      />
    </q-toolbar>

    <main>
      <section
        v-if="!currentProjects?.length || loading"
        class="row ptojects-wrapper q-gutter-x-md"
      >
        <c-card-add-project
          v-if="isOwner"
          flat
          class="flex flex-center project-card col-4"
        />

        <q-card flat class="flex flex-center project-card col">
          <q-img
            class="no-projects-img"
            src="/assets/images/team-page/no-projects.svg"
          />

          <div class="text-body2 c-ml-64">
            У вашей команды пока нет проектов...
          </div>
        </q-card>
      </section>

      <section v-else class="ptojects-wrapper">
        <q-list class="row no-wrap q-gutter-md" style="overflow-x: auto">
          <c-card-add-project
            v-if="isOwner"
            flat
            class="flex flex-center project-card col-4"
          />

          <c-project-card
            v-for="project in currentProjects"
            flat
            class="flex flex-center project-card col-4"
            :key="project.id"
            :project="project"
          />
        </q-list>
      </section>
    </main>
  </section>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";

import { useProjectsQuery } from "src/use/projects";

import CCardAddProject from "./ClubCardAddProject.vue";
import CProjectCard from "./ClubProjectCard.vue";

const { result: currentProjects, loading, getWithWere } = useProjectsQuery();

const currentTeam = inject("currentTeam");
const isOwner = inject("isOwner");

const typesProjectsList = ref([
  { label: "Активные", value: "active" },
  { label: "Завершенные", value: "finished" },
]);

const selectProjectsList = ref("");

onMounted(async () => {
  await getWithWere({ team: currentTeam });
});
</script>

<style scoped lang="scss">
.no-projects-img {
  max-width: 212px;
}

.ptojects-wrapper {
  min-height: 256px;
}

.project-card {
  min-width: 300px;
  min-height: 256px;

  border: 1px dashed $violet-6;
  border-radius: 5px;

  &-add {
    max-width: 352px;
  }
}

.q-toolbar {
  padding: 0px;
}
</style>
