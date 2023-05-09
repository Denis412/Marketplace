<template>
  <footer class="flex justify-between items-center c-mt-32">
    <section class="text-body2">{{ statusObject.updated_at }}</section>

    <section class="flex items-center q-gutter-x-md text-body1">
      <div :style="{ color: statusObject.property?.color }">
        {{ statusObject.property?.label }}
      </div>

      <div v-if="!incoming" class="flex q-gutter-x-md">
        <c-button
          v-if="statusObject.property?.label === 'Одобрена'"
          background
          label="Принять"
          @click.stop="accept"
        />

        <c-button v-else outline label="Отклонить" @click.stop="cancel" />
      </div>

      <div v-else class="flex q-gutter-x-md">
        <c-button background label="Принять" @click.stop="accept" />
        <c-button outline label="Отклонить" @click.stop="cancel" />
      </div>
    </section>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useQuasar } from "quasar";
import applicationsEvents from "src/utils/applicationsEvents";

import CButton from "./ClubButton.vue";

import propertyApi from "src/sdk/property";

const $q = useQuasar();

const { application, incoming, is_team } = defineProps({
  application: Object,
  incoming: Boolean,
  is_team: Boolean,
});

const { result: statusProperty } = propertyApi.queryPropertyById({
  id: process.env.APPLICATION_STATUS_PROPERTY,
});

const statusObject = computed(() => {
  let property = statusProperty.value?.property.meta.options.find(
    (option) => option.id === application.status
  );

  const lastTimeUpdated = new Date(statusProperty.value?.property.updated_at);

  return { property, updated_at: lastTimeUpdated.toLocaleDateString() };
});

const accept = async () => {
  console.log(application, incoming);

  try {
    await applicationsEvents.accept({ application, is_team });
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

const cancel = async () =>
  await applicationsEvents.cancel({ application, is_team });
</script>

<style scoped lang="scss"></style>
