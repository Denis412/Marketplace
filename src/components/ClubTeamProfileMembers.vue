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

    <!-- <pre>{{ team }}</pre> -->
    <!-- <pre>{{ selectMembersList }}</pre> -->
    <!-- <pre>{{ filteredApplications }}</pre> -->

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
      <section>
        <div class="text-body1 text-liner-button w-min-content">Исходящие</div>

        <q-list>
          <q-item
            v-for="application in filteredApplications.outgoing"
            :key="application.id"
          >
            {{ application.name }}
          </q-item>
        </q-list>
      </section>

      <section>
        <div class="text-body1 text-liner-button w-min-content">Входящие</div>

        <q-list>
          <q-item
            v-for="application in filteredApplications.incoming"
            :key="application.id"
          >
            {{ application.name }}
          </q-item>
        </q-list>
      </section>
    </section>
  </section>
</template>

<script setup>
import { inject, computed, ref } from "vue";
import CSpecialistsList from "./ClubSpecialistsList.vue";
import CButton from "./ClubButton.vue";
import { useRouter } from "vue-router";

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

const filteredApplications = computed(() => {
  let incoming = [],
    outgoing = [];

  team.applications.forEach((application) => {
    application.sender === "subject"
      ? incoming.push(application)
      : outgoing.push(application);
  });

  return { incoming, outgoing };
});
</script>

<style scoped lang="scss"></style>
