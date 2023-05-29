<template>
  <section class="section-mb">
    <h3 class="text-h3 text-center c-mb-64">Видеоотзывы участников 1Т Клуба</h3>

    <Carousel
      :itemsToShow="3"
      :wrapAround="true"
      :transition="700"
      ref="carousel"
      class="video-carousel"
    >
      <Slide v-for="slide in reviewsList" :key="slide">
        <c-review-card :review="slide" />
      </Slide>
    </Carousel>

    <div class="text-center">
      <q-btn
        @click="carousel.prev()"
        unelevated
        dense
        size="xl"
        class="q-mr-md"
        :icon="'chevron_left'"
      />
      <q-btn
        @click="carousel.next()"
        unelevated
        dense
        size="xl"
        class="q-mr-md"
        :icon="'chevron_right'"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

import CReviewCard from "components/Landing-develop/ClubReviewCard.vue";

const carousel = ref(null);
const reviewsList = [
  {
    id: 1,
    src: "",
  },
  {
    id: 2,
    src: "",
  },
  {
    id: 3,
    src: "",
  },
];
</script>

<style lang="scss" scoped>
.video-carousel {
  max-width: 1120px;
  margin: 0 auto;
  text-align: left;
}
</style>
