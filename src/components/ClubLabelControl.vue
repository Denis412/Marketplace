<template>
  <label>
    <p class="text-body2 c-mt-32 q-mb-sm">{{ label }}</p>
    <slot name="control"></slot>
  </label>
</template>

<script setup>
const { label } = defineProps({
  label: String,
});
</script>

<style scoped lang="scss"></style>
