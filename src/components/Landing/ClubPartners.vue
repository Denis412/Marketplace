<template>
  <section class="section-margin text-center container">
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
  { id: 1, imageUrl: "/assets/images/landing/partners/logo-rso.svg" },
  { id: 2, imageUrl: "/assets/images/landing/partners/logo-rao.svg" },
  { id: 3, imageUrl: "/assets/images/landing/partners/logo-rosnou.svg" },
  { id: 4, imageUrl: "/assets/images/landing/partners/logo-obrsoyuz.svg" },
]);
</script>

<style lang="scss" scoped>
.partner-logo {
  max-width: 256px;
}
</style>
