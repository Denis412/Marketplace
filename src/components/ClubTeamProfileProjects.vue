<template>
  <section>
    <div class="column" style="max-width: min-content">
      <h4 class="text-h4">Проекты</h4>

      <q-tabs
        v-model="selectProjectsList"
        indicator-color="black"
        class="bg-transparent c-tab-text q-mt-md"
      >
        <q-tab no-caps name="active" label="Активные" />

        <q-tab no-caps name="finished" label="Завершенные" />
      </q-tabs>
    </div>

    <!-- <pre>{{ currentProjects }}</pre> -->

    <main class="q-mt-md">
      <section
        v-if="
          !currentProjects?.paginate_project?.data.length || projectsLoading
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

          <div class="text-body2 c-ml-64">У команды пока нет проектов...</div>
        </q-card>
      </section>

      <section v-else class="ptojects-wrapper">
        <!-- <q-carousel
          v-model="slide"
          transition-prev="jump-right"
          transition-next="jump-left"
          swipeable
          animated
          control-color="black"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          height="300px"
          class="rounded-borders c-carousel"
        >
          <q-carousel-slide
            v-for="(projects, index) in chunkedProjects"
            :key="projects[0].id"
            :name="index"
            class="row q-col-gutter-x-md"
          >
            <section
              v-for="project in projects"
              :key="project.id"
              class="col-4"
            >
              <c-project-card
                flat
                class="flex flex-center project-card cursor-pointer"
                :project="project"
                @click="redirectProjectPage(project)"
              />
            </section>
          </q-carousel-slide>
        </q-carousel> -->

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
import { computed, inject, onMounted, ref } from "vue";

import CCardAddProject from "./ClubCardAddProject.vue";
import CProjectCard from "./ClubProjectCard.vue";
import projectApi from "src/sdk/project";
import { useRouter } from "vue-router";
import { useProjectsQuery } from "src/use/projects";
import _ from "lodash";

const router = useRouter();
const { result, loading, getWithWere } = useProjectsQuery();

const currentTeam = inject("currentTeam");
const isOwner = inject("isOwner");

const {
  projects: currentProjects,
  projectsLoading,
  refetch,
} = getWithWere({
  space_id: currentTeam.value?.space,
});

const chunkedProjects = computed(() =>
  _.chunk(currentProjects.value?.paginate_project.data, 3)
);

const slide = ref("1");
const lorem =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.";

const selectProjectsList = ref("active");

const redirectProjectPage = (project) => {
  router.push({
    name: "project",
    params: { id: project.id, space: currentTeam.value.space },
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
