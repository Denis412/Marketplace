<template>
  <q-select
    no-caps
    v-model="t"
    borderless
    class="club-dropdown"
    :options="list"
    dropdown-icon="img:/src/assets/icons/arrow/arrow-down-grey.svg"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> Ничего не найдено </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { ref } from "vue";

const t = ref("");

const { list } = defineProps({
  list: Array,
});

const onItemClick = () => {};
</script>

<style scoped lang="scss"></style>
