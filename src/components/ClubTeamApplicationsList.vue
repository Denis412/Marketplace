<template>
  <q-list class="row">
    <section
      v-for="application in applications"
      :key="application.id"
      class="col-4 q-pa-sm"
    >
      <q-card flat class="bg-gray4 q-pa-md applications-item">
        <c-specialist-item :specialist="application.subject" />

        <c-application-controls
          :sender="application.sender"
          :status="application.status"
          :incoming="incoming"
        />
      </q-card>
    </section>
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
