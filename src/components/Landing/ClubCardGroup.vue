<template>
  <q-list v-if="items" class="flex justify-between card-items">
    <items-card v-for="card in items" :key="card.title" v-bind="card" />
  </q-list>

  <q-list v-else-if="directions" class="row justify-between q-mt-md">
    <directions-card v-for="card in directions" :key="card.id" v-bind="card" />
  </q-list>
</template>

<script setup>
import { defineProps } from "vue";
import ItemsCard from "components/Landing/ClubItemsCard.vue";
import DirectionsCard from "components/Landing/ClubDirectionsCard.vue";

const { items, directions } = defineProps({
  items: Object,
  directions: Object,
});
</script>

<style scoped lang="scss">
.card-items {
  margin-top: 44px;
  padding: 0 90px;
}
</style>
