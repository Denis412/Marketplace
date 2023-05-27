<template>
  <div class="rel-index-0">
    <div class="flex items-center" :class="classes" style="width: max-content">
      <span>{{ label }}</span>

      <slot name="icon-right">
        <q-icon
          v-if="removed"
          name="img:/assets/icons/close/close-black.svg"
          class="q-ml-sm text-h4 cursor-pointer"
          @click="$emit('remove', label)"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { label, gradientOutline, removed } = defineProps({
  label: String,
  gradientOutline: Boolean,
  removed: Boolean,
});

const classes = ref({
  "c-chip-gradient": gradientOutline,
});
</script>

<style scoped lang="scss"></style>
