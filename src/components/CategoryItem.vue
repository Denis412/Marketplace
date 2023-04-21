<template>
  <section class="text-center item">
    <q-img class="img" :src="imageUrl" />

    <div class="font-size-24 q-mt-md text-center">
      {{ title }}
    </div>

    <div class="text-center content">
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
  width: 200px;
}

.content {
  margin-top: 10px;
  line-height: 36px;
}
</style>
