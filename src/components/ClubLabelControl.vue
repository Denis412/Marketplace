<template>
  <div>
    <label for="control">
      <div class="q-mb-md">
        <span class="text-body2">{{ label }}</span>
      </div>
    </label>

    <div id="control" :class="controlClass" :style="controlStyle">
      <slot name="control"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

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
