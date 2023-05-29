<template>
  <section class="review-card c-mb-32">
    <!-- <q-video  src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0" /> -->
  </section>
</template>   

<script setup>
const { review } = defineProps({
  team: Object,
});
</script>


<style lang="scss" scoped>
.review-card {
  max-width: 352px;
  width: 100%;
  height: 528px;
  border-radius: 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
}
</style>