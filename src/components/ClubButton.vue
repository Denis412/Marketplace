<template>
  <q-btn
    flat
    v-ripple="{ color: rippleColor ?? '' }"
    no-caps
    :disable="disable"
    :type="type"
    :class="typeClass"
  >
    <template #default>
      <span>
        <q-icon
          v-if="iconLeft && !disable"
          :name="iconLeft"
          style="margin-right: 12px"
        />

        <q-icon
          v-else-if="iconLeft && disable"
          :name="iconLeftDisableName"
          style="margin-right: 12px"
        />

        {{ label }}

        <q-icon
          v-if="iconRight && !disable"
          :name="iconRight"
          style="margin-left: 12px"
        />

        <q-icon
          v-else-if="iconRight && disable"
          :name="iconRightDisableName"
          style="margin-left: 12px"
        />
      </span>
    </template>
  </q-btn>
</template>

<script setup>
import { computed } from "vue";

const {
  disable,
  label,
  type,
  textColor,
  iconLeft,
  iconRight,
  rippleColor,
  flat,
  background,
  outline,
  outlineNoText,
} = defineProps({
  disable: Boolean,
  label: String,
  type: String,
  rippleColor: String,
  textColor: String,
  iconLeft: String,
  iconRight: String,
  flat: Boolean,
  background: Boolean,
  outline: Boolean,
  outlineNoText: Boolean,
});

const iconRightDisableName = computed(
  () => iconRight.slice(0, iconRight.indexOf(".")) + "Disable.svg"
);

const iconLeftDisableName = computed(
  () => iconLeft.slice(0, iconLeft.indexOf(".")) + "Disable.svg"
);

const typeClass = {
  "club-button-flat": flat,
  "club-button-outline": outline,
  "club-button-outline-text-colored": outlineNoText,
  "club-button-background": background,
};
</script>

<style lang="scss" scoped></style>
