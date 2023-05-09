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
          @accept="acceptApplication"
        />
      </q-card>

      <c-team-card
        v-else
        :team="application.team"
        :application="application"
        :incoming="incoming"
        @accept="acceptApplication"
      />
    </section>
  </q-list>
</template>

<script setup>
import applicationApi from "src/sdk/application";
import CApplicationControls from "./ClubApplicationControls.vue";
import CSpecialistItem from "./ClubSpecialistItem.vue";
import CTeamCard from "src/components/ClubTeamCard.vue";
import teamApi from "src/sdk/team";
import { useQuasar } from "quasar";

const $q = useQuasar();

const { applications, incoming, subjects } = defineProps({
  applications: Array,
  incoming: Boolean,
  subjects: Boolean,
});

const acceptApplication = async (application) => {
  console.log(application);

  try {
    if (!incoming)
      await applicationApi.update(application.id, {
        status: process.env.APPLICATION_STATUS_APPROVED,
      });
    else
      await teamApi.acceptUser({
        team_id: application.team.id,
        space_id: application.team.space,
        data: {
          name: application.subject.fullname.first_name,
          surname: application.subject.fullname.last_name,
          email: application.subject.email.email,
          id: application.subject.id,
          application_id: application.id,
        },
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
</script>

<style lang="sass" scoped></style>
