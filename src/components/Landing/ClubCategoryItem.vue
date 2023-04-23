<template>
  <section class="item">
    <q-img class="img" :src="imageUrl" />

    <div class="q-mt-md text-subtitle2">
      {{ title }}
    </div>

    <div class="q-mt-sm text-body2">
      {{ content }}
    </div>
  </section>
</template>

<script setup>
const { imageUrl, title, content } = defineProps({
  title: String,
  imageUrl: String,
  content: String,
});
</script>

<style scoped lang="scss">
.img {
  max-width: 100px;
  max-height: 100px;

  transition: 0.4s;

  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}

.item {
  max-width: 200px;
}
</style>
