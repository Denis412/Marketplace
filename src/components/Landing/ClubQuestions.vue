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
    content: [
      "Если вы старше 16 лет и есть желание реализовать себя в IT-сфере, присоединяйтесь к 1Т Клубу.",
    ],
  },
  {
    id: 2,
    label: "Что внутри 1Т Клуба? Какие задачи я смогу решать?",
    content: [
      "В 1Т Клубе вы найдете вакансии для IT-специалистов, экспертную поддержку,  все необходимые инструменты для развития навыков и решения проектных задач. ",
    ],
  },
  {
    id: 3,
    label: "Как вступить в команду 1Т Клуба?",
    content: [
      "Пройти регистрацию на платформе ",
      "В разделе «Команды» выбрать и подать заявку на вступление ",
    ],
  },
  {
    id: 4,
    label: "Как принять участие в мероприятиях 1Т Клуба?  ",
    content: [
      "Пройти регистрацию на платформе ",
      "Подать заявку для участие в интересующем мероприятии",
    ],
  },
]);
</script>
<style scoped lang="scss"></style>
