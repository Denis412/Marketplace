<template>
  <q-list class="row">
    <section v-for="application in applications" :key="application.id" class="col-6 q-pa-sm">
      <q-card v-if="subjects" flat class="q-pa-md applications-item card-shadow rounded-borders-10">
        <c-specialist-item :specialist="application.subject" />

        <c-application-controls
          :application="application"
          :incoming="incoming"
          :is_team="is_team"
          :is_project="is_project"
          :project="project"
          @status-calc="hidedApplication"
        />
      </q-card>

      <c-team-card
        v-else
        class="card-shadow"
        :team="application.team"
        :application="application"
        :incoming="incoming"
      />
    </section>
  </q-list>
</template>

<script setup>
import CApplicationControls from "./ClubApplicationControls.vue";
import CSpecialistItem from "./ClubSpecialistItem.vue";
import CTeamCard from "src/components/ClubTeamCard.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";

const $q = useQuasar();

const { applications, incoming, subjects, project, is_project, is_team } = defineProps({
  applications: Array,
  incoming: Boolean,
  subjects: Boolean,
  is_team: Boolean,
  project: Boolean,
  is_project: Boolean,
});

const showApplications = ref([]);

const hidedApplication = (status, application) => {
  console.log("app", status, application);

  if ((status.label !== "Одобрена" && status.label !== "Отклонена") || !incoming)
    showApplications.value.push(application);
};
</script>

<style lang="scss" scoped></style>
