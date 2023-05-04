<template>
  <section>
    <header class="c-mb-32">
      <h3 class="text-h3">Все команды</h3>
    </header>

    <div class="row no-wrap justify-between qwerty c-mb-32">
      <c-input class="col-5"
        @update:model-value="emit('filterTeamName', $event)"
        v-model="search_team_name"/>

      <q-select
        v-model="team_status"
        @update:model-value="emit('filterTeamStatus', team_status)"
        outlined
        :options="filterOptions"
        label="Фильтрация"
        class="col-4"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import CInput from "./ClubInput.vue";

const emit = defineEmits(['filterTeamStatus', 'filterTeamName'])

const filterOptions = ref(["Готовы к заказам", "Не готовы к заказам"]);
const team_status = ref("")
const search_team_name = ref("")

</script>

<style scoped lang="scss">
.qwerty {
  width: 50%;
}
</style>
