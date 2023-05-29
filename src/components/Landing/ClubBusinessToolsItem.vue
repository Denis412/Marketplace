<template>
  <section class="item c-mb-160">
    <q-img class="img" :src="imageUrl" />

    <div class="q-mt-md text-subtitle4 fs-18">
      {{ title }}
    </div>

    <div class="q-mt-sm text-body2 fs-15">
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
.fs {
  &-18 {
    font-size: 18px !important;
  }
  &-15 {
    font-size: 15px !important;
  }
}
.img {
  max-width: 80px;
  max-height: 80px;

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
