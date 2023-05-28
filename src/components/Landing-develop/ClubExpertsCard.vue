<template>
  <q-card class="experts-card" flat bordered>
    <q-card-section class="oops" horizontal>
      <q-img class="col-5" :src="card.img" />

      <q-card-section class="c-pa-20 experts-card-section">
        <p class="text-body2 c-mb-24">{{ card.description }}</p>
        <p class="text-subtitle4" style="padding: 0">{{ card.person }}</p>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
const { card } = defineProps({
  card: Object,
});
</script>

<style lang="scss" scoped>
.experts-card {
  max-width: 448px;
  background: linear-gradient(
    101.5deg,
    rgba(16, 5, 34, 0.15) 37.03%,
    rgba(255, 255, 255, 0.1) 80.19%,
    rgba(16, 5, 34, 0.15) 100%
  );
  border-radius: 12px;
  border: 2px solid rgba(63, 63, 70, 0.7);
}

.experts-card-section {
  padding-left: 38px;
}
</style>
