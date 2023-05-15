<template>
  <q-dialog>
    <q-card class="dialog">
      <q-card-section class="close-section">
        <section class="flex justify-end">
          <q-btn icon="close" flat round dense v-close-popup />
        </section>
      </q-card-section>

      <slot name="main">
        <q-card-section class="flex column">
          <slot name="main-title">
            <h4 class="text-h4" :class="titlePositionClass">{{ title }}</h4>
          </slot>

          <slot name="main-content"></slot>
        </q-card-section>
      </slot>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";

const { title, titlePosition } = defineProps({
  title: String,
  titlePosition: String,
});

const titlePositionClass = computed(() => ({
  ["text-" + titlePosition]: titlePosition,
}));
</script>

<style scoped lang="scss">
.close-section {
  position: absolute;
  top: 0;
  right: 0;
}

.dialog {
  padding: 64px 50px;
}
</style>
