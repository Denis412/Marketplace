<template>
  <section>
    <header class="c-mb-32">
      <h3 class="text-h3">Все команды</h3>
    </header>

    <section class="flex justify-between c-mb-32 q-gutter-x-lg">
      <q-input
        class="search-input c-input-outline col"
        outlined
        @change="emit('filterTeamName', 'name', $event)"
        v-model="search_team_name"
      >
        <template #prepend>
          <q-icon name="img:/assets/icons/search/search-grey.svg" class="cursor-pointer" />
        </template>
      </q-input>

      <q-select
        no-caps
        borderless
        clearable
        class="club-dropdown text-caption1 text-black col"
        v-model="team_status"
        @update:model-value="emit('filterTeamStatus', 'ready_for_orders', $event)"
        :options="filterOptions"
        dropdown-icon="img:/assets/icons/arrow/arrow-down-grey.svg"
      >
        <template #prepend v-if="!team_status">
          <span class="text-caption1 text-black">Фильтрация</span>
        </template>
      </q-select>
    </section>
  </section>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["filterTeamStatus", "filterTeamName"]);

const filterOptions = ref([
  {
    label: "Готовы к заказам",
    value: true,
  },
  {
    label: "Не готовы к заказам",
    value: false,
  },
]);

// "Готовы к заказам", "Не готовы к заказам"
const team_status = ref("");
const search_team_name = ref("");
</script>

<style scoped lang="scss"></style>
