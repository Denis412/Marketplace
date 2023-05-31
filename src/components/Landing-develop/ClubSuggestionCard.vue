<template>
  <q-card class="sugestion-card c-pa-24" style="">
    <q-card-section class="section c-mb-40">
      <p class="text-subtitle4">{{ card.title }}</p>
      <p class="text-body2">{{ card.subtitle }}</p>
    </q-card-section>

    <q-card-section class="section">
      <!-- <p class="text-body1" style="color: #daa8fd">Подробнее</p> -->
    </q-card-section>

    <q-img class="absolute-bottom-right sugestion-img" :src="card.img" />
  </q-card>
</template>

<script setup>
const { card } = defineProps({
  card: Object,
});
</script>

<style lang="scss" scoped>
.sugestion {
  &-card {
    margin: 0 16px 32px 16px;
    background: linear-gradient(99.53deg, #351d59 0%, #531d59 100%);
    border-radius: 20px;
    max-width: 352px;
    width: 100%;
  }
  &-img {
    border-radius: 20px;
    max-width: 200px;
    height: 217px;
    z-index: 0;
  }
}

.section {
  z-index: 1;
  padding: 0;
}
</style>
