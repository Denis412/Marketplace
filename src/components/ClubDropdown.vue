<template>
  <q-select
    no-caps
    v-model="t"
    borderless
    class="club-dropdown"
    label="Dropdown"
    :options="list"
    dropdown-icon="img:/src/assets/icons/arrow/arrow-down-grey.svg"
  />
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
