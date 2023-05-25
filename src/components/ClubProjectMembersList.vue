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
import { ref, computed, inject, watch, onMounted } from "vue";

import _ from "lodash";

import CSpecialistsList from "./ClubSpecialistsList.vue";
import BaseService from "src/sevices/BaseService";
import userApi from "src/sdk/user";

const currentProject = inject("currentProject");

const { team_space } = defineProps({
  team_space: Boolean,
});

const res = ref([]);

const currentMembers = computed(() =>
  currentProject.value?.members.map((member) =>
    Object.assign(
      {},
      member,
      currentProject.value?.members.find((m) => m.id === member.id),
      { role: member.id === currentProject.value?.author_id ? "Лидер" : "Участник" }
    )
  )
);

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

const groupByMembers = computed(() => _.groupBy(res?.value, "speciality1.name"));

onMounted(async () => {
  for (let member of currentProject.value.members) {
    const memberMainSpace = await BaseService.fetchApiPaginate(userApi.paginateSubjects).refetch(
      {
        where: {
          column: "email",
          operator: "FTS",
          value: member?.email?.email,
        },
      },
      { only_one: true }
    );

    const memberTeamSpace = await BaseService.fetchApiPaginate(userApi.paginateSubjects).refetch(
      {
        where: {
          column: "email",
          operator: "FTS",
          value: member?.email?.email,
        },
      },
      { only_one: true, is_team: true, space_id: currentProject.value?.space }
    );

    res.value.push(
      Object.assign({}, memberMainSpace, {
        role:
          currentProject.value?.author_id === memberTeamSpace.id
            ? "Руководитель проекта"
            : "Участник",
      })
    );
  }
});
</script>

<style scoped lang="scss"></style>
