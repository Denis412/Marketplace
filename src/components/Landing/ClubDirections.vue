<template>
  <section class="text-center directions container">
    <h2 class="title relative-position z-max">
      Выберите направление
      <img
      src="src/assets/images/Vector3.svg"
      class="absolute-center shadow"
    />
    </h2>

    <div class="font-size-24 text-weight-light subtitle">
      Выберите интересующий вас профиль и мы поможем вам познакомиться с
      платформой или сделать это самостоятельно.
    </div>

    <card-group :directions="cardsList" />
  </section>
</template>

<script setup>
import CardGroup from "components/Landing/ClubCardGroup.vue";
import { ref } from "vue";

const cardsList = ref([
  {
    id: 1,
    title: "Для Бизнеса",
    content: ["Новые партнеры", "Специалисты для развития бизнес-проектов"],
  },
  {
    id: 2,
    title: "Для Работы",
    content: ["Новые заказы", "Стажировка в 1Т Клубе", "Участие в командах"],
  },
  {
    id: 3,
    title: "Для Развития",
    content: ["Онлайн-курсы", "База знаний", "Консультации экспертов"],
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
