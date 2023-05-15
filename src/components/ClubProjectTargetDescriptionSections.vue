<template>
  <section class="project-target flex no-wrap justify-between c-mt-72">
    <div class="col column c-mr-96">
      <h4 class="text-h4">Цель проекта</h4>

      <q-input
        autogrow
        outlined
        v-model="target"
        class="c-input-outline c-input-area-mh q-mt-lg col"
        placeholder="Опишите цель проекта"
      />
    </div>

    <q-img
      src="/assets/images/about-project-page/target.svg"
      class="project-target-image"
    />
  </section>

  <section class="c-mt-72 description-project flex no-wrap justify-between">
    <q-img
      src="/assets/images/about-project-page/description.svg"
      class="c-mr-96 description-project-image"
    />

    <div class="col column description-project-info">
      <h4 class="text-h4">Описание проекта</h4>

      <q-input
        autogrow
        outlined
        v-model="description"
        class="c-input-outline c-input-area-mh q-mt-lg col"
        placeholder="Напишите описание проекта"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const target = ref("");
const description = ref("");
</script>

<style scoped lang="scss">
.project-target {
  max-width: 1020px;

  &-image {
    width: 288px;
  }
}

.description-project {
  margin-left: 72px;

  &-info {
    // min-height: 264px;
  }

  &-image {
    width: 344px;
    // width: 30%;
  }
}
</style>
