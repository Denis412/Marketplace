<template>
  <section class="club-mt-32">
    <h4 class="text-h4">Cостав команды</h4>

    <div class="row justify-between items-center club-mt-24">
      <q-toolbar class="q-pb-md q-pa-none">
        <q-tabs
          v-model="selectMembersList"
          indicator-color="black"
          class="bg-transparent c-tab-text"
        >
          <q-tab no-caps name="members" label="Участники" />
          <q-tab v-if="!isProfile && isOwner" no-caps name="applications" label="Заявки" />
        </q-tabs>

        <q-space />

        <c-button
          v-if="!isProfile && isOwner"
          background
          class="text-body1"
          label="Пригласить"
          @click="inviteUser"
        />
      </q-toolbar>
    </div>

    <c-team-members-list v-if="selectMembersList === 'members'" :members="currentTeam.members" />

    <section v-else>
      <section v-if="!currentTeam.applications.length">
        <h3 class="text-h3 text-center text-liner-button">На данный момент нет заявок!</h3>
      </section>

      <section v-if="filteredApplications.outgoing.length">
        <div class="text-body1 text-liner-button w-min-content q-mb-md">Исходящие</div>

        <c-applications-list :applications="filteredApplications.outgoing" subjects is_team />
      </section>

      <section v-if="filteredApplications.incoming.length" class="q-mt-md">
        <div class="text-body1 text-liner-button w-min-content q-mb-md">Входящие</div>

        <c-applications-list
          :applications="filteredApplications.incoming"
          incoming
          subjects
          is_team
        />
      </section>
    </section>
  </section>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useApplications } from "src/use/applications";

import _ from "lodash";

import CApplicationsList from "./ClubApplicationsList.vue";
import CTeamMembersList from "./ClubTeamMembersList.vue";
import CButton from "./ClubButton.vue";

const { isProfile } = defineProps({
  isProfile: Boolean,
});

const isOwner = inject("isOwner");
const currentTeam = inject("currentTeam");

const router = useRouter();
const { filteredApplications } = useApplications(currentTeam, true);

const selectMembersList = ref("members");

const inviteUser = async () => {
  router.push({
    name: "teamInvite",
    params: { id: currentTeam.value.id },
  });
};
</script>

<style scoped lang="scss"></style>
