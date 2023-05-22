<template>
  <span>{{ path }}</span>
</template>

<script setup>
import { computed, ref } from "vue";
import { useFileStore } from "src/stores/file";

const storeFile = useFileStore();
const path = computed(() => storeFile.currentBreadcrumps);
</script>

<style scoped lang="scss"></style>
