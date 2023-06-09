<template>
  <q-card class="w-100p project-card" :class="{ 'project-card-empty': !project.avatar }">
    <q-img :src="project.avatar" class="project-card-img" />

    <div class="project-card-bg"></div>

    <section class="project-card-content__absolute q-gutter-y-sm">
      <span class="text-body1 text-white ellipsis">{{ project.name }}</span>

      <span class="text-caption2 text-white">{{ truncate(project.description, 60) }}</span>
    </section>
  </q-card>
</template>

<script setup>
import { truncate } from "src/utils/truncateString";

const { project } = defineProps({
  project: Object,
});
</script>

<style scoped lang="scss">
.project-card {
  height: 256px;
  max-height: 256px;
  $radius: 5px;

  &-empty {
    border: 1px dashed $violet-6;
    border-radius: $radius;
  }

  &-content {
    &__absolute {
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;

      display: flex;
      flex-direction: column;
    }
  }

  &-bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    border-radius: $radius !important;

    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 18.23%,
      rgba(13, 0, 22, 0.85) 72.92%,
      #08000f 100%
    );
  }

  &-img {
    height: inherit;
    border-radius: $radius !important;
  }

  &-add {
    // max-width: 352px;
  }
}
</style>
