<template>
  <div class="flex items-center" :class="classes" style="width: max-content">
    <span>{{ label }}</span>

    <slot name="icon-right">
      <q-icon
        name="img:/assets/icons/close/close-black.svg"
        class="q-ml-sm text-h4 cursor-pointer"
        @click="$emit('remove', label)"
      />
    </slot>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { label, gradientOutline } = defineProps({
  label: String,
  gradientOutline: Boolean,
});

const classes = ref({
  "c-chip-gradient": gradientOutline,
});
</script>

<style scoped lang="scss"></style>
