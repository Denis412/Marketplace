<template>
  <q-list class="row justify-start club-mb-32">
    <slot name="list-item" :specialists="specialists">
      <c-specialist-item
        class="bg-violet1"
        v-for="specialist in specialists"
        :key="specialist.id"
        :roles="roles"
        :specialist="specialist"
        :deleting="isSpecialistDeleting(specialist)"
      />
    </slot>
  </q-list>
</template>

<script setup>
import CSpecialistItem from "./ClubSpecialistItem.vue";
import { inject } from "vue";

const { specialists, roles } = defineProps({
  specialists: Array,
  roles: Boolean,
});

const isOwner = inject("isOwner");
const currentUser = inject("currentUser");

const isSpecialistDeleting = (specialist) =>
  isOwner.value && specialist.email.email !== currentUser.value.email;
</script>

<style scoped lang="scss"></style>
