<template>
  <q-card class="course-card c-pa-32 c-ma-16">
    <q-card-section class="base">
      <p class="text-subtitle1 base">{{ card.name }}</p>
      <p class="text-body2 course-mb-51">{{ card.period }}</p>
    </q-card-section>

    <q-card-section class="base">
      <p class="text-body1 base">{{ card.description }}</p>
    </q-card-section>

    <q-img class="absolute-bottom-right course-img" :src="card.img" />
  </q-card>
</template>

<script setup>
const { card } = defineProps({
  card: Object,
});
</script>

<style lang="scss" scoped>
.course- {
  &card {
    max-width: 544px;
    width: 100%;
    background: linear-gradient(97.7deg, #432076 0%, #3a1d47 100%);
    border-radius: 30px;
  }
  &img {
    border-radius: 30px;
    max-width: 230px;
    height: 200px;
    z-index: 0;
  }
  &mb-51 {
    margin-bottom: 51px;
  }
}

.base {
  margin: 0;
  padding: 0;
}
</style>
