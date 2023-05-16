<template>
  <q-list>
    <section v-for="specialty in specialtiesList" :key="specialty.index">
      <section v-if="groupByMembers[specialty.filterName]">
        <div class="text-body2 text-violet-6">
          {{ specialty.displayName }}
        </div>

        <c-specialists-list
          class="flex q-mt-md q-gutter-x-md"
          :specialists="groupByMembers[specialty.filterName]"
        />
      </section>
    </section>
  </q-list>
</template>

<script setup>
import { ref, computed } from "vue";

import _ from "lodash";

import CSpecialistsList from "./ClubSpecialistsList.vue";

const { members } = defineProps({
  members: Array,
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

const groupByMembers = computed(() => _.groupBy(members, "major"));
</script>

<style scoped lang="scss"></style>
