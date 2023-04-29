<template>
  <q-btn-dropdown
    v-model="menu"
    flat
    no-caps
    class="q-ml-lg club-dropdown text-body2"
    label="Dropdown"
    dropdown-icon="img:/src/assets/icons/arrow/arrow-down-grey.svg"
  >
    <slot name="list"></slot>
  </q-btn-dropdown>
</template>

<script setup>
import { ref } from "vue";

const { list } = defineProps({
  list: Array,
});

const menu = ref(false);

const onItemClick = () => {};
</script>

<style scoped lang="scss"></style>
