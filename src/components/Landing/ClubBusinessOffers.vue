<template>
  <section class="text-center container c-mb-160">
    <h3 class="text-h3 c-mb-64">ЧТО ПРЕДЛАГАЕТ 1Т КЛУБ ДЛЯ ВАШЕГО БИЗНЕСА</h3>
    <c-card-group :offers="cardsList" />
  </section>
</template>

<script setup>
import CCardGroup from "components/Landing/ClubCardGroup.vue";
import { ref } from "vue";

const cardsList = ref([
  {
    id: 1,
    title: "Сформированную команду",
    content: [
      "Как сократить затраты на IT-разработку?",
      "Подберем команду  IT-специалистов от джуна до сеньора под ваш бюджет",
    ],
  },
  {
    id: 2,
    title: "Поддержку на всех этапах",
    content: [
      "Как развивать свой бизнес?",
      "Подберем наставника, который поможет найти точки роста в вашем бизнесе",
    ],
  },
  {
    id: 3,
    title: "Безопасную сделку",
    content: [
      "Как сократить финансовые риски?",
      "Получайте полное юридическое сопровождение сделок",
    ],
  },
]);
</script>

<style lang="scss" scoped></style>
