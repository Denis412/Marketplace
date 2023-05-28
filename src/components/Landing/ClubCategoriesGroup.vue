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
    title: "Фрилансер",
    content: "Получайте заказы или работайте над проектами в составе команды.",
  },
  {
    id: 2,
    imageUrl: "/assets/images/landing/entrepreneurs.svg",
    title: "Предприниматель",
    content: "Используйте IT-услуги для продвижения бизнеса",
  },
  {
    id: 3,
    imageUrl: "/assets/images/landing/startup.svg",
    title: "Стартапер",
    content: "Добивайтесь успеха с помощью опытных экспертов в сфере IT",
  },
  {
    id: 4,
    imageUrl: "/assets/images/landing/experts.svg",
    title: "Эксперт",
    content: "Станьте ментором и помогайте командам в работе над IT-проектами",
  },
  {
    id: 5,
    imageUrl: "/assets/images/landing/novelties.svg",
    title: "Новичок",
    content: "Начните карьеру в IT   и станьте крутым специалистом",
  },
]);
</script>

<style scoped lang="scss">
.groups {
  padding: 0 12px;
}
</style>
