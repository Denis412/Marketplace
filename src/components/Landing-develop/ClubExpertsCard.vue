<template>
  <q-card class="experts-card" flat bordered>
    <q-card-section horizontal>
      <q-img class="col-5 experts-img" :src="card.img" />

      <q-card-section class="c-pa-24 flex column justify-between">
        <p class="text-body2">{{ card.description }}</p>
        <p class="text-subtitle4 base">{{ card.person }}</p>
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
.experts {
  &-card {
    max-width: 452px;
    width: 100%;

    background: linear-gradient(
      101.5deg,
      rgba(16, 5, 34, 0.15) 37.03%,
      rgba(255, 255, 255, 0.1) 80.19%,
      rgba(16, 5, 34, 0.15) 100%
    );
    border-radius: 12px;
    border: 2px solid rgba(63, 63, 70, 0.7);
  }

  &-img {
    max-width: 160px;
  }
}

.base {
  margin: 0;
  padding: 0;
}
</style>
