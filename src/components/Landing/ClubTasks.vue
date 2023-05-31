<template>
  <h3 class="text-h3 text-center c-mb-64">Выполненные заказы 1Т Клуба</h3>

  <Carousel :itemsToShow="2" :wrapAround="true" :transition="500" ref="carousel" class="c-mb-40">
    <Slide v-for="slide in contentList" :key="slide">
      <div class="row justify-between carousel__item">
        <q-img :src="slide.image" alt="" class="col-4 text-left carousel__img"></q-img>

        <div class="col text-left flex column justify-between text-block">
          <div class="text-top">
            <div v-if="slide.solution" class="text-body1 text-solution">Решил запрос:</div>

            <div class="text-body2" :class="!slide.solution ? 'q-mb-md' : ''">
              «<span class="text-body1">{{ slide.name }}</span
              >» — {{ slide.description }}
            </div>
            <div class="text-body2 text-objective">Наша задача — {{ slide.objective }}</div>

            <div v-if="slide.time" class="text-body1">
              Срок выполнения — {{ slide.time }} {{ monthString(slide) }}.
            </div>
          </div>

          <div class="text-bottom">
            <a class="text-body1 more" :href="slide.url" target="”_blank”">Подробнее</a>
          </div>
        </div>
      </div>
    </Slide>
  </Carousel>

  <div class="text-center c-mb-160">
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
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const carousel = ref(null);

const contentList = ref([
  {
    id: 1,
    slide: 1,
    name: "Машук",
    solution: true,
    description: "образовательный центр.",
    objective:
      "разработать дизайн сайта с учетом корпоративного стиля, брендинга и цветовой гаммы компании. Необходимо использовать современные тенденции в дизайне, учитывая требования пользователя и целевой аудитории. Верстка сайта должна быть адаптивна, т.е. подстраиваться под размер и ориентацию любого девайса.",

    image: "/assets/images/landing-business/tasks/mashuk.svg",
    time: 2,
    url: "https://центрзнаниймашук.рф/",
  },
  {
    id: 2,
    slide: 2,
    name: "Московские ведомости",
    solution: false,
    description: "сетевое издание редакции.",
    objective:
      "разработать современный сайт в минималистичном дизайне. Дизайн сайта должен соответствовать выбранной клиентом светлой цветовой гамме, содержать информационные элементы. Верстка сайта должна быть адаптивна, т.е. подстраиваться под размер и ориентацию любого девайса.",
    image: "/assets/images/landing-business/tasks/mos_ved.svg",
    time: 1,
    url: "https://mosvedomosti.ru/",
  },
  {
    id: 3,
    slide: 3,
    name: "МАКО",
    solution: false,
    description:
      "ассоциация граждан и организаций по содействию развитию корпоративного образования.",
    objective:
      "разработать удобный, современный сайт. Дизайн сайта должен быть эргономичен, функционален, соответствовать заявленной цветовой гамме. Верстка сайта должна быть адаптивна, т.е. подстраиваться под размер и ориентацию любого девайса. Проект находится на финальной стадии разработки.",
    image: "/assets/images/landing-business/tasks/mako.svg",
    time: null,
    url: "https://edupractice.ru/",
  },
]);

const monthString = (slide) => {
  switch (slide.time) {
    case 1:
      return "месяц";

    case 2 || 3 || 4:
      return "месяца";

    default:
      return "месяцев";
  }
};
</script>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.container {
  margin-bottom: 160px;
}
.bold {
  font-weight: 900;
}
.carousel {
  &__img {
    width: 100%;
    max-width: 250px;
    min-width: 250px;
    border-radius: 10px 0 0 10px;
  }
  &__item {
    height: 420px;
    width: 646px;
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
    opacity: 1;
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
.text {
  &-block {
    padding: 24px 23px 20px;
    max-width: 400px;
  }
  &-solution {
    margin-bottom: 10px;
  }
  &-objective {
    margin-bottom: 13px;
  }

  &-violet {
    color: #9043b4;
  }
}
.more {
  color: white;
  text-decoration: none;
  &::after {
    content: url("/assets/icons/arrow/arrow-right-small.svg");
    margin-left: 17px;
  }
}
</style>
