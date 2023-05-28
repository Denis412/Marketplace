<template>
  <div>
    <label>
      <div class="q-mb-md">
        <span class="text-body2">{{ label }}</span>
      </div>

      <div :class="controlClass" :style="controlStyle">
        <slot name="control"></slot>
      </div>
    </label>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const { label, labelClass, labelStyle, controlClass, controlStyle } = defineProps({
  label: String,
  controlClass: String,
  controlStyle: String,
  labelClass: String,
  labelStyle: String,
});

const computedLabelClass = computed(() =>
  labelClass?.split(" ").reduce((acc, element) => Object.assign(acc, { [element]: true }), {})
);
</script>

<style scoped lang="scss"></style>
