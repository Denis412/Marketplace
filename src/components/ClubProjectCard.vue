<template>
  <q-card>
    <q-card-section>
      <h4 class="text-h4 text-violet-6">{{ project.name }}</h4>
    </q-card-section>
  </q-card>
</template>

<script setup>
const { project } = defineProps({
  project: Object,
});
</script>

<style scoped lang="scss"></style>
