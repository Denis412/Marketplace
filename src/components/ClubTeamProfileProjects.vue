<template>
  <section>
    <q-toolbar class="flex items-center">
      <q-toolbar-title style="max-width: min-content">
        <h4 class="text-h4">Проекты</h4>
      </q-toolbar-title>

      <q-tabs
        v-model="selectProjectsList"
        indicator-color="black"
        class="bg-transparent text-body1"
      >
        <q-tab name="active" label="Активные" />

        <q-tab name="finished" label="Завершенные" />
      </q-tabs>
    </q-toolbar>

    <!-- <pre>{{ currentProjects }}</pre> -->

    <main class="q-mt-md">
      <section
        v-if="
          !currentProjects?.paginate_project?.data.length || paginateLoading
        "
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
        <q-list class="row no-wrap" style="overflow-x: auto">
          <section class="col-4 q-pr-md">
            <c-card-add-project
              v-if="isOwner"
              flat
              class="flex flex-center project-card"
            />
          </section>

          <section
            v-for="project in currentProjects?.paginate_project?.data"
            :key="project.id"
            class="col-4 q-px-md"
          >
            <c-project-card
              flat
              class="flex flex-center project-card cursor-pointer"
              :project="project"
              @click="redirectProjectPage(project)"
            />
          </section>
        </q-list>
      </section>
    </main>
  </section>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";

import CCardAddProject from "./ClubCardAddProject.vue";
import CProjectCard from "./ClubProjectCard.vue";
import projectApi from "src/sdk/project";
import { useRouter } from "vue-router";
import { useProjectsQuery } from "src/use/projects";

const router = useRouter();
const { result, loading, getWithWere } = useProjectsQuery();

const currentTeam = inject("currentTeam");
const isOwner = inject("isOwner");

const {
  paginateResult: currentProjects,
  paginateLoading,
  refetch,
} = getWithWere({
  space_id: currentTeam.value?.space,
});

// const { result: currentProjects } = projectApi.paginateProject({
//   page: 1,
//   perPage: 50,
//   where: null,
//   space_id: currentTeam.value?.space,
// });

const selectProjectsList = ref("active");

const redirectProjectPage = (project) => {
  router.push({
    name: "project",
    params: { name: project.name },
  });
};

onMounted(async () => await refetch({}));
</script>

<style scoped lang="scss">
.no-projects-img {
  max-width: 212px;
}

.ptojects-wrapper {
  min-height: 256px;
}

.project-card {
  min-height: 256px;

  border: 1px dashed $violet-6;
  border-radius: 5px;

  &-add {
    // max-width: 352px;
  }
}

.q-toolbar {
  padding: 0px;
}
</style>
