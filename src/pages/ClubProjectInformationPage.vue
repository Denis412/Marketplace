<template>
  <q-page class="c-px-32 c-py-72">
    <div class="loader loader-lg" v-if="projectsLoading" />

    <div v-else>
      <h3 class="text-h3">О проекте</h3>

      <!-- <pre>{{ currentProject }}</pre> -->

      <section>
        <q-img
          :src="currentProject?.avatar || ''"
          class="bg-violet4 rounded-borders-8 project-avatar c-mt-40 cursor-pointer"
        />

        <div class="flex justify-end c-mt-40">
          <q-btn
            flat
            no-caps
            outlined
            icon-right="img:/assets/icons/plus/plus-gradient.svg"
            class="club-button-outline"
            label="Загрузить картинку"
          />
        </div>
      </section>

      <c-project-information-section />
      <c-project-target-description-sections />
      <!-- <c-project-members-sections /> -->

      <section class="c-mt-72">
        <h4 class="text-h4">Договор</h4>

        <div class="flex q-gutter-x-xl q-mt-lg">
          <q-btn
            no-caps
            flat
            class="club-button-background"
            label="Загрузить договор"
            icon-right="img:/assets/icons/plus/plus.svg"
          />

          <q-btn
            no-caps
            flat
            outline
            class="club-button-outline"
            label="Смотреть договор"
            icon-right="img:/assets/icons/eye/eye-gradient.svg"
          />
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { useProjectsQuery } from "src/use/projects";
import { computed, provide } from "vue";
import { useRoute } from "vue-router";

import CProjectInformationSection from "src/components/ClubProjectInformationSection.vue";
import CProjectTargetDescriptionSections from "src/components/ClubProjectTargetDescriptionSections.vue";
import CProjectMembersSections from "src/components/ClubProjectMembersSections.vue";

const route = useRoute();

const { projects, projectsLoading } = useProjectsQuery().getWithWere({
  page: 1,
  perPage: 1,
  where: null,
  space_id: route.params.space,
});

const currentProject = computed(() => projects.value?.paginate_project.data[0]);
// const currentSubjects = computed(() => subjects.value?.paginate_group.data);

provide("spaceId", route.params.id);
provide("currentProject", currentProject);
// provide("currentSubjects", currentSubjects);
</script>

<style scoped lang="scss">
.project-avatar {
  max-height: 336px;
}

.information-section {
  max-width: 740px;

  &-left {
    width: 352px;
    min-width: 200px;
  }

  &-right {
    width: 256px;
    min-width: 200px;
  }
}

// @media (max-width: 900px) {
//   .description-project {
//     margin-left: 32px;

//     &-image {
//       // width: 120px;
//       width: 30%;
//     }
//   }
// }
</style>
