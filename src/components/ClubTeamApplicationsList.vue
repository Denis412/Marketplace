<template>
  <q-list class="row q-gutter-lg">
    <q-card
      flat
      v-for="application in applications"
      :key="application.id"
      class="bg-gray4 col-4 q-pa-md applications-item"
    >
      <c-specialist-item :specialist="application.subject" />
      <c-application-controls
        :sender="application.sender"
        :status="application.status"
        :incoming="incoming"
      />
    </q-card>
  </q-list>
</template>

<script setup>
import CSpecialistItem from "./ClubSpecialistItem.vue";
import CApplicationControls from "./ClubApplicationControls.vue";

const { applications, incoming } = defineProps({
  applications: Array,
  incoming: Boolean,
});
</script>

<style scoped lang="scss">
.applications-item {
  border-radius: 10px;
  .q-item {
    padding: 0;
  }
}
</style>
