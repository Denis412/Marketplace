<template>
  <q-list class="flex justify-between">
    <c-business-tools-item v-for="category in categories" :key="category.id" v-bind="category" />
  </q-list>
</template>

<script setup>
import CBusinessToolsItem from "components/Landing/ClubBusinessToolsItem.vue";

const { categories } = defineProps({
  categories: Object,
});
</script>

<style scoped lang="scss"></style>
