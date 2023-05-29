<template>
  <q-card class="card">
    <p class="text-left text-subtitle4">
      {{ content }}
    </p>
  </q-card>
</template>
<script setup>
const { id, content } = defineProps({
  id: Number,
  content: String,
});
</script>
<style scoped lang="scss">
.card {
  color: #ede5f0;
  max-width: 352px;
  min-width: 352px;
  min-height: 224px;

  padding: 50px 20px 0;

  background: linear-gradient(
      97.23deg,
      rgba(16, 5, 34, 0.2) 16.74%,
      rgba(255, 255, 255, 0.1) 73.81%,
      rgba(16, 5, 34, 0.2) 100%
    ),
    rgba(23, 12, 37, 0.15);
  backdrop-filter: blur(50px);
  border: 4px solid transparent;
  border-radius: 12px;
  border-image-slice: 24;
  border-image-repeat: round;
  border-image-width: 24px;
  border-image-source: url("/assets/images/border.png");

  display: block;
  transform: rotate(90deg);
  // transform-origin: right top;
}
</style>
