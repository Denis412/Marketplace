<template>
  <q-list class="flex justify-between" style="margin-left: -32px">
    <category-item
      v-for="category in categories"
      :key="category.id"
      v-bind="category"
    />
  </q-list>
</template>

<script setup>
import CategoryItem from "src/components/CategoryItem.vue";
import { ref } from "vue";

const categories = ref([
  {
    id: 1,
    imageUrl: "src/assets/images/Freelansers.svg",
    title: "Фрилансеры",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 2,
    imageUrl: "src/assets/images/PredPrenimateli.svg",
    title: "Предприниматели",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 3,
    imageUrl: "src/assets/images/Startup.svg",
    title: "Стартап",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 4,
    imageUrl: "src/assets/images/Experts.svg",
    title: "Эксперты",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 5,
    imageUrl: "src/assets/images/News.svg",
    title: "Новинки",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
]);
</script>
