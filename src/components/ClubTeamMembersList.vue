<template>
  <q-list>
    <section v-for="specialty in specialtiesList" :key="specialty.index">
      <section v-if="groupByMembers[specialty.filterName]">
        <div class="text-body2 text-violet-6">
          {{ specialty.displayName }}
        </div>

        <c-specialists-list
          class="flex q-mt-md q-gutter-x-md"
          roles
          :specialists="groupByMembers[specialty.filterName]"
        />
      </section>
    </section>
  </q-list>
</template>

<script setup>
import { ref, computed, inject } from "vue";

import _ from "lodash";

import CSpecialistsList from "./ClubSpecialistsList.vue";
import BaseService from "src/sevices/BaseService";
import userApi from "src/sdk/user";

const currentTeam = inject("currentTeam");

const { team_space } = defineProps({
  team_space: Boolean,
});

const { result: members } = BaseService.fetchApiPaginate(userApi.paginateSubjects, {
  where: {
    column: `${process.env.SUBJECT_TEAMS_PROPERTY_ID}->${process.env.TEAM_TYPE_ID}`,
    operator: "FTS",
    value: currentTeam.value?.id,
  },
});

const specialtiesList = ref([
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

const groupByMembers = computed(() => _.groupBy(members?.value, "speciality1.name"));
</script>

<style scoped lang="scss"></style>
