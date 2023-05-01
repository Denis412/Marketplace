<template>
  <q-list class="row justify-start club-mb-32">
    <slot name="list-item" :specialists="specialists">
      <c-specialist-item
        v-for="specialist in specialists"
        :key="specialist.id"
        :specialist="specialist"
      />
    </slot>
  </q-list>
</template>

<script setup>
import CSpecialistItem from "./ClubSpecialistItem.vue";

const { specialists } = defineProps({
  specialists: Array,
});
</script>

<style scoped lang="scss"></style>
