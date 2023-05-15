<template>
  <q-list class="flex justify-between">
    <c-category-item
      v-for="category in categories"
      :key="category.id"
      v-bind="category"
    />
  </q-list>
</template>

<script setup>
import CCategoryItem from "components/Landing/ClubCategoryItem.vue";
import { ref } from "vue";

const categories = ref([
  {
    id: 1,
    imageUrl: "/assets/images/landing/freelansers.svg",
    title: "Фрилансеры",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 2,
    imageUrl: "/assets/images/landing/entrepreneurs.svg",
    title: "Предприниматели",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 3,
    imageUrl: "/assets/images/landing/startup.svg",
    title: "Стартап",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 4,
    imageUrl: "/assets/images/landing/experts.svg",
    title: "Эксперты",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 5,
    imageUrl: "/assets/images/landing/novelties.svg",
    title: "Новинки",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
]);
</script>

<style scoped lang="scss">
.groups {
  padding: 0 12px;
}
</style>
