<template>
  <q-list class="row">
    <section
      v-for="application in applications"
      :key="application.id"
      class="col-6 q-pa-sm"
    >
      <q-card
        v-if="subjects"
        flat
        class="bg-gray4 q-pa-md applications-item rounded-borders-10"
      >
        <c-specialist-item :specialist="application.subject" />

        <c-application-controls
          :application="application"
          :incoming="incoming"
        />
      </q-card>

      <c-team-card
        v-else
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

const $q = useQuasar();

const { applications, incoming, subjects } = defineProps({
  applications: Array,
  incoming: Boolean,
  subjects: Boolean,
});
</script>

<style lang="sass" scoped></style>
