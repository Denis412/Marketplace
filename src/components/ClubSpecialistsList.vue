<template>
  <q-list class="row justify-start club-mb-32">
    <slot name="list-item" :specialists="specialists">
      <c-specialist-item
        class="bg-violet1"
        v-for="specialist in specialists"
        :key="specialist.id"
        :roles="roles"
        :specialist="specialist"
      />
    </slot>
  </q-list>
</template>

<script setup>
import CSpecialistItem from "./ClubSpecialistItem.vue";

const { specialists, roles } = defineProps({
  specialists: Array,
  roles: Boolean,
});
</script>

<style scoped lang="scss"></style>
