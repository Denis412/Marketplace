<template>
  <section class="container steps">
      <h4 class="step-title">
        В 1T Клубе вас ждет:
      </h4>
      <step
      v-for="(step, index) in steps"
      :num="index + 1"
      :title="step.title"
      :info="step.info"
      />

  </section>
</template>

<script setup>
import Step from './ClubStep.vue';
import { ref } from "vue";
const steps = ref([
  {
    title: "Нетворкинг",
    info: "Онлайн встречи и офлайн мероприятия для участников 1Т Клуба.Знакомства, обмен опытом и идеями в разных сферах."
  },
  {
    title: "Командная работа",
    info: "Сформированные команды для решения бизнес задач.Онлайн встречи и офлайн мероприятия для участников 1Т Клуба.Знакомства, обмен опытом и идеями в разных сферах."
  },
  {
    title: "База знаний",
    info: "Безопасное хранение всех рабочих документов в едином пространстве 1Т Клуба."
  },
  {
    title: "Управление задачами",
    info: "Сервис внутри 1Т клуба для управления вашим проектом с возможностью следить за процессом в режиме реального времени."
  },
  {
    title: "Экспертная поддержка",
    info: "Консультации специалистов и сопровождение вашего проекта, начиная с этапа создания технического задания до запуска сайта."
  },

]);
</script>

<style lang="scss" scoped>
.steps {
  margin-top: 124px;
}


.step-title {
  font-weight: 500;
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 113px;
}
</style>
