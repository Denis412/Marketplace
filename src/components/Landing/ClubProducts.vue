<template>
  <section class="section-margin text-center container">
    <div class="text-subtitle1">Наши продукты</div>

    <q-list class="row justify-between">
      <c-product-item
        v-for="product in products"
        :key="product.id"
        v-bind="product"
      />
    </q-list>
  </section>
</template>

<script setup>
import CProductItem from "components/Landing/ClubProductItem.vue";
import { ref } from "vue";

const products = ref([
  {
    id: 1,
    title: "Акселератор 1Т Клуб",
    imageUrl: "/assets/images/landing/product-arrow.svg",
  },
  {
    id: 2,
    title: "Радио 1Т Клуб",
    imageUrl: "/assets/images/landing/product-arrow.svg",
  },
  {
    id: 3,
    title: "Мероприятия 1Т Клуб",
    imageUrl: "/assets/images/landing/product-arrow.svg",
  },
]);
</script>

<style lang="scss" scoped></style>
