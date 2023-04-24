<template>
  <q-page class="c-pa-32 page-background">
    <c-team-profile :team="team" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import CTeamProfile from "src/components/ClubTeamProfile.vue";

const team = ref({
  title: "Крутые перцы",
  description:
    "Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизни.Наша команда делает сервис, где человек смог бы следить за своим развитием в каждой из сфер жизниghhhh",
  directions: [
    { id: 1, title: "Дизайн" },
    { id: 2, title: "Разработка сайтов" },
    { id: 3, title: "Лендинги" },
    { id: 4, title: "Аналитика данных" },
    { id: 5, title: "Лендинги" },
    { id: 6, title: "Дизайн" },
    { id: 7, title: "Аналитика данных" },
    { id: 8, title: "Лендинги" },
  ],
  developers: [
    {
      id: 1,
      first_name: "Денис",
      last_name: "Малышев",
      speciality: "Разработчик",
    },
    {
      id: 2,
      first_name: "Денис",
      last_name: "Малышев",
      speciality: "Разработчик",
    },
    {
      id: 3,
      first_name: "Артем",
      last_name: "Янин",
      speciality: "Разработчик",
    },
    {
      id: 4,
      first_name: "Денис",
      last_name: "Малышев",
      speciality: "Разработчик",
    },
  ],
  designers: [
    {
      id: 1,
      first_name: "Денис",
      last_name: "Малышев",
      speciality: "Дизайнер",
    },
    {
      id: 2,
      first_name: "Денис",
      last_name: "Малышев",
      speciality: "Дизайнер",
    },
    {
      id: 3,
      first_name: "Артем",
      last_name: "Янин",
      speciality: "Дизайнер",
    },
    {
      id: 4,
      first_name: "Денис",
      last_name: "Малышев",
      speciality: "Дизайнер",
    },
  ],
});
</script>

<style scoped lang="scss"></style>
