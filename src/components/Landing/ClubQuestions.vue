<template>
  <section class="text-center container section-margin">
    <h3 class="text-h3 text-left q-mb-xl">Часто задаваемые вопросы</h3>
    <c-faq-list :questions="questionList" class="q-pb-xl" />
  </section>
</template>
<script setup>
import CFaqList from "./ClubFAQList.vue";
import { ref } from "vue";

const questionList = ref([
  {
    id: 1,
    label: "Какие требования к участникам 1Т Клуба?",
    content: [],
  },
  {
    id: 2,
    label: "Что внутри 1Т Клуба? Какие задачи я смогу решать?",
    content: [],
  },
  {
    id: 3,
    label: "Как вступить в команду 1Т Клуба?",
    content: [],
  },
  {
    id: 4,
    label: "Как оформить заказ в 1Т Клубе?",
    content: [],
  },
]);
</script>
<style scoped lang="scss"></style>
