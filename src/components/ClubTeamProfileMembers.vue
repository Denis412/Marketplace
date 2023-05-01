<template>
  <section class="club-mt-32">
    <h4 class="text-h4">Cостав команды</h4>

    <div class="row justify-between items-center club-mt-24">
      <q-toolbar class="q-pb-md col-4 q-pa-none">
        <q-btn-toggle
          v-model="selectMembersList"
          flat
          stretch
          class="text-body1"
          toggle-color="purple-7"
          :options="membersTeamList"
        />  
      </q-toolbar>
    </div>

    <div v-for="specialties in specialtiesList" :key="specialties.index">
      <div class="text-body2 text-violet-6" >{{specialties.label}}</div>

      <c-specialists-list
        class="flex q-mt-md q-gutter-x-md"
        :specialists="team[specialties.value]"
      /> 
    </div>
    
  </section>
</template>

<script setup>
import { ref } from "vue";
import CSpecialistsList from "./ClubSpecialistsList.vue";
import CButton from "./ClubButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { team } = defineProps({
  team: Object,
});

const membersTeamList = ref([
  { label: "Участники", value: "members" },
  { label: "Заявки", value: "applications" },
]);
const specialtiesList = ref([
  { label: "Заказчики", value: "customers" },
  { label: "Разработчики", value: "developers" },
  { label: "Менеджеры", value: "managers" },
  { label: "Маркетологи", value: "marketers" },
  { label: "Дизайнеры", value: "designers" },
  { label: "Аналитики", value: "analitics" },
]);

const selectMembersList = ref("");
const selectSpecialistsList = ref("");

const inviteUser = () => {
  router.push({
    name: "teamInvite",
    params: { id: team.id || 1 },
  });
};
</script>

<style scoped lang="scss">
</style>
