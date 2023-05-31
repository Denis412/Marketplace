<template>
  <section class="section-margin relative-position container">
    <h4 class="text-h3 q-mb-xl text-center">C Нами вас ждет</h4>
    <div class="steps-wrapper">
      <c-step
        v-for="(step, index) in steps"
        :num="index + 1"
        :key="step.title"
        :title="step.title"
        :info="step.info"
      />
      <c-steps-backgroung />
    </div>
  </section>
</template>

<script setup>
import CStep from "./ClubStep.vue";
import CStepsBackgroung from "./ClubStepsBackgroung.vue";
import { ref } from "vue";
const steps = ref([
  {
    title: "Нетворкинг",
    info: "Онлайн-встречи и офлайн мероприятия для участников ㅤㅤㅤ1Т Клуба. Знакомства, обмен опытом и идеями в сфере IT",
  },
  {
    title: "Командная работа",
    info: "Сформированные команды IT-специалистов для решения бизнес-задач",
  },
  {
    title: "База знаний",
    info: "Безопасное хранение всех рабочих документов в едином пространстве 1Т Клуба",
  },
  {
    title: "Управление задачами",
    info: "Сервис для планирования и мониторинга IT-задач",
  },
  {
    title: "Экспертная поддержка",
    info: "Консультации и сопровождение IT-проектов от идеи до запуска",
  },
]);
</script>

<style lang="scss" scoped>
.steps-wrapper {
  padding: 0 100px;
  margin-top: 100px;
}
</style>
