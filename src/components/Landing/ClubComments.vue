<template>
  <h3 class="text-h3 text-center section-margin q-pb-xl">Отзывы участников 1Т Клуба</h3>
  <Carousel :itemsToShow="2.4" :wrapAround="true" :transition="500" ref="carousel" class="c-mb-40">
    <Slide v-for="slide in slides" :key="slide">
      <div class="row carousel__item">
        <div class="col-5 test">
          <img :src="slide.photo" alt="" />
        </div>
        <div class="col-7 q-pa-md text-left justify-between flex">
          <div class="text-body2">{{ slide.text }}</div>
          <div>
            <div class="text-subtitle4">{{ slide.name }}</div>
            <div class="text-body2 text-violet4">{{ slide.role }}</div>
          </div>
        </div>
      </div>
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
</template>

<script setup>
import { ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const carousel = ref(null);
const slides = [
  {
    name: "Татьяна Новикова",
    role: "Системный аналитик",
    text: "После курса 1Т Спринт хотелось поработать над реальным проектом — 1Т Клуб дал такую возможность. В сложных моментах нам помогали менторы. После первого проекта в 1Т Клубе появилась уверенность в себе. Приятно, что опытные наставники из 1Т Клуба нам помогают.",
    photo: "/assets/images/landing/photo_1.svg",
  },
  {
    name: "Екатерина Куршина",
    role: "Менеджер IT-проектов",
    text: "Наша команда — новички в IT. Совсем недавно мы закончили онлайн-курсы в 1Т Спринт, а свой первый проект получили в 1Т Клубе. Безумно приятно, что 1Т не оставляет своих выпускников. Нам очень помогли эксперты советами, как выстраивать этапы разработки, как общаться с заказчиком, к кому обращаться с вопросами.                          Это был прекрасный старт, чтобы расти дальше! ",
    photo: "/assets/images/landing/photo_2.svg",
  },
  {
    name: "Виктория Ознобихина",
    role: "Frontend- разработчик",
    text: "Работа в проекте 1Т Клуба позволяет получить ценный опыт сотрудничества с заказчиком и командой. Спасибо менторам, которые всегда готовы помочь и сделать наш работу более эффективной. Это вдохновляет на рост профессиональных навыков и повышение мотивации к развитию. Работать со замечательной командой, которая создает теплую и благоприятную атмосферу - это истинное удовольствие.",
    photo: "/assets/images/landing/photo_3.svg",
  },
];
</script>

<style lang="scss" scoped>
.carousel {
  &__img {
    width: 100%;
    max-width: 250px;
    min-width: 250px;
    border-radius: 10px 0 0 10px;
  }
  &__item {
    height: 420px;
    width: 640px;
    background: linear-gradient(
      101.5deg,
      rgba(16, 5, 34, 0.15) 37.03%,
      rgba(255, 255, 255, 0.1) 80.19%,
      rgba(16, 5, 34, 0.15) 100%
    );
    border: 2px solid rgba(63, 63, 70, 0.7);
    color: white;
    border-radius: 12px;
  }
  &__viewport {
    perspective: 2000px;
  }
  &__track {
    transform-style: preserve-3d;
  }
  &__slide {
    opacity: 0.9;
    transform: scale(1);
    &--sliding {
      transition: 0.5s;
    }
    &--prev {
      opacity: 0.5;
      transform: translateY(-5%) scale(0.9);
    }
    &--next {
      opacity: 0.5;
      transform: translateY(-5%) scale(0.9);
    }
  }
}
</style>
