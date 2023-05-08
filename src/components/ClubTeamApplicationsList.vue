<template>
  <q-list class="row">
    <section
      v-for="application in applications"
      :key="application.id"
      class="col-6 q-pa-sm"
    >
      <q-card flat class="bg-gray4 q-pa-md applications-item">
        <c-specialist-item :specialist="application.subject" />

        <c-application-controls
          :application="application"
          :incoming="incoming"
          @accept="acceptApplication"
        />
      </q-card>
    </section>
  </q-list>
</template>

<script setup>
import { inject } from "vue";

import CSpecialistItem from "./ClubSpecialistItem.vue";
import CApplicationControls from "./ClubApplicationControls.vue";

import teamApi from "src/sdk/team";

const team = inject("team");

const { applications, incoming } = defineProps({
  applications: Array,
  incoming: Boolean,
});

const acceptApplication = async (application) => {
  await teamApi.acceptUser({
    team_id: team.id,
    space_id: team.space,
    data: {
      id: application.subject.id,
      name: application.subject.fullname.first_name,
      surname: application.subject.fullname.last_name,
      email: application.subject.email.email,
      application_id: application.id,
    },
  });
};
</script>

<style scoped lang="scss">
.applications-item {
  border-radius: 10px;
  .q-item {
    padding: 0;
  }
}
</style>
