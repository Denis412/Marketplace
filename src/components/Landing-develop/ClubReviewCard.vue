<template>
  <section class="review-card c-mb-32">
    <iframe
      width="352"
      height="528"
      :src="review.src + '?rel=0&modestbranding=1'"
      class="review-video"
    />
  </section>
</template>   

<script setup>
const { review } = defineProps({
  review: Object,
});
</script>


<style lang="scss" scoped>
.review-card {
  max-width: 352px;
  width: 100%;
  height: 528px;
  border-radius: 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));

  & .ytp-large-play-button-red-bg {
    background-color: rgb(255, 0, 0);
  }
}

.review-video {
  border: none;
  border-radius: 10px;
}
</style>