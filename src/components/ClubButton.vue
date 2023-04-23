<template>
  <q-btn flat no-caps :disable="disable" :type="type" :class="typeClass">
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

const { disable, label, type, iconLeft, iconRight, flat, background, outline } =
  defineProps({
    disable: Boolean,
    label: String,
    type: String,
    iconLeft: String,
    iconRight: String,
    flat: Boolean,
    background: Boolean,
    outline: Boolean,
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
  "club-button-background": background,
};
</script>

<style lang="scss" scoped>
.club-button-background {
  color: white;
  background: $primary-gradient;

  border-radius: 8px !important;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    background: $primary-gradient-disaled;
  }
}

.club-button-flat {
  background: inherit;

  border-radius: 8px !important;

  & span span,
  i {
    background-image: $primary-gradient !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.3);
  }
}

.club-button-outline {
  $border: 3px;

  border: $border solid transparent !important;
  border-radius: 8px !important;

  background: white !important;
  background-clip: padding-box !important;

  & .q-focus-helper {
    border-radius: 0 !important;
  }

  & span span,
  i {
    background-image: $primary-gradient !important;
    background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }

  &:before {
    margin: -$border !important;
    z-index: -1 !important;

    border: none !important;
    border-radius: inherit !important;
    background: $primary-gradient !important;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.3) !important;
  }
}
</style>
