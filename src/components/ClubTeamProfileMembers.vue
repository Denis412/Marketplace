<template>
  <section class="club-mt-32">
    <h4 class="text-h4">Cостав команды</h4>

    <div class="row justify-between items-center club-mt-24">
      <q-toolbar class="q-pb-md q-pa-none">
        <q-tabs
          v-model="selectMembersList"
          indicator-color="black"
          class="bg-transparent"
        >
          <q-tab name="members" class="text-body1" label="Участники" />

          <q-tab
            v-if="isOwner"
            name="applications"
            class="text-body1"
            label="Заявки"
          />
        </q-tabs>

        <q-space />

        <c-button
          v-if="isOwner"
          background
          label="Пригласить"
          @click="inviteUser"
        />
      </q-toolbar>
    </div>

    <section v-if="selectMembersList === 'members'">
      <div v-for="specialties in specialtiesList" :key="specialties.index">
        <div class="text-body2 text-violet-6">
          {{ specialties.displayName }}
        </div>

        <c-specialists-list
          class="flex q-mt-md q-gutter-x-md"
          :specialists="groupByMembers[specialties.filterName]"
        />
      </div>
    </section>

    <section v-else>
      <section v-if="!applications.paginate_application.data.length">
        <h3 class="text-h3 text-center text-liner-button">
          На данный момент нет заявок!
        </h3>
      </section>

      <section v-if="filteredApplications.outgoing.length">
        <div class="text-body1 text-liner-button w-min-content q-mb-md">
          Исходящие
        </div>

        <c-team-applications-list
          :applications="filteredApplications.outgoing"
        />
      </section>

      <section v-if="filteredApplications.incoming.length" class="q-mt-md">
        <div class="text-body1 text-liner-button w-min-content q-mb-md">
          Входящие
        </div>

        <c-team-applications-list
          :applications="filteredApplications.incoming"
          incoming
        />
      </section>
    </section>
  </section>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import CSpecialistsList from "./ClubSpecialistsList.vue";
import CTeamApplicationsList from "./ClubTeamApplicationsList.vue";
import CButton from "./ClubButton.vue";
import { useRouter } from "vue-router";
import { useApplications } from "src/use/applications";
import _ from "lodash";

const isOwner = inject("isOwner");

const { team } = defineProps({
  team: Object,
});

const router = useRouter();
const { applications, filteredApplications } = useApplications({
  team,
  is_owner: isOwner.value,
});

const specialtiesList = ref([
  { filterName: "Заказчик", displayName: "Заказчики", value: "customers" },
  {
    filterName: "Разработчик",
    displayName: "Разработчики",
    value: "developers",
  },
  { filterName: "Менеджер", displayName: "Менеджеры", value: "managers" },
  { filterName: "Маркетолог", displayName: "Маркетологи", value: "marketers" },
  { filterName: "Дизайнер", displayName: "Дизайнеры", value: "designers" },
  { filterName: "Аналитик", displayName: "Аналитики", value: "analitics" },
]);

const selectMembersList = ref("members");
const groupByMembers = computed(() =>
  _.groupBy(team.members, "speciality.name")
);

const inviteUser = async () => {
  router.push({
    name: "teamInvite",
    params: { name: team.name },
  });
};
</script>

<style scoped lang="scss"></style>
