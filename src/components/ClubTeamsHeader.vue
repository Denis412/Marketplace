<template>
  <section>
    <header class="c-mb-32">
      <h3 class="text-h3">Все команды</h3>
    </header>

    <section class="flex justify-between c-mb-32 q-gutter-x-lg">
      <q-input
        class="search-input c-input-outline col"
        outlined
        @update:model-value="emit('filterTeamName', $event)"
        v-model="search_team_name"
      >
        <template #prepend>
          <q-icon
            name="img:/src/assets/icons/search/search-grey.svg"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <q-select
        no-caps
        borderless
        v-model="team_status"
        @update:model-value="emit('filterTeamStatus', $event)"
        :options="filterOptions"
        class="club-dropdown col"
        dropdown-icon="img:/src/assets/icons/arrow/arrow-down-grey.svg"
      />
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
