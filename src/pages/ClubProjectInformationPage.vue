<template>
  <q-page class="c-px-32 c-py-72">
    <div class="loader loader-lg" v-if="!currentProject || loading" />

    <div v-else>
      <h3 class="text-h3">О проекте</h3>

      <section>
        <q-img
          :src="currentProject?.avatar || ''"
          class="bg-violet4 rounded-borders-8 project-avatar c-mt-40"
          :class="{ 'cursor-pointer': isLeader }"
          @click="pickFiles"
        />

        <q-file
          style="display: none"
          v-model="selectFile"
          accept=".png,.jpg"
          ref="uploader"
          @update:model-value="uploadImage"
        />
      </section>

      <c-section-projects-headers />
      <c-project-information-section />
      <c-project-target-description-sections />
      <c-project-members-sections />
    </div>
  </q-page>
</template>

<script setup>
import { computed, provide, ref, onMounted, watch, reactive, toRefs, inject } from "vue";
import { useRoute } from "vue-router";

import CSectionProjectsHeaders from "src/components/ClubSectionProjectsHeaders.vue";
import CProjectInformationSection from "src/components/ClubProjectInformationSection.vue";
import CProjectTargetDescriptionSections from "src/components/ClubProjectTargetDescriptionSections.vue";
import CProjectMembersSections from "src/components/ClubProjectMembersSections.vue";
import projectApi from "src/sdk/project";
import { useProjectUpdate } from "src/use/projects";
import filesApi from "src/sdk/file";
import BaseService from "src/sevices/BaseService";
import userApi from "src/sdk/user";

const route = useRoute();
const { result, updateProject } = useProjectUpdate();

const currentUser = inject("currentUser");

const res = {
  leader: ref(null),
  customers: ref([]),
  members: ref([]),
};

const { refetch } = BaseService.fetchApiPaginate(userApi.paginateSubjects);

const { result: currentProject } = BaseService.fetchApiPaginate(
  projectApi.paginateProject,
  {
    where: {
      column: "name",
      operator: "EQ",
      value: route.query.name,
    },
  },
  { only_one: true, space_id: route.query.space }
);

const isLeader = ref(false);

const uploader = ref(null);
const loading = ref(false);
const selectFile = ref(null);

const pickFiles = () => (isLeader.value ? uploader.value.pickFiles() : null);

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

const groupProjectSubjects = async (group_names) => {
  loading.value = true;

  res.leader.value = null;
  res.members.value = [];
  res.customers.value = [];

  for (let group_name of group_names) {
    console.log(group_name);
    for (let subject of currentProject.value?.[group_name] ?? []) {
      try {
        const subjectMainSpace = await refetch(
          {
            where: {
              column: "email",
              operator: "FTS",
              value: subject?.email?.email,
            },
          },
          { only_one: true }
        );

        if (currentProject.value?.author_id === subject.id) {
          res.leader.value = Object.assign({}, subjectMainSpace, { role: "Руководитель проекта" });

          if (currentUser.value.subject_id === subjectMainSpace.id) isLeader.value = true;
        }

        if (group_name !== "leader" && currentUser.value.subject_id === subjectMainSpace)
          res[group_name].value.push(
            Object.assign({}, subjectMainSpace, {
              role:
                currentProject.value?.author_id === subject.id
                  ? "Руководитель проекта"
                  : "Участник",
            })
          );
      } catch (e) {
        console.log(e);
      }
    }
  }

  loading.value = false;
};

provide("spaceId", route.query.space);
provide("currentProject", currentProject);

provide("isLeader", isLeader);
provide("currentMembers", res.members);
provide("currentCustomers", res.customers);
provide("currentLeader", res.leader);

watch(currentProject, async (value) => {
  if (value) await groupProjectSubjects(["members", "customers"]);
});

onMounted(async () => {
  if (!res.leader.value || !res.members.value?.length || !res.customers.value?.length)
    await groupProjectSubjects(["members", "customers"]);
});
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
