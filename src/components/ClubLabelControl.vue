<template>
  <div>
    <label>
      <div class="q-mb-md">
        <span class="text-body2">{{ label }}</span>
      </div>
      <slot name="control"></slot>
    </label>
  </div>
</template>

<script setup>
const { label } = defineProps({
  label: String,
});
</script>

<style scoped lang="scss"></style>
