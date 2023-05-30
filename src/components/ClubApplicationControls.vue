<template>
  <footer class="flex justify-between items-center c-mt-32 rel-index-0">
    <section v-if="!project" class="text-body2">
      {{ new Date(application.updated_at).toLocaleDateString() }}
    </section>

    <section class="flex items-center q-gutter-x-md text-body1">
      <div v-if="!incoming" :style="{ color: statusObject.property?.color }">
        {{ statusObject.property?.label }}
      </div>

      <div v-if="!incoming" class="flex q-gutter-x-md">
        <c-button
          v-if="statusObject.property?.label === 'Одобрена'"
          background
          label="Принять"
          @click.stop="accept"
        />

        <c-button v-else outline label="Отменить" class="text-body1" @click.stop="cancel" />
      </div>

      <div v-else class="flex c-gutter-x-32">
        <c-button background label="Принять" class="text-body1" @click.stop="accept" />
        <c-button outline label="Отклонить" class="text-body1" @click.stop="cancel" />
      </div>
    </section>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";

import CButton from "./ClubButton.vue";

import propertyApi from "src/sdk/property";
import { useTeamApplication } from "src/use/teams";
import { useProjectApplication } from "src/use/projects";

const emit = defineEmits(["statusCalc"]);

const { acceptApplication, cancelApplication } = useTeamApplication();
const { acceptApplication: acceptProjectApplication, cancelApplication: cancelProjectApplication } =
  useProjectApplication();

const $q = useQuasar();

const { application, incoming, is_team, project, is_project, team_id } = defineProps({
  application: Object,
  incoming: Boolean,
  is_team: Boolean,
  project: Boolean,
  is_project: Boolean,
  team_id: String,
});

const { result: statusProperty1 } = propertyApi.paginateProperties({
  page: 1,
  perPage: 1,
  where: {
    and: [
      {
        column: "name",
        operator: "EQ",
        value: "status",
      },
      {
        column: "type_id",
        operator: "EQ",
        value: application.type_id,
      },
    ],
  },
  space_id: application?.project?.space,
});

const reft = ref(null);

// Убрать после исправления на беке с meta полем свойств из пагинатора
watch(statusProperty1, async (value) => {
  if (!value) return;

  reft.value = await propertyApi.refetchPropertyById({
    id: statusProperty1.value?.properties.data[0].id,
    space_id: application?.project?.space,
  });
});

const { result: statusProperty } = propertyApi.queryPropertyById({
  id: process.env.APPLICATION_STATUS_PROPERTY,
});

const statusObject = computed(() => {
  let property = project
    ? reft.value?.meta.options.find((option) => option.id === application.status)
    : statusProperty.value?.property.meta.options.find(
        (option) => option.id === application.status
      );

  const lastTimeUpdated = new Date(statusProperty.value?.property.updated_at);

  return { property, updated_at: lastTimeUpdated.toLocaleDateString() };
});

const accept = async () => {
  console.log(application, incoming);

  try {
    if (!project) await acceptApplication({ application, is_team });
    else
      await acceptProjectApplication({
        application,
        is_project,
        space_id: application.project.space,
      });
  } catch (error) {
    if (!incoming) {
      console.log(error);
    } else {
      $q.notify({
        type: "negative",
        message: "Пользователь уже состоит в команде!",
      });
    }
  }
};

const cancel = async () => {
  if (!project) await cancelApplication({ application, is_team });
  else
    await cancelProjectApplication({
      application,
      is_project,
      space_id: application.project.space,
    });
};

watch(statusObject, (value) => {
  if (!value) return;

  console.log("send");
  emit("statusCalc", statusObject.value, application);
});
</script>

<style scoped lang="scss"></style>
