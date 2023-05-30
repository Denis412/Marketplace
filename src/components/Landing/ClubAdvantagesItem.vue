<template>
  <section
    class="advantage-item flex flex-center relative-position"
    :style="item.id == 1 ? 'margin-left:160px' : ''"
  >
    <q-img class="absolute-right advantage-img" src="assets/images/landing-business/plus.png" />
    <section class="absolute advantage-count">
      <p class="text-h1" style="opacity: 0.2">{{ item.id < 10 ? "0" + item.id : item.id }}</p>
    </section>
    <p class="text-subtitle4 text" style="z-index: 1">{{ item.content }}</p>
  </section>
</template>
<script setup>
const { id, item } = defineProps({
  item: Object,
});
</script>

<style scoped lang="scss">
.advantage {
  &-item {
    min-width: 352px;
    width: 100%;
    padding: 56px 20px 28px 20px;
    overflow: hidden;
    margin: 0 16px;
    text-align: left;

    background: linear-gradient(
        97.23deg,
        rgba(16, 5, 34, 0.2) 16.74%,
        rgba(255, 255, 255, 0.1) 73.81%,
        rgba(16, 5, 34, 0.2) 100%
      ),
      rgba(23, 12, 37, 0.15);
    backdrop-filter: blur(50px);
    border-radius: 12px;
    border: 2px solid rgba(63, 63, 70, 0.7);
  }

  &-img {
    width: 150px;
    height: 150px;
    top: -14px;
    right: -12px;
  }

  &-count {
    top: 8px;
    left: -14px;
  }
}

.text {
  color: #ede5f0;
}
</style>
