<template>
  <section class="club-mt-32">
    <div class="text-h4">Участники</div>

    <div class="q-mt-md rounded-borders-10 bg-white c-pa-32">
      <q-toolbar class="toolbar-bottom-border q-pb-md">
        <q-btn-toggle
          v-model="selectMembersList"
          flat
          stretch
          class="text-body1 text-violet-6"
          toggle-color="purple-7"
          :options="membersTeamList"
        />

        <c-button background label="Пригласить" class="text-body2" />
      </q-toolbar>

      <q-toolbar class="overflow-auto">
        <q-btn-toggle
          v-model="selectSpecialistsList"
          flat
          stretch
          class="text-caption1 text-violet-6"
          toggle-color="purple-7"
          :options="specialtiesList"
        />
      </q-toolbar>

      <c-specialists-list
        class="flex q-mt-md q-gutter-x-md"
        :specialists="team[selectSpecialistsList]"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CSpecialistsList from "./ClubSpecialistsList.vue";
import CButton from "./ClubButton.vue";

const { team } = defineProps({
  team: Object,
});

const membersTeamList = ref([
  { label: "Команда", value: "team" },
  { label: "Отправленные заявки", value: "sended" },
]);

const specialtiesList = ref([
  { label: "Разработчики", value: "developers" },
  { label: "Менеджеры", value: "managers" },
  { label: "Маркетологи", value: "marketers" },
  { label: "Дизайнеры", value: "designers" },
  { label: "Аналитики", value: "analitics" },
]);

const selectMembersList = ref("");
const selectSpecialistsList = ref("");
</script>

<style scoped lang="scss">
.toolbar-bottom-border {
  border-bottom: 1px solid #d8c4e7;
}
</style>
