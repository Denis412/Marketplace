<template>
  <section class="text-center">
    <q-img class="img" :src="imageUrl" />

    <div class="font-size-24 q-mt-md club-mb-10">
      {{ title }}
    </div>

    <div class="text-center" style="max-width: 187px; line-height: 36px">
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
</style>
