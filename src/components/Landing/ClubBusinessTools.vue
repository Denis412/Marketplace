<template>
  <section class="section-margin text-center container">
    <div class="text-h3 c-mb-24">Инструменты управления проектом</div>

    <div class="relative-position c-mb-32">
      <img class="" src="/assets/images/landing/branches1.svg" />
    </div>

    <c-business-tools-list :categories="categories" />
  </section>
</template>

<script setup>
import CBusinessToolsList from "components/Landing/ClubBusinessToolsList.vue";
import { ref } from "vue";

const categories = ref([
  {
    id: 1,
    imageUrl: "/assets/icons/business/networking.svg",
    title: "Нетворкинг",
    content: "Онлайн и офлайн мероприятия для обмена идеями и опытом в сфере IT",
  },
  {
    id: 2,
    imageUrl: "/assets/icons/business/test-drive.svg",
    title: "Тест-драйв",
    content: "Оценка квалификации специалиста с помощью тестового задания",
  },
  {
    id: 3,
    imageUrl: "/assets/icons/business/library.svg",
    title: "Библиотека данных",
    content: "Безопасное хранение всех рабочих документов в едином пространстве",
  },
  {
    id: 4,
    imageUrl: "/assets/icons/business/manage-task.svg",
    title: "Управление задачами",
    content: "Сервис для планирования и мониторинга IT-задач",
  },
  {
    id: 5,
    imageUrl: "/assets/icons/business/support.svg",
    title: "Экспертная поддержка",
    content: "Консультации и сопровождение IT-проектов от идеи до запуска",
  },
]);
</script>

<style lang="scss" scoped></style>
