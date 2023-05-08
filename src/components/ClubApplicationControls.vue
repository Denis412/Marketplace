<template>
  <footer class="flex justify-between items-center c-mt-32">
    <section class="text-body2">{{ statusObject.updated_at }}</section>

    <section class="flex items-center q-gutter-x-md text-body1">
      <div :style="{ color: statusObject.property?.color }">
        {{ statusObject.property?.label }}
      </div>

      <c-button v-if="!incoming" background :label="labelButton" />

      <div v-else class="flex q-gutter-x-md">
        <c-button
          background
          label="Принять"
          @click="$emit('accept', application)"
        />

        <c-button
          outline
          label="Отклонить"
          @click="$emit('cancel', application)"
        />
      </div>
    </section>
  </footer>
</template>

<script setup>
import { computed } from "vue";

import CButton from "./ClubButton.vue";
import propertyApi from "/src/sdk/property";

const { application, incoming } = defineProps({
  application: Object,
  incoming: Boolean,
});

const { result: statusProperty, loading } = propertyApi.queryPropertyById({
  id: process.env.APPLICATION_STATUS_PROPERTY,
});

const statusObject = computed(() => {
  let property = statusProperty.value?.property.meta.options.find(
    (option) => option.id === application.status
  );

  const lastTimeUpdated = new Date(statusProperty.value?.property.updated_at);

  return { property, updated_at: lastTimeUpdated.toLocaleDateString() };
});
const labelButton = computed(() =>
  statusObject.value.property?.label === "В ожидании" ? "Отменить" : "Скрыть"
);
</script>

<style scoped lang="scss"></style>
