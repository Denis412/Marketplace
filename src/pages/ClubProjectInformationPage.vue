<template>
  <q-page class="c-px-32 c-py-72">
    <div class="loader loader-lg" v-if="!currentProject" />

    <div v-else>
      <h3 class="text-h3">О проекте</h3>

      <pre>{{ currentProject }}</pre>

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
            @click="pickFiles"
          />

          <q-file
            style="display: none"
            v-model="selectFile"
            accept=".png,.jpg"
            ref="uploader"
            @update:model-value="uploadImage"
          />
        </div>
      </section>

      <c-project-information-section />
      <c-project-target-description-sections />
      <c-project-members-sections />

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
import { computed, provide, ref } from "vue";
import { useRoute } from "vue-router";

import CProjectInformationSection from "src/components/ClubProjectInformationSection.vue";
import CProjectTargetDescriptionSections from "src/components/ClubProjectTargetDescriptionSections.vue";
import CProjectMembersSections from "src/components/ClubProjectMembersSections.vue";
import projectApi from "src/sdk/project";
import { useProjectUpdate } from "src/use/projects";
import filesApi from "src/sdk/file";

const route = useRoute();
const { result, loading, updateProject } = useProjectUpdate();

const { result: projects } = projectApi.paginateProject({
  page: 1,
  perPage: 1,
  where: {
    column: "name",
    operator: "EQ",
    value: route.query.name,
  },
  space_id: route.query.space,
});

const currentProject = computed(() => projects.value?.paginate_project.data[0]);

const uploader = ref(null);
const selectFile = ref(null);

const pickFiles = () => uploader.value.pickFiles();

const uploadImage = async () => {
  const fileId = await filesApi.uploadFiles(selectFile.value);
  const avatar = await filesApi.get(fileId);

  await updateProject({
    id: currentProject.value.id,
    input: {
      name: currentProject.value.name,
      avatar: filesApi.getUrl(avatar[0]),
    },
    space_id: route.query.space,
  });
};

provide("spaceId", route.query.space);
provide("currentProject", currentProject);
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
