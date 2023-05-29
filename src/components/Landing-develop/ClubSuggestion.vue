<template>
  <section class="section-margin">
    <h3 class="text-h3 text-center c-mb-64">ЧТО ПРЕДЛАГАЕТ 1T клуб ДЛЯ ВАШЕГО РАЗВИТИЯ?</h3>
    <section class="flex justify-center card-list">
      <c-suggestion-card v-for="card in cardList" :key="card.id" :card="card" />
    </section>
  </section>
</template>

<script setup>
import CSuggestionCard from "components/Landing-develop/ClubSuggestionCard.vue";

const cardList = [
  {
    id: 1,
    title: "Работу в команде",
    subtitle: "Объединение усилий и опыта участников для выполнения крупного проекта",
    img: "assets/images/landing-develop/suggestion/suggestion-people.svg",
  },
  {
    id: 2,
    title: "Экспертов из IT",
    subtitle: "Наставничество и консультация специалистов со стажем более 10 лет",
    img: "assets/images/landing-develop/suggestion/experts.svg",
  },
  {
    id: 3,
    title: "Центр карьеры",
    subtitle:
      "Помощь в поиске работы и развитии, в подготовке к собеседованиям и прохождению тестового задания",
    img: "assets/images/landing-develop/suggestion/career.svg",
  },
  {
    id: 4,
    title: "Реальный опыт",
    subtitle: "Стажировки и работа над проектами в компаниях лидеров рынка ",
    img: "assets/images/landing-develop/suggestion/experience.svg",
  },
  {
    id: 5,
    title: "Новую профессию",
    subtitle: "Обучение с нуля и повышение квалификации специалистов в сфере IT",
    img: "assets/images/landing-develop/suggestion/profession.svg",
  },
  {
    id: 6,
    title: "Нетворкинг",
    subtitle:
      "Онлайн встречи и офлайн мероприятия. Знакомства, обмен опытом и идеями в разных сферах",
    img: "assets/images/landing-develop/suggestion/social.svg",
  },
];
</script>

<style lang="scss" scoped>
.card-list {
  margin: 0 auto;
  max-width: 1200px;
}

.section-margin {
  margin-top: 160px;
  margin-bottom: 160px;
}
</style>
