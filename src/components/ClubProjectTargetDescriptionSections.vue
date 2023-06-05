<template>
  <section class="project-target flex no-wrap justify-between c-mt-72">
    <div class="col column c-mr-96">
      <h4 class="text-subtitle4">Цель проекта</h4>

      <q-input
        autogrow
        outlined
        :readonly="!isOwner"
        v-model="target"
        @change="updateProp('target', $event)"
        class="c-input-outline c-input-area-mh q-mt-lg col"
        :class="{ 'no-pointer-events': !isOwner }"
        placeholder="Опишите цель проекта"
      />
    </div>

    <q-img src="/assets/images/about-project-page/target.svg" class="project-target-image" />
  </section>

  <section class="c-mt-72 description-project flex no-wrap justify-between">
    <q-img
      src="/assets/images/about-project-page/description.svg"
      class="c-mr-96 description-project-image"
    />

    <div class="col column description-project-info">
      <h4 class="text-subtitle4">Описание проекта</h4>

      <q-input
        autogrow
        outlined
        :readonly="!isOwner"
        v-model="description"
        @change="updateProp('description', $event)"
        class="c-input-outline c-input-area-mh q-mt-lg col"
        :class="{ 'no-pointer-events': !isOwner }"
        placeholder="Напишите описание проекта"
      />
    </div>
  </section>
</template>

<script setup>
import { useProjectUpdate } from "src/use/projects";
import { ref, inject } from "vue";

const { result, updateProject } = useProjectUpdate();

const currentProject = inject("currentProject");
const space_id = inject("spaceId");
const isOwner = inject("isOwner");

const target = ref(currentProject.value?.target);
const description = ref(currentProject.value?.description);

const updateProp = async (prop_name, value) => {
  await updateProject({
    id: currentProject.value.id,
    input: {
      name: currentProject.value.name,
      [prop_name]: value,
    },
    space_id,
  });
};
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
