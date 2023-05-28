<template>
  <section class="text-center directions container">
    <h2 class="title relative-position z-max text-h3 q-mb-xl q-pb-xl">
      Выберите направление
      <img
        src="/assets/images/landing-background/main-page/bg-14.svg"
        class="absolute-center shadow"
      />
    </h2>
    <c-card-group :directions="cardsList" />
  </section>
</template>

<script setup>
import CCardGroup from "components/Landing/ClubCardGroup.vue";
import { ref } from "vue";

const cardsList = ref([
  {
    id: 1,
    title: "Для Бизнеса",
    content: ["IT-ментор для поиска точек роста в вашем бизнесе", "Команды IT-специалистов для развития бизнес-проектов"],
  },
  {
    id: 2,
    title: "Для Работы",
    content: ["Фриланс заказы для IT-специалистов", "Стажировка в 1Т Клубе", "Работа над  IT-проектом в укомплектованных командах"],
  },
  {
    id: 3,
    title: "Для Развития",
    content: ["Онлайн-обучение IT-профессиям", "База IT-знаний", "Консультации IT-экспертов"],
  },
]);
</script>

<style lang="scss" scoped>
.directions {
  margin-top: 179px;
}

.subtitle {
  margin: 33px 0;
}

.shadow {
  z-index: -1;
}
</style>
