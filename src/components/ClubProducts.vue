<template>
  <section class="products container">
        <div class="text-center header-text-32">Наши продукты</div>

        <q-list class="row wrap justify-between justify-center">
          <product-item v-for="product in products" :key="product.id" v-bind="product" />
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

<style lang="scss" scoped>
.products {
  margin-top: 124px;
}
</style>
