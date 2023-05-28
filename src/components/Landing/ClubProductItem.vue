<template>
  <div class="flex items-center item">
    <div class="text-subtitle5">{{ title }}</div>
    <div>
      <q-img class="item-image" :src="imageUrl" />
    </div>
  </div>
</template>

<script setup>
const { title, imageUrl } = defineProps({
  title: String,
  imageUrl: String,
});
</script>

<style scoped lang="scss">
.item {
  &-image {
    cursor: pointer;

    transition: 0.4s;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.item-image {
  margin-left: 18px;
  width: 50px;
  min-height: 50px;
}
</style>
