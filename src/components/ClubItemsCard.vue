<template>
  <q-card class="flex items-center text-white card q-ml-md">
    <q-img class="card-image" :src="imageUrl" alt="image" />

    <q-card-section
    class="title"
      >{{ title }}</q-card-section
    >
  </q-card>
</template>

<script setup>
const { imageUrl, title, id } = defineProps({
  imageUrl: String,
  title: String,
  id: Number,
});
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  max-width: 454px;
  width: 454px;
  max-height: 160px;
  margin-top: 32px;

  &-image {
    top: -1px;
    left: -1px;
    bottom: -1px;
    max-height: 10rem;
    max-width: 10rem;
  }

  border: 1px solid white;
  border-radius: 10px;

  background: linear-gradient(101.5deg,
    rgba(16, 5, 34, 0.1) 37.03%,
    rgba(255, 255, 255, 0.08) 80.19%,
    rgba(16, 5, 34, 0.1) 100%);
}

.ml-16 {
  margin-left: 1rem;
}

.title {
  font-size: 32px;
  font-weight: 600;
  line-height: 24px;
}
</style>
