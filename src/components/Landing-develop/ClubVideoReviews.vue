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
        size="md"
        class="q-mr-md"
        icon="img:/assets/icons/arrow/arrow-left-white.svg"
      />
      <q-btn
        @click="carousel.next()"
        unelevated
        dense
        size="md"
        class="q-mr-md"
        icon="img:/assets/icons/arrow/arrow-right-white.svg"
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
    src: "https://www.youtube.com/embed/rqwl1ew8__g?feature=share",
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/YOIQzIqhOFE?feature=share",
  },
  {
    id: 3,
    src: "https://www.youtube.com/embed/LlhV7VX0IN8?feature=share",
  },
  {
    id: 4,
    src: "https://www.youtube.com/embed/g1EjQd6Q66g?feature=share",
  },
  {
    id: 5,
    src: "https://www.youtube.com/embed/u8_e0OSWxhk?feature=share",
  },
  {
    id: 6,
    src: "https://www.youtube.com/embed/FBUvhsfeegQ?feature=share",
  },
  {
    id: 7,
    src: "https://www.youtube.com/embed/pGE70BSPPsI?feature=share",
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
