<template>
  <section class="partners">
        <div class="text-center header-text-32">С нами сотрудничают</div>

        <q-list class="row justify-between partners-list">
          <img class="partners-logo" v-for="partner in partners" :key="partner.id"
            :src="partner.imageUrl" />
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
.partners-list {
  margin-top: 41px;
}

.partners-logo {
  max-width: 256px;
}

.partners {
  margin-top: 124px;
}
</style>
