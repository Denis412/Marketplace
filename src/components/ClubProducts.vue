<template>
  <section class="section-margin text-center">
    <div class="text-subtitle1">Наши продукты</div>

    <q-list class="row justify-between">
      <product-item
        v-for="product in products"
        :key="product.id"
        v-bind="product"
      />
    </q-list>
  </section>
</template>

<script setup>
import ProductItem from "src/components/ProductItem.vue";
import { ref } from "vue";

const products = ref([
  {
    id: 1,
    title: "Акселератор 1Т Клуб",
    imageUrl: "src/assets/images/Ellipse68.svg",
  },
  {
    id: 2,
    title: "Радио 1Т Клуб",
    imageUrl: "src/assets/images/Ellipse68.svg",
  },
  {
    id: 3,
    title: "Мероприятия 1Т Клуб",
    imageUrl: "src/assets/images/Ellipse68.svg",
  },
]);
</script>

<style lang="scss" scoped></style>
