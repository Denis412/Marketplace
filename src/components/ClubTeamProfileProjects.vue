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

    <main class="q-mt-md">
      <section v-if="!chunkedProjects?.length" class="row ptojects-wrapper q-gutter-x-md">
        <c-card-add-project
          v-if="isOwner && !isProfile"
          flat
          class="flex flex-center project-card add-card col-4"
        />

        <q-card flat class="flex flex-center project-card col">
          <q-img class="no-projects-img" src="/assets/images/team-page/no-projects.svg" />

          <div class="text-body2 c-ml-64">У команды пока нет проектов...</div>
        </q-card>
      </section>

      <section v-else class="ptojects-wrapper">
        <section>
          <q-carousel
            v-model="slide"
            transition-prev="jump-right"
            transition-next="jump-left"
            swipeable
            animated
            control-color="black"
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
              <section v-if="isOwner && !isProfile" class="add-card col-4">
                <c-card-add-project flat class="flex flex-center project-card project-card-empty" />
              </section>

              <section class="row col q-col-gutter-x-md">
                <section
                  v-for="project in projects"
                  :key="project.id"
                  style="max-height: 100%"
                  :class="{ 'col-4': isProfile, 'col-6': !isProfile }"
                >
                  <c-project-card
                    flat
                    class="flex flex-center cursor-pointer"
                    :project="project"
                    @click="redirectProjectPage(project)"
                  />
                </section>
              </section>
            </q-carousel-slide>
          </q-carousel>

          <div class="row justify-center items-center q-gutter-x-md">
            <q-icon
              name="img:/assets/icons/arrow/arrow-left-violet4.svg"
              class="text-subtitle3 cursor-pointer"
              @click="switchSlide('prev')"
            />

            <div>
              <section class="q-gutter-x-md">
                <q-btn
                  flat
                  v-for="(chunk, index) in chunkedProjects"
                  :key="index"
                  class="c-carousel-control-button"
                  :class="{ 'active-control': slide === index }"
                  @click="switchSlide(_, index)"
                />
              </section>
            </div>

            <q-icon
              name="img:/assets/icons/arrow/arrow-left-violet4.svg"
              class="text-subtitle3 arrow-right cursor-pointer"
              @click="switchSlide('next')"
            />
          </div>
        </section>
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, inject, ref } from "vue";

import { useRouter } from "vue-router";
import _ from "lodash";

import CCardAddProject from "./ClubCardAddProject.vue";
import CProjectCard from "./ClubProjectCard.vue";
import projectApi from "src/sdk/project";

const router = useRouter();

const { isProfile } = defineProps({
  isProfile: Boolean,
});

const currentTeam = inject("currentTeam");
const isOwner = inject("isOwner");

const { result: currentProjects } = projectApi.paginateProject({
  page: 1,
  perPage: 50,
  space_id: currentTeam.value.space,
});

const chunkedProjects = computed(() =>
  _.chunk(currentProjects.value?.paginate_project.data, isProfile ? 3 : 2)
);

const slide = ref(0);
const selectProjectsList = ref("active");

const redirectProjectPage = (project) => {
  if (!isProfile)
    router.push({
      name: "project",
      params: { id: project.id },
      query: { name: project.name, space: currentTeam.value.space },
    });
};

const switchSlide = (direction = "", position = -1) => {
  let currentValue = slide.value;

  if (position !== -1) currentValue = position;
  else if (direction === "prev") currentValue - 1 < 0 ? null : (currentValue -= 1);
  else if (direction === "next")
    currentValue + 1 >= chunkedProjects.value.length ? null : (currentValue += 1);

  slide.value = currentValue;
};
</script>

<style scoped lang="scss">
.no-projects-img {
  max-width: 212px;
}

.ptojects-wrapper {
  min-height: 256px;
}

.add-card {
  max-width: 400px;
}

.project-card {
  min-height: 256px;
  max-height: 256px;
  height: 100%;

  &-empty {
    border: 1px dashed $violet-6;
    border-radius: 5px;
  }

  &-add {
    max-width: 352px;
  }
}

.active-control {
  max-width: 24px;
  width: 24px;
  min-height: 24px;

  // border: none;
  background-color: $violet-4;
}

.q-toolbar {
  padding: 0px;
}

.arrow-right {
  transform: rotate(180deg);
}
</style>
