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
          <q-tab name="applications" class="text-body1" label="Заявки" />
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
    <!-- <pre>{{ applications }}</pre> -->

    <section v-if="selectMembersList === 'members'">
      <div v-for="specialties in specialtiesList" :key="specialties.index">
        <div class="text-body2 text-violet-6">{{ specialties.label }}</div>

        <c-specialists-list
          class="flex q-mt-md q-gutter-x-md"
          :specialists="team[specialties.value]"
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
import { inject, computed, ref } from "vue";
import CSpecialistsList from "./ClubSpecialistsList.vue";
import CTeamApplicationsList from "./ClubTeamApplicationsList.vue";
import CButton from "./ClubButton.vue";
import { useRouter } from "vue-router";
import applicationApi from "src/sdk/application";

const router = useRouter();

const { team } = defineProps({
  team: Object,
});

const isOwner = inject("isOwner");

const specialtiesList = ref([
  { label: "Заказчики", value: "customers" },
  { label: "Разработчики", value: "developers" },
  { label: "Менеджеры", value: "managers" },
  { label: "Маркетологи", value: "marketers" },
  { label: "Дизайнеры", value: "designers" },
  { label: "Аналитики", value: "analitics" },
]);

const selectMembersList = ref("members");
const selectSpecialistsList = ref("");

const inviteUser = () => {
  router.push({
    name: "teamInvite",
    params: { name: team.name },
  });
};

const { result: applications } = applicationApi.paginateApplication({
  page: 1,
  perPage: 100,
  where: {
    column: `${process.env.APPLICATION_TEAM_PROPERTY}->${process.env.TEAM_TYPE_ID}`,
    operator: "EQ",
    value: team.id,
  },
});

const filteredApplications = computed(() => {
  return applications.value?.paginate_application.data.reduce(
    (acc, application) => {
      acc[application.sender == "subject" ? "incoming" : "outgoing"].push(
        application
      );

      return acc;
    },
    {
      incoming: [],
      outgoing: [],
    }
  );
});
</script>

<style scoped lang="scss"></style>
