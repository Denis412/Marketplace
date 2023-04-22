<template>
  <section class="section-margin text-center">
    <div class="text-h3">С нами сотрудничают</div>

    <q-list class="row justify-between q-mt-xl">
      <img
        class="partner-logo"
        v-for="partner in partners"
        :key="partner.id"
        :src="partner.imageUrl"
      />
    </q-list>
  </section>
</template>

<script setup>
import { ref } from "vue";
const partners = ref([
  { id: 1, imageUrl: "src/assets/images/logoRSO.svg" },
  { id: 2, imageUrl: "src/assets/images/logoRAO.svg" },
  { id: 3, imageUrl: "src/assets/images/logoRosnou.svg" },
  { id: 4, imageUrl: "src/assets/images/logoObrsoyuz.svg" },
]);
</script>

<style lang="scss" scoped>
.partner-logo {
  max-width: 256px;
}
</style>
